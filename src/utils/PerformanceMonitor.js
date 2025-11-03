/**
 * 性能监控工具 - 监控应用性能指标和用户体验
 * 基于Chrome DevTools性能分析的最佳实践
 */
class PerformanceMonitor {
  constructor(options = {}) {
    this.options = {
      enableAutoTracking: true,
      enableWebVitals: true,
      enableResourceTracking: true,
      enableUserTiming: true,
      enableMemoryTracking: true,
      enableNetworkTracking: true,
      reportEndpoint: '/api/performance-report',
      sampleRate: 0.1, // 10% 采样率
      maxEntries: 100,
      reportInterval: 30000, // 30秒上报一次
      ...options
    }

    this.metrics = new Map()
    this.observers = new Map()
    this.isSupported = this.checkSupport()
    this.sessionId = this.generateSessionId()
    
    if (this.isSupported && this.options.enableAutoTracking) {
      this.init()
    }
  }

  /**
   * 检查浏览器支持情况
   */
  checkSupport() {
    return (
      typeof window !== 'undefined' &&
      'performance' in window &&
      'PerformanceObserver' in window
    )
  }

  /**
   * 生成会话ID
   */
  generateSessionId() {
    return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
  }

  /**
   * 初始化性能监控
   */
  init() {
    if (process.env.NODE_ENV === 'development') {
      console.log('🚀 Performance Monitor initialized')
    }
    
    this.setupWebVitals()
    this.setupResourceTracking()
    this.setupUserTiming()
    this.setupMemoryTracking()
    this.setupNetworkTracking()
    this.setupAutoReporting()
    this.trackPageLoad()
    this.trackVisibilityChanges()
  }

  /**
   * 设置Web Vitals监控
   */
  setupWebVitals() {
    if (!this.options.enableWebVitals) return

    // Largest Contentful Paint (LCP)
    this.observeEntry('largest-contentful-paint', (entries) => {
      const lastEntry = entries[entries.length - 1]
      this.recordMetric('LCP', lastEntry.startTime, {
        element: lastEntry.element?.tagName || 'unknown',
        url: lastEntry.url || '',
        timestamp: Date.now()
      })
    })

    // First Input Delay (FID)
    this.observeEntry('first-input', (entries) => {
      const entry = entries[0]
      const fid = entry.processingStart - entry.startTime
      this.recordMetric('FID', fid, {
        eventType: entry.name,
        timestamp: Date.now()
      })
    })

    // Cumulative Layout Shift (CLS)
    let clsValue = 0
    this.observeEntry('layout-shift', (entries) => {
      entries.forEach(entry => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value
        }
      })
      this.recordMetric('CLS', clsValue, {
        timestamp: Date.now()
      })
    })

    // First Contentful Paint (FCP)
    this.observeEntry('paint', (entries) => {
      entries.forEach(entry => {
        if (entry.name === 'first-contentful-paint') {
          this.recordMetric('FCP', entry.startTime, {
            timestamp: Date.now()
          })
        }
      })
    })
  }

  /**
   * 设置资源加载监控
   */
  setupResourceTracking() {
    if (!this.options.enableResourceTracking) return

    this.observeEntry('resource', (entries) => {
      entries.forEach(entry => {
        const resourceData = {
          name: entry.name,
          type: this.getResourceType(entry.name),
          size: entry.transferSize || 0,
          duration: entry.duration,
          cached: entry.transferSize === 0 && entry.decodedBodySize > 0
        }

        this.recordMetric('RESOURCE', resourceData.duration, {
          ...resourceData,
          timestamp: Date.now()
        })
      })
    })
  }

  /**
   * 设置用户自定义计时监控
   */
  setupUserTiming() {
    if (!this.options.enableUserTiming) return

    this.observeEntry('measure', (entries) => {
      entries.forEach(entry => {
        this.recordMetric('USER_TIMING', entry.duration, {
          name: entry.name,
          timestamp: Date.now()
        })
      })
    })
  }

  /**
   * 设置内存监控
   */
  setupMemoryTracking() {
    if (!this.options.enableMemoryTracking || !performance.memory) return

    const checkMemory = () => {
      const memory = performance.memory
      this.recordMetric('MEMORY_USED', memory.usedJSHeapSize, {
        total: memory.totalJSHeapSize,
        limit: memory.jsHeapSizeLimit,
        timestamp: Date.now()
      })
    }

    // 每分钟检查一次内存使用情况
    setInterval(checkMemory, 60000)
    checkMemory() // 立即检查一次
  }

  /**
   * 设置网络监控
   */
  setupNetworkTracking() {
    if (!this.options.enableNetworkTracking || !navigator.connection) return

    const checkConnection = () => {
      const connection = navigator.connection
      this.recordMetric('NETWORK_TYPE', 0, {
        type: connection.effectiveType,
        downlink: connection.downlink,
        rtt: connection.rtt,
        saveData: connection.saveData,
        timestamp: Date.now()
      })
    }

    checkConnection()
    
    // 监听网络变化
    if ('addEventListener' in navigator.connection) {
      navigator.connection.addEventListener('change', checkConnection)
    }
  }

  /**
   * 设置自动上报
   */
  setupAutoReporting() {
    if (!this.options.reportEndpoint) return

    setInterval(() => {
      this.reportMetrics()
    }, this.options.reportInterval)

    // 页面卸载时上报
    window.addEventListener('beforeunload', () => {
      this.reportMetrics(true)
    })

    // 页面隐藏时上报
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        this.reportMetrics(true)
      }
    })
  }

  /**
   * 跟踪页面加载性能
   */
  trackPageLoad() {
    if (performance.timing) {
      const timing = performance.timing
      const navigationStart = timing.navigationStart
      
      const metrics = {
        dns: timing.domainLookupEnd - timing.domainLookupStart,
        tcp: timing.connectEnd - timing.connectStart,
        request: timing.responseStart - timing.requestStart,
        response: timing.responseEnd - timing.responseStart,
        dom: timing.domContentLoadedEventStart - navigationStart,
        load: timing.loadEventStart - navigationStart,
        total: timing.loadEventEnd - navigationStart
      }

      Object.entries(metrics).forEach(([key, value]) => {
        if (value > 0) {
          this.recordMetric(`PAGE_${key.toUpperCase()}`, value, {
            timestamp: Date.now()
          })
        }
      })
    }
  }

  /**
   * 跟踪页面可见性变化
   */
  trackVisibilityChanges() {
    let focusTime = 0
    let blurTime = 0

    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        focusTime = Date.now()
        this.recordMetric('PAGE_VISIBLE', 1, {
          timestamp: focusTime
        })
      } else {
        blurTime = Date.now()
        if (focusTime > 0) {
          const duration = blurTime - focusTime
          this.recordMetric('PAGE_ENGAGEMENT_TIME', duration, {
            timestamp: blurTime
          })
        }
      }
    })
  }

  /**
   * 创建PerformanceObserver
   */
  observeEntry(type, callback) {
    if (!this.isSupported) return

    try {
      const observer = new PerformanceObserver((list) => {
        callback(list.getEntries())
      })
      
      observer.observe({ entryTypes: [type] })
      this.observers.set(type, observer)
    } catch (error) {
      console.warn(`Performance observer for ${type} not supported:`, error)
    }
  }

  /**
   * 记录性能指标
   */
  recordMetric(name, value, metadata = {}) {
    if (!this.shouldSample()) return

    const metric = {
      name,
      value,
      metadata,
      timestamp: Date.now(),
      sessionId: this.sessionId,
      url: window.location.href,
      userAgent: navigator.userAgent
    }

    if (!this.metrics.has(name)) {
      this.metrics.set(name, [])
    }

    const entries = this.metrics.get(name)
    entries.push(metric)

    // 限制存储的条目数量
    if (entries.length > this.options.maxEntries) {
      entries.shift()
    }

    // 开发环境下输出到控制台
    // 性能指标在开发环境已通过recordMetric记录，这里不再重复输出
  }

  /**
   * 采样控制
   */
  shouldSample() {
    return Math.random() < this.options.sampleRate
  }

  /**
   * 获取资源类型
   */
  getResourceType(url) {
    const extension = url.split('.').pop()?.toLowerCase()
    const typeMap = {
      'js': 'script',
      'css': 'stylesheet',
      'png': 'image',
      'jpg': 'image',
      'jpeg': 'image',
      'gif': 'image',
      'svg': 'image',
      'webp': 'image',
      'woff': 'font',
      'woff2': 'font',
      'ttf': 'font',
      'eot': 'font'
    }
    return typeMap[extension] || 'other'
  }

  /**
   * 手动记录性能指标
   */
  mark(name) {
    if (performance.mark) {
      performance.mark(name)
    }
  }

  /**
   * 测量两个标记之间的时间
   */
  measure(name, startMark, endMark) {
    if (performance.measure) {
      performance.measure(name, startMark, endMark)
    }
  }

  /**
   * 获取性能报告
   */
  getReport() {
    const report = {
      sessionId: this.sessionId,
      timestamp: Date.now(),
      url: window.location.href,
      userAgent: navigator.userAgent,
      metrics: {}
    }

    this.metrics.forEach((entries, name) => {
      const values = entries.map(e => e.value)
      report.metrics[name] = {
        count: values.length,
        min: Math.min(...values),
        max: Math.max(...values),
        avg: values.reduce((a, b) => a + b, 0) / values.length,
        values: values.slice(-10), // 最近10个值
        samples: entries.slice(-5) // 最近5个完整样本
      }
    })

    return report
  }

  /**
   * 上报性能数据
   */
  async reportMetrics(isBeacon = false) {
    if (!this.options.reportEndpoint || this.metrics.size === 0) return

    const report = this.getReport()
    
    try {
      if (isBeacon && navigator.sendBeacon) {
        // 使用sendBeacon进行最终上报
        navigator.sendBeacon(
          this.options.reportEndpoint,
          JSON.stringify(report)
        )
      } else {
        // 常规上报
        await fetch(this.options.reportEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(report)
        })
      }

      // 清空已上报的数据
      this.metrics.clear()

      if (process.env.NODE_ENV === 'development') {
        console.log('📤 Performance report sent:', report)
      }
    } catch (error) {
      console.error('Failed to report performance metrics:', error)
      
      // 失败时存储到本地，稍后重试
      this.storeFailedReport(report)
    }
  }

  /**
   * 存储失败的上报数据
   */
  storeFailedReport(report) {
    const failedReports = JSON.parse(localStorage.getItem('failedPerformanceReports') || '[]')
    failedReports.push(report)
    
    // 最多存储20条失败记录
    if (failedReports.length > 20) {
      failedReports.splice(0, failedReports.length - 20)
    }
    
    localStorage.setItem('failedPerformanceReports', JSON.stringify(failedReports))
  }

  /**
   * 重试失败的上报
   */
  retryFailedReports() {
    const failedReports = JSON.parse(localStorage.getItem('failedPerformanceReports') || '[]')
    
    if (failedReports.length === 0) return

    Promise.allSettled(
      failedReports.map(report => 
        fetch(this.options.reportEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(report)
        })
      )
    ).then(() => {
      localStorage.removeItem('failedPerformanceReports')
    })
  }

  /**
   * 获取Core Web Vitals评分
   */
  getWebVitalsScore() {
    const report = this.getReport()
    const scores = {}

    // LCP评分 (Good: <2.5s, Needs Improvement: 2.5s-4s, Poor: >4s)
    if (report.metrics.LCP) {
      const lcp = report.metrics.LCP.avg
      scores.LCP = lcp < 2500 ? 'good' : lcp < 4000 ? 'needs-improvement' : 'poor'
    }

    // FID评分 (Good: <100ms, Needs Improvement: 100ms-300ms, Poor: >300ms)
    if (report.metrics.FID) {
      const fid = report.metrics.FID.avg
      scores.FID = fid < 100 ? 'good' : fid < 300 ? 'needs-improvement' : 'poor'
    }

    // CLS评分 (Good: <0.1, Needs Improvement: 0.1-0.25, Poor: >0.25)
    if (report.metrics.CLS) {
      const cls = report.metrics.CLS.avg
      scores.CLS = cls < 0.1 ? 'good' : cls < 0.25 ? 'needs-improvement' : 'poor'
    }

    return scores
  }

  /**
   * 销毁监控器
   */
  destroy() {
    this.observers.forEach(observer => {
      observer.disconnect()
    })
    this.observers.clear()
    this.metrics.clear()
    
    if (process.env.NODE_ENV === 'development') {
      console.log('🛑 Performance Monitor destroyed')
    }
  }
}

// 创建单例实例
let performanceMonitorInstance = null

/**
 * 获取性能监控实例
 */
export function getPerformanceMonitor(options) {
  if (!performanceMonitorInstance) {
    performanceMonitorInstance = new PerformanceMonitor(options)
  }
  return performanceMonitorInstance
}

/**
 * 初始化性能监控
 */
export function initPerformanceMonitoring(options = {}) {
  const defaultOptions = {
    enableAutoTracking: process.env.NODE_ENV === 'production',
    enableWebVitals: true,
    enableResourceTracking: true,
    reportEndpoint: process.env.VUE_APP_PERFORMANCE_ENDPOINT || '/api/performance-report',
    sampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0
  }

  return getPerformanceMonitor({ ...defaultOptions, ...options })
}

/**
 * Vue插件形式
 */
export const PerformanceMonitorPlugin = {
  install(app, options = {}) {
    const monitor = initPerformanceMonitoring(options)
    
    // 提供全局访问
    app.config.globalProperties.$performance = monitor
    app.provide('performance', monitor)
  }
}

export default PerformanceMonitor
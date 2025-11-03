/**
 * 优化插件集成 - 将所有性能优化功能集成到Vue应用中
 */
import { ErrorBoundaryPlugin } from '@/components/ErrorBoundary'
import { PerformanceMonitorPlugin } from '@/utils/PerformanceMonitor'
import { securityMiddleware, SecurityUtils } from '@/utils/security.config'

/**
 * 初始化所有优化插件
 */
export function initOptimization(app, options = {}) {
  const defaultOptions = {
    enableErrorBoundary: true,
    enablePerformanceMonitoring: true,
    enableSecurity: true,
    environment: process.env.NODE_ENV || 'development',
    performanceEndpoint: process.env.VUE_APP_PERFORMANCE_ENDPOINT,
    ...options
  }

  // 注册错误边界插件
  if (defaultOptions.enableErrorBoundary) {
    app.use(ErrorBoundaryPlugin, {
      autoReport: defaultOptions.environment === 'production',
      showNotification: true,
      reportWarnings: defaultOptions.environment === 'development'
    })
    
    if (import.meta.env.DEV) {
      console.log('✅ Error Boundary Plugin enabled')
    }
  }

  // 注册性能监控插件
  if (defaultOptions.enablePerformanceMonitoring) {
    app.use(PerformanceMonitorPlugin, {
      enableAutoTracking: defaultOptions.environment === 'production',
      enableWebVitals: true,
      enableResourceTracking: true,
      reportEndpoint: defaultOptions.performanceEndpoint || '/api/performance-report',
      sampleRate: defaultOptions.environment === 'production' ? 0.1 : 1.0
    })
    
    if (import.meta.env.DEV) {
      console.log('✅ Performance Monitor Plugin enabled')
    }
  }

  // 初始化安全功能
  if (defaultOptions.enableSecurity) {
    initSecurityFeatures(app, defaultOptions)
    if (import.meta.env.DEV) {
      console.log('✅ Security Features enabled')
    }
  }

  // 设置全局优化指令
  setupOptimizationDirectives(app)
  
  // 设置全局优化混入
  setupOptimizationMixins(app)

  if (import.meta.env.DEV) {
    console.log('🚀 All optimization features initialized')
  }
}

/**
 * 初始化安全功能
 */
function initSecurityFeatures(app, options) {
  // 提供安全工具给全局使用
  app.config.globalProperties.$security = SecurityUtils
  app.provide('security', SecurityUtils)
  
  // 设置安全头部（如果在浏览器环境）
  if (typeof window !== 'undefined') {
    // 定期清理过期的CSRF token
    setInterval(() => {
      securityMiddleware.cleanupExpiredTokens()
    }, 60000) // 每分钟清理一次
  }
}

/**
 * 设置优化相关的全局指令
 */
function setupOptimizationDirectives(app) {
  // 懒加载图片指令
  app.directive('lazy-load', {
    mounted(el, binding) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target
            img.src = binding.value
            img.classList.add('loaded')
            observer.unobserve(img)
          }
        })
      }, {
        rootMargin: '50px'
      })
      
      observer.observe(el)
    }
  })

  // GPU加速指令
  app.directive('gpu-accelerated', {
    mounted(el) {
      el.style.transform = 'translateZ(0)'
      el.style.backfaceVisibility = 'hidden'
      el.style.perspective = '1000px'
    }
  })

  // 防抖指令
  app.directive('debounce', {
    mounted(el, binding) {
      let timeout
      const delay = binding.arg || 300
      
      el.addEventListener('click', () => {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
          binding.value()
        }, delay)
      })
    }
  })
}

/**
 * 设置优化相关的全局混入
 */
function setupOptimizationMixins(app) {
  app.mixin({
    methods: {
      // 性能标记
      $performanceMark(name) {
        if (this.$performance) {
          this.$performance.mark(name)
        }
      },
      
      // 性能测量
      $performanceMeasure(name, startMark, endMark) {
        if (this.$performance) {
          this.$performance.measure(name, startMark, endMark)
        }
      },
      
      // 安全净化HTML
      $sanitizeHtml(html) {
        return SecurityUtils.sanitizeHtml(html)
      },
      
      // 检测XSS
      $detectXSS(input) {
        return SecurityUtils.detectXSS(input)
      },
      
      // 生成安全Token
      $generateToken(length) {
        return SecurityUtils.generateToken(length)
      }
    }
  })
}

/**
 * 路由懒加载优化
 */
export function optimizeRouter(router) {
  // 添加路由切换性能监控
  router.beforeEach((to, from, next) => {
    // 开始性能标记
    if (typeof performance !== 'undefined') {
      performance.mark(`route-change-start-${to.path}`)
    }
    
    next()
  })
  
  router.afterEach((to) => {
    // 结束性能标记
    if (typeof performance !== 'undefined') {
      performance.mark(`route-change-end-${to.path}`)
      performance.measure(
        `route-change-${to.path}`,
        `route-change-start-${to.path}`,
        `route-change-end-${to.path}`
      )
    }
    
    // 更新页面标题（SEO优化）
    if (to.meta?.title) {
      document.title = `${to.meta.title} - 海看AI培训战略汇报平台`
    }
  })
}

/**
 * 状态管理优化
 */
export function optimizeStore(store) {
  // 添加状态变更性能监控
  store.subscribe((mutation, state) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`🔄 Store mutation: ${mutation.type}`, mutation.payload)
    }
  })
  
  // 防止状态过大（内存优化）
  store.watch(
    (state) => JSON.stringify(state).length,
    (size) => {
      const maxSize = 1024 * 1024 // 1MB
      if (size > maxSize) {
        console.warn('⚠️ Store size is large, consider optimizing:', size, 'bytes')
      }
    }
  )
}

/**
 * API请求优化
 */
export function optimizeApiRequests(axiosInstance) {
  // 请求拦截器 - 添加安全头部
  axiosInstance.interceptors.request.use(
    (config) => {
      // 添加CSRF token
      if (securityMiddleware.options.enableCSRF) {
        const sessionId = localStorage.getItem('sessionId') || 'default'
        const csrfToken = securityMiddleware.generateCSRFToken(sessionId)
        if (csrfToken) {
          config.headers['X-CSRF-Token'] = csrfToken
        }
      }
      
      // 添加请求性能标记
      config.metadata = { startTime: Date.now() }
      
      return config
    },
    (error) => Promise.reject(error)
  )
  
  // 响应拦截器 - 性能监控和安全检查
  axiosInstance.interceptors.response.use(
    (response) => {
      // 记录请求性能
      const duration = Date.now() - response.config.metadata?.startTime
      if (duration > 5000) {
        console.warn(`⚠️ Slow API request: ${response.config.url} took ${duration}ms`)
      }
      
      // 安全检查
      const contentType = response.headers['content-type']
      if (contentType && contentType.includes('text/html')) {
        // 对HTML响应进行XSS检查
        if (SecurityUtils.detectXSS(response.data)) {
          console.error('🚨 XSS detected in API response:', response.config.url)
        }
      }
      
      return response
    },
    (error) => {
      // 安全错误处理
      if (error.response?.status === 403) {
        console.error('🚨 Security violation detected')
      }
      
      return Promise.reject(error)
    }
  )
}

/**
 * 图片懒加载工具
 */
export class ImageLazyLoader {
  constructor(options = {}) {
    this.options = {
      rootMargin: '50px',
      threshold: 0.1,
      ...options
    }
    
    this.observer = new IntersectionObserver(this.handleIntersection.bind(this), {
      rootMargin: this.options.rootMargin,
      threshold: this.options.threshold
    })
  }
  
  observe(img) {
    if (img.dataset.src) {
      this.observer.observe(img)
    }
  }
  
  unobserve(img) {
    this.observer.unobserve(img)
  }
  
  handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target
        const src = img.dataset.src
        
        if (src) {
          img.src = src
          img.classList.add('loaded')
          img.removeAttribute('data-src')
          this.observer.unobserve(img)
        }
      }
    })
  }
  
  destroy() {
    this.observer.disconnect()
  }
}

/**
 * 内存管理工具
 */
export class MemoryManager {
  constructor() {
    this.cache = new Map()
    this.maxCacheSize = 50 // 最大缓存条目数
  }
  
  set(key, value) {
    // 如果缓存已满，删除最旧的条目
    if (this.cache.size >= this.maxCacheSize) {
      const firstKey = this.cache.keys().next().value
      this.cache.delete(firstKey)
    }
    
    this.cache.set(key, {
      value,
      timestamp: Date.now()
    })
  }
  
  get(key) {
    const item = this.cache.get(key)
    if (item) {
      // 更新访问时间
      item.timestamp = Date.now()
      return item.value
    }
    return null
  }
  
  clear() {
    this.cache.clear()
  }
  
  cleanup(maxAge = 30 * 60 * 1000) { // 30分钟
    const now = Date.now()
    for (const [key, item] of this.cache.entries()) {
      if (now - item.timestamp > maxAge) {
        this.cache.delete(key)
      }
    }
  }
}

// 创建全局实例
export const imageLazyLoader = new ImageLazyLoader()
export const memoryManager = new MemoryManager()

// 定期清理内存
setInterval(() => {
  memoryManager.cleanup()
}, 60000) // 每分钟清理一次

export default {
  initOptimization,
  optimizeRouter,
  optimizeStore,
  optimizeApiRequests,
  ImageLazyLoader,
  MemoryManager,
  imageLazyLoader,
  memoryManager
}
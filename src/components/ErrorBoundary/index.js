import ErrorBoundary from './ErrorBoundary.vue'

export default ErrorBoundary
export { ErrorBoundary }

// Vue插件形式注册
export const ErrorBoundaryPlugin = {
  install(app, options = {}) {
    // 全局注册错误边界组件
    app.component('ErrorBoundary', ErrorBoundary)
    
    // 全局错误处理
    app.config.errorHandler = (err, vm, info) => {
      console.error('Global Vue error:', err, info)
      
      // 上报错误
      if (options.autoReport !== false) {
        reportGlobalError(err, info, vm)
      }
      
      // 显示错误通知
      if (options.showNotification !== false && typeof window !== 'undefined') {
        if (window.ElMessage) {
          window.ElMessage.error('应用发生错误，请刷新页面重试')
        }
      }
    }
    
    // 全局警告处理
    app.config.warnHandler = (msg, vm, trace) => {
      console.warn('Vue warning:', msg, trace)
      
      if (options.reportWarnings) {
        reportWarning(msg, vm, trace)
      }
    }
  }
}

// 全局错误上报函数
function reportGlobalError(err, info, vm) {
  try {
    const errorData = {
      message: err?.message || 'Unknown Vue error',
      stack: err?.stack || 'No stack',
      componentInfo: info,
      componentName: vm?.$options?.name || 'Unknown Component',
      url: window.location.href,
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString(),
      userId: localStorage.getItem('userId') || 'anonymous',
      type: 'vue-global-error'
    }

    sendErrorReport(errorData)
  } catch (reportErr) {
    console.error('Failed to report global error:', reportErr)
  }
}

// 警告上报函数
function reportWarning(msg, vm, trace) {
  try {
    const warningData = {
      message: msg,
      componentName: vm?.$options?.name || 'Unknown Component',
      trace,
      url: window.location.href,
      timestamp: new Date().toISOString(),
      type: 'vue-warning'
    }

    sendErrorReport(warningData)
  } catch (reportErr) {
    console.error('Failed to report warning:', reportErr)
  }
}

// 发送错误报告到服务器
async function sendErrorReport(errorData) {
  try {
    if (typeof fetch !== 'undefined') {
      await fetch('/api/error-report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(errorData)
      })
    }
  } catch (err) {
    console.error('Error reporting failed:', err)
    
    // 失败时存储到本地，稍后重试
    const failedReports = JSON.parse(localStorage.getItem('failedErrorReports') || '[]')
    failedReports.push({
      ...errorData,
      failedAt: new Date().toISOString()
    })
    
    // 最多存储50条失败记录
    if (failedReports.length > 50) {
      failedReports.splice(0, failedReports.length - 50)
    }
    
    localStorage.setItem('failedErrorReports', JSON.stringify(failedReports))
  }
}

// 重试发送失败的错误报告
export function retryFailedReports() {
  const failedReports = JSON.parse(localStorage.getItem('failedErrorReports') || '[]')
  
  if (failedReports.length === 0) {
    return
  }
  
  Promise.allSettled(
    failedReports.map(report => sendErrorReport(report))
  ).then(() => {
    // 清除已尝试重试的报告
    localStorage.removeItem('failedErrorReports')
  })
}

// 在页面加载完成后尝试重试失败的错误报告
if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    setTimeout(retryFailedReports, 2000)
  })
}
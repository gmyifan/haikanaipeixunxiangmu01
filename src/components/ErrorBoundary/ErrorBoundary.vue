<template>
  <div class="error-boundary">
    <slot v-if="!hasError" />
    <div v-else class="error-fallback">
      <el-result
        icon="error"
        title="页面出现错误"
        :sub-title="errorMessage"
      >
        <template #extra>
          <el-button type="primary" @click="handleReload">
            重新加载
          </el-button>
          <el-button @click="handleGoHome">
            返回首页
          </el-button>
          <el-button 
            v-if="showDetails" 
            type="danger" 
            plain 
            @click="toggleErrorDetails"
          >
            {{ showErrorDetails ? '隐藏' : '显示' }}错误详情
          </el-button>
        </template>
      </el-result>
      
      <!-- 错误详情展示 -->
      <el-collapse v-if="showErrorDetails" class="error-details">
        <el-collapse-item title="错误详情" name="errorDetails">
          <div class="error-content">
            <h4>错误信息：</h4>
            <pre>{{ error?.message || '未知错误' }}</pre>
            
            <h4>错误堆栈：</h4>
            <pre class="error-stack">{{ error?.stack || '无堆栈信息' }}</pre>
            
            <h4>组件信息：</h4>
            <pre>{{ componentStack || '无组件信息' }}</pre>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
import { ref, onErrorCaptured, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElNotification } from 'element-plus'

export default {
  name: 'ErrorBoundary',
  props: {
    // 是否显示错误详情按钮
    showDetails: {
      type: Boolean,
      default: process.env.NODE_ENV === 'development'
    },
    // 自定义错误回调
    onError: {
      type: Function,
      default: null
    },
    // 是否自动上报错误
    autoReport: {
      type: Boolean,
      default: true
    }
  },
  setup(props) {
    const router = useRouter()
    const hasError = ref(false)
    const error = ref(null)
    const componentStack = ref('')
    const showErrorDetails = ref(false)
    const errorMessage = ref('抱歉，页面遇到了一些问题')

    // 捕获子组件错误
    onErrorCaptured((err, instance, info) => {
      console.error('ErrorBoundary caught error:', err, info)
      
      hasError.value = true
      error.value = err
      componentStack.value = info
      
      // 根据错误类型设置用户友好的错误信息
      if (err.name === 'ChunkLoadError') {
        errorMessage.value = '网络连接出现问题，请检查网络后重试'
      } else if (err.message.includes('Network Error')) {
        errorMessage.value = '网络请求失败，请检查网络连接'
      } else if (err.message.includes('Failed to fetch')) {
        errorMessage.value = '数据加载失败，请稍后重试'
      } else {
        errorMessage.value = '页面加载出现错误，请刷新页面重试'
      }

      // 显示错误通知
      ElNotification({
        title: '页面错误',
        message: errorMessage.value,
        type: 'error',
        duration: 5000
      })

      // 上报错误
      if (props.autoReport) {
        reportError(err, info)
      }

      // 调用自定义错误回调
      if (props.onError) {
        props.onError(err, info)
      }

      // 阻止错误继续向上传播
      return false
    })

    // 监听全局未捕获的错误
    const handleGlobalError = (event) => {
      console.error('Global error caught:', event.error)
      if (props.autoReport) {
        reportError(event.error, 'Global Error')
      }
    }

    // 监听Promise rejection错误
    const handleUnhandledRejection = (event) => {
      console.error('Unhandled promise rejection:', event.reason)
      if (props.autoReport) {
        reportError(event.reason, 'Unhandled Promise Rejection')
      }
    }

    onMounted(() => {
      window.addEventListener('error', handleGlobalError)
      window.addEventListener('unhandledrejection', handleUnhandledRejection)
    })

    onUnmounted(() => {
      window.removeEventListener('error', handleGlobalError)
      window.removeEventListener('unhandledrejection', handleUnhandledRejection)
    })

    // 错误上报函数
    const reportError = (err, info) => {
      try {
        // 这里可以集成错误监控服务，如Sentry
        const errorData = {
          message: err?.message || 'Unknown error',
          stack: err?.stack || 'No stack',
          componentStack: info,
          url: window.location.href,
          userAgent: navigator.userAgent,
          timestamp: new Date().toISOString(),
          userId: localStorage.getItem('userId') || 'anonymous'
        }

        // 发送错误数据到监控服务
        if (typeof fetch !== 'undefined') {
          fetch('/api/error-report', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(errorData)
          }).catch(reportErr => {
            console.error('Failed to report error:', reportErr)
          })
        }

        // 开发环境下在控制台输出完整错误信息
        if (process.env.NODE_ENV === 'development') {
          console.group('🚨 ErrorBoundary Error Report')
          console.log('Error Data:', errorData)
          console.groupEnd()
        }
      } catch (reportErr) {
        console.error('Error reporting failed:', reportErr)
      }
    }

    // 重新加载页面
    const handleReload = () => {
      hasError.value = false
      error.value = null
      componentStack.value = ''
      errorMessage.value = '抱歉，页面遇到了一些问题'
      
      // 清除可能的缓存问题
      if ('caches' in window) {
        caches.keys().then(names => {
          names.forEach(name => {
            caches.delete(name)
          })
        })
      }
      
      window.location.reload()
    }

    // 返回首页
    const handleGoHome = () => {
      hasError.value = false
      error.value = null
      componentStack.value = ''
      errorMessage.value = '抱歉，页面遇到了一些问题'
      router.push('/')
    }

    // 切换错误详情显示
    const toggleErrorDetails = () => {
      showErrorDetails.value = !showErrorDetails.value
    }

    // 重置错误状态（供外部调用）
    const reset = () => {
      hasError.value = false
      error.value = null
      componentStack.value = ''
      errorMessage.value = '抱歉，页面遇到了一些问题'
      showErrorDetails.value = false
    }

    return {
      hasError,
      error,
      componentStack,
      showErrorDetails,
      errorMessage,
      handleReload,
      handleGoHome,
      toggleErrorDetails,
      reset
    }
  }
}
</script>

<style scoped>
.error-boundary {
  width: 100%;
  height: 100%;
}

.error-fallback {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  padding: 20px;
}

.error-details {
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
}

.error-content {
  text-align: left;
}

.error-content h4 {
  margin: 15px 0 8px 0;
  color: #409eff;
  font-size: 14px;
}

.error-content pre {
  background-color: #f5f5f5;
  padding: 12px;
  border-radius: 4px;
  font-size: 12px;
  line-height: 1.4;
  overflow-x: auto;
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #e4e7ed;
}

.error-stack {
  color: #f56c6c;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .error-fallback {
    padding: 10px;
  }
  
  .error-details {
    margin-top: 15px;
  }
  
  .error-content pre {
    font-size: 11px;
    padding: 8px;
  }
}

/* 暗色主题支持 */
@media (prefers-color-scheme: dark) {
  .error-content pre {
    background-color: #2d2d2d;
    color: #e4e7ed;
    border-color: #4c4d4f;
  }
  
  .error-stack {
    color: #ff6b6b;
  }
}
</style>
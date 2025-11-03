<template>
  <div id="app" :class="{ 'presentation-mode': isPresentationMode }">
    <!-- 加载状态 -->
    <div v-if="loading" class="app-loading">
      <div class="loading-spinner"></div>
      <div class="loading-text">海看AI培训战略汇报平台</div>
      <div class="loading-subtitle">正在加载中...</div>
    </div>

    <!-- 主应用内容 -->
    <template v-else>
      <!-- 页面头部 -->
      <AppHeader 
        :is-presentation-mode="isPresentationMode"
        @toggle-presentation="togglePresentationMode"
        @toggle-search="showSearch = true"
      />

      <!-- 主要内容区域 -->
      <main class="app-main">
        <router-view />
      </main>

      <!-- 页面底部 -->
      <AppFooter />

      <!-- 全局搜索弹窗 -->
      <SearchPanel 
        v-model:visible="showSearch"
        @close="showSearch = false"
      />

      <!-- 快速导航浮动按钮 -->
      <QuickNav 
        v-if="!isPresentationMode"
        @show-search="showSearch = true"
        @export-content="handleExport"
      />
    </template>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useAppStore } from '@/stores/app'
import AppHeader from '@/components/common/AppHeader.vue'
import AppFooter from '@/components/common/AppFooter.vue'
import SearchPanel from '@/components/interaction/SearchPanel.vue'
import QuickNav from '@/components/common/QuickNav.vue'
import { exportToPDF, exportToWord } from '@/utils/exportTools'

export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter,
    SearchPanel,
    QuickNav
  },
  setup() {
    const appStore = useAppStore()
    
    // 响应式数据
    const loading = ref(true)
    const isPresentationMode = ref(false)
    const showSearch = ref(false)

    // 切换演示模式
    const togglePresentationMode = () => {
      isPresentationMode.value = !isPresentationMode.value
      appStore.setPresentationMode(isPresentationMode.value)
    }

    // 处理导出
    const handleExport = (format) => {
      switch (format) {
        case 'pdf':
          exportToPDF()
          break
        case 'word':
          exportToWord()
          break
        default:
          console.warn('不支持的导出格式:', format)
      }
    }

    // 应用初始化
    onMounted(async () => {
      try {
        // 初始化应用数据
        await appStore.initializeApp()
      } catch (error) {
        console.error('应用初始化失败:', error)
      } finally {
        // 无论成功或失败，都要结束加载状态
        setTimeout(() => {
          loading.value = false
        }, 1000)
      }
    })

    return {
      loading,
      isPresentationMode,
      showSearch,
      togglePresentationMode,
      handleExport
    }
  }
}
</script>

<style>
/* 全局应用样式 */
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  font-family: 'Noto Sans SC', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

/* 演示模式样式 */
#app.presentation-mode {
  background: #ffffff;
}

#app.presentation-mode .app-main {
  max-width: none;
  padding: 0;
}

/* 应用加载动画 */
.app-loading {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  color: white;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top: 3px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 20px;
}

.loading-text {
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 10px;
}

.loading-subtitle {
  font-size: 14px;
  opacity: 0.8;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* 主内容区域 */
.app-main {
  flex: 1;
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
  width: 100%;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .app-main {
    padding: 10px;
  }
  
  .loading-text {
    font-size: 16px;
  }
  
  .loading-subtitle {
    font-size: 12px;
  }
}
</style>
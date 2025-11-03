<template>
  <header class="app-header" :class="{ 'presentation-mode': isPresentationMode }">
    <div class="header-container">
      <!-- 左侧Logo和标题 -->
      <div class="header-left">
        <div class="logo">
          <span class="logo-icon">🏢</span>
        </div>
        <div class="title-section">
          <h1 class="app-title">
            海看AI培训战略汇报平台
          </h1>
          <p class="app-subtitle" v-if="!isPresentationMode">
            构建海看"技术+内容+场景"新生态
          </p>
        </div>
      </div>

      <!-- 中间导航菜单 -->
      <nav class="header-nav" v-if="!isPresentationMode">
        <router-link 
          v-for="section in mainSections" 
          :key="section.id"
          :to="`/${section.id}`"
          class="nav-item"
          :class="{ active: $route.path === `/${section.id}` }"
        >
          <span class="nav-icon">{{ section.icon }}</span>
          <span class="nav-text">{{ section.title }}</span>
        </router-link>
      </nav>

      <!-- 右侧功能按钮 -->
      <div class="header-right">
        <!-- 搜索按钮 -->
        <el-button 
          v-if="!isPresentationMode"
          type="text" 
          @click="$emit('toggleSearch')"
          class="header-btn"
          title="全文搜索"
        >
          <el-icon><Search /></el-icon>
        </el-button>

        <!-- 演示模式切换 -->
        <el-button 
          type="text" 
          @click="$emit('togglePresentation')"
          class="header-btn"
          :title="isPresentationMode ? '退出演示模式' : '进入演示模式'"
        >
          <el-icon v-if="isPresentationMode"><Monitor /></el-icon>
          <el-icon v-else><Monitor /></el-icon>
        </el-button>

        <!-- 导出菜单 -->
        <el-dropdown v-if="!isPresentationMode" @command="handleExport">
          <el-button type="text" class="header-btn" title="导出报告">
            <el-icon><Download /></el-icon>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="pdf">
                <el-icon><Document /></el-icon>
                导出为PDF
              </el-dropdown-item>
              <el-dropdown-item command="word">
                <el-icon><DocumentCopy /></el-icon>
                导出为Word
              </el-dropdown-item>
              <el-dropdown-item command="print">
                <el-icon><Printer /></el-icon>
                打印预览
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>

        <!-- 设置按钮 -->
        <el-button 
          v-if="!isPresentationMode"
          type="text" 
          @click="showSettings = true"
          class="header-btn"
          title="设置"
        >
          <el-icon><Setting /></el-icon>
        </el-button>
      </div>
    </div>

    <!-- 进度条 -->
    <div class="progress-bar" v-if="!isPresentationMode && readingProgress > 0">
      <div 
        class="progress-fill" 
        :style="{ width: `${readingProgress}%` }"
      ></div>
    </div>

    <!-- 设置弹窗 -->
    <el-dialog
      v-model="showSettings"
      title="设置"
      width="500px"
      :before-close="handleCloseSettings"
    >
      <div class="settings-content">
        <!-- 主题设置 -->
        <div class="setting-group">
          <h4>主题设置</h4>
          <el-radio-group v-model="localTheme" @change="handleThemeChange">
            <el-radio label="business-blue">商务蓝</el-radio>
            <el-radio label="professional-gray">专业灰</el-radio>
            <el-radio label="presentation-dark">演示暗色</el-radio>
          </el-radio-group>
        </div>

        <!-- 字体大小 -->
        <div class="setting-group">
          <h4>字体大小</h4>
          <el-radio-group v-model="localFontSize" @change="handleFontSizeChange">
            <el-radio label="small">小</el-radio>
            <el-radio label="medium">中</el-radio>
            <el-radio label="large">大</el-radio>
          </el-radio-group>
        </div>

        <!-- 动画设置 -->
        <div class="setting-group">
          <h4>动画效果</h4>
          <el-switch 
            v-model="localAnimations" 
            @change="handleAnimationsChange"
            active-text="开启"
            inactive-text="关闭"
          />
        </div>
      </div>
      
      <template #footer>
        <el-button @click="showSettings = false">取消</el-button>
        <el-button type="primary" @click="handleSaveSettings">保存</el-button>
      </template>
    </el-dialog>
  </header>
</template>

<script>
import { ref, computed, watch } from 'vue'
import { useAppStore } from '@/stores/app'
import { 
  Search, Monitor, Download, Document, DocumentCopy, Printer, Setting 
} from '@element-plus/icons-vue'

export default {
  name: 'AppHeader',
  components: {
    Search, Monitor, Download, Document, DocumentCopy, Printer, Setting
  },
  props: {
    isPresentationMode: {
      type: Boolean,
      default: false
    }
  },
  emits: ['toggleSearch', 'togglePresentation'],
  setup(props, { emit }) {
    const appStore = useAppStore()
    
    // 响应式数据
    const showSettings = ref(false)
    const localTheme = ref(appStore.userPreferences.theme)
    const localFontSize = ref(appStore.userPreferences.fontSize)
    const localAnimations = ref(appStore.userPreferences.animations)

    // 主要章节
    const mainSections = computed(() => {
      return appStore.sections.map(section => ({
        id: section.id,
        title: section.title,
        icon: section.icon
      }))
    })

    // 阅读进度
    const readingProgress = computed(() => appStore.readingProgress)

    // 处理导出
    const handleExport = (format) => {
      emit('export', format)
    }

    // 设置相关方法
    const handleThemeChange = (value) => {
      localTheme.value = value
    }

    const handleFontSizeChange = (value) => {
      localFontSize.value = value
    }

    const handleAnimationsChange = (value) => {
      localAnimations.value = value
    }

    const handleSaveSettings = () => {
      appStore.updateUserPreferences({
        theme: localTheme.value,
        fontSize: localFontSize.value,
        animations: localAnimations.value
      })
      showSettings.value = false
    }

    const handleCloseSettings = () => {
      // 重置为原始值
      localTheme.value = appStore.userPreferences.theme
      localFontSize.value = appStore.userPreferences.fontSize
      localAnimations.value = appStore.userPreferences.animations
      showSettings.value = false
    }

    // 监听用户偏好变化
    watch(() => appStore.userPreferences, (newPreferences) => {
      localTheme.value = newPreferences.theme
      localFontSize.value = newPreferences.fontSize
      localAnimations.value = newPreferences.animations
    }, { deep: true })

    return {
      showSettings,
      localTheme,
      localFontSize,
      localAnimations,
      mainSections,
      readingProgress,
      handleExport,
      handleThemeChange,
      handleFontSizeChange,
      handleAnimationsChange,
      handleSaveSettings,
      handleCloseSettings
    }
  }
}
</script>

<style scoped>
.app-header {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid #e5e7eb;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.header-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 12px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
}

.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%);
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(30, 58, 138, 0.2);
}

.logo-icon {
  font-size: 20px;
}

.title-section {
  display: flex;
  flex-direction: column;
}

.app-title {
  font-size: 20px;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
  line-height: 1.2;
}

.app-subtitle {
  font-size: 14px;
  color: #6b7280;
  margin: 0;
  line-height: 1.2;
}

.header-nav {
  display: flex;
  gap: 8px;
  flex: 1;
  justify-content: center;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 8px;
  text-decoration: none;
  color: #6b7280;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
  border: 1px solid transparent;
}

.nav-item:hover {
  background: #f3f4f6;
  color: #374151;
  border-color: #e5e7eb;
}

.nav-item.active {
  background: #1e3a8a;
  color: white;
  border-color: #1e3a8a;
}

.nav-icon {
  font-size: 16px;
}

.nav-text {
  white-space: nowrap;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
}

.header-btn {
  width: 36px;
  height: 36px;
  border-radius: 6px;
  font-size: 16px;
  color: #6b7280;
  transition: all 0.2s ease;
}

.header-btn:hover {
  background: #f3f4f6;
  color: #374151;
}

.progress-bar {
  height: 3px;
  background: #e5e7eb;
  position: relative;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #1e3a8a 0%, #3b82f6 100%);
  transition: width 0.3s ease;
}

/* 演示模式样式 */
.app-header.presentation-mode {
  background: #ffffff;
  border-bottom: 2px solid #1e3a8a;
}

.app-header.presentation-mode .header-container {
  padding: 16px 40px;
}

.app-header.presentation-mode .app-title {
  font-size: 24px;
  color: #1e3a8a;
}

.app-header.presentation-mode .app-subtitle {
  font-size: 16px;
  color: #6b7280;
}

/* 设置弹窗样式 */
.settings-content {
  padding: 10px 0;
}

.setting-group {
  margin-bottom: 24px;
}

.setting-group:last-child {
  margin-bottom: 0;
}

.setting-group h4 {
  margin: 0 0 12px 0;
  font-size: 14px;
  font-weight: 600;
  color: #374151;
}

.setting-group .el-radio-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.setting-group .el-radio {
  margin-right: 0;
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .header-nav {
    gap: 4px;
  }
  
  .nav-item {
    padding: 6px 12px;
    font-size: 13px;
  }
  
  .nav-text {
    display: none;
  }
}

@media (max-width: 768px) {
  .header-container {
    padding: 10px 16px;
    gap: 12px;
  }
  
  .app-title {
    font-size: 16px;
  }
  
  .app-subtitle {
    font-size: 12px;
  }
  
  .logo {
    width: 32px;
    height: 32px;
  }
  
  .logo-icon {
    font-size: 16px;
  }
  
  .header-nav {
    display: none;
  }
  
  .header-btn {
    width: 32px;
    height: 32px;
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  .header-left {
    gap: 8px;
  }
  
  .app-subtitle {
    display: none;
  }
  
  .header-right {
    gap: 2px;
  }
}
</style>
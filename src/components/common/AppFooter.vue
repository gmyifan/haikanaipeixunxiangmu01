<template>
  <footer class="app-footer" :class="{ 'presentation-mode': isPresentationMode }">
    <div class="footer-container">
      <!-- 左侧版权信息 -->
      <div class="footer-left" v-if="!isPresentationMode">
        <p class="copyright">
          © 2025 海看AI培训战略汇报平台
        </p>
        <p class="version">
          版本 {{ metadata.version }}
        </p>
      </div>

      <!-- 中间统计信息 -->
      <div class="footer-center" v-if="!isPresentationMode">
        <div class="stats">
          <span class="stat-item">
            <el-icon><Document /></el-icon>
            {{ totalLines }}行原文
          </span>
          <span class="stat-item">
            <el-icon><View /></el-icon>
            {{ readLines }}行已读
          </span>
          <span class="stat-item">
            <el-icon><Clock /></el-icon>
            {{ metadata.content.estimatedReadingTime }}分钟
          </span>
          <span class="stat-item">
            <el-icon><Collection /></el-icon>
            {{ metadata.content.totalSections }}个章节
          </span>
        </div>
      </div>

      <!-- 右侧操作按钮 -->
      <div class="footer-right">
        <!-- 演示模式下显示控制按钮 -->
        <template v-if="isPresentationMode">
          <el-button-group>
            <el-button size="small" @click="$emit('previousSlide')">
              <el-icon><ArrowLeft /></el-icon>
              上一页
            </el-button>
            <el-button size="small" @click="$emit('toggleFullscreen')">
              <el-icon><FullScreen /></el-icon>
              全屏
            </el-button>
            <el-button size="small" @click="$emit('nextSlide')">
              下一页
              <el-icon><ArrowRight /></el-icon>
            </el-button>
          </el-button-group>
        </template>

        <!-- 正常模式下显示快捷操作 -->
        <template v-else>
          <el-button-group size="small">
            <el-tooltip content="返回顶部" placement="top">
              <el-button @click="scrollToTop">
                <el-icon><Top /></el-icon>
              </el-button>
            </el-tooltip>
            <el-tooltip content="查看完整内容" placement="top">
              <el-button @click="viewFullContent">
                <el-icon><Document /></el-icon>
              </el-button>
            </el-tooltip>
            <el-tooltip content="阅读统计" placement="top">
              <el-button @click="showStats = true">
                <el-icon><DataAnalysis /></el-icon>
              </el-button>
            </el-tooltip>
          </el-button-group>
        </template>
      </div>
    </div>

    <!-- 统计信息弹窗 -->
    <el-dialog
      v-model="showStats"
      title="阅读统计"
      width="500px"
      :before-close="handleCloseStats"
    >
      <div class="stats-content">
        <!-- 进度统计 -->
        <div class="stats-section">
          <h4>阅读进度</h4>
          <div class="progress-stats">
            <el-progress 
              :percentage="readingProgress" 
              :color="progressColor"
              :stroke-width="12"
            />
            <p class="progress-text">
              已阅读 {{ readLines }} / {{ totalLines }} 行
            </p>
          </div>
        </div>

        <!-- 章节统计 -->
        <div class="stats-section">
          <h4>章节浏览</h4>
          <div class="section-stats">
            <div 
              v-for="section in sections" 
              :key="section.id"
              class="section-item"
            >
              <span class="section-icon">{{ section.icon }}</span>
              <span class="section-name">{{ section.title }}</span>
              <el-icon 
                v-if="isSectionVisited(section.id)"
                class="visited-icon"
                color="#67c23a"
              >
                <CircleCheck />
              </el-icon>
            </div>
          </div>
        </div>

        <!-- 书签和标注 -->
        <div class="stats-section">
          <h4>个人标记</h4>
          <div class="annotation-stats">
            <div class="annotation-item">
              <el-icon><Star /></el-icon>
              <span>书签: {{ bookmarks.length }} 个</span>
            </div>
            <div class="annotation-item">
              <el-icon><Edit /></el-icon>
              <span>标注: {{ annotations.length }} 个</span>
            </div>
          </div>
        </div>
      </div>
      
      <template #footer>
        <el-button @click="showStats = false">关闭</el-button>
        <el-button type="primary" @click="exportStats">导出统计</el-button>
      </template>
    </el-dialog>
  </footer>
</template>

<script>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '@/stores/app'
import { 
  Document, View, Clock, Collection, ArrowLeft, ArrowRight, 
  FullScreen, Top, DataAnalysis, Star, Edit, CircleCheck 
} from '@element-plus/icons-vue'

export default {
  name: 'AppFooter',
  components: {
    Document, View, Clock, Collection, ArrowLeft, ArrowRight,
    FullScreen, Top, DataAnalysis, Star, Edit, CircleCheck
  },
  props: {
    isPresentationMode: {
      type: Boolean,
      default: false
    }
  },
  emits: ['previousSlide', 'nextSlide', 'toggleFullscreen'],
  setup(props, { emit }) {
    const router = useRouter()
    const appStore = useAppStore()
    
    // 响应式数据
    const showStats = ref(false)
    const visitedSections = ref([])

    // 计算属性
    const metadata = computed(() => appStore.metadata)
    const totalLines = computed(() => appStore.totalLines)
    const readLines = computed(() => appStore.readLines)
    const readingProgress = computed(() => appStore.readingProgress)
    const sections = computed(() => appStore.sections)
    const bookmarks = computed(() => appStore.bookmarks)
    const annotations = computed(() => appStore.annotations)

    // 进度条颜色
    const progressColor = computed(() => {
      const progress = readingProgress.value
      if (progress < 30) return '#f56c6c'
      if (progress < 70) return '#e6a23c'
      return '#67c23a'
    })

    // 判断章节是否已访问
    const isSectionVisited = (sectionId) => {
      return visitedSections.value.includes(sectionId)
    }

    // 返回顶部
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }

    // 查看完整内容
    const viewFullContent = () => {
      router.push('/full-content')
    }

    // 关闭统计弹窗
    const handleCloseStats = () => {
      showStats.value = false
    }

    // 导出统计数据
    const exportStats = () => {
      const stats = {
        readingProgress: readingProgress.value,
        readLines: readLines.value,
        totalLines: totalLines.value,
        visitedSections: visitedSections.value,
        bookmarksCount: bookmarks.value.length,
        annotationsCount: annotations.value.length,
        exportedAt: new Date().toISOString()
      }

      const dataStr = JSON.stringify(stats, null, 2)
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
      
      const exportFileDefaultName = `haikan-ai-report-stats-${new Date().toISOString().split('T')[0]}.json`
      
      const linkElement = document.createElement('a')
      linkElement.setAttribute('href', dataUri)
      linkElement.setAttribute('download', exportFileDefaultName)
      linkElement.click()
    }

    // 监听路由变化，记录访问的章节
    router.afterEach((to) => {
      const sectionId = to.path.replace('/', '')
      if (sectionId && !visitedSections.value.includes(sectionId)) {
        visitedSections.value.push(sectionId)
      }
    })

    return {
      showStats,
      metadata,
      totalLines,
      readLines,
      readingProgress,
      sections,
      bookmarks,
      annotations,
      progressColor,
      isSectionVisited,
      scrollToTop,
      viewFullContent,
      handleCloseStats,
      exportStats
    }
  }
}
</script>

<style scoped>
.app-footer {
  background: #ffffff;
  border-top: 1px solid #e5e7eb;
  margin-top: auto;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.05);
}

.footer-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

.footer-left {
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex-shrink: 0;
}

.copyright {
  font-size: 12px;
  color: #6b7280;
  margin: 0;
}

.version {
  font-size: 11px;
  color: #9ca3af;
  margin: 0;
}

.footer-center {
  flex: 1;
  display: flex;
  justify-content: center;
}

.stats {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  justify-content: center;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: #6b7280;
}

.stat-item .el-icon {
  font-size: 14px;
}

.footer-right {
  flex-shrink: 0;
}

/* 演示模式样式 */
.app-footer.presentation-mode {
  background: #f8fafc;
  border-top: 2px solid #1e3a8a;
}

.app-footer.presentation-mode .footer-container {
  padding: 12px 40px;
}

/* 统计弹窗样式 */
.stats-content {
  padding: 10px 0;
}

.stats-section {
  margin-bottom: 24px;
}

.stats-section:last-child {
  margin-bottom: 0;
}

.stats-section h4 {
  margin: 0 0 12px 0;
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 6px;
}

.progress-stats {
  text-align: center;
}

.progress-text {
  margin: 12px 0 0 0;
  font-size: 13px;
  color: #6b7280;
}

.section-stats {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.section-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: #f9fafb;
  border-radius: 6px;
  border: 1px solid #e5e7eb;
}

.section-icon {
  font-size: 16px;
}

.section-name {
  flex: 1;
  font-size: 13px;
  color: #374151;
}

.visited-icon {
  font-size: 16px;
}

.annotation-stats {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.annotation-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: #f9fafb;
  border-radius: 6px;
  font-size: 13px;
  color: #374151;
}

.annotation-item .el-icon {
  font-size: 14px;
  color: #6b7280;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .footer-container {
    padding: 12px 16px;
    gap: 12px;
    flex-direction: column;
    text-align: center;
  }
  
  .footer-left {
    order: 2;
  }
  
  .footer-center {
    order: 1;
  }
  
  .footer-right {
    order: 3;
  }
  
  .stats {
    gap: 16px;
  }
  
  .stat-item {
    font-size: 11px;
  }
  
  .copyright {
    font-size: 11px;
  }
  
  .version {
    font-size: 10px;
  }
}

@media (max-width: 480px) {
  .stats {
    gap: 12px;
  }
  
  .stat-item {
    font-size: 10px;
  }
  
  .footer-container {
    padding: 10px 12px;
  }
}
</style>
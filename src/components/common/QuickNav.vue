<template>
  <div class="quick-nav" :class="{ 'expanded': isExpanded }">
    <!-- 主按钮 -->
    <el-button 
      type="primary" 
      class="quick-nav-btn"
      @click="toggleExpanded"
      :class="{ 'active': isExpanded }"
    >
      <el-icon><Operation /></el-icon>
    </el-button>

    <!-- 展开的菜单 -->
    <transition name="quick-nav-expand">
      <div v-show="isExpanded" class="quick-nav-menu">
        <!-- 搜索 -->
        <el-button 
          type="info" 
          class="nav-item"
          @click="$emit('showSearch')"
          title="全文搜索"
        >
          <el-icon><Search /></el-icon>
        </el-button>

        <!-- 目录 -->
        <el-button 
          type="success" 
          class="nav-item"
          @click="showTableOfContents"
          title="内容目录"
        >
          <el-icon><Menu /></el-icon>
        </el-button>

        <!-- 书签 -->
        <el-button 
          type="warning" 
          class="nav-item"
          @click="showBookmarks"
          title="我的书签"
        >
          <el-icon><Star /></el-icon>
          <el-badge 
            v-if="bookmarksCount > 0" 
            :value="bookmarksCount" 
            class="bookmark-badge"
          />
        </el-button>

        <!-- 标注 -->
        <el-button 
          type="danger" 
          class="nav-item"
          @click="showAnnotations"
          title="内容标注"
        >
          <el-icon><Edit /></el-icon>
          <el-badge 
            v-if="annotationsCount > 0" 
            :value="annotationsCount" 
            class="annotation-badge"
          />
        </el-button>

        <!-- 导出 -->
        <el-dropdown @command="handleExport" placement="top">
          <el-button 
            class="nav-item export-btn"
            title="导出报告"
          >
            <el-icon><Download /></el-icon>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="pdf">
                <el-icon><Document /></el-icon>
                导出PDF
              </el-dropdown-item>
              <el-dropdown-item command="word">
                <el-icon><DocumentCopy /></el-icon>
                导出Word
              </el-dropdown-item>
              <el-dropdown-item command="json">
                <el-icon><Files /></el-icon>
                导出JSON
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>

        <!-- 打印 -->
        <el-button 
          type="info" 
          class="nav-item"
          @click="handlePrint"
          title="打印预览"
        >
          <el-icon><Printer /></el-icon>
        </el-button>

        <!-- 设置 -->
        <el-button 
          type="primary" 
          class="nav-item"
          @click="showSettings"
          title="系统设置"
        >
          <el-icon><Setting /></el-icon>
        </el-button>
      </div>
    </transition>

    <!-- 目录弹窗 -->
    <el-dialog
      v-model="tableOfContentsVisible"
      title="内容目录"
      width="600px"
      :before-close="handleCloseTableOfContents"
    >
      <div class="table-of-contents">
        <div 
          v-for="section in sections" 
          :key="section.id"
          class="toc-item"
          @click="navigateToSection(section.id)"
        >
          <div class="toc-icon">{{ section.icon }}</div>
          <div class="toc-content">
            <h4 class="toc-title">{{ section.title }}</h4>
            <p class="toc-subtitle">{{ section.subtitle }}</p>
            <div class="toc-meta">
              <span class="toc-lines">{{ section.lineRange[1] - section.lineRange[0] + 1 }}行</span>
              <span class="toc-progress" v-if="getSectionProgress(section.id) > 0">
                已读{{ Math.round(getSectionProgress(section.id)) }}%
              </span>
            </div>
          </div>
          <el-icon class="toc-arrow"><ArrowRight /></el-icon>
        </div>
      </div>
    </el-dialog>

    <!-- 书签弹窗 -->
    <el-dialog
      v-model="bookmarksVisible"
      title="我的书签"
      width="500px"
      :before-close="handleCloseBookmarks"
    >
      <div class="bookmarks-list">
        <div v-if="bookmarks.length === 0" class="empty-state">
          <el-empty description="暂无书签" />
        </div>
        <div 
          v-for="bookmark in bookmarks" 
          :key="bookmark.id"
          class="bookmark-item"
        >
          <div class="bookmark-content">
            <h5 class="bookmark-title">{{ bookmark.title }}</h5>
            <p class="bookmark-line">第{{ bookmark.lineNumber }}行</p>
            <p class="bookmark-time">{{ formatTime(bookmark.createdAt) }}</p>
          </div>
          <div class="bookmark-actions">
            <el-button 
              size="small" 
              type="text"
              @click="goToLine(bookmark.lineNumber)"
            >
              <el-icon><View /></el-icon>
            </el-button>
            <el-button 
              size="small" 
              type="text"
              @click="removeBookmark(bookmark.id)"
            >
              <el-icon><Delete /></el-icon>
            </el-button>
          </div>
        </div>
      </div>
    </el-dialog>

    <!-- 标注弹窗 -->
    <el-dialog
      v-model="annotationsVisible"
      title="内容标注"
      width="600px"
      :before-close="handleCloseAnnotations"
    >
      <div class="annotations-list">
        <div v-if="annotations.length === 0" class="empty-state">
          <el-empty description="暂无标注" />
        </div>
        <div 
          v-for="annotation in annotations" 
          :key="annotation.id"
          class="annotation-item"
        >
          <div class="annotation-content">
            <div class="annotation-header">
              <span class="annotation-line">第{{ annotation.lineNumber }}行</span>
              <el-tag :type="getAnnotationTagType(annotation.type)" size="small">
                {{ getAnnotationTypeText(annotation.type) }}
              </el-tag>
            </div>
            <p class="annotation-text">{{ annotation.text }}</p>
            <p class="annotation-time">{{ formatTime(annotation.createdAt) }}</p>
          </div>
          <div class="annotation-actions">
            <el-button 
              size="small" 
              type="text"
              @click="goToLine(annotation.lineNumber)"
            >
              <el-icon><View /></el-icon>
            </el-button>
            <el-button 
              size="small" 
              type="text"
              @click="removeAnnotation(annotation.id)"
            >
              <el-icon><Delete /></el-icon>
            </el-button>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '@/stores/app'
import { 
  Operation, Search, Menu, Star, Edit, Download, Document, 
  DocumentCopy, Files, Printer, Setting, ArrowRight, View, Delete
} from '@element-plus/icons-vue'

export default {
  name: 'QuickNav',
  components: {
    Operation, Search, Menu, Star, Edit, Download, Document,
    DocumentCopy, Files, Printer, Setting, ArrowRight, View, Delete
  },
  emits: ['showSearch', 'exportContent'],
  setup(props, { emit }) {
    const router = useRouter()
    const appStore = useAppStore()
    
    // 响应式数据
    const isExpanded = ref(false)
    const tableOfContentsVisible = ref(false)
    const bookmarksVisible = ref(false)
    const annotationsVisible = ref(false)

    // 计算属性
    const sections = computed(() => appStore.sections)
    const bookmarks = computed(() => appStore.bookmarks)
    const annotations = computed(() => appStore.annotations)
    const bookmarksCount = computed(() => bookmarks.value.length)
    const annotationsCount = computed(() => annotations.value.length)

    // 切换展开状态
    const toggleExpanded = () => {
      isExpanded.value = !isExpanded.value
    }

    // 显示目录
    const showTableOfContents = () => {
      tableOfContentsVisible.value = true
      isExpanded.value = false
    }

    // 显示书签
    const showBookmarks = () => {
      bookmarksVisible.value = true
      isExpanded.value = false
    }

    // 显示标注
    const showAnnotations = () => {
      annotationsVisible.value = true
      isExpanded.value = false
    }

    // 显示设置
    const showSettings = () => {
      router.push('/settings')
      isExpanded.value = false
    }

    // 导航到章节
    const navigateToSection = (sectionId) => {
      router.push(`/${sectionId}`)
      tableOfContentsVisible.value = false
    }

    // 跳转到指定行
    const goToLine = (lineNumber) => {
      router.push('/full-content')
      // 这里可以添加滚动到指定行的逻辑
      setTimeout(() => {
        const element = document.querySelector(`[data-line="${lineNumber}"]`)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' })
          element.classList.add('highlight')
          setTimeout(() => {
            element.classList.remove('highlight')
          }, 2000)
        }
      }, 100)
    }

    // 处理导出
    const handleExport = (format) => {
      emit('exportContent', format)
      isExpanded.value = false
    }

    // 处理打印
    const handlePrint = () => {
      window.print()
      isExpanded.value = false
    }

    // 获取章节进度
    const getSectionProgress = (sectionId) => {
      // 这里可以根据实际阅读进度计算
      return 0
    }

    // 获取标注类型文本
    const getAnnotationTypeText = (type) => {
      const types = {
        note: '笔记',
        important: '重要',
        question: '问题',
        idea: '想法'
      }
      return types[type] || '其他'
    }

    // 获取标注标签类型
    const getAnnotationTagType = (type) => {
      const types = {
        note: '',
        important: 'danger',
        question: 'warning',
        idea: 'success'
      }
      return types[type] || ''
    }

    // 格式化时间
    const formatTime = (timeStr) => {
      const date = new Date(timeStr)
      return date.toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      })
    }

    // 删除书签
    const removeBookmark = (bookmarkId) => {
      appStore.removeBookmark(bookmarkId)
    }

    // 删除标注
    const removeAnnotation = (annotationId) => {
      appStore.removeAnnotation(annotationId)
    }

    // 关闭弹窗
    const handleCloseTableOfContents = () => {
      tableOfContentsVisible.value = false
    }

    const handleCloseBookmarks = () => {
      bookmarksVisible.value = false
    }

    const handleCloseAnnotations = () => {
      annotationsVisible.value = false
    }

    // 点击外部关闭菜单
    document.addEventListener('click', (e) => {
      if (isExpanded.value && !e.target.closest('.quick-nav')) {
        isExpanded.value = false
      }
    })

    return {
      isExpanded,
      tableOfContentsVisible,
      bookmarksVisible,
      annotationsVisible,
      sections,
      bookmarks,
      annotations,
      bookmarksCount,
      annotationsCount,
      toggleExpanded,
      showTableOfContents,
      showBookmarks,
      showAnnotations,
      showSettings,
      navigateToSection,
      goToLine,
      handleExport,
      handlePrint,
      getSectionProgress,
      getAnnotationTypeText,
      getAnnotationTagType,
      formatTime,
      removeBookmark,
      removeAnnotation,
      handleCloseTableOfContents,
      handleCloseBookmarks,
      handleCloseAnnotations
    }
  }
}
</script>

<style scoped>
.quick-nav {
  position: fixed;
  bottom: 80px;
  right: 20px;
  z-index: 1000;
}

.quick-nav-btn {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  font-size: 20px;
  transition: all 0.3s ease;
}

.quick-nav-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
}

.quick-nav-btn.active {
  background: #f56c6c;
  border-color: #f56c6c;
}

.quick-nav-menu {
  position: absolute;
  bottom: 70px;
  right: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: white;
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  border: 1px solid #e5e7eb;
}

.nav-item {
  width: 44px;
  height: 44px;
  border-radius: 8px;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: all 0.2s ease;
}

.nav-item:hover {
  transform: translateY(-2px);
}

.bookmark-badge,
.annotation-badge {
  position: absolute;
  top: -6px;
  right: -6px;
}

.export-btn {
  background: #67c23a;
  border-color: #67c23a;
  color: white;
}

.export-btn:hover {
  background: #85ce61;
  border-color: #85ce61;
}

/* 动画效果 */
.quick-nav-expand-enter-active,
.quick-nav-expand-leave-active {
  transition: all 0.3s ease;
  transform-origin: bottom right;
}

.quick-nav-expand-enter-from,
.quick-nav-expand-leave-to {
  opacity: 0;
  transform: scale(0.8) translateY(20px);
}

/* 弹窗样式 */
.table-of-contents {
  max-height: 500px;
  overflow-y: auto;
}

.toc-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  margin-bottom: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.toc-item:hover {
  background: #f9fafb;
  border-color: #1e3a8a;
  transform: translateY(-1px);
}

.toc-icon {
  font-size: 24px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f3f4f6;
  border-radius: 8px;
}

.toc-content {
  flex: 1;
}

.toc-title {
  margin: 0 0 4px 0;
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
}

.toc-subtitle {
  margin: 0 0 8px 0;
  font-size: 13px;
  color: #6b7280;
}

.toc-meta {
  display: flex;
  gap: 12px;
  font-size: 12px;
  color: #9ca3af;
}

.toc-progress {
  color: #67c23a;
  font-weight: 500;
}

.toc-arrow {
  font-size: 16px;
  color: #9ca3af;
}

/* 书签和标注列表 */
.bookmarks-list,
.annotations-list {
  max-height: 400px;
  overflow-y: auto;
}

.bookmark-item,
.annotation-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  margin-bottom: 12px;
}

.bookmark-content,
.annotation-content {
  flex: 1;
}

.bookmark-title,
.annotation-text {
  margin: 0 0 4px 0;
  font-size: 14px;
  font-weight: 500;
  color: #1f2937;
  line-height: 1.4;
}

.bookmark-line,
.annotation-line {
  margin: 0 0 4px 0;
  font-size: 12px;
  color: #6b7280;
}

.annotation-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.bookmark-time,
.annotation-time {
  margin: 0;
  font-size: 11px;
  color: #9ca3af;
}

.bookmark-actions,
.annotation-actions {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.empty-state {
  text-align: center;
  padding: 40px 20px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .quick-nav {
    bottom: 60px;
    right: 16px;
  }
  
  .quick-nav-btn {
    width: 48px;
    height: 48px;
    font-size: 18px;
  }
  
  .quick-nav-menu {
    bottom: 60px;
    right: -8px;
    padding: 12px;
    gap: 8px;
  }
  
  .nav-item {
    width: 40px;
    height: 40px;
    font-size: 16px;
  }
  
  .toc-item {
    padding: 12px;
    gap: 12px;
  }
  
  .toc-icon {
    font-size: 20px;
    width: 36px;
    height: 36px;
  }
  
  .toc-title {
    font-size: 14px;
  }
  
  .toc-subtitle {
    font-size: 12px;
  }
}
</style>
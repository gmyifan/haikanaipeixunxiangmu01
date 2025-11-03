<template>
  <div class="full-content-view">
    <!-- 页面头部 -->
    <div class="content-header">
      <div class="header-container">
        <div class="header-left">
          <h1 class="page-title">
            <span class="title-icon">📄</span>
            完整内容浏览
          </h1>
          <p class="page-subtitle">
            完整展示110行原文内容，支持交互式操作
          </p>
        </div>
        
        <div class="header-right">
          <div class="content-stats">
            <span class="stat-item">
              <el-icon><Document /></el-icon>
              {{ content.length }}行内容
            </span>
            <span class="stat-item">
              <el-icon><View /></el-icon>
              {{ Math.round(readingProgress) }}%已读
            </span>
          </div>
          
          <div class="header-actions">
            <el-button-group>
              <el-tooltip content="展开全部" placement="top">
                <el-button size="small" @click="expandAll">
                  <el-icon><Plus /></el-icon>
                </el-button>
              </el-tooltip>
              <el-tooltip content="收起全部" placement="top">
                <el-button size="small" @click="collapseAll">
                  <el-icon><Minus /></el-icon>
                </el-button>
              </el-tooltip>
              <el-tooltip content="返回顶部" placement="top">
                <el-button size="small" @click="scrollToTop">
                  <el-icon><Top /></el-icon>
                </el-button>
              </el-tooltip>
            </el-button-group>
          </div>
        </div>
      </div>
    </div>

    <!-- 快速筛选器 -->
    <div class="content-filters">
      <div class="filter-container">
        <div class="filter-left">
          <span class="filter-label">快速筛选：</span>
          <el-radio-group v-model="filterType" @change="applyFilter" size="small">
            <el-radio-button label="all">全部</el-radio-button>
            <el-radio-button label="title">标题</el-radio-button>
            <el-radio-button label="key-point">重点</el-radio-button>
            <el-radio-button label="conclusion">结论</el-radio-button>
            <el-radio-button label="recommendation">建议</el-radio-button>
          </el-radio-group>
        </div>
        
        <div class="filter-right">
          <el-input
            v-model="searchFilter"
            placeholder="搜索内容..."
            size="small"
            clearable
            @input="applyFilter"
            style="width: 200px"
          >
            <template #prefix>
              <el-icon><Search /></el-icon>
            </template>
          </el-input>
        </div>
      </div>
    </div>

    <!-- 内容主体 -->
    <div class="content-main">
      <div class="content-container">
        <!-- 章节导航 -->
        <div class="section-nav" :class="{ 'sticky': isNavSticky }">
          <div class="nav-title">章节导航</div>
          <div class="nav-list">
            <a
              v-for="section in sections"
              :key="section.id"
              :href="`#section-${section.id}`"
              class="nav-item"
              :class="{ active: currentSection === section.id }"
              @click="scrollToSection(section.id)"
            >
              <span class="nav-icon">{{ section.icon }}</span>
              <span class="nav-text">{{ section.title }}</span>
            </a>
          </div>
        </div>

        <!-- 内容区域 -->
        <div class="content-area">
          <div
            v-for="section in sections"
            :key="section.id"
            :id="`section-${section.id}`"
            class="content-section"
            :class="{ [`section-${section.id}`]: true }"
          >
            <!-- 章节标题 -->
            <div class="section-header">
              <h2 class="section-title">
                <span class="section-icon">{{ section.icon }}</span>
                {{ section.title }}
              </h2>
              <p class="section-subtitle">{{ section.subtitle }}</p>
              <div class="section-meta">
                <span class="line-range">行{{ section.lineRange[0] }}-{{ section.lineRange[1] }}</span>
                <span class="line-count">{{ section.lineRange[1] - section.lineRange[0] + 1 }}行</span>
              </div>
            </div>

            <!-- 章节内容 -->
            <div class="section-content">
              <div
                v-for="item in getSectionContent(section.id)"
                :key="item.line"
                class="content-item"
                :class="[
                  `item-${item.type}`,
                  { 'item-highlighted': isHighlighted(item.line) },
                  { 'item-bookmarked': isBookmarked(item.line) },
                  { 'item-has-annotation': hasAnnotation(item.line) }
                ]"
                :data-line="item.line"
                @click="selectItem(item)"
              >
                <!-- 行号 -->
                <div class="line-number">
                  {{ item.line }}
                </div>

                <!-- 内容 -->
                <div class="item-content">
                  <div 
                    class="item-text"
                    :class="{
                      'text-title': item.type === 'title',
                      'text-subtitle': item.type === 'subtitle',
                      'text-key-point': item.type === 'key-point',
                      'text-conclusion': item.type === 'conclusion',
                      'text-recommendation': item.type === 'recommendation'
                    }"
                    v-html="highlightSearchText(item.content, searchFilter)"
                  ></div>

                  <!-- 类型标签 -->
                  <div class="item-tags">
                    <el-tag
                      v-if="item.type !== 'paragraph'"
                      :type="getTagType(item.type)"
                      size="small"
                    >
                      {{ getTypeText(item.type) }}
                    </el-tag>
                    <el-tag
                      v-if="item.section"
                      type="info"
                      size="small"
                    >
                      {{ getSectionName(item.section) }}
                    </el-tag>
                  </div>
                </div>

                <!-- 操作按钮 -->
                <div class="item-actions">
                  <el-dropdown trigger="click" @command="handleItemAction">
                    <el-button size="small" type="text" class="action-btn">
                      <el-icon><MoreFilled /></el-icon>
                    </el-button>
                    <template #dropdown>
                      <el-dropdown-menu>
                        <el-dropdown-item :command="`bookmark-${item.line}`">
                          <el-icon><Star /></el-icon>
                          {{ isBookmarked(item.line) ? '移除书签' : '添加书签' }}
                        </el-dropdown-item>
                        <el-dropdown-item :command="`annotation-${item.line}`">
                          <el-icon><EditPen /></el-icon>
                          添加标注
                        </el-dropdown-item>
                        <el-dropdown-item :command="`copy-${item.line}`">
                          <el-icon><CopyDocument /></el-icon>
                          复制内容
                        </el-dropdown-item>
                        <el-dropdown-item :command="`share-${item.line}`">
                          <el-icon><Share /></el-icon>
                          分享
                        </el-dropdown-item>
                      </el-dropdown-menu>
                    </template>
                  </el-dropdown>
                </div>

                <!-- 标注显示 -->
                <div
                  v-if="hasAnnotation(item.line)"
                  class="item-annotations"
                >
                  <div
                    v-for="annotation in getAnnotations(item.line)"
                    :key="annotation.id"
                    class="annotation-item"
                    :class="`annotation-${annotation.type}`"
                  >
                    <div class="annotation-content">
                      <span class="annotation-text">{{ annotation.text }}</span>
                      <span class="annotation-time">{{ formatTime(annotation.createdAt) }}</span>
                    </div>
                    <el-button
                      size="small"
                      type="text"
                      @click.stop="removeAnnotation(annotation.id)"
                    >
                      <el-icon><Close /></el-icon>
                    </el-button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 浮动操作按钮 -->
    <div class="floating-actions">
      <el-button
        type="primary"
        circle
        class="float-btn"
        @click="scrollToTop"
        v-show="showScrollTop"
      >
        <el-icon><Top /></el-icon>
      </el-button>
    </div>

    <!-- 添加标注弹窗 -->
    <el-dialog
      v-model="annotationDialogVisible"
      title="添加标注"
      width="500px"
    >
      <el-form>
        <el-form-item label="标注类型">
          <el-select v-model="newAnnotation.type" style="width: 100%">
            <el-option label="笔记" value="note" />
            <el-option label="重要" value="important" />
            <el-option label="问题" value="question" />
            <el-option label="想法" value="idea" />
          </el-select>
        </el-form-item>
        <el-form-item label="标注内容">
          <el-input
            v-model="newAnnotation.text"
            type="textarea"
            :rows="4"
            placeholder="请输入标注内容"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="annotationDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveAnnotation">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '@/stores/app'
import {
  Document, View, Plus, Minus, Top, Search, MoreFilled,
  Star, EditPen, CopyDocument, Share, Close
} from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

export default {
  name: 'FullContent',
  components: {
    Document, View, Plus, Minus, Top, Search, MoreFilled,
    Star, EditPen, CopyDocument, Share, Close
  },
  setup() {
    const router = useRouter()
    const appStore = useAppStore()
    
    // 响应式数据
    const filterType = ref('all')
    const searchFilter = ref('')
    const filteredContent = ref([])
    const currentSection = ref('')
    const isNavSticky = ref(false)
    const showScrollTop = ref(false)
    const highlightedLines = ref([])
    const annotationDialogVisible = ref(false)
    const newAnnotation = ref({
      line: null,
      type: 'note',
      text: ''
    })

    // 计算属性
    const content = computed(() => appStore.content)
    const sections = computed(() => appStore.sections)
    const readingProgress = computed(() => appStore.readingProgress)

    // 获取章节内容
    const getSectionContent = (sectionId) => {
      const section = sections.value.find(s => s.id === sectionId)
      if (!section) return []
      
      return filteredContent.value.filter(item =>
        item.line >= section.lineRange[0] && item.line <= section.lineRange[1]
      )
    }

    // 应用筛选
    const applyFilter = () => {
      let result = [...content.value]
      
      // 按类型筛选
      if (filterType.value !== 'all') {
        result = result.filter(item => {
          switch (filterType.value) {
            case 'title':
              return ['title', 'subtitle'].includes(item.type)
            case 'key-point':
              return item.type === 'key-point'
            case 'conclusion':
              return item.type === 'conclusion'
            case 'recommendation':
              return item.type === 'recommendation'
            default:
              return true
          }
        })
      }
      
      // 按搜索词筛选
      if (searchFilter.value.trim()) {
        const query = searchFilter.value.toLowerCase()
        result = result.filter(item =>
          item.content.toLowerCase().includes(query)
        )
      }
      
      filteredContent.value = result
    }

    // 高亮搜索文本
    const highlightSearchText = (text, query) => {
      if (!query || !query.trim()) return text
      
      const regex = new RegExp(`(${query})`, 'gi')
      return text.replace(regex, '<mark class="search-highlight">$1</mark>')
    }

    // 获取标签类型
    const getTagType = (type) => {
      const typeMap = {
        title: 'primary',
        subtitle: 'info',
        'key-point': 'warning',
        conclusion: 'success',
        recommendation: 'danger'
      }
      return typeMap[type] || ''
    }

    // 获取类型文本
    const getTypeText = (type) => {
      const typeMap = {
        title: '标题',
        subtitle: '副标题',
        'key-point': '重点',
        conclusion: '结论',
        recommendation: '建议',
        'section-title': '章节标题',
        'subsection-title': '小节标题'
      }
      return typeMap[type] || type
    }

    // 获取章节名称
    const getSectionName = (sectionId) => {
      const sectionMap = {
        strategy: '战略定位',
        why: 'WHY',
        what: 'WHAT',
        how: 'HOW',
        summary: '总结'
      }
      return sectionMap[sectionId] || sectionId
    }

    // 检查是否已加书签
    const isBookmarked = (lineNumber) => {
      return appStore.isBookmarked(lineNumber)
    }

    // 检查是否有标注
    const hasAnnotation = (lineNumber) => {
      return appStore.getAnnotations(lineNumber).length > 0
    }

    // 获取标注
    const getAnnotations = (lineNumber) => {
      return appStore.getAnnotations(lineNumber)
    }

    // 检查是否高亮
    const isHighlighted = (lineNumber) => {
      return highlightedLines.value.includes(lineNumber)
    }

    // 选择内容项
    const selectItem = (item) => {
      highlightedLines.value = [item.line]
      setTimeout(() => {
        highlightedLines.value = []
      }, 2000)
    }

    // 处理项目操作
    const handleItemAction = (command) => {
      const [action, lineNumber] = command.split('-')
      
      switch (action) {
        case 'bookmark':
          toggleBookmark(parseInt(lineNumber))
          break
        case 'annotation':
          showAnnotationDialog(parseInt(lineNumber))
          break
        case 'copy':
          copyContent(parseInt(lineNumber))
          break
        case 'share':
          shareContent(parseInt(lineNumber))
          break
      }
    }

    // 切换书签
    const toggleBookmark = (lineNumber) => {
      const item = content.value.find(c => c.line === lineNumber)
      if (item) {
        const title = `第${lineNumber}行 - ${item.content.substring(0, 30)}...`
        if (isBookmarked(lineNumber)) {
          // 移除书签逻辑
          const bookmark = appStore.bookmarks.find(b => b.lineNumber === lineNumber)
          if (bookmark) {
            appStore.removeBookmark(bookmark.id)
            ElMessage.success('书签已移除')
          }
        } else {
          appStore.addBookmark(lineNumber, title)
          ElMessage.success('书签已添加')
        }
      }
    }

    // 显示标注弹窗
    const showAnnotationDialog = (lineNumber) => {
      newAnnotation.value.line = lineNumber
      newAnnotation.value.type = 'note'
      newAnnotation.value.text = ''
      annotationDialogVisible.value = true
    }

    // 保存标注
    const saveAnnotation = () => {
      if (!newAnnotation.value.text.trim()) {
        ElMessage.warning('请输入标注内容')
        return
      }
      
      appStore.addAnnotation(
        newAnnotation.value.line,
        newAnnotation.value.text,
        newAnnotation.value.type
      )
      
      annotationDialogVisible.value = false
      ElMessage.success('标注已添加')
    }

    // 移除标注
    const removeAnnotation = (annotationId) => {
      appStore.removeAnnotation(annotationId)
      ElMessage.success('标注已移除')
    }

    // 复制内容
    const copyContent = async (lineNumber) => {
      const item = content.value.find(c => c.line === lineNumber)
      if (item) {
        try {
          await navigator.clipboard.writeText(item.content)
          ElMessage.success('内容已复制到剪贴板')
        } catch (error) {
          ElMessage.error('复制失败')
        }
      }
    }

    // 分享内容
    const shareContent = (lineNumber) => {
      const item = content.value.find(c => c.line === lineNumber)
      if (item) {
        const shareText = `第${lineNumber}行：${item.content}`
        const shareUrl = `${window.location.origin}${window.location.pathname}#line-${lineNumber}`
        
        if (navigator.share) {
          navigator.share({
            title: '海看AI培训战略汇报',
            text: shareText,
            url: shareUrl
          })
        } else {
          navigator.clipboard.writeText(`${shareText}\n${shareUrl}`)
          ElMessage.success('分享链接已复制到剪贴板')
        }
      }
    }

    // 展开全部
    const expandAll = () => {
      // 实现展开全部逻辑
      ElMessage.success('已展开全部内容')
    }

    // 收起全部
    const collapseAll = () => {
      // 实现收起全部逻辑
      ElMessage.success('已收起全部内容')
    }

    // 滚动到顶部
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }

    // 滚动到章节
    const scrollToSection = (sectionId) => {
      const element = document.getElementById(`section-${sectionId}`)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        currentSection.value = sectionId
      }
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

    // 处理滚动事件
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      showScrollTop.value = scrollTop > 300
      
      // 更新当前章节
      const sections = document.querySelectorAll('.content-section')
      sections.forEach(section => {
        const rect = section.getBoundingClientRect()
        if (rect.top <= 100 && rect.bottom > 100) {
          currentSection.value = section.id.replace('section-', '')
        }
      })
      
      // 导航栏粘性
      const nav = document.querySelector('.section-nav')
      if (nav) {
        const rect = nav.getBoundingClientRect()
        isNavSticky.value = rect.top <= 80
      }
    }

    // 页面初始化
    onMounted(() => {
      appStore.setCurrentSection('full-content')
      applyFilter()
      
      // 监听滚动事件
      window.addEventListener('scroll', handleScroll)
      
      // 处理URL中的行号定位
      const hash = window.location.hash
      if (hash.startsWith('#line-')) {
        const lineNumber = parseInt(hash.replace('#line-', ''))
        setTimeout(() => {
          const element = document.querySelector(`[data-line="${lineNumber}"]`)
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' })
            highlightedLines.value = [lineNumber]
            setTimeout(() => {
              highlightedLines.value = []
            }, 3000)
          }
        }, 500)
      }
    })

    // 清理事件监听
    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll)
    })

    return {
      filterType,
      searchFilter,
      filteredContent,
      currentSection,
      isNavSticky,
      showScrollTop,
      highlightedLines,
      annotationDialogVisible,
      newAnnotation,
      content,
      sections,
      readingProgress,
      getSectionContent,
      applyFilter,
      highlightSearchText,
      getTagType,
      getTypeText,
      getSectionName,
      isBookmarked,
      hasAnnotation,
      getAnnotations,
      isHighlighted,
      selectItem,
      handleItemAction,
      toggleBookmark,
      showAnnotationDialog,
      saveAnnotation,
      removeAnnotation,
      copyContent,
      shareContent,
      expandAll,
      collapseAll,
      scrollToTop,
      scrollToSection,
      formatTime
    }
  }
}
</script>

<style scoped>
.full-content-view {
  min-height: 100vh;
  background: #f8fafc;
}

/* 页面头部 */
.content-header {
  background: white;
  border-bottom: 1px solid #e5e7eb;
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 24px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 32px;
}

.header-left {
  flex: 1;
}

.page-title {
  font-size: 32px;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 8px 0;
  display: flex;
  align-items: center;
  gap: 12px;
}

.title-icon {
  font-size: 28px;
}

.page-subtitle {
  font-size: 16px;
  color: #6b7280;
  margin: 0;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 24px;
}

.content-stats {
  display: flex;
  gap: 20px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: #6b7280;
}

/* 筛选器 */
.content-filters {
  background: white;
  border-bottom: 1px solid #e5e7eb;
}

.filter-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 16px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
}

.filter-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.filter-label {
  font-size: 14px;
  font-weight: 500;
  color: #374151;
}

/* 内容主体 */
.content-main {
  max-width: 1400px;
  margin: 0 auto;
  padding: 24px 20px;
}

.content-container {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 32px;
}

/* 章节导航 */
.section-nav {
  position: sticky;
  top: 120px;
  height: fit-content;
  background: white;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #e5e7eb;
  transition: all 0.3s ease;
}

.section-nav.sticky {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.nav-title {
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #e5e7eb;
}

.nav-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  border-radius: 8px;
  color: #6b7280;
  text-decoration: none;
  font-size: 14px;
  transition: all 0.2s ease;
}

.nav-item:hover {
  background: #f3f4f6;
  color: #374151;
}

.nav-item.active {
  background: #1e3a8a;
  color: white;
}

.nav-icon {
  font-size: 16px;
  width: 20px;
  text-align: center;
}

/* 内容区域 */
.content-area {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #e5e7eb;
}

/* 章节样式 */
.content-section {
  border-bottom: 1px solid #f3f4f6;
}

.content-section:last-child {
  border-bottom: none;
}

.section-header {
  padding: 32px 40px 20px;
  border-bottom: 1px solid #f3f4f6;
  background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);
}

.section-title {
  font-size: 28px;
  font-weight: 700;
  margin: 0 0 8px 0;
  display: flex;
  align-items: center;
  gap: 12px;
}

.section-icon {
  font-size: 24px;
}

.section-subtitle {
  font-size: 16px;
  color: #6b7280;
  margin: 0 0 12px 0;
}

.section-meta {
  display: flex;
  gap: 16px;
  font-size: 13px;
  color: #9ca3af;
}

.section-content {
  padding: 0 40px 32px;
}

/* 内容项样式 */
.content-item {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 16px 0;
  border-bottom: 1px solid #f9fafb;
  position: relative;
  cursor: pointer;
  transition: all 0.2s ease;
}

.content-item:last-child {
  border-bottom: none;
}

.content-item:hover {
  background: #f8fafc;
  margin: 0 -40px;
  padding-left: 40px;
  padding-right: 40px;
}

.content-item.item-highlighted {
  background: #fef3c7;
  margin: 0 -40px;
  padding-left: 40px;
  padding-right: 40px;
  border-left: 4px solid #f59e0b;
}

.content-item.item-bookmarked {
  border-left: 3px solid #1e3a8a;
}

.line-number {
  flex-shrink: 0;
  width: 50px;
  font-size: 12px;
  color: #9ca3af;
  font-weight: 500;
  text-align: center;
  padding-top: 2px;
}

.item-content {
  flex: 1;
  min-width: 0;
}

.item-text {
  font-size: 15px;
  line-height: 1.6;
  color: #374151;
  margin-bottom: 8px;
  word-break: break-word;
}

.item-text.text-title {
  font-size: 20px;
  font-weight: 600;
  color: #1e3a8a;
  margin-bottom: 12px;
}

.item-text.text-subtitle {
  font-size: 17px;
  font-weight: 500;
  color: #059669;
  margin-bottom: 10px;
}

.item-text.text-key-point {
  background: #fef3c7;
  padding: 16px;
  border-radius: 8px;
  border-left: 4px solid #f59e0b;
  margin: 12px 0;
  font-weight: 500;
}

.item-text.text-conclusion {
  background: #d1fae5;
  padding: 16px;
  border-radius: 8px;
  border-left: 4px solid #059669;
  margin: 12px 0;
  font-weight: 500;
}

.item-text.text-recommendation {
  background: #fee2e2;
  padding: 16px;
  border-radius: 8px;
  border-left: 4px solid #dc2626;
  margin: 12px 0;
  font-weight: 500;
}

.item-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.item-actions {
  flex-shrink: 0;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.content-item:hover .item-actions {
  opacity: 1;
}

.action-btn {
  color: #9ca3af;
}

.action-btn:hover {
  color: #1e3a8a;
}

/* 标注样式 */
.item-annotations {
  grid-column: 1 / -1;
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.annotation-item {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 13px;
}

.annotation-item.annotation-note {
  background: #f3f4f6;
  border-left: 3px solid #6b7280;
}

.annotation-item.annotation-important {
  background: #fef2f2;
  border-left: 3px solid #dc2626;
}

.annotation-item.annotation-question {
  background: #fffbeb;
  border-left: 3px solid #d97706;
}

.annotation-item.annotation-idea {
  background: #f0fdf4;
  border-left: 3px solid #059669;
}

.annotation-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.annotation-text {
  color: #374151;
  line-height: 1.4;
}

.annotation-time {
  font-size: 11px;
  color: #9ca3af;
}

/* 高亮样式 */
:deep(.search-highlight) {
  background: #fef3c7;
  color: #92400e;
  padding: 1px 2px;
  border-radius: 2px;
}

/* 浮动按钮 */
.floating-actions {
  position: fixed;
  bottom: 100px;
  right: 20px;
  z-index: 1000;
}

.float-btn {
  width: 48px;
  height: 48px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
}

.float-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .content-container {
    grid-template-columns: 1fr;
    gap: 24px;
  }
  
  .section-nav {
    position: static;
    order: -1;
  }
  
  .nav-list {
    display: flex;
    flex-direction: row;
    gap: 8px;
    overflow-x: auto;
    padding-bottom: 8px;
  }
  
  .nav-item {
    white-space: nowrap;
    flex-shrink: 0;
  }
}

@media (max-width: 768px) {
  .header-container {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
  
  .page-title {
    font-size: 24px;
  }
  
  .filter-container {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  
  .filter-left {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  
  .content-main {
    padding: 16px 12px;
  }
  
  .section-header,
  .section-content {
    padding-left: 20px;
    padding-right: 20px;
  }
  
  .section-title {
    font-size: 22px;
  }
  
  .content-item:hover {
    margin: 0 -20px;
    padding-left: 20px;
    padding-right: 20px;
  }
  
  .content-item.item-highlighted {
    margin: 0 -20px;
    padding-left: 20px;
    padding-right: 20px;
  }
  
  .item-text {
    font-size: 14px;
  }
  
  .item-text.text-title {
    font-size: 18px;
  }
  
  .item-text.text-subtitle {
    font-size: 16px;
  }
}

@media (max-width: 480px) {
  .header-container {
    padding: 16px 12px;
  }
  
  .content-stats {
    flex-direction: column;
    gap: 8px;
  }
  
  .filter-right {
    width: 100%;
  }
  
  .filter-right .el-input {
    width: 100% !important;
  }
  
  .section-header,
  .section-content {
    padding-left: 16px;
    padding-right: 16px;
  }
  
  .content-item:hover,
  .content-item.item-highlighted {
    margin: 0 -16px;
    padding-left: 16px;
    padding-right: 16px;
  }
  
  .line-number {
    width: 40px;
    font-size: 11px;
  }
  
  .item-text {
    font-size: 13px;
  }
  
  .item-text.text-title {
    font-size: 16px;
  }
  
  .item-text.text-subtitle {
    font-size: 15px;
  }
  
  .floating-actions {
    bottom: 80px;
    right: 16px;
  }
  
  .float-btn {
    width: 44px;
    height: 44px;
  }
}
</style>
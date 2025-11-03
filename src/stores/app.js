import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import contentData from '@/data/content.json'
import structureData from '@/data/structure.json'
import metadataData from '@/data/metadata.json'
import { logger } from '@/utils/logger'

export const useAppStore = defineStore('app', () => {
  // 状态
  const isInitialized = ref(false)
  const isPresentationMode = ref(false)
  const currentSection = ref('home')
  const searchQuery = ref('')
  const bookmarks = ref([])
  const annotations = ref([])
  const readingProgress = ref(0)
  const userPreferences = ref({
    theme: 'business-blue',
    fontSize: 'medium',
    animations: true
  })

  // 计算属性
  const content = computed(() => contentData.content)
  const structure = computed(() => structureData.structure)
  const sections = computed(() => structureData.structure.sections)
  const metadata = computed(() => metadataData)
  
  const totalLines = computed(() => contentData.meta.totalLines)
  const readLines = computed(() => {
    // 这里可以根据用户实际阅读进度计算
    return Math.floor(readingProgress.value * totalLines.value / 100)
  })

  // 搜索功能
  const searchResults = computed(() => {
    if (!searchQuery.value.trim()) return []
    
    const query = searchQuery.value.toLowerCase()
    const results = []
    
    content.value.forEach(item => {
      if (item.content.toLowerCase().includes(query)) {
        results.push({
          ...item,
          matchedText: item.content,
          context: item.content
        })
      }
    })
    
    return results
  })

  // 操作方法
  const initializeApp = async () => {
    try {
      // 从本地存储加载数据
      loadFromLocalStorage()
      isInitialized.value = true
    } catch (error) {
      // 使用统一的日志工具记录错误
      logger.error('应用初始化失败:', error)
      // 不要抛出错误，允许应用继续运行
      isInitialized.value = true
    }
  }

  const setPresentationMode = (enabled) => {
    isPresentationMode.value = enabled
    saveToLocalStorage()
  }

  const setCurrentSection = (sectionId) => {
    currentSection.value = sectionId
    updateReadingProgress()
  }

  const setSearchQuery = (query) => {
    searchQuery.value = query
  }

  // 书签功能
  const addBookmark = (lineNumber, title) => {
    const bookmark = {
      id: Date.now(),
      lineNumber,
      title,
      createdAt: new Date().toISOString()
    }
    bookmarks.value.push(bookmark)
    saveToLocalStorage()
  }

  const removeBookmark = (bookmarkId) => {
    const index = bookmarks.value.findIndex(b => b.id === bookmarkId)
    if (index > -1) {
      bookmarks.value.splice(index, 1)
      saveToLocalStorage()
    }
  }

  const isBookmarked = (lineNumber) => {
    return bookmarks.value.some(b => b.lineNumber === lineNumber)
  }

  // 标注功能
  const addAnnotation = (lineNumber, text, type = 'note') => {
    const annotation = {
      id: Date.now(),
      lineNumber,
      text,
      type,
      createdAt: new Date().toISOString()
    }
    annotations.value.push(annotation)
    saveToLocalStorage()
  }

  const removeAnnotation = (annotationId) => {
    const index = annotations.value.findIndex(a => a.id === annotationId)
    if (index > -1) {
      annotations.value.splice(index, 1)
      saveToLocalStorage()
    }
  }

  const getAnnotations = (lineNumber) => {
    return annotations.value.filter(a => a.lineNumber === lineNumber)
  }

  // 阅读进度
  const updateReadingProgress = () => {
    // 这里可以根据实际浏览情况计算进度
    // 简化实现：根据当前section估算进度
    const currentSectionIndex = sections.value.findIndex(s => s.id === currentSection.value)
    if (currentSectionIndex >= 0) {
      readingProgress.value = Math.min(100, (currentSectionIndex + 1) / sections.value.length * 100)
      saveToLocalStorage()
    }
  }

  // 用户偏好
  const updateUserPreferences = (preferences) => {
    userPreferences.value = { ...userPreferences.value, ...preferences }
    saveToLocalStorage()
  }

  // 本地存储
  const saveToLocalStorage = () => {
    try {
      const data = {
        bookmarks: bookmarks.value,
        annotations: annotations.value,
        readingProgress: readingProgress.value,
        userPreferences: userPreferences.value
      }
      localStorage.setItem('haikan-ai-report-data', JSON.stringify(data))
    } catch (error) {
      // 使用统一的日志工具记录警告（存储失败不应影响用户体验）
      logger.warn('保存到本地存储失败:', error)
    }
  }

  const loadFromLocalStorage = () => {
    try {
      const data = localStorage.getItem('haikan-ai-report-data')
      if (data) {
        const parsed = JSON.parse(data)
        bookmarks.value = parsed.bookmarks || []
        annotations.value = parsed.annotations || []
        readingProgress.value = parsed.readingProgress || 0
        userPreferences.value = { ...userPreferences.value, ...parsed.userPreferences }
      }
    } catch (error) {
      // 使用统一的日志工具记录警告（加载失败应使用默认值）
      logger.warn('从本地存储加载失败:', error)
    }
  }

  // 导出功能
  const exportData = () => {
    return {
      content: content.value,
      structure: structure.value,
      metadata: metadata.value,
      bookmarks: bookmarks.value,
      annotations: annotations.value,
      readingProgress: readingProgress.value,
      exportedAt: new Date().toISOString()
    }
  }

  // 重置数据
  const resetData = () => {
    bookmarks.value = []
    annotations.value = []
    readingProgress.value = 0
    currentSection.value = 'home'
    searchQuery.value = ''
    saveToLocalStorage()
  }

  return {
    // 状态
    isInitialized,
    isPresentationMode,
    currentSection,
    searchQuery,
    bookmarks,
    annotations,
    readingProgress,
    userPreferences,
    
    // 计算属性
    content,
    structure,
    sections,
    metadata,
    totalLines,
    readLines,
    searchResults,
    
    // 方法
    initializeApp,
    setPresentationMode,
    setCurrentSection,
    setSearchQuery,
    addBookmark,
    removeBookmark,
    isBookmarked,
    addAnnotation,
    removeAnnotation,
    getAnnotations,
    updateReadingProgress,
    updateUserPreferences,
    exportData,
    resetData
  }
})
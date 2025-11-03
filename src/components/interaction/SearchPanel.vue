<template>
  <el-drawer
    v-model="drawerVisible"
    title="全文搜索"
    direction="rtl"
    size="500px"
    :before-close="handleClose"
  >
    <div class="search-panel">
      <!-- 搜索输入框 -->
      <div class="search-input-section">
        <el-input
          v-model="searchQuery"
          placeholder="输入关键词搜索内容..."
          size="large"
          clearable
          @input="handleSearchInput"
          @keyup.enter="performSearch"
        >
          <template #prepend>
            <el-icon><Search /></el-icon>
          </template>
          <template #append>
            <el-button 
              type="primary" 
              @click="performSearch"
              :loading="searching"
            >
              搜索
            </el-button>
          </template>
        </el-input>
      </div>

      <!-- 搜索选项 -->
      <div class="search-options">
        <el-checkbox-group v-model="searchOptions" @change="performSearch">
          <el-checkbox label="title">标题</el-checkbox>
          <el-checkbox label="subtitle">副标题</el-checkbox>
          <el-checkbox label="content">正文内容</el-checkbox>
          <el-checkbox label="key-point">重点内容</el-checkbox>
        </el-checkbox-group>
      </div>

      <!-- 搜索统计 -->
      <div v-if="searchResults.length > 0" class="search-stats">
        <el-alert
          :title="`找到 ${searchResults.length} 条结果`"
          type="success"
          :closable="false"
          show-icon
        />
      </div>

      <!-- 搜索结果 -->
      <div class="search-results">
        <div v-if="searching" class="search-loading">
          <el-skeleton :rows="3" animated />
        </div>

        <div v-else-if="searchResults.length === 0 && searchQuery" class="no-results">
          <el-empty description="未找到相关内容" />
        </div>

        <div v-else-if="searchResults.length === 0 && !searchQuery" class="search-hints">
          <h4>搜索提示</h4>
          <ul>
            <li>支持中文关键词搜索</li>
            <li>可以搜索标题、正文等内容</li>
            <li>支持按章节筛选结果</li>
            <li>常用关键词：AI培训、战略定位、政策、市场等</li>
          </ul>
        </div>

        <div v-else class="results-list">
          <div 
            v-for="(result, index) in searchResults" 
            :key="index"
            class="search-result-item"
            @click="goToResult(result)"
          >
            <div class="result-header">
              <span class="result-line">第{{ result.line }}行</span>
              <el-tag :type="getSectionTagType(result.section)" size="small">
                {{ getSectionName(result.section) }}
              </el-tag>
              <el-tag v-if="result.type" size="small" type="info">
                {{ getTypeText(result.type) }}
              </el-tag>
            </div>
            
            <div class="result-content">
              <div 
                v-html="highlightSearchText(result.content, searchQuery)"
                class="result-text"
              ></div>
            </div>

            <div class="result-actions">
              <el-button size="small" type="text" @click.stop="addBookmark(result)">
                <el-icon><Star /></el-icon>
                书签
              </el-button>
              <el-button size="small" type="text" @click.stop="addAnnotation(result)">
                <el-icon><Edit /></el-icon>
                标注
              </el-button>
              <el-button size="small" type="text" @click.stop="copyContent(result)">
                <el-icon><CopyDocument /></el-icon>
                复制
              </el-button>
            </div>
          </div>
        </div>
      </div>

      <!-- 搜索历史 -->
      <div v-if="searchHistory.length > 0" class="search-history">
        <div class="history-header">
          <h4>搜索历史</h4>
          <el-button size="small" type="text" @click="clearHistory">
            清空历史
          </el-button>
        </div>
        <div class="history-tags">
          <el-tag
            v-for="(item, index) in searchHistory"
            :key="index"
            class="history-tag"
            @click="searchHistoryItem(item)"
            closable
            @close="removeHistoryItem(index)"
          >
            {{ item }}
          </el-tag>
        </div>
      </div>
    </div>

    <!-- 添加书签弹窗 -->
    <el-dialog
      v-model="bookmarkDialogVisible"
      title="添加书签"
      width="400px"
    >
      <el-form>
        <el-form-item label="书签标题">
          <el-input v-model="bookmarkTitle" placeholder="请输入书签标题" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="bookmarkDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveBookmark">保存</el-button>
      </template>
    </el-dialog>

    <!-- 添加标注弹窗 -->
    <el-dialog
      v-model="annotationDialogVisible"
      title="添加标注"
      width="500px"
    >
      <el-form>
        <el-form-item label="标注类型">
          <el-select v-model="annotationType" style="width: 100%">
            <el-option label="笔记" value="note" />
            <el-option label="重要" value="important" />
            <el-option label="问题" value="question" />
            <el-option label="想法" value="idea" />
          </el-select>
        </el-form-item>
        <el-form-item label="标注内容">
          <el-input 
            v-model="annotationText" 
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
  </el-drawer>
</template>

<script>
import { ref, computed, watch, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '@/stores/app'
import { ElMessage } from 'element-plus'
import { 
  Search, Star, Edit, CopyDocument 
} from '@element-plus/icons-vue'

export default {
  name: 'SearchPanel',
  components: {
    Search, Star, Edit, CopyDocument
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:visible', 'close'],
  setup(props, { emit }) {
    const router = useRouter()
    const appStore = useAppStore()
    
    // 响应式数据
    const searchQuery = ref('')
    const searching = ref(false)
    const searchOptions = ref(['title', 'subtitle', 'content', 'key-point'])
    const searchResults = ref([])
    const searchHistory = ref([])
    const bookmarkDialogVisible = ref(false)
    const annotationDialogVisible = ref(false)
    const bookmarkTitle = ref('')
    const annotationText = ref('')
    const annotationType = ref('note')
    const selectedResult = ref(null)

    // 计算属性
    const drawerVisible = computed({
      get: () => props.visible,
      set: (value) => emit('update:visible', value)
    })

    const content = computed(() => appStore.content)

    // 加载搜索历史
    const loadSearchHistory = () => {
      try {
        const history = localStorage.getItem('haikan-search-history')
        if (history) {
          searchHistory.value = JSON.parse(history)
        }
      } catch (error) {
        console.warn('加载搜索历史失败:', error)
      }
    }

    // 保存搜索历史
    const saveSearchHistory = () => {
      try {
        localStorage.setItem('haikan-search-history', JSON.stringify(searchHistory.value))
      } catch (error) {
        console.warn('保存搜索历史失败:', error)
      }
    }

    // 添加到搜索历史
    const addToHistory = (query) => {
      if (!query || query.trim() === '') return
      
      const trimmedQuery = query.trim()
      const index = searchHistory.value.indexOf(trimmedQuery)
      
      if (index > -1) {
        searchHistory.value.splice(index, 1)
      }
      
      searchHistory.value.unshift(trimmedQuery)
      
      if (searchHistory.value.length > 10) {
        searchHistory.value = searchHistory.value.slice(0, 10)
      }
      
      saveSearchHistory()
    }

    // 执行搜索
    const performSearch = async () => {
      if (!searchQuery.value.trim()) {
        searchResults.value = []
        return
      }

      searching.value = true
      
      try {
        // 模拟搜索延迟
        await new Promise(resolve => setTimeout(resolve, 300))
        
        const query = searchQuery.value.toLowerCase()
        const results = []
        
        content.value.forEach(item => {
          let shouldInclude = false
          let searchText = ''
          
          // 检查标题
          if (searchOptions.value.includes('title') && item.type === 'title') {
            shouldInclude = true
            searchText = item.content
          }
          
          // 检查副标题
          if (searchOptions.value.includes('subtitle') && item.type === 'subtitle') {
            shouldInclude = true
            searchText = item.content
          }
          
          // 检查正文内容
          if (searchOptions.value.includes('content') && item.type === 'paragraph') {
            shouldInclude = true
            searchText = item.content
          }
          
          // 检查重点内容
          if (searchOptions.value.includes('key-point') && item.type === 'key-point') {
            shouldInclude = true
            searchText = item.content
          }
          
          // 如果没有选择特定类型，则搜索所有内容
          if (searchOptions.value.length === 0) {
            shouldInclude = true
            searchText = item.content
          }
          
          if (shouldInclude && searchText.toLowerCase().includes(query)) {
            results.push({
              ...item,
              matchedText: searchText
            })
          }
        })
        
        searchResults.value = results
        addToHistory(searchQuery.value)
        
      } catch (error) {
        console.error('搜索失败:', error)
        ElMessage.error('搜索失败，请重试')
      } finally {
        searching.value = false
      }
    }

    // 搜索输入处理
    const handleSearchInput = () => {
      if (searchQuery.value.trim() === '') {
        searchResults.value = []
      }
    }

    // 高亮搜索文本
    const highlightSearchText = (text, query) => {
      if (!query) return text
      
      const regex = new RegExp(`(${query})`, 'gi')
      return text.replace(regex, '<mark class="search-highlight">$1</mark>')
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

    // 获取章节标签类型
    const getSectionTagType = (sectionId) => {
      const typeMap = {
        strategy: 'primary',
        why: 'success',
        what: 'warning',
        how: 'danger',
        summary: 'info'
      }
      return typeMap[sectionId] || ''
    }

    // 获取类型文本
    const getTypeText = (type) => {
      const typeMap = {
        title: '标题',
        subtitle: '副标题',
        paragraph: '段落',
        'key-point': '重点',
        conclusion: '结论',
        recommendation: '建议'
      }
      return typeMap[type] || type
    }

    // 跳转到搜索结果
    const goToResult = (result) => {
      router.push('/full-content')
      drawerVisible.value = false
      
      nextTick(() => {
        const element = document.querySelector(`[data-line="${result.line}"]`)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' })
          element.classList.add('search-result-highlight')
          setTimeout(() => {
            element.classList.remove('search-result-highlight')
          }, 3000)
        }
      })
    }

    // 添加书签
    const addBookmark = (result) => {
      selectedResult.value = result
      bookmarkTitle.value = `第${result.line}行 - ${result.content.substring(0, 20)}...`
      bookmarkDialogVisible.value = true
    }

    const saveBookmark = () => {
      if (!bookmarkTitle.value.trim()) {
        ElMessage.warning('请输入书签标题')
        return
      }
      
      appStore.addBookmark(selectedResult.value.line, bookmarkTitle.value)
      bookmarkDialogVisible.value = false
      bookmarkTitle.value = ''
      ElMessage.success('书签添加成功')
    }

    // 添加标注
    const addAnnotation = (result) => {
      selectedResult.value = result
      annotationText.value = ''
      annotationType.value = 'note'
      annotationDialogVisible.value = true
    }

    const saveAnnotation = () => {
      if (!annotationText.value.trim()) {
        ElMessage.warning('请输入标注内容')
        return
      }
      
      appStore.addAnnotation(selectedResult.value.line, annotationText.value, annotationType.value)
      annotationDialogVisible.value = false
      annotationText.value = ''
      ElMessage.success('标注添加成功')
    }

    // 复制内容
    const copyContent = async (result) => {
      try {
        await navigator.clipboard.writeText(result.content)
        ElMessage.success('内容已复制到剪贴板')
      } catch (error) {
        console.error('复制失败:', error)
        ElMessage.error('复制失败')
      }
    }

    // 搜索历史相关
    const searchHistoryItem = (query) => {
      searchQuery.value = query
      performSearch()
    }

    const removeHistoryItem = (index) => {
      searchHistory.value.splice(index, 1)
      saveSearchHistory()
    }

    const clearHistory = () => {
      searchHistory.value = []
      saveSearchHistory()
      ElMessage.success('搜索历史已清空')
    }

    // 关闭搜索面板
    const handleClose = () => {
      emit('close')
    }

    // 监听visible变化
    watch(() => props.visible, (newVal) => {
      if (newVal) {
        loadSearchHistory()
        // 聚焦搜索输入框
        nextTick(() => {
          const input = document.querySelector('.search-input-section input')
          if (input) {
            input.focus()
          }
        })
      }
    })

    return {
      searchQuery,
      searching,
      searchOptions,
      searchResults,
      searchHistory,
      drawerVisible,
      bookmarkDialogVisible,
      annotationDialogVisible,
      bookmarkTitle,
      annotationText,
      annotationType,
      performSearch,
      handleSearchInput,
      highlightSearchText,
      getSectionName,
      getSectionTagType,
      getTypeText,
      goToResult,
      addBookmark,
      saveBookmark,
      addAnnotation,
      saveAnnotation,
      copyContent,
      searchHistoryItem,
      removeHistoryItem,
      clearHistory,
      handleClose
    }
  }
}
</script>

<style scoped>
.search-panel {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.search-input-section {
  flex-shrink: 0;
}

.search-options {
  flex-shrink: 0;
  padding: 16px;
  background: #f8fafc;
  border-radius: 8px;
}

.search-stats {
  flex-shrink: 0;
}

.search-results {
  flex: 1;
  overflow-y: auto;
  min-height: 200px;
}

.search-loading {
  padding: 20px;
}

.no-results {
  padding: 40px 20px;
  text-align: center;
}

.search-hints {
  padding: 20px;
  background: #f8fafc;
  border-radius: 8px;
}

.search-hints h4 {
  margin: 0 0 12px 0;
  color: #374151;
}

.search-hints ul {
  margin: 0;
  padding-left: 20px;
  color: #6b7280;
}

.search-hints li {
  margin-bottom: 4px;
}

.results-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.search-result-item {
  padding: 16px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.search-result-item:hover {
  background: #f9fafb;
  border-color: #1e3a8a;
  transform: translateY(-1px);
}

.result-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.result-line {
  font-size: 12px;
  color: #6b7280;
  font-weight: 500;
}

.result-content {
  margin-bottom: 12px;
}

.result-text {
  font-size: 14px;
  line-height: 1.5;
  color: #374151;
}

.result-actions {
  display: flex;
  gap: 8px;
}

.search-history {
  flex-shrink: 0;
  padding-top: 20px;
  border-top: 1px solid #e5e7eb;
}

.history-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.history-header h4 {
  margin: 0;
  color: #374151;
}

.history-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.history-tag {
  cursor: pointer;
}

/* 高亮样式 */
:deep(.search-highlight) {
  background: #fef3c7;
  color: #92400e;
  padding: 1px 2px;
  border-radius: 2px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .search-options {
    padding: 12px;
  }
  
  .search-result-item {
    padding: 12px;
  }
  
  .result-actions {
    flex-direction: column;
    gap: 4px;
  }
  
  .result-actions .el-button {
    width: 100%;
    justify-content: flex-start;
  }
}
</style>
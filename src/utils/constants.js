/**
 * 应用常量配置
 * 集中管理硬编码的数值和配置项
 */

import metadataData from '@/data/metadata.json'

/**
 * 内容相关常量
 */
export const CONTENT_CONSTANTS = {
  // 从metadata中获取总行数
  TOTAL_LINES: metadataData.content.totalLines || 110,
  TOTAL_SECTIONS: metadataData.content.totalSections || 5,
  ESTIMATED_READING_TIME: metadataData.content.estimatedReadingTime || 15,
  TOTAL_WORDS: metadataData.content.totalWords || 2500
}

/**
 * 章节行号范围映射
 * 从structure.json中提取，这里作为备用常量
 */
export const SECTION_LINE_RANGES = {
  STRATEGY: [1, 8],
  WHY: [9, 30],
  WHAT: [31, 39],
  HOW: [40, 105],
  SUMMARY: [106, 110]
}

/**
 * 时间相关常量（毫秒）
 */
export const TIME_CONSTANTS = {
  DEBOUNCE_DELAY: 300,           // 防抖延迟
  THROTTLE_DELAY: 1000,           // 节流延迟
  SCROLL_DELAY: 100,              // 滚动延迟
  ANIMATION_DURATION: 300,        // 动画持续时间
  HIGHLIGHT_DURATION: 2000,       // 高亮持续时间
  LOADING_TIMEOUT: 5000,          // 加载超时时间
  API_TIMEOUT: 10000              // API请求超时时间
}

/**
 * 存储相关常量
 */
export const STORAGE_CONSTANTS = {
  STORAGE_KEY: 'haikan-ai-report-data',
  SESSION_KEY: 'haikan-ai-session-id',
  MAX_STORAGE_SIZE: 1024 * 1024, // 1MB
  MAX_BOOKMARKS: 100,
  MAX_ANNOTATIONS: 500
}

/**
 * 性能相关常量
 */
export const PERFORMANCE_CONSTANTS = {
  SLOW_API_THRESHOLD: 5000,       // 慢API阈值（毫秒）
  LARGE_STATE_SIZE: 1024 * 1024,  // 大状态阈值（1MB）
  MEMORY_WARNING_THRESHOLD: 100 * 1024 * 1024, // 100MB
  MAX_CHART_POINTS: 1000          // 图表最大点数
}

/**
 * UI相关常量
 */
export const UI_CONSTANTS = {
  MAX_SEARCH_RESULTS: 50,         // 最大搜索结果数
  ITEMS_PER_PAGE: 20,             // 每页项目数
  MAX_TOAST_DURATION: 5000,        // Toast最大显示时间
  MIN_SCROLL_DISTANCE: 100        // 最小滚动距离
}

/**
 * 导出所有常量
 */
export default {
  CONTENT_CONSTANTS,
  SECTION_LINE_RANGES,
  TIME_CONSTANTS,
  STORAGE_CONSTANTS,
  PERFORMANCE_CONSTANTS,
  UI_CONSTANTS
}


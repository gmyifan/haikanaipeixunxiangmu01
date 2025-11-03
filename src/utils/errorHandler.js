/**
 * 统一错误处理工具
 * 确保错误处理方式一致，提供统一的用户反馈
 */

import { ElMessage, ElNotification } from 'element-plus'
import { logger } from './logger'

/**
 * 错误类型枚举
 */
export const ErrorType = {
  NETWORK: 'network',           // 网络错误
  VALIDATION: 'validation',     // 验证错误
  PERMISSION: 'permission',     // 权限错误
  NOT_FOUND: 'not_found',       // 未找到
  SERVER: 'server',             // 服务器错误
  UNKNOWN: 'unknown'           // 未知错误
}

/**
 * 错误消息映射
 */
const ERROR_MESSAGES = {
  [ErrorType.NETWORK]: '网络连接失败，请检查网络设置后重试',
  [ErrorType.VALIDATION]: '输入数据验证失败，请检查后重试',
  [ErrorType.PERMISSION]: '您没有权限执行此操作',
  [ErrorType.NOT_FOUND]: '请求的资源未找到',
  [ErrorType.SERVER]: '服务器错误，请稍后重试',
  [ErrorType.UNKNOWN]: '发生未知错误，请刷新页面重试'
}

/**
 * 统一错误处理函数
 * @param {Error|string} error - 错误对象或错误消息
 * @param {Object} options - 错误处理选项
 * @param {ErrorType} options.type - 错误类型
 * @param {string} options.message - 自定义错误消息
 * @param {boolean} options.showToast - 是否显示Toast提示（默认true）
 * @param {boolean} options.showNotification - 是否显示通知（默认false）
 * @param {boolean} options.logError - 是否记录错误日志（默认true）
 * @param {Function} options.onError - 错误回调函数
 */
export function handleError(error, options = {}) {
  const {
    type = ErrorType.UNKNOWN,
    message,
    showToast = true,
    showNotification = false,
    logError = true,
    onError
  } = options

  // 提取错误消息
  let errorMessage = message
  if (!errorMessage) {
    if (typeof error === 'string') {
      errorMessage = error
    } else if (error instanceof Error) {
      errorMessage = error.message || ERROR_MESSAGES[type]
    } else {
      errorMessage = ERROR_MESSAGES[type]
    }
  }

  // 记录错误日志
  if (logError) {
    logger.error(`[${type}]`, errorMessage, error)
  }

  // 显示Toast提示
  if (showToast) {
    ElMessage.error({
      message: errorMessage,
      duration: 5000,
      showClose: true
    })
  }

  // 显示通知（用于严重错误）
  if (showNotification) {
    ElNotification.error({
      title: '错误',
      message: errorMessage,
      duration: 0, // 不自动关闭
      showClose: true
    })
  }

  // 执行错误回调
  if (onError && typeof onError === 'function') {
    onError(error)
  }

  // 返回错误对象供后续处理
  return {
    type,
    message: errorMessage,
    originalError: error
  }
}

/**
 * 处理网络错误
 */
export function handleNetworkError(error, customMessage) {
  return handleError(error, {
    type: ErrorType.NETWORK,
    message: customMessage || ERROR_MESSAGES[ErrorType.NETWORK]
  })
}

/**
 * 处理验证错误
 */
export function handleValidationError(error, customMessage) {
  return handleError(error, {
    type: ErrorType.VALIDATION,
    message: customMessage || ERROR_MESSAGES[ErrorType.VALIDATION]
  })
}

/**
 * 处理权限错误
 */
export function handlePermissionError(error, customMessage) {
  return handleError(error, {
    type: ErrorType.PERMISSION,
    message: customMessage || ERROR_MESSAGES[ErrorType.PERMISSION],
    showNotification: true // 权限错误需要更明显的提示
  })
}

/**
 * 处理服务器错误
 */
export function handleServerError(error, customMessage) {
  return handleError(error, {
    type: ErrorType.SERVER,
    message: customMessage || ERROR_MESSAGES[ErrorType.SERVER],
    showNotification: true // 服务器错误需要通知
  })
}

/**
 * 成功消息提示
 */
export function showSuccess(message, duration = 3000) {
  ElMessage.success({
    message,
    duration,
    showClose: true
  })
}

/**
 * 警告消息提示
 */
export function showWarning(message, duration = 4000) {
  ElMessage.warning({
    message,
    duration,
    showClose: true
  })
}

/**
 * 信息消息提示
 */
export function showInfo(message, duration = 3000) {
  ElMessage.info({
    message,
    duration,
    showClose: true
  })
}

/**
 * 默认导出
 */
export default {
  handleError,
  handleNetworkError,
  handleValidationError,
  handlePermissionError,
  handleServerError,
  showSuccess,
  showWarning,
  showInfo,
  ErrorType
}


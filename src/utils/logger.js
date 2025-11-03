/**
 * 日志工具 - 统一管理日志输出
 * 开发环境：输出所有日志
 * 生产环境：只输出错误和警告
 */

const isDev = import.meta.env.DEV

/**
 * 日志级别枚举
 */
export const LogLevel = {
  DEBUG: 'debug',
  INFO: 'info',
  WARN: 'warn',
  ERROR: 'error'
}

/**
 * 调试日志（仅在开发环境输出）
 */
export function debug(...args) {
  if (isDev) {
    console.log('[DEBUG]', ...args)
  }
}

/**
 * 信息日志（仅在开发环境输出）
 */
export function info(...args) {
  if (isDev) {
    console.log('[INFO]', ...args)
  }
}

/**
 * 警告日志（所有环境都输出）
 */
export function warn(...args) {
  console.warn('[WARN]', ...args)
}

/**
 * 错误日志（所有环境都输出）
 */
export function error(...args) {
  console.error('[ERROR]', ...args)
}

/**
 * 性能日志（仅在开发环境输出）
 */
export function performance(...args) {
  if (isDev) {
    console.log('[PERF]', ...args)
  }
}

/**
 * 默认导出日志对象
 */
export const logger = {
  debug,
  info,
  warn,
  error,
  performance
}

export default logger


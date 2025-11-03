/**
 * 安全配置文件 - 提供安全相关的工具函数和配置
 * 基于现代Web安全最佳实践
 */

// CSP (Content Security Policy) 配置
export const CSP_CONFIG = {
  // 开发环境CSP策略
  development: {
    'default-src': ["'self'"],
    'script-src': [
      "'self'",
      "'unsafe-inline'",
      "'unsafe-eval'",
      'https://cdn.jsdelivr.net',
      'https://www.googletagmanager.com'
    ],
    'style-src': [
      "'self'",
      "'unsafe-inline'",
      'https://fonts.googleapis.com'
    ],
    'font-src': [
      "'self'",
      'https://fonts.gstatic.com'
    ],
    'img-src': [
      "'self'",
      'data:',
      'https:'
    ],
    'connect-src': [
      "'self'",
      'https://api.haikan.com',
      'ws://localhost:*',
      'wss://localhost:*'
    ],
    'media-src': ["'self'"],
    'object-src': ["'none'"],
    'base-uri': ["'self'"],
    'form-action': ["'self'"],
    'frame-ancestors': ["'self'"],
    'upgrade-insecure-requests': []
  },
  
  // 生产环境CSP策略
  production: {
    'default-src': ["'self'"],
    'script-src': [
      "'self'",
      'https://cdn.jsdelivr.net',
      'https://www.googletagmanager.com'
    ],
    'style-src': [
      "'self'",
      'https://fonts.googleapis.com'
    ],
    'font-src': [
      "'self'",
      'https://fonts.gstatic.com'
    ],
    'img-src': [
      "'self'",
      'data:',
      'https:'
    ],
    'connect-src': [
      "'self'",
      'https://api.haikan.com'
    ],
    'media-src': ["'self'"],
    'object-src': ["'none'"],
    'base-uri': ["'self'"],
    'form-action': ["'self'"],
    'frame-ancestors': ["'none'"],
    'upgrade-insecure-requests': []
  }
}

// 安全头部配置
export const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'Content-Security-Policy': ''
}

// XSS防护配置
export const XSS_PROTECTION = {
  // HTML净化规则
  sanitizeHtml: {
    allowedTags: [
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'p', 'br', 'strong', 'em', 'u', 's', 'del',
      'ul', 'ol', 'li',
      'a', 'img',
      'div', 'span',
      'table', 'thead', 'tbody', 'tr', 'th', 'td'
    ],
    allowedAttributes: {
      'a': ['href', 'title', 'target'],
      'img': ['src', 'alt', 'title', 'width', 'height'],
      '*': ['class', 'id']
    },
    allowedSchemes: ['http', 'https', 'mailto', 'tel']
  },
  
  // 危险模式检测
  dangerousPatterns: [
    /javascript:/gi,
    /vbscript:/gi,
    /on\w+\s*=/gi,
    /<script/gi,
    /<iframe/gi,
    /<object/gi,
    /<embed/gi,
    /expression\s*\(/gi
  ]
}

// 安全工具类
export class SecurityUtils {
  /**
   * 生成CSP头部字符串
   */
  static generateCSPHeader(environment = 'production') {
    const config = CSP_CONFIG[environment] || CSP_CONFIG.production
    const directives = Object.entries(config)
      .map(([key, values]) => `${key} ${values.join(' ')}`)
      .join('; ')
    
    return directives
  }

  /**
   * 检测XSS攻击
   */
  static detectXSS(input) {
    if (typeof input !== 'string') return false
    
    return XSS_PROTECTION.dangerousPatterns.some(pattern => 
      pattern.test(input)
    )
  }

  /**
   * 净化HTML内容
   */
  static sanitizeHtml(html) {
    if (typeof html !== 'string') return ''
    
    // 简单的HTML净化实现
    let sanitized = html
    
    // 移除危险标签
    const dangerousTags = ['script', 'iframe', 'object', 'embed', 'link', 'meta']
    dangerousTags.forEach(tag => {
      const regex = new RegExp(`<${tag}[^>]*>.*?</${tag}>`, 'gis')
      sanitized = sanitized.replace(regex, '')
    })
    
    // 移除危险属性
    const dangerousAttrs = ['onload', 'onerror', 'onclick', 'onmouseover']
    dangerousAttrs.forEach(attr => {
      const regex = new RegExp(`${attr}\\s*=\\s*["'][^"']*["']`, 'gis')
      sanitized = sanitized.replace(regex, '')
    })
    
    return sanitized
  }

  /**
   * 验证URL
   */
  static isValidUrl(url) {
    try {
      const urlObj = new URL(url)
      return ['http:', 'https:'].includes(urlObj.protocol)
    } catch {
      return false
    }
  }

  /**
   * 生成安全的随机token
   */
  static generateToken(length = 32) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let result = ''
    
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    
    return result
  }

  /**
   * 创建CSRF token
   */
  static createCSRFToken() {
    return {
      token: this.generateToken(64),
      timestamp: Date.now(),
      expires: Date.now() + (24 * 60 * 60 * 1000) // 24小时
    }
  }

  /**
   * 验证CSRF token
   */
  static validateCSRFToken(token, storedToken) {
    if (!token || !storedToken || token !== storedToken.token) {
      return false
    }
    
    if (Date.now() > storedToken.expires) {
      return false
    }
    
    return true
  }

  /**
   * 检测可疑的用户输入
   */
  static detectSuspiciousInput(input) {
    const suspiciousPatterns = [
      // SQL注入模式
      /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|UNION)\b)/gi,
      // 路径遍历
      /\.\.[\/\\]/g,
      // 命令注入
      /[;&|`$(){}[\]]/g,
      // LDAP注入
      /[()=,*!&|]/g
    ]
    
    return suspiciousPatterns.some(pattern => pattern.test(input))
  }

  /**
   * 加密敏感数据
   */
  static encryptData(data, key) {
    // 简单的数据混淆实现（生产环境应使用更强的加密）
    try {
      const dataStr = JSON.stringify(data)
      const encrypted = btoa(encodeURIComponent(dataStr))
      return encrypted
    } catch {
      return null
    }
  }

  /**
   * 解密敏感数据
   */
  static decryptData(encryptedData, key) {
    try {
      const decrypted = decodeURIComponent(atob(encryptedData))
      return JSON.parse(decrypted)
    } catch {
      return null
    }
  }

  /**
   * 检查密码强度
   */
  static checkPasswordStrength(password) {
    if (!password || password.length < 8) {
      return { strength: 'weak', score: 0, message: '密码长度至少8位' }
    }
    
    let score = 0
    const checks = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      numbers: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    }
    
    Object.values(checks).forEach(passed => {
      if (passed) score++
    })
    
    let strength, message
    if (score <= 2) {
      strength = 'weak'
      message = '密码强度较弱，建议包含大小写字母、数字和特殊字符'
    } else if (score <= 4) {
      strength = 'medium'
      message = '密码强度中等，建议增加复杂度'
    } else {
      strength = 'strong'
      message = '密码强度良好'
    }
    
    return { strength, score, message, checks }
  }

  /**
   * 检测是否为机器人
   */
  static detectBot(userAgent) {
    const botPatterns = [
      /bot/gi,
      /crawler/gi,
      /spider/gi,
      /scraper/gi,
      /curl/gi,
      /wget/gi,
      /python/gi,
      /java/gi
    ]
    
    return botPatterns.some(pattern => pattern.test(userAgent))
  }

  /**
   * 验证文件类型
   */
  static validateFileType(fileName, allowedTypes) {
    const extension = fileName.split('.').pop()?.toLowerCase()
    return allowedTypes.includes(extension)
  }

  /**
   * 检查文件大小
   */
  static validateFileSize(fileSize, maxSize) {
    return fileSize <= maxSize
  }

  /**
   * 生成安全的文件名
   */
  static sanitizeFileName(fileName) {
    return fileName
      .replace(/[^a-zA-Z0-9.-]/g, '_')
      .replace(/_{2,}/g, '_')
      .toLowerCase()
  }
}

// 安全中间件
export class SecurityMiddleware {
  constructor(options = {}) {
    this.options = {
      enableCSRF: true,
      enableXSS: true,
      enableCSP: true,
      csrfTokenName: 'csrf-token',
      ...options
    }
    
    this.csrfTokens = new Map()
  }

  /**
   * 应用安全头部
   */
  applySecurityHeaders(response) {
    Object.entries(SECURITY_HEADERS).forEach(([key, value]) => {
      if (key === 'Content-Security-Policy' && this.options.enableCSP) {
        value = SecurityUtils.generateCSPHeader(process.env.NODE_ENV)
      }
      response.headers.set(key, value)
    })
  }

  /**
   * 生成并存储CSRF token
   */
  generateCSRFToken(sessionId) {
    if (!this.options.enableCSRF) return null
    
    const token = SecurityUtils.createCSRFToken()
    this.csrfTokens.set(sessionId, token)
    return token.token
  }

  /**
   * 验证CSRF token
   */
  validateCSRFToken(sessionId, token) {
    if (!this.options.enableCSRF) return true
    
    const storedToken = this.csrfTokens.get(sessionId)
    const isValid = SecurityUtils.validateCSRFToken(token, storedToken)
    
    if (isValid) {
      // 验证成功后移除token（一次性使用）
      this.csrfTokens.delete(sessionId)
    }
    
    return isValid
  }

  /**
   * 净化请求数据
   */
  sanitizeRequestData(data) {
    if (!this.options.enableXSS) return data
    
    if (typeof data === 'string') {
      return SecurityUtils.sanitizeHtml(data)
    }
    
    if (typeof data === 'object' && data !== null) {
      const sanitized = {}
      Object.entries(data).forEach(([key, value]) => {
        if (typeof value === 'string') {
          sanitized[key] = SecurityUtils.sanitizeHtml(value)
        } else if (typeof value === 'object') {
          sanitized[key] = this.sanitizeRequestData(value)
        } else {
          sanitized[key] = value
        }
      })
      return sanitized
    }
    
    return data
  }

  /**
   * 清理过期的CSRF token
   */
  cleanupExpiredTokens() {
    const now = Date.now()
    for (const [sessionId, token] of this.csrfTokens.entries()) {
      if (now > token.expires) {
        this.csrfTokens.delete(sessionId)
      }
    }
  }
}

// 导出默认安全配置
export const DEFAULT_SECURITY_CONFIG = {
  environment: process.env.NODE_ENV || 'development',
  enableCSP: true,
  enableCSRF: true,
  enableXSS: true,
  sessionTimeout: 30 * 60 * 1000, // 30分钟
  maxLoginAttempts: 5,
  lockoutDuration: 15 * 60 * 1000, // 15分钟
  passwordMinLength: 8,
  allowedFileTypes: ['jpg', 'jpeg', 'png', 'gif', 'pdf', 'doc', 'docx'],
  maxFileSize: 10 * 1024 * 1024, // 10MB
  secureCookie: true,
  httpOnly: true,
  sameSite: 'strict'
}

// 创建全局安全实例
export const securityMiddleware = new SecurityMiddleware(DEFAULT_SECURITY_CONFIG)

export default {
  CSP_CONFIG,
  SECURITY_HEADERS,
  XSS_PROTECTION,
  SecurityUtils,
  SecurityMiddleware,
  DEFAULT_SECURITY_CONFIG,
  securityMiddleware
}
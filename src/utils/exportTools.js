/**
 * 导出工具函数
 */

import { useAppStore } from '@/stores/app'
import { showSuccess, showWarning, showInfo, handleError } from '@/utils/errorHandler'
import { logger } from '@/utils/logger'

/**
 * 导出为PDF
 */
export const exportToPDF = async () => {
  try {
    showInfo('正在生成PDF文件...')
    
    // 检查浏览器是否支持打印
    if (window.print) {
      // 创建打印样式
      const printStyles = `
        <style>
          @media print {
            body * {
              visibility: hidden;
            }
            .print-content, .print-content * {
              visibility: visible;
            }
            .print-content {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
            }
            .no-print {
              display: none !important;
            }
          }
        </style>
      `
      
      // 添加打印样式到页面
      const styleElement = document.createElement('style')
      styleElement.textContent = printStyles
      document.head.appendChild(styleElement)
      
      // 触发打印
      window.print()
      
      // 移除打印样式
      setTimeout(() => {
        document.head.removeChild(styleElement)
      }, 1000)
      
      showSuccess('PDF导出成功！请查看打印预览')
    } else {
      handleError(new Error('浏览器不支持打印功能'), {
        message: '您的浏览器不支持打印功能',
        showNotification: false
      })
    }
  } catch (error) {
    handleError(error, {
      message: 'PDF导出失败，请重试'
    })
  }
}

/**
 * 导出为Word文档
 */
export const exportToWord = async () => {
  try {
    showInfo('正在生成Word文档...')
    
    const appStore = useAppStore()
    const data = appStore.exportData()
    
    // 创建HTML内容
    let htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>${data.metadata.app.name}</title>
        <style>
          body { 
            font-family: 'Microsoft YaHei', Arial, sans-serif; 
            line-height: 1.6; 
            margin: 20px;
            color: #333;
          }
          h1 { color: #1e3a8a; border-bottom: 2px solid #1e3a8a; padding-bottom: 10px; }
          h2 { color: #059669; margin-top: 30px; }
          h3 { color: #7c3aed; margin-top: 25px; }
          h4 { color: #dc2626; margin-top: 20px; }
          .line-number { color: #666; font-size: 12px; margin-right: 10px; }
          .content-line { margin: 5px 0; }
          .key-point { 
            background: #fef3c7; 
            padding: 10px; 
            border-left: 4px solid #f59e0b; 
            margin: 10px 0;
          }
          .section-divider { 
            border-top: 1px solid #ddd; 
            margin: 30px 0; 
          }
          .metadata { 
            background: #f5f5f5; 
            padding: 15px; 
            border-radius: 5px; 
            margin-bottom: 20px;
          }
        </style>
      </head>
      <body>
        <div class="metadata">
          <h1>${data.metadata.app.name}</h1>
          <p><strong>版本:</strong> ${data.metadata.app.version}</p>
          <p><strong>导出时间:</strong> ${new Date(data.exportedAt).toLocaleString('zh-CN')}</p>
          <p><strong>总行数:</strong> ${data.metadata.content.totalLines}行</p>
          <p><strong>章节数量:</strong> ${data.metadata.content.totalSections}个</p>
        </div>
    `
    
    // 添加内容
    data.content.forEach(item => {
      const className = item.type === 'key-point' ? 'key-point' : 'content-line'
      htmlContent += `<p class="${className}"><span class="line-number">[${item.line}]</span>${item.content}</p>`
    })
    
    htmlContent += `
      </body>
      </html>
    `
    
    // 创建Blob对象
    const blob = new Blob([htmlContent], { 
      type: 'application/msword;charset=utf-8' 
    })
    
    // 创建下载链接
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    
    link.setAttribute('href', url)
    link.setAttribute('download', `海看AI培训战略汇报_${new Date().toISOString().split('T')[0]}.doc`)
    link.style.visibility = 'hidden'
    
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    // 清理URL对象
    setTimeout(() => {
      URL.revokeObjectURL(url)
    }, 100)
    
    showSuccess('Word文档导出成功！')
  } catch (error) {
    handleError(error, {
      message: 'Word导出失败，请重试'
    })
  }
}

/**
 * 导出为JSON
 */
export const exportToJSON = async () => {
  try {
    showInfo('正在生成JSON文件...')
    
    const appStore = useAppStore()
    const data = appStore.exportData()
    
    // 创建JSON内容
    const jsonString = JSON.stringify(data, null, 2)
    
    // 创建Blob对象
    const blob = new Blob([jsonString], { 
      type: 'application/json;charset=utf-8' 
    })
    
    // 创建下载链接
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    
    link.setAttribute('href', url)
    link.setAttribute('download', `海看AI培训战略数据_${new Date().toISOString().split('T')[0]}.json`)
    link.style.visibility = 'hidden'
    
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    // 清理URL对象
    setTimeout(() => {
      URL.revokeObjectURL(url)
    }, 100)
    
    showSuccess('JSON文件导出成功！')
  } catch (error) {
    handleError(error, {
      message: 'JSON导出失败，请重试'
    })
  }
}

/**
 * 导出为Excel
 */
export const exportToExcel = async () => {
  try {
    ElMessage.info('正在生成Excel文件...')
    
    const appStore = useAppStore()
    const data = appStore.exportData()
    
    // 创建CSV内容
    let csvContent = '\ufeff' // BOM for UTF-8
    csvContent += '行号,内容,类型,章节\n'
    
    data.content.forEach(item => {
      const sectionName = getSectionName(item.section)
      const content = item.content.replace(/"/g, '""') // 转义双引号
      csvContent += `${item.line},"${content}","${item.type}","${sectionName}"\n`
    })
    
    // 创建Blob对象
    const blob = new Blob([csvContent], { 
      type: 'text/csv;charset=utf-8' 
    })
    
    // 创建下载链接
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    
    link.setAttribute('href', url)
    link.setAttribute('download', `海看AI培训战略汇报_${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'
    
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    // 清理URL对象
    setTimeout(() => {
      URL.revokeObjectURL(url)
    }, 100)
    
    ElMessage.success('Excel文件导出成功！')
  } catch (error) {
    console.error('Excel导出失败:', error)
    ElMessage.error('Excel导出失败，请重试')
  }
}

/**
 * 打印预览
 */
export const printPreview = () => {
  try {
    // 创建打印窗口
    const printWindow = window.open('', '_blank')
    
    if (!printWindow) {
      ElMessage.error('无法打开打印窗口，请检查浏览器设置')
      return
    }
    
    const appStore = useAppStore()
    const data = appStore.exportData()
    
    // 创建打印内容
    let printContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>${data.metadata.app.name}</title>
        <style>
          body { 
            font-family: 'Microsoft YaHei', Arial, sans-serif; 
            line-height: 1.6; 
            margin: 20px;
            color: #000;
            background: #fff;
          }
          h1 { color: #1e3a8a; border-bottom: 2px solid #1e3a8a; padding-bottom: 10px; }
          h2 { color: #059669; margin-top: 30px; page-break-before: auto; }
          h3 { color: #7c3aed; margin-top: 25px; }
          h4 { color: #dc2626; margin-top: 20px; }
          .line-number { color: #666; font-size: 12px; margin-right: 10px; }
          .content-line { margin: 5px 0; }
          .key-point { 
            background: #fef3c7; 
            padding: 10px; 
            border-left: 4px solid #f59e0b; 
            margin: 10px 0;
          }
          .section-divider { 
            border-top: 1px solid #ddd; 
            margin: 30px 0; 
            page-break-before: auto;
          }
          .metadata { 
            background: #f5f5f5; 
            padding: 15px; 
            border-radius: 5px; 
            margin-bottom: 20px;
          }
          .page-break { page-break-before: always; }
          @media print {
            body { margin: 15px; }
            h1 { font-size: 18pt; }
            h2 { font-size: 14pt; }
            h3 { font-size: 12pt; }
            .content-line { font-size: 10pt; }
          }
        </style>
      </head>
      <body>
        <div class="metadata">
          <h1>${data.metadata.app.name}</h1>
          <p><strong>版本:</strong> ${data.metadata.app.version}</p>
          <p><strong>导出时间:</strong> ${new Date(data.exportedAt).toLocaleString('zh-CN')}</p>
          <p><strong>总行数:</strong> ${data.metadata.content.totalLines}行</p>
          <p><strong>章节数量:</strong> ${data.metadata.content.totalSections}个</p>
        </div>
    `
    
    // 添加内容
    data.content.forEach(item => {
      const className = item.type === 'key-point' ? 'key-point' : 'content-line'
      printContent += `<p class="${className}"><span class="line-number">[${item.line}]</span>${item.content}</p>`
    })
    
    printContent += `
      </body>
      </html>
    `
    
    // 写入打印内容
    printWindow.document.write(printContent)
    printWindow.document.close()
    
    // 等待内容加载完成后触发打印
    printWindow.onload = () => {
      setTimeout(() => {
        printWindow.print()
      }, 500)
    }
    
    ElMessage.success('打印预览已打开！')
  } catch (error) {
    console.error('打印预览失败:', error)
    ElMessage.error('打印预览失败，请重试')
  }
}

/**
 * 获取章节名称
 */
function getSectionName(sectionId) {
  const sectionMap = {
    strategy: '战略定位',
    why: 'WHY',
    what: 'WHAT',
    how: 'HOW',
    summary: '总结'
  }
  return sectionMap[sectionId] || sectionId
}

/**
 * 生成分享链接
 */
export const generateShareLink = () => {
  try {
    const url = window.location.href
    const shareUrl = `${url}?utm_source=share&utm_medium=web&utm_campaign=haikan-ai-report`
    
    // 复制到剪贴板
    navigator.clipboard.writeText(shareUrl).then(() => {
      ElMessage.success('分享链接已复制到剪贴板！')
    }).catch(() => {
      ElMessage.error('复制失败，请手动复制链接')
    })
    
    return shareUrl
  } catch (error) {
    console.error('生成分享链接失败:', error)
    ElMessage.error('生成分享链接失败')
    return null
  }
}

/**
 * 发送邮件
 */
export const sendEmail = () => {
  try {
    const subject = encodeURIComponent('海看AI培训战略汇报')
    const body = encodeURIComponent(`您好，\n\n我想与您分享海看AI培训战略汇报的链接：\n${window.location.href}\n\n此汇报详细介绍了海看AI培训的战略规划、市场机遇和实施路径。\n\n期待您的反馈！\n\n祝好！`)
    
    const mailtoUrl = `mailto:?subject=${subject}&body=${body}`
    window.open(mailtoUrl)
    
    ElMessage.success('邮件客户端已打开！')
  } catch (error) {
    console.error('发送邮件失败:', error)
    ElMessage.error('发送邮件失败，请重试')
  }
}
/**
 *@Author： ZhuGuangqiang
 *@Date：2024/5/24  17:35:00
 *@LastEditors： ZhuGuangqiang
 *@LastEditTime：2024/5/34  17:35:00
 *@Description：
 */
import { ElMessage } from 'element-plus'

export function dealExportDownload(blob: Blob | null, fileName?: string) {
  if (!blob || !blob.size) {
    ElMessage({
      type: 'error',
      center: true,
      message: `导出失败！`
    })
    return
  }
  try {
    const link = document.createElement('a')
    const href = URL.createObjectURL(blob)
    link.style.display = 'none'
    link.href = href
    if (fileName) {
      link.download = fileName
    }
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(href)
  } catch {
    ElMessage({
      type: 'error',
      center: true,
      message: `导出失败！`
    })
  }
}

export function  alarmLevelColor(v) {
  let color = ''
  switch (v) {
    case '严重':
      color = '#F41B1B'
      break
    case '提示':
      color = '#FFAF10'
      break
    case '一般':
      color = '#FFED4D'
      break

    default:
      break
  }
  return color
}

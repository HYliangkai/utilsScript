/** @description 将后端传输的arrayBuff(在axios中设置转化)转为excel并下载,适用于小文件传输 */

export default function streamToExcel(data: any) {
  const blob = new Blob([data], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'//key
  })
  const url = window.URL.createObjectURL(blob)
  const alink = document.createElement('a')
  alink.style.display = 'none'
  alink.href = url
  alink.download = '下载excel'
  document.body.appendChild(alink)
  alink.click()
  window.URL.revokeObjectURL(url)
  document.body.removeChild(alink)
}

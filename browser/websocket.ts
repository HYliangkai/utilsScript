/**
  @description websocket的一个有效配置,适用于简单的ws连接
*/
import ReconnectingWebSocket from 'reconnecting-websocket'
let Socket
let ws_event_name: string
/**
 * 建立websocket连接
 * @param {string} url ws连接地址
 * @param {string} event_name 接收消息的事件名
 */
export const createSocket = (url, event_name = 'ws_message') => {
  ws_event_name = event_name
  Socket && Socket.close()
  console.log('建立websocket连接')
  Socket = new ReconnectingWebSocket(url)
  Socket.timeoutInterval = 1000//检测断线的时间
  Socket.onmessage = onmessageWS
}
/**WS数据接收统一处理 */
const onmessageWS = (e) => {
  window.dispatchEvent(
    new CustomEvent(ws_event_name, {
      detail: {
        data: e.data,
      },
    }),
  )
}
/**
  @description 原生websocket的一个有效配置,适用于简单的ws连接
 */
let socket: WebSocket | null = null //全局的socket实例
let setInterva_wesocket_push: number | null | NodeJS.Timer = null //心跳检测定时器
let wsuri: string = '' //连接的url


/** @description 建立连接 */
export const create_socket = (url: string) => {
  wsuri = url
  socket && socket?.close()
  if (!socket) {
    socket = new WebSocket(wsuri)
    socket.onopen = open
    socket.onmessage = message
    socket.onerror = error
    socket.onclose = close
  }
}

/** @description 发送消息 */
export const send_message = (message: unknown) => {
  if (!socket) return
  if (socket.readyState === 0) { loop_connecting(message) }
  else if (socket.readyState === 1) { socket.send(JSON.stringify(message)) }
  else if (socket.readyState === 3) {
    socket.close()
    create_socket(wsuri)
  }
}

/** @description 循环发送心跳检测 */
const loop_send_ping = (time = 5000, ping_message = 'ping') => {
  if (setInterva_wesocket_push && socket) {
    clearInterval(setInterva_wesocket_push)
    socket.send(ping_message)
    setInterva_wesocket_push = setInterval(() => { socket?.send(ping_message) }, time)
  }
}

/** @description 收到消息:挂载在全局事件`wsmag`上 */
const message = (e: any) => {
  window.dispatchEvent(
    new CustomEvent('wsmag', { detail: e.data })
  )
}



/** @description 循环重连,等待连接成功再发送数据 */
const loop_connecting = (message: unknown) => {
  setTimeout(() => {
    if (socket?.readyState == 0) {
      loop_connecting(message)
    } else {
      socket?.send(JSON.stringify(message))
    }
  }, 1000);
}

/** @description 连接成功 */
const open = () => { loop_send_ping() }

/** @description 连接失败->断线重连 */
const error = () => {
  socket?.close()
  clearInterval(setInterva_wesocket_push as any)
  if (socket?.readyState != 3) {
    socket = null
    create_socket(wsuri)
  }
}

/** @description 断开连接->断线重连 */
const close = () => {
  clearInterval(setInterva_wesocket_push as any)
  if (socket?.readyState != 2) {
    socket = null
    create_socket(wsuri)
  }
}


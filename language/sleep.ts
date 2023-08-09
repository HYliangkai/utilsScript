/** @description 线程休眠 */
export default (time: number, random = false) => new Promise<void>((res) => {
  setTimeout(() => { res() }, random ? Math.random() * time : time)
})
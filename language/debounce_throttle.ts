/**
 * @description 函数节流 不管操作多少次只按固定时间触发
 */
export const throttle = (fn: Function, time: number) => {
  let time_out: NodeJS.Timeout | number = 0
  return () => {
    if (time_out === 0) {
      time_out = setTimeout(() => {
        fn()
        time_out = 0
      }, time)
    }
  }
}

/**
 * @description 函数防抖 在连续操作后才开始
 */
export const debounce = (fn: Function, time: number) => {
  let before = Date.now()
  return () => {
    const now = Date.now()
    if (before === undefined) {
      fn()
    } else if (now - before >= time) {
      fn()
    }
    before = now
  }
}
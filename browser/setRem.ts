const set_rem = (base_size = 14, base_width = 1440, max_size = 1.123966942, min_size = 1) => {
  const scale = document.documentElement.clientWidth / base_width
  document.documentElement.style.fontSize =
    base_size * Math.max(Math.min(scale, max_size), min_size) + 'px'
}

/**
 * @description 根据页面大小自动改变base-font-size;实现响应式布局
 * @param {number} base_size 字体的基础大小
 * @param {number} base_width 页面的基础宽度
 * @param {number} max_size 最大放大倍数
 * @param {number} min_size 最小缩小倍数
 */
const init_set_rem = (base_size = 14, base_width = 1440, max_size = 1.123966942, min_size = 1) => {
  set_rem(base_size, base_width, max_size, min_size)
  window.addEventListener('resize', () => { set_rem(base_size, base_width, max_size, min_size) })
}

export default init_set_rem

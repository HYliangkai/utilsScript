/** @description 随机返回数组某一项 */
export const random_get = (rarry: Array<unknown>) => {
  const index = Math.floor(Math.random() * rarry.length)
  return rarry.at(index)
}
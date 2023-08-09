import { ref } from 'vue'
/** 传入默认赋值 */


export const use_default = <T>(value: T) => {
  const def_val = structuredClone(value)
  return () => {
    return ref(def_val)
  }
}
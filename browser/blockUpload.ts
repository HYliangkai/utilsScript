/** @description 断点续传 */
export default async (file: File, handle: (percent: number) => void, error_handle: () => void, option: {
  stage: 100,
}) => {
  const { stage } = option
  let percent = compute_step(0, stage)
  let now_index = 0
  const files = cut_file(file, percent, stage)
  for await (const [index, item] of files.entries()) {
    const formData = new FormData()

    formData.append('index', now_index.toString())
    formData.append('total', stage.toString())
    formData.append('file', item)

    const res = await fetch('http://localhost:3000/upload', {
      method: 'POST',
      body: formData
    })
    if (res.status === 200) {
      percent = compute_step(now_index, stage)
      handle(percent)
    } else {
      error_handle()
    }
  }
}

/** @description 根据now和stage计算出percent */
const compute_step = (now: number, stage: number) => {
  return (now / stage) * 100
}


const cut_file = (file: File, percent: number, stage: number) => {
  const file_array: Array<Blob> = []
  const item_size = Math.ceil(file.size / stage)
  let current = Math.ceil(percent * item_size)
  for (current; current < file.size; current += item_size) {
    file_array.push(file.slice(current, current + item_size))
  }
  return file_array
}


export const inBrowser = typeof window !== 'undefined'

export function getFileName (src) {
  if (!src) return ''
  try {
    const { pathname } = new URL(src)
    if (!pathname) return
    const array = pathname.split('/')
    const fileName = array[array.length-1]
    return fileName
  } catch (err) {
    console.error(err)
    return ''
  }
}
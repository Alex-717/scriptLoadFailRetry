
export const inBrowser = typeof window !== 'undefined'

// export function getFileName (src) {
//   if (!src) return ''
//   try {
//     const { pathname } = new URL(src)
//     if (!pathname) return
//     const array = pathname.split('/')
//     const fileName = array[array.length-1]
//     return fileName
//   } catch (err) {
//     console.error(err)
//     return ''
//   }
// }

export function isScriptLoadFailError (event) {
  if (ErrorEvent.prototype.isPrototypeOf(event)) return false
  const { target } = event
  const { src = '' } = target
  if (!src) return false
  if (!target.tagName || (target.tagName && target.tagName.toLowerCase() !== 'script')) return false
  return true
}
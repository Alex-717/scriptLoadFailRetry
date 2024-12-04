
const inBrowser = typeof window !== 'undefined'
const map = {}

function register() {
  if (!inBrowser) return
  window.addEventListener('error', scriptLoadFailedHandler, true)
}

function scriptLoadFailedHandler (event) {
  const { target } = event
  const { src = '' } = target
  // console.log('🐷🐷', target.tagName)
  if (!isScriptLoadFailError(event)) return
  const retry = target.dataset.retry ? +target.dataset.retry : 0
  const leftRetryTimes = getRetryTimes(src, retry)
  if (leftRetryTimes > 0) {
    document.write("<scr" + "ipt src = " + src + "></scr" + "ipt>")
    reduceRetryTimes(src)
  }
}

function getRetryTimes(src, retry) {
  if (map[src] === void 0) {
    map[src] = retry
  }
  return map[src]
}
function reduceRetryTimes (src) {
  if (map[src] !== void 0) {
    map[src]--
  }
}

function isScriptLoadFailError (event) {
  if (ErrorEvent.prototype.isPrototypeOf(event)) return false
  const { target } = event
  const { src = '' } = target
  if (!src) return false
  if (!target.tagName || (target.tagName && target.tagName.toLowerCase() !== 'script')) return false
  return true
}

export {
  register as default,
  register
}
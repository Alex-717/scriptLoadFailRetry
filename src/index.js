import { inBrowser, getFileName, isScriptLoadFailError } from './utils'

const map = {}
const targetList = []

function register(options) {
  if (!inBrowser) return
  const { list = [] } = options
  targetList.length = 0
  targetList.push(...list)
  window.addEventListener('error', scriptLoadFailedHandler, true)
}

function scriptLoadFailedHandler (event) {
  const { target } = event
  const { src = '' } = target
  // console.log('🐷🐷', target.tagName)
  if (!isScriptLoadFailError(event) || !isTargetFile(getFileName(src))) return
  const retry = target.dataset.retry ? +target.dataset.retry : 1
  const leftRetryTimes = getRetryTimes(src, retry)
  if (leftRetryTimes > 0) {
    document.write(`<script src="${src}"></script>`)
    reduceRetryTimes(src)
  }
}

function isTargetFile (fileName) {
  if (!fileName) return false
  return targetList.find(it => fileName.startsWith(it)) ? true : false
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

export {
  register as default,
  register
}
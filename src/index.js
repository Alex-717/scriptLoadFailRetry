import { inBrowser, isScriptLoadFailError } from './utils'

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
    // console.dir(target)
    document.write(`<script src="${src}"></script>`)
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

export {
  register as default,
  register
}
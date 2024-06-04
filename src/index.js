import { inBrowser } from './utils'

if (inBrowser) {
  window.addEventListener('error', scriptLoadFailedHandler, true)
}

function scriptLoadFailedHandler (event) {
  const eventTarget = event.target
  if (eventTarget.tagName.toLowerCase() === 'script') {
    console.log('脚本加载失败', eventTarget.src)
  }
}
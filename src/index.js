import { inBrowser } from './utils'

if (inBrowser) {
  window.addEventListener('error', scriptLoadFailedHandler, true)
}

function scriptLoadFailedHandler (event) {
  
}
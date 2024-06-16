var scriptFailedReloadLib = (function (exports) {
  'use strict';

  const inBrowser = typeof window !== 'undefined';

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

  function isScriptLoadFailError (event) {
    if (ErrorEvent.prototype.isPrototypeOf(event)) return false
    const { target } = event;
    const { src = '' } = target;
    if (!src) return false
    if (!target.tagName || (target.tagName && target.tagName.toLowerCase() !== 'script')) return false
    return true
  }

  const map = {};

  function register() {
    if (!inBrowser) return
    window.addEventListener('error', scriptLoadFailedHandler, true);
  }

  function scriptLoadFailedHandler (event) {
    const { target } = event;
    const { src = '' } = target;
    // console.log('🐷🐷', target.tagName)
    if (!isScriptLoadFailError(event)) return
    const retry = target.dataset.retry ? +target.dataset.retry : 0;
    const leftRetryTimes = getRetryTimes(src, retry);
    if (leftRetryTimes > 0) {
      // console.dir(target)
      document.write(`<script src="${src}"></script>`);
      reduceRetryTimes(src);
    }
  }

  function getRetryTimes(src, retry) {
    if (map[src] === void 0) {
      map[src] = retry;
    }
    return map[src]
  }
  function reduceRetryTimes (src) {
    if (map[src] !== void 0) {
      map[src]--;
    }
  }

  exports.default = register;
  exports.register = register;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({});

var scriptFailedReloadLib = (function (exports) {
  'use strict';

  const inBrowser = typeof window !== 'undefined';

  function getFileName (src) {
    if (!src) return ''
    try {
      const { pathname } = new URL(src);
      if (!pathname) return
      const array = pathname.split('/');
      const fileName = array[array.length-1];
      return fileName
    } catch (err) {
      console.error(err);
      return ''
    }
  }

  const map = {};
  const targetList = [];

  function register(options) {
    if (!inBrowser) return
    const { list = [] } = options;
    targetList.length = 0;
    targetList.push(...list);

    window.addEventListener('error', scriptLoadFailedHandler, true);
  }

  function scriptLoadFailedHandler (event) {
    const target = event.target;
    const { src } = target;
    if (target.tagName.toLowerCase() !== 'script' || !isTargetFile(getFileName(src))) return
    const retry = target.dataset.retry ? +target.dataset.retry : 1;
    const leftRetryTimes = getRetryTimes(src, retry);
    if (leftRetryTimes > 0) {
      document.write(`<script src="${src}"></script>`);
      reduceRetryTimes(src);
    }
  }

  function isTargetFile (fileName) {
    if (!fileName) return false
    return targetList.find(it => fileName.startsWith(it)) ? true : false
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

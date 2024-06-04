(function () {
  'use strict';

  const inBrowser = typeof window !== 'undefined';

  if (inBrowser) {
    window.addEventListener('error', scriptLoadFailedHandler, true);
  }

  function scriptLoadFailedHandler (event) {
    const target = event.target;
    if (target.tagName.toLowerCase() === 'script') {
      console.log('脚本加载失败', target.src);
    }
  }

})();

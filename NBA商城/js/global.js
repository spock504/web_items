function addFunction(func) {
  var oldonload = window.onload;
  if (typeof oldonload !== 'function') {
    window.onload = func();
  } else {
    window.onload = function() {
      oldonload();
      func();
    }
  }
}

// 导航栏滚动后固定顶部
function scrollTop() {
  var nav_bar = document.getElementById('header-nav');
  var NAV_TOP = 122
  window.onscroll = function() {
    // 获取滚动条距离顶部的距离
    var Top = document.body.scrollTop || document.documentElement.scrollTop;
    if (Top <= NAV_TOP) {
      nav_bar.setAttribute('style', 'position: relative');
    } else {
      nav_bar.setAttribute('style', 'position: fixed; top: 0');
    }
  }
}



addFunction(scrollTop);
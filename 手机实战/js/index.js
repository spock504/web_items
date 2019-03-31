
// 获取类名
function getByClass(className) {
  return document.getElementsByClassName(className);
}
// 添加类名
function addClass(element, newClass) {
  var className = element.className.split(' ');
  var classNameMap = {}
  for(var i=0;i<className.length;i++){
    classNameMap[className[i]] = 1;
  }
  classNameMap[newClass] = 1;
  var className = [];
  for(i in classNameMap){
    className.push(i);
  }
  element.className = className.join(' ');
}
// 删除类名
function removeClass(element, class_name) {
  if (!element || !class_name) return false;
  if (!element.className) return false;
  var all_names = element.className.split(' ');
  for (var i = 0; i < all_names.length; i++) {
    if (all_names[i] === class_name) {
      all_names.splice(i, 1); //删除那个类名
      element.className = "";
      for (var j = 0; j < all_names.length; j++) {
        element.className += " ";
        element.className += all_names[j];
      }
      return true
    }
  }
}

// 在加载的时候初始化：添加类名
window.onload = function() {
  addClass( getByClass('header')[0] , 'header_active_1') ;
  //第一屏
  addClass(getByClass('screen-1__heading')[0], 'screen-1__heading_animate_init');
  addClass(getByClass('screen-1__phone')[0], 'screen-1__phone_animate_init');
  addClass(getByClass('screen-1__shadow')[0], 'screen-1__shadow_animate_init');
  //第二屏
  addClass( getByClass('screen-2__heading')[0] , 'screen-2__heading_animate_init' );
  addClass( getByClass('screen-2__subheading')[0] , 'screen-2__subheading_animate_init' );
  addClass( getByClass('screen-2__phone')[0] , 'screen-2__phone_animate_init' );
  //第三屏
  addClass( getByClass('screen-3__heading')[0] , 'screen-3__heading_animate_init' );
  addClass( getByClass('screen-3__subheading')[0] , 'screen-3__subheading_animate_init' );
  addClass( getByClass('screen-3__phone')[0] , 'screen-3__phone_animate_init' );
  addClass( getByClass('screen-3__features')[0] , 'screen-3__features_animate_init' );
  //第四屏
  addClass( getByClass('screen-4__heading')[0] , 'screen-4__heading_animate_init' );
  addClass( getByClass('screen-4__subheading')[0] , 'screen-4__subheading_animate_init' );
  addClass( getByClass('screen-4__type')[0] , 'screen-4__type_animate_init' );
  //第五屏
  addClass( getByClass('screen-5__heading')[0] , 'screen-5__heading_animate_init' );
  addClass( getByClass('screen-5__subheading')[0] , 'screen-5__subheading_animate_init' );
  addClass( getByClass('screen-5__back')[0] , 'screen-5__back_animate_init' );
  // 0.5s后显示第一屏的信息
  setTimeout(function(){
    removeClass(getByClass('screen-1__heading')[0], 'screen-1__heading_animate_init');
    removeClass( getByClass('screen-1__phone')[0] , 'screen-1__phone_animate_init' );
    removeClass( getByClass('screen-1__shadow')[0] , 'screen-1__shadow_animate_init' );

    addClass(getByClass('screen-1__heading')[0] , 'screen-1__heading_animate_done' );
    addClass(getByClass('screen-1__phone')[0] , 'screen-1__phone_animate_done' );
    addClass(getByClass('screen-1__shadow')[0] , 'screen-1__shadow_animate_done' );
  }, 500)
// 导航栏鼠标点击事件
  getByClass('header__nav-item_i_1')[0].onclick = function(e) {
    document.documentElement.scrollTop = 0;
  }
  getByClass('header__nav-item_i_2')[0].onclick = function(e) {
    document.documentElement.scrollTop = 800*1 - 60;
  }
  getByClass('header__nav-item_i_3')[0].onclick = function() {
    document.documentElement.scrollTop = 800*2 - 60;
  }
  getByClass('header__nav-item_i_4')[0].onclick = function() {
    document.documentElement.scrollTop = 800*3 - 60;
  }
  getByClass('header__nav-item_i_5')[0].onclick = function() {
    document.documentElement.scrollTop = 800*4 - 60;
  }
// 导航鼠标滑动事件
  getByClass('header__nav')[0].onmouseout = function(e) {
    getByClass('header__nav-item-tip')[0].style.left = ''
  }
  getByClass('header__nav-item_i_1')[0].onmouseover = function(e) {
    getByClass('header__nav-item-tip')[0].style.left = 20 + 'px';
  }
  getByClass('header__nav-item_i_2')[0].onmouseover = function(e) {
    getByClass('header__nav-item-tip')[0].style.left = 120 + 'px';
  }
  getByClass('header__nav-item_i_3')[0].onmouseover = function(e) {
    getByClass('header__nav-item-tip')[0].style.left = 220 + 'px';
  }
  getByClass('header__nav-item_i_4')[0].onmouseover = function(e) {
    getByClass('header__nav-item-tip')[0].style.left = 320 + 'px';
  }
  getByClass('header__nav-item_i_5')[0].onmouseover = function(e) {
    getByClass('header__nav-item-tip')[0].style.left = 420 + 'px';
  }
}
window.onscroll = function() {
  var top = document.documentElement.scrollTop;
  // 导航栏
  if (top < 100) {
    getByClass('header')[0].setAttribute('class', 'header header_active_1')
    removeClass(getByClass('header')[0], 'header_status_black')
  } else {
    addClass(getByClass('header')[0], 'header_status_black')
  }
  // 右侧栏的显示
  if (top < 400) {
    getByClass('outline')[0].style.opacity = 0
  } else {
    getByClass('outline')[0].style.opacity = 1
    getByClass('outline')[0].setAttribute('class', 'outline outline_active_1')
  }
  // 分屏显示
  if (top > 1*800 - 61) {
    getByClass('header')[0].setAttribute('class','header header_status_black header_active_2');

    removeClass(getByClass('screen-2__heading')[0], 'screen-2__heading_animate_init');
    removeClass( getByClass('screen-2__subheading')[0] , 'screen-2__subheading_animate_init' );
    removeClass( getByClass('screen-2__phone')[0] , 'screen-2__phone_animate_init' );

    addClass(getByClass('screen-2__heading')[0], 'screen-2__heading_animate_done');
    addClass( getByClass('screen-2__subheading')[0] , 'screen-2__subheading_animate_done' );
    addClass( getByClass('screen-2__phone')[0] , 'screen-2__phone_animate_done' );

    getByClass('outline')[0].setAttribute('class','outline outline_active_2');
  }
  if (top > 2*800 - 61) {
    getByClass('header')[0].setAttribute('class','header header_status_black header_active_3');

    removeClass( getByClass('screen-3__heading')[0] , 'screen-3__heading_animate_init' );
    removeClass( getByClass('screen-3__subheading')[0] , 'screen-3__subheading_animate_init' );
    removeClass( getByClass('screen-3__phone')[0] , 'screen-3__phone_animate_init' );
    removeClass( getByClass('screen-3__features')[0] , 'screen-3__features_animate_init' );

    addClass( getByClass('screen-3__heading')[0] , 'screen-3__heading_animate_done' );
    addClass( getByClass('screen-3__subheading')[0] , 'screen-3__subheading_animate_done' );
    addClass( getByClass('screen-3__phone')[0] , 'screen-3__phone_animate_done' );
    addClass( getByClass('screen-3__features')[0] , 'screen-3__features_animate_done' );

    getByClass('outline')[0].setAttribute('class','outline outline_active_3');
  }
  if (top > 3*800 - 61) {
    getByClass('header')[0].setAttribute('class','header header_status_black header_active_4');

    removeClass( getByClass('screen-4__heading')[0] , 'screen-4__heading_animate_init' );
    removeClass( getByClass('screen-4__subheading')[0] , 'screen-4__subheading_animate_init' );
    removeClass( getByClass('screen-4__type')[0] , 'screen-4__type_animate_init' );


    addClass( getByClass('screen-4__heading')[0] , 'screen-4__heading_animate_done' );
    addClass( getByClass('screen-4__subheading')[0] , 'screen-4__subheading_animate_done' );
    addClass( getByClass('screen-4__type')[0] , 'screen-4__type_animate_done' );

    getByClass('outline')[0].setAttribute('class','outline outline_active_4');
  }
  if (top > 4*800 - 61) {
    getByClass('header')[0].setAttribute('class','header header_status_black header_active_5');

    removeClass( getByClass('screen-5__heading')[0] , 'screen-5__heading_animate_init' );
    removeClass( getByClass('screen-5__subheading')[0] , 'screen-5__subheading_animate_init' );
    removeClass( getByClass('screen-5__back')[0] , 'screen-5__back_animate_init' );

    addClass( getByClass('screen-5__heading')[0] , 'screen-5__heading_animate_done' );
    addClass( getByClass('screen-5__subheading')[0] , 'screen-5__subheading_animate_done' );
    addClass( getByClass('screen-5__back')[0] , 'screen-5__back_animate_done' );

    getByClass('outline')[0].setAttribute('class','outline outline_active_5');
  }
}

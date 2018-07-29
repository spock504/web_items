function my_slide() {
  var options = {
    num: [5, 3, 2],
    widthSwtch: [1024, 782],
    interval: 400
  },
  slide = document.querySelector('.mini-slide-item'),
  slideWidth = parseInt(getComputedStyle(slide).width),//获取固定不变的宽度
  slideUl = document.querySelector('.mini-slide-list'),
  slideLi = slideUl.querySelectorAll('li'),
  slideLiNum = slideLi.length,
  slideHeight = parseFloat(getComputedStyle(slideLi[0]).width),//获取固定不变的高度

  next = document.querySelector('.btn-next'),
  prev = document.querySelector('.btn-prev'),

  index = 1
  ;
//获得窗口的宽度
function getWindowWidth() {
  return document.body.clientWidth;
}
//设置宽度
function setWidth(num) {
  slideLiWidth = parseInt(slideWidth / num);
  for(var i =0; i<slideLiNum; i++) {
    slideLi[i].style.width = slideLiWidth + 'px';
  }
  slideUl.style.width = slideLiWidth * slideLiNum + 'px';
}
// 图片框根据index移动
function rotate(offindex) {
  var turnIndex = offindex === 1 ? 1 : -1;
  var newLeft = parseInt(getComputedStyle(slideUl).left) + turnIndex * slideLiWidth;
  slideUl.style.left = newLeft + 'px';
  if (newLeft < -(lastShowNum -1) * slideLiWidth) {
    slideUl.style.left = 0;
  }
  if (newLeft > 0) {
    slideUl.style.left =  -(lastShowNum -1) * slideLiWidth + 'px';
  }

}

// 点击下一个
next.onclick = function() {
  lastShowNum = slideLiNum - slideShowNum + 1
  index === lastShowNum ? index = 1 : index ++
  rotate(-1)
}
prev.onclick = function() {
  lastShowNum = slideLiNum - slideShowNum + 1
  index === 1 ? index = lastShowNum : index --
  rotate(1)
}

//设置高度
function setHeight() {
  slide.style.height = slideHeight + 'px';
}
// 初始化函数
function readySlide() {
  var arr = options.widthSwtch,
    cnt = 0,
    width = getWindowWidth();

  for(var i = 0; i < arr.length; i++) {
    if (width > arr[i]) {
      break;
    }
    cnt++
  }
  slideShowNum = options.num[cnt];
  setWidth(slideShowNum);
  setHeight();
  slideUl.style.left = -(index - 1) +'px';
}
readySlide();
//窗口改变时重新计算宽度
window.onresize = function() {
  readySlide();
}


}

addFunction(my_slide)
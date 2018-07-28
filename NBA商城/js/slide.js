function slideImg() {
  var slide = document.querySelector('.slide'),
      imgBox = document.querySelector('.slide-images-box'),
      imgList = imgBox.querySelectorAll('img'),
      imgNum = imgList.length,

      next = slide.querySelector('.next'),
      prev = slide.querySelector('.prev'),

      iconList = document.querySelector('.slide-dots'),
      iconArr = iconList.querySelectorAll('li'),

      imgReelWidth = imgNum * 100 ;
      imgBox.style.width = imgReelWidth + '%';
      imgWidth = parseFloat(getComputedStyle(imgList[0]).width);
      index = 1;
      animated = false;


  var rotate = function(offsetIndex) {
    var newLeft = parseFloat(getComputedStyle(imgBox).left) + offsetIndex * imgWidth; //图片框移动后的左边距
    var intervalTime = 50;
    var step = 20;
    var speed = (offsetIndex * imgWidth) /step;
    function interval() {
      animated = true;
      if ((speed < 0 && parseFloat(getComputedStyle(imgBox).left) > newLeft) || (speed > 0 && parseFloat(getComputedStyle(imgBox).left) < newLeft)) {
        imgBox.style.left = parseFloat(getComputedStyle(imgBox).left) + speed + 'px';
        setTimeout(interval, intervalTime)
      } else {
        animated = false;
        imgBox.style.left = newLeft + 'px';
        // 两种极限情况，当左移到最后一张图片时
        if (newLeft < -(imgNum - 1) * imgWidth) {
          imgBox.style.left = 0
        }
        //当右移到最后一张图片时
        if (newLeft > 0 ) {
          imgBox.style.left = -(imgNum - 1) * imgWidth + 'px'
        }
      }
    };
  interval();
  }

next.onclick = function() {
  index === imgNum ? index = 1 : index += 1;
  if (!animated) {
    rotate(-1);
  }
  change();
}
prev.onclick = function() {
  index === 1 ? index = imgNum : index -= 1;
  if (!animated) {
    rotate(1);
  }
  change();
}

play();

function play() {
  timer = setInterval(function() {
    next.onclick();
  },3000)
};
function stop() {
  clearInterval(timer);
}
slide.onmouseenter = function() {
  stop();
}
slide.onmouseleave = function() {
  play();
}
function change() {
  for (var i=0; i<iconArr.length; i++) {
    iconArr[i].className = ''
  }
  iconArr[index-1].classList.add('active');
}

iconList.addEventListener('click', function(e) {
  if (this.className === 'active') return;
  var e = e || window.event;
  var target = e.target || e.srcElement;
  var myIndex = target.getAttribute('rel');
  var offIndex = -(myIndex - index);
  if (!animated) {
    rotate(offIndex)
  }
  index = myIndex;
  change()
  }, false)
}

addFunction(slideImg)
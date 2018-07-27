// 图片轮播
window.onload = function(){
var slider = document.querySelector('.slider'),
    imgBox = document.querySelector('.imageBox'),
    imglist = imgBox.querySelectorAll('img'),
    imageNum = imglist.length,//图片数量
    
    next = document.querySelector('#next'),
    prev = document.querySelector('#prev'),

    titleBox = document.querySelector('.titleBox'),
    plist = titleBox.querySelectorAll('p'),
    icoBox = document.querySelector('.icoBox'),
    icoArr = icoBox.querySelectorAll('span'),

    imageWidth = parseInt(getComputedStyle(slider).width),
    imageReelWidth = imageNum * imageWidth,  //总图片盒子的宽度
    index=1,  //全局变量：作为当前图片的索引
    animated = false,   //动画运行状态的存放
    timer;

    imgBox.style.width =  imageReelWidth+'px';  //根据图片数量和宽度设置图片盒子的宽度
    // console.log(activeIco);
var rotate = function(offindex){
    var newLeft = parseInt(getComputedStyle(imgBox).left) + offindex*imageWidth;   //移动后图片框的位置

    var intervalTime=10;   //时长
    var step = 50;     //位移步长
    var speed = (offindex*imageWidth)/step;
    // debugger;
    function interval() {
        animated = true;
        // 左移并且未到最后,或者右移未到最后
        //虽然这个取盒子左边距离的很长，单独定义成一个变量的话，会导致值始终不变
        if ((speed<0 && parseInt(getComputedStyle(imgBox).left) > newLeft) || (speed >0 && imgBoxLeft <newLeft)) {
            imgBox.style.left = parseInt(getComputedStyle(imgBox).left) + speed +'px';
            setTimeout(interval, intervalTime);
            // debugger;
        } else {
            animated = false;
            imgBox.style.left = newLeft + 'px'; //设置图像盒子的左边距
            if (newLeft < -(imageReelWidth-imageWidth)) {
                imgBox.style.left = 0;
            }
            if (newLeft > 0) {
                imgBox.style.left = -(imageReelWidth-imageWidth) + 'px';
            }
        }
    }
    interval(); //立即执行
    // debugger;
};

// 自动播放，相当于点击next的click事件
play();
function play() {
     timer = setInterval(function(){
        next.onclick();
     },3000);
}
function stop() {
    clearInterval(timer);
}

// 小圆点和文字的样式改变
function change() {
    for (var i=0; i < icoArr.length; i++){
        icoArr[i].className = '';
        plist[i].className = '';
    }
    // console.log(index);
    icoArr[index-1].classList.add('active');
    plist[index-1].classList.add('active');
}


// 上一张，下一张图片 
next.onclick = function() {
    index == imageNum ? index=1 : index += 1; //如果是最后一张照片了，返回第一张
    change();
    if (! animated) {
    rotate(-1);
    }
    // debugger;
}
prev.onclick = function(){
    index == 1 ? index=imageNum : index -= 1;
    change();
    if (! animated) {
    rotate(1);
    }
}


// 鼠标进入和移出事件
slider.onmouseenter = function() {
    stop();
};
slider.onmouseleave = function(){
    play();
};

// 右下角图标点击事件
icoBox.addEventListener('click', function(e){
    if (this.className == 'active') { return;}
    var e = e || window.event;
    var target = e.target || e.srcElement;
    var myIndex = parseInt(target.getAttribute('rel'));
    var offindex = -(myIndex - index);
    if (! animated) {
    rotate(offindex);
    }
    index = myIndex;   //正确的索引：切换到那一张的suoy
    // console.log(offindex);
    change();
// debugger;
},false);
}
function getStyle(obj,name){
     if(obj.currentStyle){
          //针对IE
          return obj.currentStyle[name];
      }else{
          //针对火狐
          return getComputedStyle(obj,null)[name]
      }
  }

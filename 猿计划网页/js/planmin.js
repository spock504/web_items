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
    titleSpeed = 250,
    imageSpeed =  500,
    intervalTime=2000,
    index=1;  //全局变量：作为当前图片的索引
    imgBox.style.width =  imageReelWidth+'px';  //根据图片数量和宽度设置图片盒子的宽度
    // console.log(activeIco);
var rotate = function(offindex){
        // 图片
    var newLeft = parseInt(getComputedStyle(imgBox).left) + offindex*imageWidth; //外联样式的获取要注意
    imgBox.style.left = newLeft+"px"; //设置盒子的左边距

    if (newLeft < -(imageReelWidth-imageWidth)) {
        imgBox.style.left = 0;
    }
    if (newLeft > 0) {
        imgBox.style.left = -(imageReelWidth-imageWidth) + 'px';
    }
    // debugger;

};
function change() {
    for (var i=0; i < icoArr.length; i++){
        icoArr[i].className = '';
        plist[i].className = '';
    }
    // console.log(index);
    icoArr[index-1].classList.add('active');
    plist[index-1].classList.add('active');
}

setIntervalID = setInterval(rotate, intervalTime);

// 上一张，下一张图片 
next.onclick = function() {

    index == imageNum ? index=1 : index += 1; //如果是最后一张照片了，返回第一张
    change();
    rotate(-1);
    // debugger;
}
prev.onclick = function(){
    index == 1 ? index=imageNum : index -= 1;
    change();
    rotate(1);
}


// 鼠标进入和移出事件
slider.onmouseenter = function() {
    clearInterval(setIntervalID);
};
slider.onmouseleave = function(){
    setIntervalID = setInterval(rotate, intervalTime);
};

// 右下角图标点击事件
icoBox.addEventListener('click', function(e){
    if (this.className == 'active') { return;}
    var e = e || window.event;
    var target = e.target || e.srcElement;
    var myIndex = parseInt(target.getAttribute('rel'));
    var offindex = -(myIndex - index);
    rotate(offindex);
    index = myIndex;   //正确的索引：切换到那一张的suoy
    // console.log(offindex);
    change();
// debugger;
    // setIntervalID = setInterval(rotate, intervalTime);
},false);
}
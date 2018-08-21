function Slide (){}

Slide.prototype = {
  bigbox: null, //父容器
  boxul: null, //子容器
  imglist: null,  //子容器图片
  numlist: null,  //子容器数字
  index: 0, //显示当前项
  play: null, //控制index值
  time: null, //控制图片透明度
  count: 0,
  imgurl: [],
  $: function(obj) {
    if (typeof(obj) == "string") {
      if (obj.indexOf("#") >= 0) {
        //有#则表示取得该元素
        obj = obj.replace("#", "")
        if (document.getElementById(obj)) {
          return document.getElementById(obj)
        } else {
          alert("没有容器"+obj)
          return null
        }
      } else {
        //没有#则表示创建元素
        return document.createElement(obj);
      }
    } else {
      // 不是字符串则直接返回
      return obj
    }
  },
  info: function(id) {
    // 最多5个
    this.count = this.count <= 5 ? this.count : 5;
    this.bigbox = this.$(id)
    //循环两次创建图片和下标两个列表元素
    for (var i = 0; i < 2; i++) {
      // 创建元素
      var ul = this.$("ul");
      for (var j=1; j <= this.count; j++) {
        //创建li列表并添加到ul上
        var li = this.$("li");
        li.innerHTML = i==0 ? this.imgurl[j-1] : j;
        ul.appendChild(li)
      }
      // 将创建好的两个列表都添加到html中的标签上
      this.bigbox.appendChild(ul)
    }
    //为列表添加类名
    this.boxul = this.bigbox.getElementsByTagName("ul");
    this.boxul[0].className = "imglist";
    this.boxul[1].className = "countNum";
    this.imglist = this.boxul[0].getElementsByTagName("li");
    this.numlist = this.boxul[1].getElementsByTagName("li");
    this.numlist[0].className = "current"
  },
  // 程序入口
  action: function(id) {
    this.autoplay();
    this.mouseoverout(this.bigbox, this.numlist);
  },
  //图片和index的切换
  imgshow: function(num, numlist, imglist) {
    this.index = num;
    // 给当前下标添加样式
    for (var i = 0; i < numlist.length; i++) {
      numlist[i].className = ""
    }
    numlist[num].className = "current"
    // 先隐藏全部图片
    clearInterval(this.time);

    for (var j=0; j < imglist.length; j++) {
      imglist[j].style.opacity = 0
      imglist[j].style.filter = "alpha(opacity=0)"
    }
    // 停止循环
    // 通过setInterva增加opacity
    var that = this, alpha = 0;
    this.time = setInterval(function() {
      alpha += 2
      if (alpha > 100) {alpha = 100};
      imglist[that.index].style.opacity = alpha/100;
      imglist[that.index].style.filter = "alpha(opacity="+alpha+")";
      // 透明度为100则完成，退出循环
      if (alpha == 100) {clearInterval(that.time)};
    }, 20)
  },
  //自动播放
  autoplay: function() {
    var that = this;
    this.play = setInterval(function(){
      that.index++;
      if (that.index > that.imglist.length-1) {that.index = 0}
      that.imgshow(that.index, that.numlist, that.imglist)
    } , 2000)
  },
  mouseoverout: function(box, numlist) {
    // 控制鼠标进入出去事件
    var that = this;
    box.onmouseover = function() {
      clearInterval(that.play)
    }
    box.onmouseout = function() {
      that.autoplay();
    }
    for (var i=0; i<numlist.length; i++) {
      numlist[i].index = i;
      numlist[i].onmouseover = function() {
        that.imgshow(this.index, that.numlist, that.imglist)
      }
    }
  }
}

window.onload = function() {
  var slide = new Slide();
  slide.count = 3;
  slide.imgurl=[
    "<img src='./images/15314528688398910.jpg'/>",
    "<img src='./images/15312942915553914.jpg'/>",
    "<img src='./images/15312113912538863.jpg'/>"];
  slide.info("#box");   //初始化
  slide.action("#box"); //封装程序入口
}
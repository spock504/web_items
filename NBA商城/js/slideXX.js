  function runImg(){}
  runImg.prototype={
    bigbox:null,//最外层容器
    boxul:null,//子容器ul
    imglist:null,//子容器img
    numlist:null,//子容器countNum
    index:0,//当前显示项
    timer:null,//控制图片转变效果
    play:null,//控制自动播放
    imgurl:[],//存放图片
    count:0,//存放的个数
    $:function(obj)   //通过id获取元素或者创建元素
    {
      if(typeof(obj)=="string")
      {
        if(obj.indexOf("#")>=0)
        {
          obj=obj.replace("#","");
          if(document.getElementById(obj))
          {
            return document.getElementById(obj);
          }
          else
          {
            alert("没有容器"+obj);
            return null;
          } 
        }
        else
        {
          return document.createElement(obj);
        }
      }
      else
      {//不是字符串则返回自身
        return obj;
      }
    },
    //初始化
    info:function(id)
    {
      this.count=this.count<=5?this.count:5;
      this.bigbox=this.$(id);
      for(var i=0;i<2;i++)  //两次循环创建的ul列表分别用于图片和下标
      {
        var ul=this.$("ul");//创建元素
        for(var j=1;j<=this.count;j++)
        {
          var li=this.$("li");
          li.innerHTML=i==0?this.imgurl[j-1]:j; //控制列表项显示的内容
          ul.appendChild(li);
        }
        this.bigbox.appendChild(ul);
      }
      this.boxul=this.bigbox.getElementsByTagName("ul");
      this.boxul[0].className="imgList";
      this.boxul[1].className="countNum";
      this.imglist=this.boxul[0].getElementsByTagName("li");
      this.numlist=this.boxul[1].getElementsByTagName("li");
      this.numlist[0].className="current";
    },
    //封装程序入口
    action:function(id)
    {
      this.autoplay();
      this.mouseoverout(this.bigbox,this.numlist);
    },
    //图片切换效果
    imgshow:function(num,numlist,imglist)
    {
      this.index=num;
      var alpha=0;
      for(var i=0;i<numlist.length;i++)
      {
        numlist[i].className="";
      }
      numlist[this.index].className="current"; //根据index给对应的元素添加类

      clearInterval(this.timer);
      for(var j=0;j<imglist.length;j++)
      {
        imglist[j].style.opacity=0;
        imglist[j].style.filter="alpha(opacity=0)";
      }
      var $this=this;
      //利用透明度来实现切换图片
      this.timer=setInterval(function(){
        alpha+=2;
        if(alpha>100){alpha=100};//不能大于100
        //为兼容性赋样式
        imglist[$this.index].style.opacity=alpha/100;
        imglist[$this.index].style.filter="alpha(opacity="+alpha+")";
        if(alpha==100){clearInterval($this.timer)};//当等于100的时候就切换完成了
      },20)//经测试20是我认为最合适的值
    },
    //自动播放
    autoplay:function(){ //改变index的值
      var $this=this;
      this.play=setInterval(function(){
        $this.index++;
        if($this.index>$this.imglist.length-1){$this.index=0};
          $this.imgshow($this.index,$this.numlist,$this.imglist);
        },2000)
    },
    //处理鼠标事件
    mouseoverout:function(box,numlist)
    {
      var $this=this;
      box.onmouseover=function()
      {
        clearInterval($this.play);
      }
      box.onmouseout=function()
      {
        $this.autoplay();
      }

      for(var i=0;i<numlist.length;i++)
      {
        numlist[i].index=i;   //为每一个下标赋值，用于图片的切换
        numlist[i].onmouseover=function(){
          $this.imgshow(this.index,$this.numlist,$this.imglist);
        }
      }
    }
  }
  window.onload=function(){
    var runimg=new runImg();
    runimg.count=3;
    runimg.imgurl=[
    "<img src='./images/15314528688398910.jpg'/>",
    "<img src='./images/15312942915553914.jpg'/>",
    "<img src='./images/15312113912538863.jpg'/>"];
    runimg.info("#box");
    runimg.action("#box");
  }
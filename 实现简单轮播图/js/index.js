window.addEventListener("load", function() {
  //1、获取元素部分
  //1)获取最外层的盒子
  var box = document.querySelector(".box");
  //2)获取相框inner
  var inner = document.querySelector(".inner");
  //获取相框的宽度
  var imgWidth = inner.offsetWidth;
  //3)获取ul
  var ul = document.querySelector("ul");
  //4)获取左右箭头
  var arrows = document.querySelector("#arrows");
  var arrowleft = arrows.children[0];
  var arrowright = arrows.children[1];
  //5)获取所有的span标签
  var square = document.querySelector(".square");

  // 6)设置变量，moveindex方便记录左右箭头的移动
  var moveindex = 0;
  var imglength = ul.children.length;

  // 7)显示相应的序号的颜色的方法
  function showIndex(obj) {
    //先干掉所有span的背景颜色
    for (let j = 0; j < imglength; j++) {
      square.children[j].className = "";
    }
    //设置当前的span的背景颜色
    obj.className = "current";
  }

  //2、动态生成序号，有几张图片，就生成几个序号
  for (let i = 0; i < imglength; i++) {
    //创建一个span
    var newspan = document.createElement("span");
    //记录当前span的索引号，通过自定义属性来做
    newspan.setAttribute("index", i);
    newspan.innerHTML = i + 1;
    if (i == 0) {
      newspan.className = "current";
    }
    //注册鼠标进入事件
    newspan.addEventListener("mouseenter", function() {
      showIndex(this);
      //当我们点击了某个span标签，就将其索引号赋值给moveindex
      moveindex = this.getAttribute("index");
      //移动ul(移动的距离=每个图片的宽*鼠标放在这个按钮的索引值)
      let targetDistance = -this.getAttribute("index") * imgWidth;
      animate(ul, targetDistance);
    });
    //把生成的span插入到<div class='square'></div>
    square.appendChild(newspan);
  }

  //3、左右箭头部分
  var span = square.children;
  //1)注册鼠标进入事件
  box.addEventListener("mouseenter", function() {
    arrows.style.display = "block";
    //停止定时器
    clearInterval(timer);
  });
  //2)注册鼠标离开事件
  box.addEventListener("mouseleave", function() {
    arrows.style.display = "none";
    timer = setInterval(function() {
      arrowright.click();
    }, 1500);
  });

  //3)右边箭头事件
  //前期准备 克隆第一张图片放到ul最后面
  var firstimg = ul.children[0].cloneNode(true);
  ul.appendChild(firstimg);

  var flag = true; //节流阀
  //注册点击事件
  arrowright.addEventListener("click", function() {
    if (flag) {
      flag = false; //关闭节流阀

      if (moveindex === imglength) {
        ul.style.left = 0 + "px";
        moveindex = 0;
      }
      // console.log("moveindex="+moveindex);
      moveindex++;
      // console.log("移动"+moveindex+"个图片的距离");
      animate(ul, -moveindex * imgWidth, function() {
        flag = true;
      });
      if (moveindex === imglength) {
        showIndex(span[0]);
      } else {
        showIndex(span[moveindex]);
      }
    }
  });
  //4)左箭头事件
  arrowleft.addEventListener("click", function() {
    if (flag) {
      flag = false;
      if (moveindex === 0) {
        moveindex = imglength;
        ul.style.left = -moveindex * imgWidth + "px";
      }
      moveindex--;
      animate(ul, -moveindex * imgWidth, function() {
        flag = true;
      });
      showIndex(span[moveindex]);
    }
  });

  //增加定时器 自动播放功能
  var timer = setInterval(function() {
    //手动调用点击事件
    arrowright.click();
  }, 1500);
});

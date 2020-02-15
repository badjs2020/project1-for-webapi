//简单动画函数封装obj目标对象 target目标位置
function animate(obj, target, callback) {
  //当我们不断调用这个函数，这个元素的速度会越来越快
  //因为开启了太多的定时器
  //解决方案：让我们元素只有一个定时器
  clearInterval(obj.timer);
  obj.timer = setInterval(function() {
    //步长值写到定时器的里面
    //把我们步长值改为整数 不要出现小数问题
    //往大了取整ceil 往小了取整floor
    var distance = target - obj.offsetLeft;
    var step1 = Math.ceil(distance / 10);
    var step2 = Math.floor(distance / 10);
    var step = distance > 0 ? step1 : step2;
    if (obj.offsetLeft == target) {
      //停止动画 本质是停止定时器
      clearInterval(obj.timer);
      // if(callback)
      // {
      //   //调用函数
      //   callback();
      // }
      //要求左边和右边都true的时候才会执行
      callback && callback();
    }
    obj.style.left = obj.offsetLeft + step + "px";
  }, 30);
}

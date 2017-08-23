/**
 * Created by Administrator on 2017/5/16.
 */
window.onload=function() {
// 获取元素
    function $(id) {return document.getElementById(id);}
    var js_slider=$("js_slider");   // 最大的那个盒子
    var slider_main=$("slider_main");   // 放图片的那个盒子
    var slider_ctrl = $("slider_ctrl"); // 放控制图片动画的那个盒子
    var imgs =slider_main.children;     // 获得所有的图片
    var js_slider_1=$("js_slider_1");
    var timer=null;
    var slider_ctrl_center=document.getElementById("slider_ctrl_center");
    var slider_ctrl_prev =slider_ctrl.children[0];
    var slider_ctrl_next =slider_ctrl.children[2];
// 操作元素
    for (var i = 0; i < imgs.length; i++) { // 遍历
        var span=document.createElement("span");    // 生成span 有几张图片就有几个span
        span.className="slider-ctrl-con";   // 生成的span的类名改成"slider-ctrl-con"
        span.innerHTML=imgs.length-i;       // 生成的span里面的内容为 6-0 6-1 6-2 6-3 6-4 6-5
        //slider_ctrl.insertBefore(span,slider_ctrl.children[1]); // 把生成的span放在slider_ctrl里面 的 第二个的前面去
        $("slider_ctrl_center").appendChild(span);
        //把生成的span放进slider_ctrl_center这个div里面去
    }
    var spans=slider_ctrl_center.children;          // slider_ctrl中div的所有孩子
    spans[0].setAttribute("class","slider-ctrl-con current");        // 改变spans里面的第二个span的类名

    // 获得最大的盒子的宽度，也就是 后面动画走的距离
    var scrollWidth=js_slider_1.clientWidth;
    for(var i=1;i<imgs.length;i++)
    {
        imgs[i].style.left=scrollWidth+"px";
    }


    var spanss=slider_ctrl.children;
    var inew=0;                         // 用来控制播放的是哪一张
    for(var k in spanss)
    {
        //console.log(k);
        spanss[k].onclick=function()
        {
            if(this.className=="slider-ctrl-prev")          // 左边的按钮
            {
                animate(imgs[inew],{left:scrollWidth});
                inew--;     // 先自加，后判断
                inew<0?inew=imgs.length-1:inew;
                imgs[inew].style.left=-scrollWidth+"px";
                animate(imgs[inew],{left:0});
                setSquare()
            }
            else if(this.className=="slider-ctrl-next")     // 右边的按钮
            {
                autoplay();
            }
            else  if(this.className=="slider-ctrl-con")
            {                                             // 下面的3个span
                var that=this.innerHTML-1;                // 定义一个  想要点击 的那个 按钮 的索引值
                alert(that);
                if(that>inew)       // 如果点击下面的小span是在当前span的右边，那么等同于右边按钮的做法
                {
                    animate(imgs[inew],{left:-scrollWidth});       // 当前 当前 当前的图片走到左边
                    imgs[that].style.left=scrollWidth+"px";         // 把   要移动  的图片提前放到右边
                    imgs[that].style.display="none";
                    animate(imgs[that],{left:0});                   // 把   要移动  的目标图片移到当前可视区域
                    setSquare()

                }
                else if( that<inew )   // 如果点击下面的小span是在当前span的左边，那么等同于左边按钮的做法
                {
                    animate(imgs[inew],{left:scrollWidth});         // 当前图片走到左边
                    imgs[that].style.left=-scrollWidth+"px";         // 把要移动的图片提前放到左边
                    animate(imgs[that],{left:0});                   // 把要移动的目标图片移到当前可视区域
                    setSquare()
                }
                inew=that;
                animate(imgs[that],{left:0});                   // 把要移动的目标图片移到当前可视区域
                setSquare()
            }

        }
    }


//    一个可以控制播放span的函数   当前的
//    首先先清除所有的span current   留下满足条件的
    function setSquare(){
        for(var i=0;i<spans.length;i++)        // spans有3个   而第一个跟第八个分别是左右的按钮，我们则需要得到1-6个
        {
            spans[i].className="slider-ctrl-con";       // 清除所有的span current
            //console.log(i);
        }
            spans[inew].className="slider-ctrl-con current";
        //console.log(inew.innerHTML-1);
    }

var timer=null;
     timer=setInterval(autoplay,3000);                   // 开启定时器   相当于右侧按钮自动播放
    function autoplay(){
        animate(imgs[inew],{left:-scrollWidth});    // 当前的图片慢慢走到左边
        inew++;     // 先自加，后判断
        inew>imgs.length-1?inew=0:inew;                 // 如果inew大于5就调回第一张图
        imgs[inew].style.left=scrollWidth+"px";         // 把当前图片的下一张立即移到右边
        animate(imgs[inew],{left:0});                   // 点击一次后把下一张移到当前可视区域
        setSquare()
    }
    js_slider.onmouseover=function(){
        clearInterval(timer);
        slider_ctrl_next.style.display="block";
        slider_ctrl_prev.style.display="block";
    };
    js_slider.onmouseout=function(){
        clearInterval(timer);
        slider_ctrl_next.style.display="none";
        slider_ctrl_prev.style.display="none";
        timer=setInterval(autoplay,3000);                   // 开启定时器   相当于右侧按钮自动播放
    }


};












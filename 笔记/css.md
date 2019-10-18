#### HTML

font-family: PingFang SC,Lantinghei SC,Microsoft Yahei,Hiragino Sans GB,Microsoft Sans Serif,WenQuanYi Micro Hei,sans;

```css
   <input type="file" accept="image/*" class="uploadFile file_header">

       position: relative;
	   background-size: 100% 100%;
       display: block; 
       object-fit: contain;
```



### css  公共样式

1 body 横向滚动 
2 溢出隐藏 单行 双行 
3 img border 去掉

4 去掉 input 浏览器默认样式  输入框样式

```css

input:-webkit-autofill {
  box-shadow: 0 0 0 23px #fff inset !important;
}

input::-webkit-input-placeholder {
            color: rgba(170, 183, 205, 1);
            font-size: 16px;
        }
:focus {
    outline: -webkit-focus-ring-color auto 1px;
}
```

### css   sticky footers 布局

```css
<div class="content .clearfix"> </div>
//底部平级
<div class="foot"> </div>

.clearfix{
    display:inline-block;
    &:after{
        display:block;
        content:".";
        height:0;
        line-heighr:0;
        clear:both;
        visibility:hidden;
    }
}
// 背景模糊显示
background-filter:blur(10px)

//边框渐变
   background-clip: padding-box, border-box;
    background-origin: padding-box, border-box;
    background-image: linear-gradient(135deg, #fff, #fff),
    linear-gradient(180deg, rgba(58, 3, 166, 1), rgba(29, 118, 218, 1));
    border: 1px transparent solid;

animation: bounceIn 600ms linear;
```

### 垂直居中

```css
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
```

bootstrap 字体

@font-face {

  font-family: 'Glyphicons Halflings';



  src: url('../fonts/glyphicons-halflings-regular.eot');

  src: url('../fonts/glyphicons-halflings-regular.eot?#iefix') format('embedded-opentype'), url('../fonts/glyphicons-halflings-regular.woff2') format('woff2'), url('../fonts/glyphicons-halflings-regular.woff') format('woff'), url('../fonts/glyphicons-halflings-regular.ttf') format('truetype'), url('../fonts/glyphicons-halflings-regular.svg#glyphicons_halflingsregular') format('svg');

}

.glyphicon {

  position: relative;

  top: 1px;

  display: inline-block;

  font-family: 'Glyphicons Halflings';

  font-style: normal;

  font-weight: normal;

  line-height: 1;



  -webkit-font-smoothing: antialiased;

  -moz-osx-font-smoothing: grayscale;

}

### css 动画

```css
// 缩放
.new>div {
    width: 373px;
    position: relative;
    transition: all 0.6s;
}

.new>div:hover {
    transform: scale(1.1);
}


//CSS3 animate图片自动淡入淡出效果实例页面(Safari/Chrome)
CSS代码：
@-webkit-keyframes fadeInOut {
    0% {
        opacity: 1;
    }

    25% {
        opacity: 0;
    }

    50% {
        opacity: 0;
    }

    75% {
        opacity: 1;
    }
}


.trans_fade_image {
    position: absolute;
    top: 0;
    left: 0;
    -webkit-animation-name: fadeInOut;
    -webkit-animation-timing-function: ease-in-out;
    -webkit-animation-iteration-count: infinite;
    -webkit-animation-duration: 12s;
    -webkit-animation-direction: alternate;
}

.anim_fade_image {
    position: absolute;
    top: 0;
    left: 0;
    -webkit-animation-name: fadeInOut;
    -webkit-animation-timing-function: ease-in-out;
    -webkit-animation-iteration-count: infinite;
    -webkit-animation-duration: 24s;
    -webkit-animation-direction: alternate;
}
HTML代码：
 <img src="img/details_image_01.png" alt="">
<img class="trans_fade_image" src="img/details_image_02.png" alt="">
<img class="anim_fade_image " src="img/details_image_03.png" alt="">



    -webkit-transition: border .2s ease-in-out;
  transition: border .2s ease-in-out;



// 登录效果
-webkit-animation: bounceIn 600ms linear;
    -moz-animation: bounceIn 600ms linear;
    -o-animation: bounceIn 600ms linear;
    animation: bounceIn 600ms linear;
@keyframes bounceIn{
    0% {
    opacity: 0;
    transform: scale(.3);
    }

    50% {
        opacity: 1;
        transform: scale(1.05);
    }
    70% {
        transform: scale(.9);
    }
    100% {
        transform: scale(1);
    }
}

```

```css
//头部动画 http://www.biib.cn/

animation: 1s ease 0s 1 normal none running fuzuo;
@keyframes fuzuo{
    0% {
    transform: translateX(-300px);
    -webkit-transform: translateX(-300px);
    opacity: 0;
    }
    20% {
        opacity: 0;
    }
    100% {
        transform: translateX(0px);
        -webkit-transform: translateX(0px);
        opacity: 1;
    }
}


// 导航动画
<ul class="mob-ulnav">
                <li id="nav_1" style="width: 90px; animation-name: fushang; animation-duration: 0.5s;">
                    <a href="/index.html" title="">彼爱</a>
                </li>
                <li id="nav_2" style="width: 90px; animation-name: fushang; animation-duration: 0.666667s;">
                    <a href="/shuo.html" title="">说说</a>
                </li>              
                
                <li id="nav_3" class="drop" style="width: 90px; animation-name: fushang; animation-duration: 0.833333s;">
                    <a href="/du/index.html" title="">读读<i class="el el-chevron-down"></i></a>
                    <div class="drop-nav orange-text " style="animation: 0.8s ease 0s 1 normal none running zuo1; display: none;">
                        <ul>
                            
                            <li id="nav_77"><a href="/du/77.html">谈天说地</a></li>
                            
                            <li id="nav_78"><a href="/du/78.html">彼爱无岸</a></li>
                            
                            <li id="nav_79"><a href="/du/79.html">人在旅途</a></li>
                            
                            <li id="nav_80"><a href="/du/80.html">完美生活</a></li>
                            
                        </ul>
                       </div>
              
                </li>                                
                <li id="nav_4" class="drop" style="width: 90px; animation-name: fushang; animation-duration: 1s;">
                    <a href="#">找找<i class="el el-chevron-down"></i></a>
                    <div class="drop-nav orange-text " style="display: none;">
                        <ul>                            
                            <li id="nav_60"><a href="/meitu.html">美图欣赏</a></li>
                            <li id="nav_61"><a href="/suiyue.html">岁月留声</a></li>
                            <li id="nav_62"><a href="/guangying.html">光影时代</a></li>
                        </ul>
                    </div>
                </li>                
                <li id="nav_5" style="width: 90px; animation-name: fushang; animation-duration: 1.16667s;">
					<a href="/shou.html" title="">收收</a>
				</li>
                <li id="nav_6" style="width: 90px; animation-name: fushang; animation-duration: 1.33333s;">
                    <a href="/feedback.html">问问</a>
                </li>
                <li id="nav_7" style="width: 90px; animation-name: fushang; animation-duration: 1.5s;">
                    <a href="/link.html" title="">链链</a>
                </li>
                <li id="nav_8" style="width: 90px; animation-name: fushang; animation-duration: 1.66667s;">
                    <a href="/xiang.html">想想</a>
                </li>
             </ul>

@keyframes fushang{
   0% {
    transform: translateX(-300px);
    -webkit-transform: translateX(-300px);
    opacity: 0;
    }
    20% {
        opacity: 0;
    }
    100% {
        transform: translateX(0px);
        -webkit-transform: translateX(0px);
        opacity: 1;
    } 
}


```

### jq

```js
$(document).ready(function(){
  $("div").delegate("p","click",function(){
    $(this).slideToggle();
  });
  $("button").click(function(){
    $("<p>这是一个新段落。</p>").insertAfter("button");
  });
});

```


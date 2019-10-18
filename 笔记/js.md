#### js页面返回

```javascript
// 页面返回
var backurl = document.referrer;
if (backurl.indexOf("type=2") > -1) {
    setTimeout(function () {
        $(".newsTit").find("span").eq(1).click();
    }, 200)
}

 <div class="classifyItem" onclick="base.commonAjax('jhotel/findList','SortType=3','index.findListBack');">
     
<script type="text/javascript">
	$(".content li a").each(function(){ 
    if($(this)[0].href==String(window.location)){ 
      $(this).addClass("active").siblings().removeClass("active"); 
    } 
 }); 
	var $index = $('body').attr('page');
	$('.tableItem').eq($index).addClass('active');
	$('.tableItem').click(function(){
		$('tableItem').removeClass('active');
		$(this).addClass('active');
		$('.tableItem').eq($index).addClass('active');
	});
	$(".title .petro_item").click(function() {
		$(this).next(".content").slideToggle();
	});
</script>

// 返回验证

    var obj = data.data;
    $(".form").find("input[type='text']").each(function (i, v) {
        var title = $(v).attr("name");
        if (title) {
            if (userData.roleId == 1) {
                if (title != "birthDate") {
                    $("." + title).val(obj[title])
                } else if (obj.birthDate) {
                    $(".birthDate").val(timetransform.formatDateTime4(obj.birthDate))
                }
            } else {
                $("." + title).val(removeHTMLTag(obj[title]))
            }

        }
    });
    $(".form").find("textarea").each(function (i, v) {
        $(v).attr("placeholder", "")
        var title = $(v).attr("name");
        if (title && $("." + title)) {
            if (userData.roleId == 1) {
                $("." + title).val(obj[title])
            } else {
                $("." + title).val(removeHTMLTag(obj[title]))

            }

        }
    });

//文件大小
 var fileSize = (data.list[0].fileSize / 1024 / 1024).toFixed(2);
            if (parseInt(fileSize) < 1) {
                fileSize = (data.list[0].fileSize / 1024).toFixed(2) + ' Kb';
            } else {
                fileSize = fileSize + ' Mb';
            }
            $('.zptgxs').val('格式为 ' + data.list[0].fileFormat + ' 的文件1份，文件大小为 ' + fileSize);

//向下取整数
left score = Math.floor(this.scro*2)/2;
left gas = score%1 !=0


```

#### 判断设备

```js
var sUserAgent = navigator.userAgent;
if (sUserAgent.indexOf('Android') > -1 || sUserAgent.indexOf('iPhone') > -1 || sUserAgent.indexOf('iPad') > -1 || sUserAgent.indexOf('iPod') > -1 || sUserAgent.indexOf('Symbian') > -1) {
    location.href = 'http://39.98.176.245';
}
```



#### 验证

```javascript
 onkeyup="jtlr($(this))"
// 验证数字
  function jtlr($this) {
      var value = $this.val();
      if (isNaN(value)) {
          $($this).attr("placeholder", "请输入数字");
          $($this).val("");
      }
  }


 //验证姓名
    pattern: function () {
        var w = /^[\u4e00-\u9fa5]{2,4}$/g;
        return w;
    },
    //验证名称
    pattern1: function () {
        var w = /^[\u4e00-\u9fa5]{2,10}$/g;
        return w;
    },
    pattern2: function () {
        var w = /^[\u4e00-\u9fa5]{0,15}$/g;
        return w;
    },
    //验证长名称
    patternLong: function () {
        var w = /^[\u4e00-\u9fa5]{2,50}$/g;
        return w;
    },
    //验证符号
    pattern3: function () {
        var w = /[%#&+=?$\/]/im;
        return w;
    },
    //验证数字
    numtern: function () {
        var num = new RegExp("^[0-9]*[1-9][0-9]*$");
        return num;
    },
    numtern2: function () {
        var num = new RegExp("^[0-9]+(.[0-9]{2})?$");
        return num;
    },
    //验证密码
    passwordVerify: function () {
        var s = /^(?![0-9]+$)(?![a-zA-Z]+$)[a-zA-Z\d]{8,16}$/;
        return s;
    },
    //验证电话
    phoneVerify: function () {
        var p = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
        return p;
    },
    //验证邮箱
    emailVerify: function () {
        var e = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
        return e;
    }
```



#### 身份证信息回填

```javascript
  //  <div><input type="text" placeholder="请输入证件号" class="" id="identityNumber" name="identityNumber"
    //                             onBlur="NumberBlur(this)" onFocus="textFocus(this)" /><span class="error error2"></span>
    //                     </div>


    //定义地区数组
    var CityArray = {
        11: "北京",
        12: "天津",
        13: "河北",
        14: "山西",
        15: "内蒙古",
        21: "辽宁",
        22: "吉林",
        23: "黑龙江",
        31: "上海",
        32: "江苏",
        33: "浙江",
        34: "安徽",
        35: "福建",
        36: "江西",
        37: "山东",
        41: "河南",
        42: "湖北",
        43: "湖南",
        44: "广东",
        45: "广西",
        46: "海
        50: "重庆",
        51: "四川",
        52: "贵州",
        53: "云南",
        54: "西藏",
        61: "陕西",
        62: "甘肃",
        63: "青海",
        64: "宁夏",
        65: "新疆",
        71: "台湾",
        81: "香港",
        82: "澳门",
        91: "国外"
    }
    //验证身份证及返回地区、出生年月、性别
    function CheckIdCard(sId) {
        if (sId.length == 15) {
            sId = sId.replace(/([\d]{6})(\d{9})/, "$119$2x");
        }
        var iSum = 0
        var info = ""
        if (!/^\d{17}(\d|x)$/i.test(sId)) return "非法的身份证号";
        sId = sId.replace(/x$/i, "a");
        if (CityArray[parseInt(sId.substr(0, 2))] == null) return "Error:非法地区";
        sBirthday = sId.substr(6, 4) + "-" + Number(sId.substr(10, 2)) + "-" + Number(sId.substr(12, 2));
        var d = new Date(sBirthday.replace(/-/g, "/"))
        if (sBirthday != (d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate())) return "Error:非法生日";
        for (var i = 17; i >= 0; i--) iSum += (Math.pow(2, i) % 11) * parseInt(sId.charAt(17 - i), 11)
        if (iSum % 11 != 1) return "Error:非法证号";
        return CityArray[parseInt(sId.substr(0, 2))] + "," + sBirthday + "," + (sId.substr(16, 1) % 2 ? "男" : "女")

    }
    //调用验证方法
    function NumberBlur(e) {
        var id = e.value;
        if (id != "") {
            var xinxi = CheckIdCard(id)
            // console.log(xinxi, xinxi.split(",")[2])
            if (xinxi.split(",")[2] == "男") {
                $("#gender").val(1)
            } else {
                $("#gender").val(2)
            }
            $("#birth").val(xinxi.split(",")[1])
            $("#hujisuozaidi").val(xinxi.split(",")[0])
        }
    }


```

#### scrollTop滚动

```js
var $objTr = null //找到要定位的地方  tr 
 if ($(this).text() == "核心优势") {
        $objTr = $(".conte_item1")
    }
// $objTr.css("background-color", "lightgray"); //设置要定位地方的css 
    var objTr = $objTr[0]; //转化为dom对象 
    $("html").animate({ scrollTop: objTr.offsetTop }, "slow"); //定位tr 

// 跑马灯效果
<div id="demo" style="overflow:hidden;height:150px;width:500px;">
    <table align="left" cellpadding="0" cellspace="0" border="0">
        <tr>
            <td id="demo1" valign="top">
                <img src="/images/01-1.png" alt="" />
                <img src="/images/01-2.png" alt="" />
                <img src="/images/01-3.png" alt="" />
                <img src="/images/01-4.png" alt="" />
                <img src="/images/01-5.png" alt="" />
                <img src="/images/01.png" alt="" />
                <img src="/images/01.png" alt="" />
            </td>
            <td id="demo2" valign="top">
            </td>
        </tr>
    </table>
</div>
<script language="javascript">
    //不间断滚屏
    var speed = 1
    demo2.innerHTML = demo1.innerHTML

    function Marquee() {
        if (demo2.offsetWidth - demo.scrollLeft <= 0)
            demo.scrollLeft -= demo1.offsetWidth
        else {
            demo.scrollLeft++
        }
    }
    var MyMar = setInterval(Marquee, speed)
    demo.onmouseover = function () {
        clearInterval(MyMar)
    }
    demo.onmouseout = function () {
        MyMar = setInterval(Marquee, speed)
    }
</script>
 

```



#### layUI插件时间范围

```javascript
    $(function () {
        //时间
        laydate.render({
            elem: '#startTime2',
            type: 'date',
            done: function (value, date, endDate) {
                var startDate = new Date(value).getTime();
                var endTime = new Date($('#startTime3').val()).getTime(); //结束
                if (endTime < startDate) {
                    layer.msg('结束时间不能小于开始时间');
                    $('#startTime2').val($('#startTime3').val());
                }
            }
        });
        laydate.render({
            elem: '#startTime3',
            type: 'date',
            done: function (value, date, endDate) {
                var startDate = new Date($('#startTime2').val()).getTime();
                var endTime = new Date(value).getTime();
                if (endTime < startDate) {
                    layer.msg('结束时间不能小于开始时间');
                    $('#startTime3').val($('#startTime2').val());
                }

            }
        });
    });

 layui.use('form', function () { //此段代码必不可少
                var form = layui.form;
                form.render();
            });
```

#### 创建formData

```javascript
  var formData = new FormData();
     formData.append("file", fileList);
     formData.append("uLoginname", uLoginname);
     formData.append("uLoginpwd", uLoginpwd);
     formData.append("gasTationCode", gasTationCode);

```

#### 删除最后一个

```javascript
 ids = ids..substring(0, ids.lastIndexOf(','))

$(document).keypress(function (e) {
    if ((e.keyCode || e.which) == 13) {
        $("#searchBtn2").click();
    }
});
```

#### 验证html标签

```javascript
function removeHTMLTag(str) {
    if (str.indexOf("<p>") > -1) {
        str = str.replace(/<\/?[^>]*>/g, ''); //去除HTML tag
        str = str.replace(/[ | ]*\n/g, '\n'); //去除行尾空白
        //str = str.replace(/\n[\s| | ]*\r/g,'\n'); //去除多余空行
        str = str.replace(/&nbsp;/ig, ''); //去掉&nbsp;
        return str;
    } else {
        return str;
    }

}
```

#### swiper

```js
mySwiper.init();//现在才初始化
updateOnImagesReady  //当所有的内嵌图像（img标签）加载完成后Swiper会重新初始化。使用此选项需要先开启preloadImages: true

grabCursor设置为true时，鼠标覆盖Swiper时指针会变成手掌形状，拖动时指针会变成抓手形状。（根据浏览器形状有所不同）
```


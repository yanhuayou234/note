var _url = "http://cyy.rrzhongbao.com/chanyeyuan/";
// var _url = "http://61.177.139.217:9100/chanyeyuan/"
var sessioncyy = JSON.parse(localStorage.getItem("sessioncyy"));
if (sessioncyy) {
  var token = sessioncyy.token;
}
$(function() {
  if ($(".index_header").length > 0) {
    // var rczp_href = $(".index_header .nav ul li").eq(3).find("a").attr("href");
    // var fudt_href = $(".index_header .nav ul li").eq(6).find("a").attr("href");
    if (!sessioncyy) {
      $(".index_header .nav ul li")
        .eq(3)
        .find("a")
        .attr("href", "javaScript:;");
      $(".index_header .nav ul li")
        .eq(6)
        .children("a")
        .attr("href", "javaScript:;");
      $(".index_header .nav ul")
        .find("li")
        .on("click", "a", function() {
          if (
            this.textContent == "人才招聘" ||
            this.textContent == "服务大厅"
          ) {
            // alert("请您登录或注册")
            Window.location.href = "/login.html";
          }
        });
    }
  }
});

if ($("#hiden").find("input").length > 0) {
  $("#hiden")
    .find("input")
    .val(token);
}

function timeFormat(time) {
  var date = new Date(time);
  Y = date.getFullYear() + "-";
  M =
    (date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1) + "-";
  D = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  h = (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
  m =
    (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
    ":";
  s = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
  return Y + M + D;
}

var myDate = new Date();
var day = myDate.getDay();
if (day == 1) {
  day = "一";
} else if (day == 2) {
  day = "二";
} else if (day == 3) {
  day = "三";
} else if (day == 4) {
  day = "四";
} else if (day == 5) {
  day = "五";
} else if (day == 6) {
  day = "六";
} else if (day == 0) {
  day = "日";
}

var moth = myDate.getMonth() + 1;

$(function() {
  $(".login_time").text(
    myDate.getFullYear() +
      "年  " +
      moth +
      "月" +
      myDate.getDate() +
      "日   " +
      "   星期 " +
      day
  );
});

//公共方法

var base = {
  cartoken: function() {
    var token = this.cookie("cartoken");
    if (!token) {
      return false;
    }
    return token;
  },
  nage: function() {
    var type_id = base.cartoken("type_id");
  },

  jumpPage: function(url) {
    window.location.href = url;
  },

  getObjUrl: function(file) {
    var url = null;
    // 下面函数执行的效果是一样的，只是需要针对不同的浏览器执行不同的 js 函数而已
    if (window.createObjectURL != undefined) {
      // basic
      url = window.createObjectURL(file);
    } else if (window.URL != undefined) {
      // mozilla(firefox)
      url = window.URL.createObjectURL(file);
    } else if (window.webkitURL != undefined) {
      // webkit or chrome
      url = window.webkitURL.createObjectURL(file);
    }
    return url;
  },
  baseurl: "http://cyy.rrzhongbao.com/chanyeyuan/", //公共的url,url前不加http://默认认为相对路径，会截取当前地址的头部
  // baseurl: 'http://61.177.139.217:9100/chanyeyuan/', //公共的url,url前不加http://默认认为相对路径，会截取当前地址的头部

  commonAjax: function(thisurl, thisdata, funcName) {
    //引用ajax的方法
    $.ajax({
      url: this.baseurl + thisurl, //获取数据的url
      dateType: "json", //参数返回的类型
      type: "POST", //参数传送的方式
      data: thisdata,
      traditional: true,
      async: true,
      cache: false,
      header: {
        "Content-Type": "application/json;charset=utf-8"
      },
      success: function(data) {
        //请求成功后的回调函数
        if (typeof data == "string") {
          data = $.parseJSON(data);
        }
        if (typeof eval(funcName) == "function") {
          eval(funcName)(data);
          return true;
        }
      }
    });
  },

  formAjax: function(thisurl, thisdata, obj, funcName) {
    // console.log(funcName);
    $.ajax({
      url: this.baseurl + thisurl, //获取数据的url
      dateType: "json", //参数返回的类型
      type: "post", //参数传送的方式
      data: thisdata,
      xhr: function() {
        //获取ajaxSettings中的xhr对象，为它的upload属性绑定progress事件的处理函数
        myXhr = $.ajaxSettings.xhr();
        if (myXhr.upload) {
          //检查upload属性是否存在
          //绑定progress事件的回调函数
          var progress = $(".progress");
          //console.log(progress)
          myXhr.upload.addEventListener(
            "progress",
            base.progressHandlingFunction,
            false
          );
        }
        return myXhr; //xhr对象返回给jQuery使用
      },
      contentType: false,
      processData: false,
      success: function(data) {
        //请求成功后的回调函数
        if (typeof eval(funcName) == "function") {
          eval(funcName)(data);
          return true;
        }
      }
    });
  },
  GetQueryString: function(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
  },
  cookie: function(name, value, options) {
    if (typeof value != "undefined") {
      options = options || {};
      if (value === null) {
        value = "";
        options.expires = -1;
      }
      var expires = "";
      if (
        options.expires &&
        (typeof options.expires == "number" || options.expires.toUTCString)
      ) {
        var date;
        if (typeof options.expires == "number") {
          date = new Date();
          date.setTime(date.getTime() + options.expires * 24 * 60 * 60 * 1000);
        } else {
          date = options.expires;
        }
        expires = "; expires=" + date.toUTCString();
      }
      var path = options.path ? "; path=" + options.path : "";
      var domain = options.domain ? "; domain=" + options.domain : "";
      var secure = options.secure ? "; secure" : "";
      document.cookie = [
        name,
        "=",
        encodeURIComponent(value),
        expires,
        path,
        domain,
        secure
      ].join("");
    } else {
      var cookieValue = null;
      if (document.cookie && document.cookie != "") {
        var cookies = document.cookie.split(";");
        for (var i = 0; i < cookies.length; i++) {
          var cookie = jQuery.trim(cookies[i]);
          if (cookie.substring(0, name.length + 1) == name + "=") {
            cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
            break;
          }
        }
      }
      return cookieValue;
    }
  },
  //倒数
  discount: function() {
    if (Time != 0) {
      $(".getCode")
        .removeAttr("onclick")
        .html(Time + "秒");
      Time--;
      setTimeout(base.discount, 1000);
    } else {
      $(".getCode")
        .attr("onclick", "getCode()")
        .html("重新获取");
    }
  }
};

var codeAjax = function() {
  $.ajax({
    type: "GET",
    async: false,
    url: _url + "imgcode/getImgCode",
    success: function(data) {
      if (data.code == 1) {
        $(".code")
          .find("img")
          .attr({
            src: data.imgbese,
            id: data.imgId
          });
      }
    }
  });
};
codeAjax();
$(".code").on("click", "img", function() {
  codeAjax();
});
//post ajax

$(".fudat_ul").on("click", "li", function(e) {
  if (this.textContent == "申请入驻") {
    if (sessioncyy.type == 2) {
      location.href = "SettledIn.html";
    } else {
    }
  }
});

function getUrl() {
  if (sessioncyy.type == 1) {
    alert("非企业账户,不能预定公共区域");
  } else {
    location.href = "/PublicReservation.html";
  }
}
// img 上传
//上传图片
$(".img_up")
  .find("input[type='file']")
  .on("change", function() {
    // console.log(this.files[0], "41144441515")
    Imgup(
      $(this).val(),
      this.files[0],
      $(this)
        .parents(".img_up")
        .find("img")
    );
  });
// 合板的
var Common = {};
Common.getParams = function(paramString) {
  paramString = window.location.href.split("?")[1] || "";
  var params = {};
  if (paramString !== "") {
    const kvs = paramString.replace("?", "").split("&");
    for (let i = 0; i < kvs.length; i++) {
      let kv = kvs[i].split("=");
      params[kv[0]] = kv[1];
    }
  }
  return params;
};
window.params = Common.getParams();

Common.equalStatus = function(result) {
  return result.statusMsg === "success";
};

Common.Nav = function(options) {
  this.el = jQuery(options.id);
  this.menuData = null;
  this.options = options || {};
  this.url = options.url;
  this.load();
  this.bindEvents();
};

Common.Nav.prototype = {
  load: function() {
    var self = this;
    jQuery.ajax({
      url: self.url,
      success: function(result) {
        if (Common.equalStatus(result)) {
          self.menuData = result.list || result.data;
          self.init();
          self.options.successCb && self.options.successCb(result);
        } else {
          alert(result.message);
        }
      }
    });
  },
  init: function() {
    var html = [];
    var data = this.menuData;
    data.forEach(function(item) {
      html.push(
        '<li role="presentation" class="nav-li"><a href="#">' +
          (item.title || item.name) +
          "</a></li>"
      );
    });
    this.el.append(html.join(""));
  },
  bindEvents: function() {
    var self = this;
    this.el.on("click", ".nav-li", function(e) {
      var index = jQuery(this).index() - 1;
      jQuery(this)
        .addClass("li-active")
        .siblings()
        .removeClass("li-active");

      self.options.onItemClick.call(self, {
        itemIndex: index,
        menuData: self.menuData,
        id: self.menuData[index].id
      });
    });
  }
};

Date.prototype.Format = function(fmt) {
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    S: this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (this.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
  return fmt;
};

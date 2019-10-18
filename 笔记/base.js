//获取文件名称
function getFileName(path) {
    var pos1 = path.lastIndexOf('/');
    var pos2 = path.lastIndexOf('\\');
    var pos = Math.max(pos1, pos2);
    if (pos < 0) {
        return path;
    } else {
        return path.substring(pos + 1);
    }
}




//公共方法
var base = {
    cartoken: function () {
        var token = this.cookie('cartoken');
        if (!token) {
            return false;
        }
        return token;
    },
    nage: function () {
        var type_id = base.cartoken('type_id');
    },
    jumpPage: function (url) {
        window.location.href = url;
    },
    getObjUrl: function (file) {
        var url = null;
        // 下面函数执行的效果是一样的，只是需要针对不同的浏览器执行不同的 js 函数而已
        if (window.createObjectURL != undefined) { // basic
            url = window.createObjectURL(file);
        } else if (window.URL != undefined) { // mozilla(firefox)
            url = window.URL.createObjectURL(file);
        } else if (window.webkitURL != undefined) { // webkit or chrome
            url = window.webkitURL.createObjectURL(file);
        }
        return url;
    },
    baseurl: 'http://39.104.109.31/petro',
    // baseurl: 'http://39.98.37.28/petro', //公共的url,url前不加http://默认认为相对路径，会截取当前地址的头部
    // baseurl: 'http://localhost:8080/petro', //公共的url,url前不加http://默认认为相对路径，会截取当前地址的头部
    commonAjax: function (thisurl, thisdata, funcName) { //引用ajax的方法
        $.ajax({
            url: this.baseurl + thisurl, //获取数据的url
            dateType: 'json', //参数返回的类型
            type: 'POST', //参数传送的方式
            data: thisdata,
            traditional: true,
            async: true,
            header: {
                "Content-Type": "application/json;charset=utf-8"
            },
            success: function (data) { //请求成功后的回调函数
                if (typeof (data) == 'string') {
                    data = $.parseJSON(data);
                }
                if (typeof (eval(funcName)) == 'function') {
                    eval(funcName)(data);
                    return true;
                }
            }
        })
    },
    commonJson: function (thisurl, thisdata, funcName) { //引用ajax的方法
        $.ajax({
            url: this.baseurl + thisurl, //获取数据的url
            dateType: 'json', //参数返回的类型
            type: 'POST', //参数传送的方式
            data: thisdata,
            traditional: true,
            contentType: "application/json;charset=utf-8",
            async: true,
            success: function (data) { //请求成功后的回调函数
                if (typeof (data) == 'string') {
                    data = $.parseJSON(data);
                }
                if (typeof (eval(funcName)) == 'function') {
                    eval(funcName)(data);
                    return true;
                }
            }
        })
    },
    formAjax: function (thisurl, thisdata, obj, funcName) {
        console.log(funcName);
        $.ajax({
            url: this.baseurl + thisurl, //获取数据的url
            dateType: 'json', //参数返回的类型
            type: 'post', //参数传送的方式
            data: thisdata,
            traditional: true, //传数组
            xhr: function () { //获取ajaxSettings中的xhr对象，为它的upload属性绑定progress事件的处理函数
                myXhr = $.ajaxSettings.xhr();
                if (myXhr.upload) { //检查upload属性是否存在
                    //绑定progress事件的回调函数
                    var progress = $('.progress');
                    //console.log(progress)
                    myXhr.upload.addEventListener('progress', base.progressHandlingFunction, false);
                }
                return myXhr; //xhr对象返回给jQuery使用
            },
            contentType: false,
            processData: false,
            success: function (data) { //请求成功后的回调函数
                if (typeof (eval(funcName)) == 'function') {
                    eval(funcName)(data);
                    return true;
                }
            }
        })
    },
    GetQueryString: function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    },
    cookie: function (name, value, options) {
        if (typeof value != 'undefined') {
            options = options || {};
            if (value === null) {
                value = '';
                options.expires = -1;
            }
            var expires = '';
            if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
                var date;
                if (typeof options.expires == 'number') {
                    date = new Date();
                    date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
                } else {
                    date = options.expires;
                }
                expires = '; expires=' + date.toUTCString();
            }
            var path = options.path ? '; path=' + options.path : '';
            var domain = options.domain ? '; domain=' + options.domain : '';
            var secure = options.secure ? '; secure' : '';
            document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
        } else {
            var cookieValue = null;
            if (document.cookie && document.cookie != '') {
                var cookies = document.cookie.split(';');
                for (var i = 0; i < cookies.length; i++) {
                    var cookie = jQuery.trim(cookies[i]);
                    if (cookie.substring(0, name.length + 1) == (name + '=')) {
                        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                        break;
                    }
                }
            }
            return cookieValue;
        }
    },
    //倒数
    discount: function () {
        if (Time != 0) {
            $('.getCode').removeAttr('onclick').html(Time + '秒');
            Time--;
            setTimeout(base.discount, 1000);
        } else {
            $('.getCode').attr('onclick', 'getCode()').html('重新获取');
        }
    }
};
//用户
var user = {
    registerBack: function (data) {
        console.log(data);
        if (data.code == 1) {
            alert('发送成功，请注意查收');
            Time = 60;
            base.discount();
        }
    },
    saveBack: function (data) {
        console.log(data);
        if (data.code == 1) {
            alert('注册成功，点击去登陆！');
            base.jumpPage('login.html');
        }
    },
    loginBack: function (data) {
        console.log(data);
        if (data.code == 1) {
            alert('登陆成功，点击跳转首页');
            base.jumpPage('index.html');
        }
    },
    forgetPasswordBack: function (data) {
        console.log(data);
        if (data.code == 1) {
            alert('密码修改成功，点击去登陆！');
            base.jumpPage('login.html');
        }
    }
};
//验证
var HtmlUtil = {
    /*1.用浏览器内部转换器实现html转码*/
    htmlEncode: function (html) {
        //1.首先动态创建一个容器标签元素，如DIV
        var temp = document.createElement("div");
        //2.然后将要转换的字符串设置为这个元素的innerText(ie支持)或者textContent(火狐，google支持)
        (temp.textContent != undefined) ? (temp.textContent = html) : (temp.innerText = html);
        //3.最后返回这个元素的innerHTML，即得到经过HTML编码转换的字符串了
        var output = temp.innerHTML;
        temp = null;
        return output;
    },
    /*2.用浏览器内部转换器实现html解码*/
    htmlDecode: function (text) {
        //1.首先动态创建一个容器标签元素，如DIV
        var temp = document.createElement("div");
        //2.然后将要转换的字符串设置为这个元素的innerHTML(ie，火狐，google都支持)
        temp.innerHTML = text;
        //3.最后返回这个元素的innerText(ie支持)或者textContent(火狐，google支持)，即得到经过HTML解码的字符串了。
        var output = temp.innerText || temp.textContent;
        temp = null;
        return output;
    },
    /*3.用正则表达式实现html转码*/
    htmlEncodeByRegExp: function (str) {
        var s = "";
        if (str.length == 0) return "";
        s = str.replace(/&/g, "&amp;");
        s = s.replace(/</g, "&lt;");
        s = s.replace(/>/g, "&gt;");
        s = s.replace(/ /g, "&nbsp;");
        s = s.replace(/\'/g, "&#39;");
        s = s.replace(/\"/g, "&quot;");
        return s;
    },
    /*4.用正则表达式实现html解码*/
    htmlDecodeByRegExp: function (str) {
        var s = "";
        if (str.length == 0) return "";
        s = str.replace(/&amp;/g, "&");
        s = s.replace(/&lt;/g, "<");
        s = s.replace(/&gt;/g, ">");
        s = s.replace(/&nbsp;/g, " ");
        s = s.replace(/&#39;/g, "\'");
        s = s.replace(/&quot;/g, "\"");
        return s;
    },
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
};
var timetransform = {
    //时间转换
    formatDateTime: function (inputTime) {
        var date = new Date(inputTime);
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        var h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        var minute = date.getMinutes();
        var second = date.getSeconds();
        minute = minute < 10 ? ('0' + minute) : minute;
        second = second < 10 ? ('0' + second) : second;
        return y + '年' + m + '月' + d + '日';
    },
    formatDateTime1: function (inputTime) {
        var date = new Date(inputTime);
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        var h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        var minute = date.getMinutes();
        var second = date.getSeconds();
        minute = minute < 10 ? ('0' + minute) : minute;
        second = second < 10 ? ('0' + second) : second;
        return y + '年' + m + '月' + d + '日' + ' ' + h + ':' + minute + ':' + second;
    },
    formatDateTime2: function (inputTime) {
        var date = new Date(inputTime);
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        var h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        var minute = date.getMinutes();
        minute = minute < 10 ? ('0' + minute) : minute;
        return y + '/' + m + '/' + d;
    },
    formatDateTime3: function (inputTime) {
        var date = new Date(inputTime);
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        var h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        var minute = date.getMinutes();
        minute = minute < 10 ? ('0' + minute) : minute;
        return y + '/' + m + '/' + d + ' ' + h + ':' + minute;
    },
    formatDateTime4: function (inputTime) {
        var date = new Date(inputTime);
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        var h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        var minute = date.getMinutes();
        minute = minute < 10 ? ('0' + minute) : minute;
        return y + '-' + m + '-' + d;
    },
    formatDateTime5: function (inputTime) {
        var date = new Date(inputTime);
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        var h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        var minute = date.getMinutes();
        minute = minute < 10 ? ('0' + minute) : minute;
        return y + '-' + m + '-' + d + ' ' + h + ':' + minute;
    },
    formatDateTime6: function (inputTime) {
        var date = new Date(inputTime);
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        var h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        var minute = date.getMinutes();
        minute = minute < 10 ? ('0' + minute) : minute;
        return y + '.' + m + '.' + d;
    },
    formatDateYear: function (inputTime) {
        var date = new Date(inputTime);
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        var h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        var minute = date.getMinutes();
        minute = minute < 10 ? ('0' + minute) : minute;
        return y
    },
    formatDateMont: function (inputTime) {
        var date = new Date(inputTime);
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        var h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        var minute = date.getMinutes();
        minute = minute < 10 ? ('0' + minute) : minute;
        return m
    },
};
// 全选
function allChecked(inputEle_all, inputEle_one) {
    $(inputEle_all).click(function (event) {
        if ($(this).attr('checked')) {
            $(this).attr('checked', false);
            $(this).val('0');
            $(inputEle_one).attr({
                'checked': false
            });
            $(inputEle_one).prop({
                'checked': false
            });
            $(inputEle_one).val('0');
        } else {
            $(this).attr('checked', true);
            $(this).val('1');
            $(inputEle_one).attr({
                'checked': true
            });
            $(inputEle_one).prop({
                'checked': true
            });
            $(inputEle_one).val('1');
        }
    });
}
// 单个选择
function oneChecked(inputEle_all, inputEle_one) {
    $(inputEle_one).click(function (event) {
        var flag = false;
        if ($(this).attr('checked')) {
            $(this).attr('checked', false);
            $(this).val('0');
        } else {
            $(this).attr('checked', true);
            $(this).val('1');
        }
        $(inputEle_one).each(function (index, val) {
            if ($(val).attr('checked')) {
                flag = true;
            } else {
                flag = false;
                return false;
            }
        });
        if (flag) {
            $(inputEle_all).attr('checked', true);
            $(inputEle_all).prop('checked', true);
        } else {
            $(inputEle_all).attr('checked', false);
            $(inputEle_all).prop('checked', false);
        }
    });
}
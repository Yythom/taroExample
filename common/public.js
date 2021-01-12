/* eslint-disable no-unused-vars */
/**
 * var url = "http://.....?a=10";
 * @param {url参数名} name 
 */

function GetUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

/**
 * 格式化金额
 * @param {金额} amount 
 * @param {保留小数位} n 
 */
function formatAmount(amount, decimals) {
    var s = "";
    if (amount) {
        s = amount + ""
    }
    if (s === "" || s === undefined || s === null) return "0.00";
    var n = 0;
    n = decimals > 0 && decimals <= 20 ? decimals : 2;
    s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
    var l = s.split(".")[0].split("").reverse(),
        r = s.split(".")[1];
    var t = "";
    for (var i = 0; i < l.length; i++) {
        t += l[i] + ((i + 1) % 3 === 0 && (i + 1) !== l.length ? "," : "");
    }

    return t.split("").reverse().join("") + "." + r;
}

/**
 * 解析时间戳转化日期
 */
function format(timestamp) {
    function add0(m) { return m < 10 ? '0' + m : m }
    var time = new Date(timestamp);
    var y = time.getFullYear();
    var m = time.getMonth() + 1;
    var d = time.getDate();
    var h = time.getHours();
    var mm = time.getMinutes();
    var s = time.getSeconds();
    return y + '-' + add0(m) + '-' + add0(d) + ' ' + add0(h) + ':' + add0(mm) + ':' + add0(s);
}

/**
*判断访问终端
*/
function browser() {
    let browsers = {
        versions: function () {
            var u = navigator.userAgent, app = navigator.appVersion;
            return {
                trident: u.indexOf('Trident') > -1, //IE内核
                presto: u.indexOf('Presto') > -1, //opera内核
                webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,//火狐内核
                mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
                iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
                iPad: u.indexOf('iPad') > -1, //是否iPad
                webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
                weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
                qq: u.match(/\sQQ/i) == " qq" //是否QQ
            };
        }(),
        language: (navigator.browserLanguage || navigator.language).toLowerCase()
    }
    return browsers
}

/**
   * 验证是否是空对象
   * @static
   * @param {*} obj
   */
function isEmptyObject(obj) {
    if (!obj || !typeof obj == "object") {
        return false;
    }
    if (JSON.stringify(obj) == "{}") {
        return false;
    }
    return true;
}


/**
   * 手机号验证
   * @param tel
   */
function isPhoneNumber(tel) {
    var reg = /^0?1[3|4|5|6|7|8|9][0-9]\d{8}$/;
    return reg.test(tel);
}

/**
   * 验证姓名
   * @param name
   */
function getName(name) {
    var nameReg = /^[\u4e00-\u9fa5]{1,}((·[\u4e00-\u9fa5]{1,}){0,1})$/;
    return nameReg.test(name)
}

/**
   * 身份证号码验证
   *
   * @param cardNo
   *            {String} 证件号码
   * @returns info {Object} 身份证信息.
   *
   */
function getIdCardInfo(cardNo) {
    /*
        isTrue: false, // 身份证号是否有效。默认为 false
        year: null,// 出生年。默认为null
        month: null,// 出生月。默认为null
        day: null,// 出生日。默认为null
        isMale: false,// 是否为男性。默认false
        isFemale: false // 是否为女性。默认false
    */
    let [isTrue, year, month, day, isMale, isFemale] = [false, null, null, null, false, false];
    if (cardNo) {
        const isEven = n => n % 2 === 0;
        if (15 === cardNo.length) {
            [year, month, day] = [1900 + +cardNo.substring(6, 8), +cardNo.substring(8, 10), +cardNo.substring(10, 12)]
            const birthday = new Date(year, month - 1, day);
            if (birthday.getFullYear() === year && birthday.getMonth() === month - 1 && birthday.getDate() === day) {
                isTrue = true;
                isEven(cardNo.substring(14, 15)) ? isFemale = true : isMale = true;
            }
        } else if (18 === cardNo.length) {
            [year, month, day] = [+cardNo.substring(6, 10), +cardNo.substring(10, 12), +cardNo.substring(12, 14)];
            const birthday = new Date(year, month - 1, day);
            if (birthday.getFullYear() === year && birthday.getMonth() === month - 1 && birthday.getDate() === day) {
                const Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1];
                const Y = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2];
                let _cardNo = Array.from(cardNo); // reset: let _cardNo = [...cardNo];
                if (_cardNo[17].toLowerCase() === 'x') {
                    _cardNo[17] = 10;
                }
                let sum = 0; // 声明加权求和变量
                for (let i = 0; i < 17; i++) {
                    sum += Wi[i] * _cardNo[i];// 加权求和
                }
                const i = sum % 11;// 得到验证码所位置
                if (+_cardNo[17] === Y[i]) {
                    isTrue = true;
                    isEven(+cardNo.substring(16, 17)) ? isFemale = true : isMale = true;
                }
            }
        }
    }
    if (!isTrue) [year, month, day, isMale, isFemale] = [];
    return { isTrue, year, month, day, isMale, isFemale };
}
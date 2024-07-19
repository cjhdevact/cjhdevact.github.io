(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var Base64 = (function () {
  function Base64() {
    _classCallCheck(this, Base64);

    // private property
    this._keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  }

  _createClass(Base64, {
    encode: {
      value: function encode(input) {
        if (typeof input === "object" && input !== null && input !== undefined) {
          input = JSON.stringify(input);
        }
        var output = "",
            chr1 = undefined,
            chr2 = undefined,
            chr3 = undefined,
            enc1 = undefined,
            enc2 = undefined,
            enc3 = undefined,
            enc4 = undefined,
            i = 0;
        input = Base64._utf8_encode(input);
        while (i < input.length) {
          chr1 = input.charCodeAt(i++);
          chr2 = input.charCodeAt(i++);
          chr3 = input.charCodeAt(i++);
          enc1 = chr1 >> 2;
          enc2 = (chr1 & 3) << 4 | chr2 >> 4;
          enc3 = (chr2 & 15) << 2 | chr3 >> 6;
          enc4 = chr3 & 63;
          if (isNaN(chr2)) {
            enc3 = enc4 = 64;
          } else if (isNaN(chr3)) {
            enc4 = 64;
          }
          output = output + this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) + this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
        }
        return output;
      }
    },
    decode: {
      value: function decode(input) {
        var output = "",
            chr1 = undefined,
            chr2 = undefined,
            chr3 = undefined,
            enc1 = undefined,
            enc2 = undefined,
            enc3 = undefined,
            enc4 = undefined,
            i = 0;
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (i < input.length) {
          enc1 = this._keyStr.indexOf(input.charAt(i++));
          enc2 = this._keyStr.indexOf(input.charAt(i++));
          enc3 = this._keyStr.indexOf(input.charAt(i++));
          enc4 = this._keyStr.indexOf(input.charAt(i++));
          chr1 = enc1 << 2 | enc2 >> 4;
          chr2 = (enc2 & 15) << 4 | enc3 >> 2;
          chr3 = (enc3 & 3) << 6 | enc4;
          output = output + String.fromCharCode(chr1);
          if (enc3 != 64) {
            output = output + String.fromCharCode(chr2);
          }
          if (enc4 != 64) {
            output = output + String.fromCharCode(chr3);
          }
        }
        output = Base64._utf8_decode(output);
        return output;
      }
    }
  }, {
    _utf8_encode: {
      value: function _utf8_encode(string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
          var c = string.charCodeAt(n);
          if (c < 128) {
            utftext += String.fromCharCode(c);
          } else if (c > 127 && c < 2048) {
            utftext += String.fromCharCode(c >> 6 | 192);
            utftext += String.fromCharCode(c & 63 | 128);
          } else {
            utftext += String.fromCharCode(c >> 12 | 224);
            utftext += String.fromCharCode(c >> 6 & 63 | 128);
            utftext += String.fromCharCode(c & 63 | 128);
          }
        }
        return utftext;
      }
    },
    _utf8_decode: {
      value: function _utf8_decode(utftext) {
        var string = "",
            i = 0,
            c = 0,
            c1 = 0,
            c2 = 0,
            c3 = 0;
        while (i < utftext.length) {
          c = utftext.charCodeAt(i);
          if (c < 128) {
            string += String.fromCharCode(c);
            i++;
          } else if (c > 191 && c < 224) {
            c2 = utftext.charCodeAt(i + 1);
            string += String.fromCharCode((c & 31) << 6 | c2 & 63);
            i += 2;
          } else {
            c2 = utftext.charCodeAt(i + 1);
            c3 = utftext.charCodeAt(i + 2);
            string += String.fromCharCode((c & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
            i += 3;
          }
        }
        return string;
      }
    }
  });

  return Base64;
})();

module.exports = new Base64();

},{}],2:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var LogUtil = _interopRequire(require("../LogUtil"));

var Base64 = _interopRequire(require("../Base64"));

// Native调用前台的类

var release = false;
var fnMap = {};
var keyMap = {};
var resultJson = {};
// 触发执行code的监听事件
var fireKeyFns = function (code, data) {
  if (keyMap[code]) {
    keyMap[code].map(function (fn) {
      resultJson.data = fn(data);
    });
  }
};

var NativeCaller = (function () {
  function NativeCaller() {
    _classCallCheck(this, NativeCaller);
  }

  _createClass(NativeCaller, null, {
    addKeyListener: {
      /**
       *
       *
       * @static 添加执行code的监听事件
       * @param {*} code
       * @param {*} fn 方法
       * @memberof NativeCaller
       */

      value: function addKeyListener(code, fn) {
        if (!keyMap[code]) {
          keyMap[code] = [];
        }
        keyMap[code].push(fn);
      }
    },
    registerFn: {

      /**
       *
       * @static 注册全局方法给native用,以后可能会废弃
       * @param {*} fName 方法名
       * @param {*} fn 方法体
       * @memberof NativeCaller
       */

      value: function registerFn(fName, fn) {
        if (typeof fName === "string" && fn && (typeof fn === "object" || typeof fn === "function")) {
          if (fnMap[fName]) {
            throw new Error("" + fName + " has been defined");
          }
          fnMap[fName] = fn;
          if (!release) {
            window[fName] = fn;
          }
        }
      }
    },
    fireWindowFn: {
      value: function fireWindowFn(fName, data) {
        if (window[fName] && typeof window[fName] === "function") {
          window[fName](data);
        }
      }
    },
    run: {

      /**
       *
       *
       * @static 执行
       * @param {*} jsonStr native 传json字符串
       * @returns 字符串JSON.stringify
       * @memberof NativeCaller
       */

      value: function run(jsonStr) {
        var json = jsonStr;
        if (typeof jsonStr === "string") {
          LogUtil.devLog("native run data:" + json);
          try {
            json = JSON.parse(jsonStr);
          } catch (error) {
            LogUtil.devLog("nativecaller run error: " + error);
          }
        }
        var code = json.code;
        var data = json.data;

        fireKeyFns(code, data);
        return resultJson.data;
      }
    },
    runWithBase64: {

      /**
       *
       *
       * @static 执行
       * @param {*} jsonStr native 传json字符串
       * @returns 字符串JSON.stringify
       * @memberof NativeCaller
       */

      value: function runWithBase64(jsonStr) {
        var json = jsonStr;
        if (typeof jsonStr === "string") {
          LogUtil.devLog("native 64 run data:" + json);
          try {
            json = Base64.decode(jsonStr);
            LogUtil.devLog("nativecaller 64 decode result: " + json);
            json = JSON.parse(json);
          } catch (error) {
            LogUtil.devLog("nativecaller 64 run error: " + error);
          }
        }
        var code = json.code;
        var data = json.data;

        fireKeyFns(code, data);
        return JSON.stringify({});
      }
    }
  });

  return NativeCaller;
})();

// 把对象挂在window上,供native调用
window.NativeCaller = NativeCaller;

module.exports = NativeCaller;

},{"../Base64":1,"../LogUtil":14}],3:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _InterfaceJson = require("./InterfaceJson");

var JS_CALL = _InterfaceJson.JS_CALL;
var CAN_USE_MOBILE = _InterfaceJson.CAN_USE_MOBILE;
var NETWORK_WARN_TEXT = _InterfaceJson.NETWORK_WARN_TEXT;
var USE_MOBILE = _InterfaceJson.USE_MOBILE;
var HAS_MEDIA = _InterfaceJson.HAS_MEDIA;
var GET_ATTR = _InterfaceJson.GET_ATTR;
var SUCCESS_CB = _InterfaceJson.SUCCESS_CB;
var ERROR_CB = _InterfaceJson.ERROR_CB;
var COMPLETE_CB = _InterfaceJson.COMPLETE_CB;

var _InterfaceProtocol = require("../InterfaceProtocol");

var JS_INTERFACE_TOGGLEPRAISE = _InterfaceProtocol.JS_INTERFACE_TOGGLEPRAISE;
var JS_INTERFACE_REFRESHPRAISE = _InterfaceProtocol.JS_INTERFACE_REFRESHPRAISE;
var JS_INTERFACE_ROAST = _InterfaceProtocol.JS_INTERFACE_ROAST;
var JS_UPDATE_MODAL_STATUS = _InterfaceProtocol.JS_UPDATE_MODAL_STATUS;
var SUBMIT_COMMENT = _InterfaceProtocol.SUBMIT_COMMENT;
var JS_INTERFACE_TAGTOGGLED = _InterfaceProtocol.JS_INTERFACE_TAGTOGGLED;
var JS_INTERFACE_UPDATECOMMENTSFROMNATIVE = _InterfaceProtocol.JS_INTERFACE_UPDATECOMMENTSFROMNATIVE;

var LogUtil = _interopRequire(require("../LogUtil"));

var callInterfaceHook = require("../Util").callInterfaceHook;

var Base64 = _interopRequire(require("../Base64"));

var Interface = null;
var inited = false;

// 判断接口是否可用
var isInterfaceValid = function () {
  if (Interface) {
    return true;
  }
  return false;
};
var callNative = function (json) {
  var options = arguments[1] === undefined ? {} : arguments[1];

  var callHook = callInterfaceHook.bind(options);
  if (!isInterfaceValid()) {
    callHook(ERROR_CB, json);
    callHook(COMPLETE_CB, json);
    return false;
  }
  var option = json;
  if (typeof json === "object") {
    option = JSON.stringify(option);
  }
  var result = JSON.stringify({});
  try {
    result = Interface.jsCaller(option);
  } catch (error) {
    LogUtil.devLog("" + json.code + " error:" + error);
  }
  if (typeof result === "string") {
    LogUtil.devLog("returnValue:" + result);
    try {
      result = JSON.parse(result);
    } catch (err) {
      LogUtil.devLog(err);
    }
  }
  if (Object.keys(result).length === 0) {
    callHook(ERROR_CB, json);
  } else {
    callHook(SUCCESS_CB, result.data);
  }
  callHook(COMPLETE_CB, result.message);
  return result;
};
var callNativeWithBase64 = function (json) {
  var options = arguments[1] === undefined ? {} : arguments[1];

  var callHook = callInterfaceHook.bind(options);
  if (!isInterfaceValid()) {
    callHook(ERROR_CB, json);
    callHook(COMPLETE_CB, json);
    return false;
  }
  var jsonStr = json;
  if (typeof jsonStr === "object") {
    jsonStr = JSON.stringify(jsonStr);
  }
  jsonStr = Base64.encode(jsonStr);
  var result = Base64.encode(JSON.stringify({}));
  try {
    result = Interface.jsCallerWithBase64(jsonStr);
  } catch (error) {
    LogUtil.devLog("" + json.code + " 64 error:" + error);
  }
  if (typeof result === "string") {
    LogUtil.devLog("returnValue64:" + result);
    try {
      result = Base64.decode(result);
      result = JSON.parse(result);
    } catch (err) {
      LogUtil.devLog(err);
    }
  }
  if (Object.keys(result).length === 0) {
    callHook(ERROR_CB, json);
  } else {
    callHook(SUCCESS_CB, result.data);
  }
  callHook(COMPLETE_CB, result.message);
  return result;
};
// 初始化interface接口
var initNativeInterface = function () {
  if (inited) {
    return false;
  }
  if (window.Tips) {
    Interface = window.Tips;
  }
  inited = true;
};

initNativeInterface();

var WebCaller = (function () {
  function WebCaller() {
    _classCallCheck(this, WebCaller);
  }

  _createClass(WebCaller, null, {
    getMobileWarnStatus: {
      /**
       *
       *
       * @static 获得是否允许使用数据流浪的状态
       * @memberof WebCaller
       */

      value: function getMobileWarnStatus(options) {
        callNative(JS_CALL[CAN_USE_MOBILE], options);
      }
    },
    getNetworkWarnText: {

      /**
      *
      *
      * @static 获得数据流量提示文字
      * @memberof WebCaller
      */

      value: function getNetworkWarnText(options) {
        callNative(JS_CALL[NETWORK_WARN_TEXT], options);
      }
    },
    agreeUseMobile: {

      /**
       *
       *
       * @static 同意使用数据流量
       * @memberof WebCaller
       */

      value: function agreeUseMobile(options) {
        callNative(JS_CALL[USE_MOBILE], options);
      }
    },
    pageHasMedia: {

      /**
       *
       *
       * @static 通知native 页面有视频
       * @memberof WebCaller
       */

      value: function pageHasMedia(data, options) {
        var json = JS_CALL[HAS_MEDIA];
        if (data) {
          try {
            json.data = Object.assign(json.data, data);
          } catch (error) {
            json.data = data;
          }
        }
        callNative(json, options);
      }
    },
    getDefs: {

      /**
       *
       *
       * @static 通过字串ID获得系统ID值
       * @param {*} data
       * @param {*} options
       * @memberof WebCaller
       */

      value: function getDefs(data, options) {
        var json = JS_CALL[GET_ATTR];
        if (data) {
          try {
            json.data = Object.assign(json.data, data);
          } catch (error) {
            json.data = data;
          }
        }
        callNative(json, options);
      }
    },
    togglePraise: {

      /**
       *
       *
       * @static 点赞/取消点赞触发
       * @param {*} data
       * @param {*} options
       * @memberof WebCaller
       */

      value: function togglePraise(data, options) {
        var json = JS_CALL[JS_INTERFACE_TOGGLEPRAISE];
        if (data) {
          try {
            json.data = Object.assign(json.data, data);
          } catch (error) {
            json.data = data;
          }
        }
        callNativeWithBase64(json, options);
      }
    },
    refreshPraise: {

      /**
       *
       *
       * @static 刷新点赞状态
       * @param {*} data
       * @param {*} options
       * @memberof WebCaller
       */

      value: function refreshPraise(data, options) {
        var json = JS_CALL[JS_INTERFACE_REFRESHPRAISE];
        if (data) {
          try {
            json.data = Object.assign(json.data, data);
          } catch (error) {
            json.data = data;
          }
        }
        callNativeWithBase64(json, options);
      }
    },
    openRoastActionSheet: {

      /**
       *
       *
       * @static 刷新点赞状态
       * @param {*} data
       * @param {*} options
       * @memberof WebCaller
       */

      value: function openRoastActionSheet(data, options) {
        var json = JS_CALL[JS_INTERFACE_ROAST];
        if (data) {
          try {
            json.data = Object.assign(json.data, data);
          } catch (error) {
            json.data = data;
          }
        }
        callNativeWithBase64(json, options);
      }
    },
    updateModalStatus: {

      /**
       *
       *
       * @static 刷新点赞状态
       * @param {*} data
       * @param {*} options
       * @memberof WebCaller
       */

      value: function updateModalStatus(data, options) {
        var json = JS_CALL[JS_UPDATE_MODAL_STATUS];
        if (data) {
          try {
            json.data = Object.assign(json.data, data);
          } catch (error) {
            json.data = data;
          }
        }
        callNativeWithBase64(json, options);
      }
    },
    submitComment: {

      /**
       *
       *
       * @static 提交吐槽
       * @param {*} data
       * @param {*} options
       * @memberof WebCaller
       */

      value: function submitComment(data, options) {
        var json = JS_CALL[SUBMIT_COMMENT];
        if (data) {
          try {
            json.data = Object.assign(json.data, data);
          } catch (error) {
            json.data = data;
          }
        }
        callNativeWithBase64(json, options);
      }
    },
    tagToggled: {

      /**
       *
       *
       * @static 标签状态更新
       * @param {*} data
       * @param {*} options
       * @memberof WebCaller
       */

      value: function tagToggled(data, options) {
        var json = JS_CALL[JS_INTERFACE_TAGTOGGLED];
        if (data) {
          try {
            json.data = Object.assign(json.data, data);
          } catch (error) {
            json.data = data;
          }
        }
        callNativeWithBase64(json, options);
      }
    },
    updateCommentsFromNative: {

      /**
       *
       *
       * @static 提交吐槽
       * @param {*} data
       * @param {*} options
       * @memberof WebCaller
       */

      value: function updateCommentsFromNative(data, options) {
        var json = JS_CALL[JS_INTERFACE_UPDATECOMMENTSFROMNATIVE];
        if (data) {
          try {
            json.data = Object.assign(json.data, data);
          } catch (error) {
            json.data = data;
          }
        }
        callNativeWithBase64(json, options);
      }
    }
  });

  return WebCaller;
})();

module.exports = WebCaller;

},{"../Base64":1,"../InterfaceProtocol":13,"../LogUtil":14,"../Util":17,"./InterfaceJson":4}],4:[function(require,module,exports){
"use strict";

var _defineProperty = function (obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _InterfaceProtocol = require("../InterfaceProtocol");

var JS_INTERFACE_TOGGLEPRAISE = _InterfaceProtocol.JS_INTERFACE_TOGGLEPRAISE;
var JS_INTERFACE_REFRESHPRAISE = _InterfaceProtocol.JS_INTERFACE_REFRESHPRAISE;
var JS_INTERFACE_UPDATECOMMENTSFROMNATIVE = _InterfaceProtocol.JS_INTERFACE_UPDATECOMMENTSFROMNATIVE;
var JS_INTERFACE_ROAST = _InterfaceProtocol.JS_INTERFACE_ROAST;
var JS_INTERFACE_TAGTOGGLED = _InterfaceProtocol.JS_INTERFACE_TAGTOGGLED;
var SUBMIT_COMMENT = _InterfaceProtocol.SUBMIT_COMMENT;
var JS_UPDATE_MODAL_STATUS = _InterfaceProtocol.JS_UPDATE_MODAL_STATUS;
var JS_INTERFACE_VIEW_MANUAL_FIRST_TOPIC = _InterfaceProtocol.JS_INTERFACE_VIEW_MANUAL_FIRST_TOPIC;
var JS_INTERFACE_RESOURCEINFO = _InterfaceProtocol.JS_INTERFACE_RESOURCEINFO;
var SUCCESS_CB = "onSuccess";
exports.SUCCESS_CB = SUCCESS_CB;
var ERROR_CB = "onError";
exports.ERROR_CB = ERROR_CB;
var COMPLETE_CB = "onComplete";
exports.COMPLETE_CB = COMPLETE_CB;
var CAN_USE_MOBILE = "canUseMobile";
exports.CAN_USE_MOBILE = CAN_USE_MOBILE;
var NETWORK_WARN_TEXT = "netWorkWarnText";
exports.NETWORK_WARN_TEXT = NETWORK_WARN_TEXT;
var USE_MOBILE = "useMobile";
exports.USE_MOBILE = USE_MOBILE;
var HAS_MEDIA = "hasMedia";
exports.HAS_MEDIA = HAS_MEDIA;
var GET_ATTR = "getAttr";
exports.GET_ATTR = GET_ATTR;
var CODE_NATIVE = (function () {
  var _CODE_NATIVE = {};

  _defineProperty(_CODE_NATIVE, CAN_USE_MOBILE, 10001);

  _defineProperty(_CODE_NATIVE, NETWORK_WARN_TEXT, 10002);

  _defineProperty(_CODE_NATIVE, USE_MOBILE, 10006);

  _defineProperty(_CODE_NATIVE, HAS_MEDIA, 10004);

  _defineProperty(_CODE_NATIVE, GET_ATTR, 10010);

  _defineProperty(_CODE_NATIVE, JS_INTERFACE_REFRESHPRAISE, 10020);

  _defineProperty(_CODE_NATIVE, JS_INTERFACE_TOGGLEPRAISE, 100021);

  _defineProperty(_CODE_NATIVE, JS_INTERFACE_UPDATECOMMENTSFROMNATIVE, 10030);

  _defineProperty(_CODE_NATIVE, JS_INTERFACE_ROAST, 10031);

  _defineProperty(_CODE_NATIVE, JS_INTERFACE_TAGTOGGLED, 10032);

  _defineProperty(_CODE_NATIVE, SUBMIT_COMMENT, 10033);

  _defineProperty(_CODE_NATIVE, JS_UPDATE_MODAL_STATUS, 10034);

  _defineProperty(_CODE_NATIVE, JS_INTERFACE_VIEW_MANUAL_FIRST_TOPIC, 10070);

  _defineProperty(_CODE_NATIVE, JS_INTERFACE_RESOURCEINFO, 10050);

  return _CODE_NATIVE;
})();
exports.CODE_NATIVE = CODE_NATIVE;
var CODE_JS = (function () {
  var _CODE_JS = {};

  _defineProperty(_CODE_JS, CAN_USE_MOBILE, 90001);

  _defineProperty(_CODE_JS, NETWORK_WARN_TEXT, 90002);

  _defineProperty(_CODE_JS, USE_MOBILE, 90006);

  _defineProperty(_CODE_JS, HAS_MEDIA, 90004);

  _defineProperty(_CODE_JS, GET_ATTR, 90010);

  _defineProperty(_CODE_JS, JS_INTERFACE_REFRESHPRAISE, 90020);

  _defineProperty(_CODE_JS, JS_INTERFACE_TOGGLEPRAISE, 90021);

  _defineProperty(_CODE_JS, JS_INTERFACE_UPDATECOMMENTSFROMNATIVE, 90030);

  _defineProperty(_CODE_JS, JS_INTERFACE_ROAST, 90031);

  _defineProperty(_CODE_JS, JS_INTERFACE_TAGTOGGLED, 90032);

  _defineProperty(_CODE_JS, SUBMIT_COMMENT, 90033);

  _defineProperty(_CODE_JS, JS_UPDATE_MODAL_STATUS, 90034);

  _defineProperty(_CODE_JS, JS_INTERFACE_VIEW_MANUAL_FIRST_TOPIC, 90070);

  return _CODE_JS;
})();
exports.CODE_JS = CODE_JS;
var JS_CALL = (function () {
  var _JS_CALL = {};

  _defineProperty(_JS_CALL, CAN_USE_MOBILE, {
    code: CODE_JS[CAN_USE_MOBILE],
    message: "js get : need show mobile dialog" });

  _defineProperty(_JS_CALL, NETWORK_WARN_TEXT, {
    code: CODE_JS[NETWORK_WARN_TEXT],
    message: "js get : mobile tip text" });

  _defineProperty(_JS_CALL, USE_MOBILE, {
    code: CODE_JS[USE_MOBILE],
    message: "js call : user agree use mobile" });

  _defineProperty(_JS_CALL, HAS_MEDIA, {
    code: CODE_JS[HAS_MEDIA],
    message: "js call: page has media",
    data: true });

  _defineProperty(_JS_CALL, GET_ATTR, {
    code: CODE_JS[GET_ATTR],
    message: "js call: get attr by id",
    data: [] });

  _defineProperty(_JS_CALL, JS_INTERFACE_REFRESHPRAISE, {
    code: CODE_JS[JS_INTERFACE_REFRESHPRAISE],
    message: "get praise status",
    data: {
      funNum: "",
      resourceType: "",
      Identifier: "" } });

  _defineProperty(_JS_CALL, JS_INTERFACE_TOGGLEPRAISE, {
    code: CODE_JS[JS_INTERFACE_TOGGLEPRAISE],
    message: "click praise",
    data: {
      funNum: "",
      resourceType: "",
      status: 1 } });

  _defineProperty(_JS_CALL, JS_INTERFACE_UPDATECOMMENTSFROMNATIVE, {
    code: CODE_JS[JS_INTERFACE_UPDATECOMMENTSFROMNATIVE],
    message: "get tags from native",
    data: {
      funNum: "",
      resourceType: "" } });

  _defineProperty(_JS_CALL, JS_INTERFACE_ROAST, {
    code: CODE_JS[JS_INTERFACE_ROAST],
    message: "open roast actionsheet",
    data: {
      funNum: "",
      resourceType: "" } });

  _defineProperty(_JS_CALL, JS_INTERFACE_TAGTOGGLED, {
    code: CODE_JS[JS_INTERFACE_TAGTOGGLED],
    message: "tag toggles",
    data: {
      funNum: "",
      resourceType: "" } });

  _defineProperty(_JS_CALL, SUBMIT_COMMENT, {
    code: CODE_JS[SUBMIT_COMMENT],
    message: "sumit raost data",
    data: {
      funNum: "",
      resourceType: "" } });

  _defineProperty(_JS_CALL, JS_UPDATE_MODAL_STATUS, {
    code: CODE_JS[JS_UPDATE_MODAL_STATUS],
    message: "update modal status",
    data: {
      funNum: "",
      resourceType: "",
      action: "",
      type: "" } });

  return _JS_CALL;
})();
exports.JS_CALL = JS_CALL;

},{"../InterfaceProtocol":13}],5:[function(require,module,exports){
"use strict";

var _defineProperty = function (obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); };

Object.defineProperty(exports, "__esModule", {
  value: true
});
// 常用的常量
var HONOR_THEME = "HONOR";
var HUAWEI_THEME = "HUAWEI";
var NOVA_THEME = "NOVA";
var themeOptions = (function () {
  var _themeOptions = {};

  _defineProperty(_themeOptions, HONOR_THEME, {
    color: "#00B1FF",
    className: HONOR_THEME.toLowerCase()
  });

  _defineProperty(_themeOptions, HUAWEI_THEME, {
    color: "#007DFF",
    className: HUAWEI_THEME.toLowerCase()
  });

  _defineProperty(_themeOptions, NOVA_THEME, {
    color: "#00B1FF",
    className: NOVA_THEME.toLowerCase()
  });

  return _themeOptions;
})();
var TIPSAPPTYPE = "TIPS";
var HIAPPTYPE = "HIVOICE";
var PROTOCOLS_EXP = /jumptocard|jumptopage|jumptoweb|#openmanualdetail|#openmanual|jumptosubject/i;
var NOT_EXIST = "NOT EXIST THIS KEY";
var UG = "ug";

exports.TIPSAPPTYPE = TIPSAPPTYPE;
exports.HIAPPTYPE = HIAPPTYPE;
exports.PROTOCOLS_EXP = PROTOCOLS_EXP;
exports.NOT_EXIST = NOT_EXIST;
exports.UG = UG;
exports.themeOptions = themeOptions;

},{}],6:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var LogUtil = _interopRequire(require("../LogUtil"));

var Controller = (function () {
  function Controller(options) {
    _classCallCheck(this, Controller);

    var cName = options.cName;
    var target = options.target;

    this.ctrlName = cName;
    this.target = target;
  }

  _createClass(Controller, {
    init: {
      value: function init() {
        this.initView();
        this.initEvent();
        this.initCallbackForNative();
      }
    },
    initView: {

      /**
       * 处理视图
       *
       * @memberof Controller
       */

      value: function initView() {
        LogUtil.devLog(this.ctrlName);
      }
    },
    initEvent: {

      /**
       * 处理事件
       *
       * @memberof Controller
       */

      value: function initEvent() {
        LogUtil.devLog(this.ctrlName);
      }
    },
    initCallbackForNative: {

      /**
       *  初始化一些native要调用的一些回调
       *
       * @memberof Controller
       */

      value: function initCallbackForNative() {
        LogUtil.devLog(this.ctrlName);
      }
    },
    afterShow: {
      value: function afterShow() {
        LogUtil.devLog(this.ctrlName);
      }
    },
    run: {
      value: function run() {
        if (!this.target) {
          return false;
        }
        this.init();
      }
    }
  });

  return Controller;
})();

module.exports = Controller;

},{"../LogUtil":14}],7:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _toConsumableArray = function (arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var has = require("../Util").has;

var Base64 = _interopRequire(require("../Base64"));

var _Constants = require("../Constants");

var NOT_EXIST = _Constants.NOT_EXIST;
var themeOptions = _Constants.themeOptions;

var JS_UPDATE_MODAL_STATUS = require("../InterfaceProtocol").JS_UPDATE_MODAL_STATUS;

var Param = _interopRequire(require("../Param"));

var _DomUtil = require("../DomUtil");

var initButtonPressActive = _DomUtil.initButtonPressActive;
var domListToArray = _DomUtil.domListToArray;
var initScrollClass = _DomUtil.initScrollClass;
var addStyleRule = _DomUtil.addStyleRule;
var getFunNum = _DomUtil.getFunNum;
var getResourceType = _DomUtil.getResourceType;

var NativeCaller = _interopRequire(require("../Caller/CallerForNative"));

var LogUtil = _interopRequire(require("../LogUtil"));

var NativeSdk = _interopRequire(require("../najssdk"));

var lastValidComment = {};
var modified = false;
var commented = false;
var allTags = {};
var selectedTags = {
  contentTags: [],
  functionTags: [] };
var funNum = getFunNum();
var resourceType = getResourceType();

/**
 * 评价数据管理
 */
var CommentStore = {
  /**
   * 获得上次提交的有效数据
   *
   * @returns json
   */
  getLastValidComment: function getLastValidComment() {
    return JSON.parse(JSON.stringify(lastValidComment));
  },
  /**
         * 设置上次提交的有效数据,cancel可使用
         * @param json
         */
  setLastValidComment: function setLastValidComment(json) {
    lastValidComment = JSON.parse(JSON.stringify(json));
  },
  /**
         * 提交/重新提交时的回调
         */
  submit: function submit() {
    var _this = this;

    return new Promise(function (resolve) {
      if (_this.getSelectedSize() > 0 && _this.getModifiedStatus()) {
        var tags = CommentStore.getSelectedTags();
        var commentTime = new Date().getTime();
        var contentTags = tags.contentTags;
        var functionTags = tags.functionTags;

        _this.setLastValidComment({ contentTags: contentTags, functionTags: functionTags, commentTime: commentTime });
        _this.setModifiedStatus(false);
        _this.setCommentedStatus(true);
        var arg = {
          contentTags: contentTags,
          functionTags: functionTags,
          commentTime: commentTime,
          funNum: funNum,
          resourceType: resourceType };
        try {
          NativeSdk.submitComment(arg);
        } catch (error) {
          LogUtil.devLog("submit error: " + error);
        }
        resolve();
      }
    });
  },
  /**
         * 取消/关闭/返回操作时的回调
         */
  cancel: function cancel() {
    var _this = this;

    return new Promise(function (resolve) {
      if (_this.getModifiedStatus()) {
        var lastComment = _this.getLastValidComment();
        _this.setSelectedTags({
          contentTags: lastComment.contentTags || [],
          functionTags: lastComment.functionTags || [] });
        _this.setModifiedStatus(false);
        resolve(true);
      } else {
        _this.setModifiedStatus(false);
        resolve(false);
      }
    });
  },
  /**
         * 设置吐槽状态
         * @param boo
         */
  setCommentedStatus: function setCommentedStatus(boo) {
    commented = boo;
  },
  /**
        * 获得编辑状态
        * @returns {boolean}
        */
  getModifiedStatus: function getModifiedStatus() {
    return modified;
  },
  /**
         * 设置编辑状态
         * @param boo
         */
  setModifiedStatus: function setModifiedStatus(boo) {
    modified = boo;
  },
  /**
         * 重新提交操作时,更新编辑状态
         */
  updateModifiedStatus: function updateModifiedStatus() {
    var sT = this.getSelectedTags();
    var lT = {
      contentTags: lastValidComment.contentTags,
      functionTags: lastValidComment.functionTags };
    if (JSON.stringify(sT) === JSON.stringify(lT)) {
      this.setModifiedStatus(false);
    } else {
      this.setModifiedStatus(true);
    }
  },
  /**
         * 获得被选中的标签
         * @param key
         * @param origin
         * @returns {*}
         */
  getSelectedTags: function getSelectedTags(key) {
    var origin = arguments[1] === undefined ? false : arguments[1];

    if (origin === true) {
      if (has.call(selectedTags, key)) {
        return selectedTags[key];
      }
      return selectedTags;
    }
    if (has.call(selectedTags, key)) {
      return JSON.parse(JSON.stringify(selectedTags[key]));
    }
    return JSON.parse(JSON.stringify(selectedTags));
  },
  /**
         * data校验
         * @returns {boolean}
         */
  isDataValid: function isDataValid() {
    var result = false;
    Object.values(allTags).some(function (item) {
      if (item.length > 0) {
        result = true;
        return result;
      }
    });
    return result;
  },
  /**
         * 设置选中标签的值
         * @param contentTags
         * @param functionTags
         */
  setSelectedTags: function setSelectedTags(_ref) {
    var contentTags = _ref.contentTags;
    var functionTags = _ref.functionTags;

    selectedTags.contentTags = contentTags;
    selectedTags.functionTags = functionTags;
  },
  /**
         * 获得选中标签的个数
         * @returns {number}
         */
  getSelectedSize: function getSelectedSize() {
    var size = 0;
    Object.values(selectedTags).map(function (item) {
      size += item.length;
    });
    return size;
  },
  /**
         * 是否已经评价过
         * @returns {boolean}
         */
  isCommented: function isCommented() {
    return commented;
  },
  /**
         * 搜索目标tag
         * @param tag
         * @param key
         * @returns {{key: *, index: number}}
         */
  findTargetTag: function findTargetTag(_ref) {
    var tag = _ref.tag;
    var key = _ref.key;

    var selected = this.getSelectedTags(key);
    var result = {
      key: key,
      index: -1,
      tag: tag };

    if (selected instanceof Array) {
      selected.some(function (item, index) {
        if (item.id === tag.id) {
          result.index = index;
          return true;
        }
      });
    } else {
      Object.values(selected).some(function (value) {
        if (value instanceof Array) {
          value.some(function (item, index) {
            if (item.id === tag.id) {
              result.index = index;
              return true;
            }
          });
        }
        return result.index > -1;
      });
    }
    return result;
  },
  /**
         * 设置所有的tags
         * 兼容老数据
         * @param json
         */
  setAllTags: function setAllTags(_ref) {
    var contentTags = _ref.contentTags;
    var functionTags = _ref.functionTags;

    allTags = {
      contentTags: [],
      functionTags: [] };
    if (contentTags instanceof Array && functionTags instanceof Array) {
      var _allTags$contentTags, _allTags$functionTags;

      (_allTags$contentTags = allTags.contentTags).push.apply(_allTags$contentTags, _toConsumableArray(contentTags));
      (_allTags$functionTags = allTags.functionTags).push.apply(_allTags$functionTags, _toConsumableArray(functionTags));
    }
    if (allTags.contentTags.length === 0 && allTags.functionTags.length === 0) {
      throw new Error();
    }
  },
  /**
         * 获取对应key的对应星级评分的标签
         * @param key
         * @returns {*|Array}
         */
  getTags: function getTags(key) {
    if (has.call(allTags, key)) {
      return JSON.parse(JSON.stringify(allTags[key]));
    }
    return JSON.parse(JSON.stringify(allTags));
  },
  /**
         * 点击某个tag时的回调函数
         * @param item
         * @param key
         * @param dom
         */
  toggleTagItem: function toggleTagItem(_ref) {
    var item = _ref.item;
    var key = _ref.key;

    var selected = this.getSelectedTags(key, true);
    var tagInfo = this.findTargetTag({ tag: item, key: key });
    if (tagInfo.index > -1) {
      selected.splice(tagInfo.index, 1);
      tagInfo.method = "DELETE";
    } else {
      selected.push(item);
      tagInfo.method = "ADD";
    }
    this.updateModifiedStatus();
    delete tagInfo.index;
    return tagInfo;
  },

  /**
         * native传递过来的数据是否合法
         * @param json
         */
  dataAdapter: function dataAdapter(json) {
    var _this = this;

    var str = undefined;
    str = json;
    return new Promise(function (resolve, reject) {
      if (json === null) {
        reject("data error");
      }
      if (typeof json === "string") {
        str = Base64.decode(str);
        str = JSON.parse(str);
      }
      if (typeof str === "object") {
        var contentTags = str.contentTags || {};
        var functionTags = str.functionTags || {};
        if (Object.keys(contentTags).length === 0 && Object.keys(functionTags).length === 0) {
          reject("data error");
        }
        _this.setAllTags({ contentTags: contentTags, functionTags: functionTags });
        // 首先得判断是新数据还是,以前的评价数据
        if (has.call(str, "lastComment")) {
          // 评论过的数据
          var data = str.lastComment;
          if (typeof data === "object") {
            LogUtil.devLog("tags from native:+ " + JSON.stringify(data));
            contentTags = data.contentTags || [];
            functionTags = data.functionTags || [];
            if (contentTags.length === 0 && functionTags.length === 0) {
              LogUtil.devLog("old data invalid");
              resolve(false);
            } else {
              _this.setCommentedStatus(true);
              _this.setSelectedTags({ contentTags: contentTags, functionTags: functionTags });
              _this.setLastValidComment(data);
              resolve(true);
            }
          }
        } else {
          resolve(false);
        }
      } else {
        reject("data invalid");
      }
    });
  },
  /**
   * @param {*} fn success 回调
   * @param {*} onlyUseNewInterface 仅使用新接口,新资料老apk,会出现吐槽
   */
  onEnter: function onEnter(fn, onlyUseNewInterface) {
    NativeSdk.updateCommentsFromNative({
      onSuccess: function (json) {
        CommentStore.onDataReceived(json, fn);
      },
      data: {
        funNum: funNum, resourceType: resourceType },
      onlyUseNewInterface: onlyUseNewInterface });
  },
  /**
         * 初始化方法
         * @param json
         */
  onDataReceived: function onDataReceived(json, fn) {
    this.dataAdapter(json).then(function () {
      if (fn) {
        fn();
      }
    })["catch"](function () {
      var commentButton = document.querySelector("#comment-button");
      commentButton.classList.add("hide");
    });
  } };

var ViewManager = {

  /**
     *  渲染标签
     */
  renderTags: function renderTags() {
    function tag(_ref) {
      var item = _ref.item;
      var key = _ref.key;

      var tagDom = document.createElement("li");
      tagDom.classList.add("tag");
      var resultObj = CommentStore.findTargetTag({ tag: item, key: key });
      if (resultObj.index > -1) {
        tagDom.classList.add("on");
      } else {
        tagDom.classList.remove("on");
      }
      tagDom.innerText = item.tag.replace("\\", "");
      initButtonPressActive({
        selectors: tagDom,
        touchEnd: function touchEnd() {
          var result = CommentStore.toggleTagItem({ item: item, key: key });
          var state = result.method === "DELETE" ? 0 : 1;
          if (state) {
            tagDom.classList.add("on");
          } else {
            tagDom.classList.remove("on");
          }
          var type = key === "contentTags" ? 1 : 2;
          var arg = {
            type: type,
            tag: item,
            state: state,
            funNum: funNum,
            resourceType: resourceType };
          NativeSdk.tagChanged(arg);
          var submitButton = document.querySelector("#submit");
          if (CommentStore.isCommented()) {
            submitButton = document.querySelector("#redo");
          }
          if (CommentStore.getSelectedSize() > 0 && CommentStore.getModifiedStatus()) {
            submitButton.classList.remove("disabled");
          } else {
            submitButton.classList.add("disabled");
          }
        } });
      return tagDom;
    }
    function tagsWrap(_ref) {
      var tags = _ref.tags;
      var key = _ref.key;

      var ulDom = document.createElement("ul");
      ulDom.classList.add("tags", "clearfix");
      tags.map(function (item) {
        ulDom.appendChild(tag({ item: item, key: key }));
      });
      return ulDom;
    }
    var tagsWrapDom = domListToArray(".functionItem");
    for (var i = 0; i < tagsWrapDom.length; i += 1) {
      var item = tagsWrapDom[i];
      var tags = item.querySelector(".tagsWrap");
      tags.innerHTML = "";
      var currentTags = CommentStore.getTags(item.id);
      if (currentTags.length > 0) {
        var tagsDom = tagsWrap({ tags: currentTags, key: item.id });
        tags.appendChild(tagsDom);
        item.style.visibility = "visible";
      } else {
        item.style.visibility = "hidden";
      }
    }
  },
  /**
     * 吐槽状态发生后的事件
     * 1.初始化完成后
     * 2.提交按钮点击后
     * 3.取消按钮点击后
     */
  onCommentStatusChanged: function onCommentStatusChanged() {
    var isCommented = CommentStore.isCommented();
    var commentButton = document.querySelector("#comment-button");
    if (!CommentStore.isDataValid()) {
      commentButton.classList.add("hide");
      return false;
    }
    var commentWrap = document.querySelector("#commentWrap");
    if (isCommented) {
      commentButton.classList.add("did");
      commentWrap.classList.add("commented");
      var redoButton = document.querySelector("#redo");
      redoButton.classList.add("disabled");
    } else {
      commentWrap.classList.remove("commented");
      var submitButton = document.querySelector("#submit");
      submitButton.classList.add("disabled");
    }
    commentButton.classList.remove("hide");
  },

  /**
     * 初始化按钮
     */
  initButtons: function initButtons() {
    this.initCancelButton();
    this.initSubmitButton();
  },
  /**
     * 初始化提交按钮/重新提交按钮
     */
  initSubmitButton: function initSubmitButton() {
    var $this = this;
    var selector = "#submit,#redo";
    domListToArray(selector).map(function (item) {
      item.classList.add("disabled");
    });
    initButtonPressActive({
      selectors: selector,
      touchEnd: function () {
        CommentStore.submit().then(function () {
          $this.onSubmit();
        })["catch"](function (error) {
          LogUtil.devLog(error);
          $this.onCancel();
        });
      } });
  },
  /**
     * 提交回调
     */
  onSubmit: function onSubmit() {
    this.onCommentStatusChanged();
    this.actionSheetOut();
  },
  /**
     * 取消/关闭回调
     * @param reset
     */
  onCancel: function onCancel() {
    var reset = arguments[0] === undefined ? false : arguments[0];

    this.onCommentStatusChanged();
    if (reset) {
      this.renderTags();
    }
    this.actionSheetOut();
  },
  /**
     * 取消按钮初始化
     */
  initCancelButton: function initCancelButton() {
    var $this = this;
    initButtonPressActive({
      selectors: "#cancel",
      touchEnd: function () {
        CommentStore.cancel().then(function (reset) {
          $this.onCancel(reset);
        });
      } });
  },

  /**
     * 无关数据的初始化
     *
     */
  onEnter: function onEnter() {
    var modalWrapDom = document.querySelector("#modalWrap");
    if (!modalWrapDom) {
      return false;
    }
    this.initActionHeight();
    this.initButtons();
    initScrollClass(".mainComment");
  },
  /**
   * 根据屏高修改弹框的高度
   * 仅手机横屏下占80%
   */
  initActionHeight: function initActionHeight() {
    var deviceHeight = Param.getDeviceHeight();
    var deviceWidth = Param.getDeviceWidth();
    var ruleText = "";

    if (deviceHeight) {
      ruleText += "@media screen and (orientation: portrait) {\n        #commentAS {\n            height: " + deviceHeight / 2 + "px;\n        }\n    }";
    }
    if (deviceWidth) {
      ruleText += "@media screen and (orientation: landscape) {\n        #commentAS {\n            height: " + deviceWidth * 0.8 + "px;\n        }\n    }";
    }
    if (Param.isSplitMode()) {
      ruleText = "";
    }
    if (Param.isFoldablePhone() && Param.isExpandState()) {
      ruleText += "@media screen and (orientation: portrait) {\n        #commentAS {\n            height: " + deviceHeight / 2 + "px;\n        }\n    }\n    @media screen and (orientation: landscape) {\n        #commentAS {\n            height: " + deviceHeight / 2 + "px;\n        }\n    }";
    }
    if (ruleText) {
      addStyleRule(ruleText);
    }
  },

  isBigScreenDevices: function isBigScreenDevices() {
    return Param.isPad() || Param.isFoldablePhone() && Param.isExpandState();
  },

  /**
     * 弹框入场动画
     */
  actionSheetIn: function actionSheetIn() {
    var modalWrapDom = document.querySelector("#modalWrap");
    var commentASDom = document.querySelector("#commentAS");
    window.requestAnimationFrame(function () {
      setTimeout(function () {
        modalWrapDom.classList.remove("out", "hide");
        commentASDom.classList.remove("out", "hide");
        modalWrapDom.classList.add("in", "modal");
        commentASDom.classList.add("in", "actionSheet");
        NativeSdk.updateModalStatus({
          data: {
            action: "open",
            type: "comment",
            resourceType: resourceType,
            funNum: funNum } });
      }, 0);
    });
  },
  /**
     * 初始化弹框层的一些手势事件
     */
  initDialog: function initDialog() {
    var _this = this;

    var modalWrapDom = document.querySelector("#modalWrap");
    var arrow = document.querySelector("#arrow");
    var commentWrap = document.querySelector("#commentWrap");
    if (!modalWrapDom || !commentWrap) {
      return false;
    }
    var themeType = Param.getThemeType();
    if (themeType !== NOT_EXIST) {
      commentWrap.classList.add(themeOptions[themeType].className);
    }
    modalWrapDom.onclick = function () {
      CommentStore.cancel().then(function (reset) {
        _this.onCancel(reset);
      });
    };
    // arrow
    arrow.onclick = function () {
      CommentStore.cancel().then(function (reset) {
        _this.onCancel(reset);
      });
    };
    var callBack = function (data) {
      var args = data || {};
      if (typeof args === "string") {
        try {
          args = JSON.parse(data);
        } catch (error) {
          LogUtil.devLog("roast error:" + error);
          args = {
            action: "close" };
        }
      }
      if (args.action === "close") {
        CommentStore.cancel().then(function (reset) {
          _this.onCancel(reset);
        });
      } else if (args.action === "open") {
        _this.actionSheetIn();
      }
    };
    // 更新弹框status,
    NativeCaller.registerFn(JS_UPDATE_MODAL_STATUS, callBack);
    NativeSdk.onUpdateModalStatus(callBack);
  },
  /**
     * 弹框退场动画
     * 滚动条复位
     */
  actionSheetOut: function actionSheetOut() {
    var modalWrapDom = document.querySelector("#modalWrap");
    var commentASDom = document.querySelector("#commentAS");
    var mainComment = document.querySelector(".mainComment");

    window.requestAnimationFrame(function () {
      setTimeout(function () {
        modalWrapDom.classList.remove("in");
        commentASDom.classList.remove("in");
        modalWrapDom.classList.add("out");
        commentASDom.classList.add("out");
        NativeSdk.updateModalStatus({
          data: {
            action: "close",
            type: "comment",
            funNum: funNum,
            resourceType: resourceType } });
      }, 0);
      setTimeout(function () {
        mainComment.scrollTop = 0;
      }, 300);
    });
  } };

exports.CommentStore = CommentStore;
exports.ViewManager = ViewManager;

},{"../Base64":1,"../Caller/CallerForNative":2,"../Constants":5,"../DomUtil":12,"../InterfaceProtocol":13,"../LogUtil":14,"../Param":15,"../Util":17,"../najssdk":18}],8:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var Controller = _interopRequire(require("./Controller"));

var _Constants = require("../Constants");

var NOT_EXIST = _Constants.NOT_EXIST;
var themeOptions = _Constants.themeOptions;

var Param = _interopRequire(require("../Param"));

var MainContentController = (function (_Controller) {
  function MainContentController() {
    _classCallCheck(this, MainContentController);

    if (_Controller != null) {
      _Controller.apply(this, arguments);
    }
  }

  _inherits(MainContentController, _Controller);

  _createClass(MainContentController, {
    initView: {
      value: function initView() {
        this.initClass();
      }
    },
    initClass: {

      /**
       * 初始化类名
       *
       * @memberof MainContentController
       */

      value: function initClass() {
        // 添加voice 类名 语音助手打开
        if (Param.isHivoice()) {
          this.target.classList.add("voice");
        } else {
          this.target.classList.remove("voice");
        }
        // 添加tips 类名 玩机技巧内打开
        if (Param.isTips()) {
          this.target.classList.add("tips");
        } else {
          this.target.classList.remove("tips");
        }
        // 添加tablet 类名 平板内打开
        if (Param.isPad()) {
          this.target.classList.add("tablet");
        } else {
          this.target.classList.remove("tablet");
        }
        // 添加卖场模式 类名 隐藏需网络的链接
        if (Param.isDisplayVersion()) {
          this.target.classList.add("displayVersion");
        } else {
          this.target.classList.remove("displayVersion");
        }
        if (Param.isPhoneSplitMode()) {
          this.target.classList.add("splitMode");
        } else {
          this.target.classList.remove("splitMode");
        }
        // @warning 这里之所以使用两个类名分别控制light模式与dark模式,是因为在部分机型上测试到,webview会闪白,因此不能设置默认背景色除了透明
        // 即使body display:none 也无法避免,初步推断,可能是有的webview会取body的颜色设置,设置为自己控件的背景色
        if (Param.isDarkMode()) {
          this.target.classList.add("darkMode");
          this.target.classList.remove("lightMode");
        } else {
          this.target.classList.remove("darkMode");
          this.target.classList.add("lightMode");
        }
        var themeType = Param.getThemeType();
        var aLabel = document.querySelectorAll("a");
        if (themeType !== NOT_EXIST) {
          aLabel.forEach(function (item) {
            item.classList.add(themeOptions[themeType].className);
          });
        }
      }
    }
  });

  return MainContentController;
})(Controller);

module.exports = MainContentController;

},{"../Constants":5,"../Param":15,"./Controller":6}],9:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var Controller = _interopRequire(require("./Controller"));

require("../InterfaceProtocol");

var Param = _interopRequire(require("../Param"));

var initButtonPressActive = require("../DomUtil").initButtonPressActive;

var NativeSdk = _interopRequire(require("../najssdk"));

var LogUtil = _interopRequire(require("../LogUtil"));

var PraiseButtonController = (function (_Controller) {
  function PraiseButtonController(options) {
    _classCallCheck(this, PraiseButtonController);

    _get(Object.getPrototypeOf(PraiseButtonController.prototype), "constructor", this).call(this, options);
    this.metas = {};
  }

  _inherits(PraiseButtonController, _Controller);

  _createClass(PraiseButtonController, {
    initMetas: {

      /**
       * 手册跟卡片点赞要传的信息不一样
       */

      value: function initMetas() {
        LogUtil.devLog(this.metas);
      }
    },
    initView: {
      value: function initView() {
        var isPraised = Param.isPraised();
        this.target.classList.remove("hide");
        if (isPraised) {
          this.target.classList.add("did");
        } else {
          this.target.classList.remove("did");
        }
      }
    },
    clickPraise: {

      /**
       * 点赞
       *
       * @memberof PraiseButtonController
       */

      value: function clickPraise() {
        this.target.classList.add("did");
        NativeSdk.clickPraise(this.metas);
      }
    },
    cancelPraise: {

      /**
       * 取消点赞
       *
       * @memberof PraiseButtonController
       */

      value: function cancelPraise() {
        this.target.classList.remove("did");
        NativeSdk.cancelPraise(this.metas);
      }
    },
    refreshPraise: {

      /**
       *
       * 刷新点赞
       * @memberof PraiseButtonController
       */

      value: function refreshPraise() {
        var _this = this;

        var onSuccess = function (data) {
          var praiseStatus = data;
          if (typeof data === "object") {
            praiseStatus = data.status;
          }
          praiseStatus = String(praiseStatus);
          if (praiseStatus === "1") {
            _this.target.classList.add("did");
          } else if (praiseStatus === "0") {
            _this.target.classList.remove("did");
          }
        };
        var options = {
          onSuccess: onSuccess };
        options.data = this.metas;
        NativeSdk.refreshPraise(options);
      }
    },
    initEvent: {
      value: function initEvent() {
        var _this = this;

        initButtonPressActive({
          selectors: this.target,
          touchEnd: function () {
            if (_this.target && _this.target.classList) {
              _this.target.classList.remove("press");
              // 如果当前是未点赞
              if (_this.target.classList.contains("did")) {
                _this.cancelPraise();
              } else {
                // 如果是已赞
                _this.clickPraise();
              }
            }
          } });
      }
    },
    initCallbackForNative: {
      value: function initCallbackForNative() {
        this.initMetas();
        this.refreshPraise();
      }
    }
  });

  return PraiseButtonController;
})(Controller);

module.exports = PraiseButtonController;

},{"../DomUtil":12,"../InterfaceProtocol":13,"../LogUtil":14,"../Param":15,"../najssdk":18,"./Controller":6}],10:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var Controller = _interopRequire(require("./Controller"));

var _Evaluate = require("./Evaluate");

var ViewManager = _Evaluate.ViewManager;
var CommentStore = _Evaluate.CommentStore;

var CallerForNative = _interopRequire(require("../Caller/CallerForNative"));

var NativeSdk = _interopRequire(require("../najssdk"));

var _DomUtil = require("../DomUtil");

var initButtonPressActive = _DomUtil.initButtonPressActive;
var getFunNum = _DomUtil.getFunNum;
var getResourceType = _DomUtil.getResourceType;

var JS_NATIVE_PAUSE_FN = require("../InterfaceProtocol").JS_NATIVE_PAUSE_FN;

var metas = {
  funNum: getFunNum(),
  resourceType: getResourceType() };

var RoastButtonController = (function (_Controller) {
  function RoastButtonController(options) {
    _classCallCheck(this, RoastButtonController);

    _get(Object.getPrototypeOf(RoastButtonController.prototype), "constructor", this).call(this, options);
    var onlyUseNewInterface = options.onlyUseNewInterface;

    this.onlyUseNewInterface = onlyUseNewInterface;
  }

  _inherits(RoastButtonController, _Controller);

  _createClass(RoastButtonController, {
    initView: {
      value: function initView() {
        var _this = this;

        CommentStore.onEnter(function () {
          ViewManager.onCommentStatusChanged(_this);
          ViewManager.renderTags(_this);
        }, this.onlyUseNewInterface);
        ViewManager.onEnter();
        ViewManager.initDialog(CommentStore);
      }
    },
    initEvent: {
      value: function initEvent() {
        initButtonPressActive({
          selectors: this.target,
          touchEnd: function (e) {
            e.preventDefault();
            CallerForNative.fireWindowFn(JS_NATIVE_PAUSE_FN);
            ViewManager.actionSheetIn();
            NativeSdk.openRoastActionSheet(metas);
            return false;
          } });
      }
    }
  });

  return RoastButtonController;
})(Controller);

module.exports = RoastButtonController;

},{"../Caller/CallerForNative":2,"../DomUtil":12,"../InterfaceProtocol":13,"../najssdk":18,"./Controller":6,"./Evaluate":7}],11:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var Controller = _interopRequire(require("./Controller"));

var _InterfaceProtocol = require("../InterfaceProtocol");

var JS_INTERFACE_HIDE_SUBJECT_LINK = _InterfaceProtocol.JS_INTERFACE_HIDE_SUBJECT_LINK;
var JS_INTERFACE_SET_JUMPLINK_FN = _InterfaceProtocol.JS_INTERFACE_SET_JUMPLINK_FN;
var JS_INTERFACE_HIDE_LINK = _InterfaceProtocol.JS_INTERFACE_HIDE_LINK;

var CallerForNative = _interopRequire(require("../Caller/CallerForNative"));

var LogUtil = _interopRequire(require("../LogUtil"));

var domListToArray = require("../DomUtil").domListToArray;

var callNaInterface = require("../najssdk").callNaInterface;

var WebLinkController = (function (_Controller) {
  function WebLinkController(target) {
    _classCallCheck(this, WebLinkController);

    _get(Object.getPrototypeOf(WebLinkController.prototype), "constructor", this).call(this, target);
    this.subjectLinksDom = []; // 跳转到专题的互链
    this.cardLinksDom = []; // 跳转到卡片的互链
  }

  _inherits(WebLinkController, _Controller);

  _createClass(WebLinkController, {
    filterLinks: {
      value: function filterLinks() {
        var _this = this;

        var subjectsLinks = [];
        var cardLinks = [];
        domListToArray(this.target).map(function (item) {
          if (item) {
            var href = item.getAttribute("href") || "";
            if (href.indexOf("jumptosubject") === 0) {
              subjectsLinks.push(href.replace("jumptosubject:", ""));
              _this.subjectLinksDom.push(item);
            }
            if (href.indexOf("jumptocard") === 0) {
              cardLinks.push(href.replace("jumptocard:", ""));
              _this.cardLinksDom.push(item);
            }
          }
        });
        if (subjectsLinks.length > 0) {
          // 只需要传协议后面的id即可
          callNaInterface(JS_INTERFACE_HIDE_SUBJECT_LINK, subjectsLinks.join("#"));
        }
        if (cardLinks.length > 0) {
          callNaInterface(JS_INTERFACE_HIDE_LINK, cardLinks.join("#"));
        }
      }
    },
    initCallbackForNative: {
      value: function initCallbackForNative() {
        var _this = this;

        var hideLinkFn = function () {
          if (_this.subjectLinksDom.length > 0 || _this.cardLinksDom.length > 0) {
            // responseLinks 为native返回的不能跳转互链的字符串拼接
            CallerForNative.registerFn(JS_INTERFACE_SET_JUMPLINK_FN, function (responseLinks) {
              LogUtil.devLog(responseLinks);
              var list = _this.subjectLinksDom;
              // 区分是跳到卡片的互链,还是跳到专题的互链,从而处理不同的目标
              if (responseLinks && responseLinks.indexOf("&iscardlink") !== -1) {
                list = _this.cardLinksDom;
              }
              for (var i = 0; i < list.length; i += 1) {
                var item = list[i];
                if (item && item.getAttribute && item.getAttribute("href")) {
                  var link = item.getAttribute("href").split(":")[1];
                  if (responseLinks && responseLinks.indexOf(link) !== -1) {
                    if (item.classList) {
                      item.calssList.remove("inline-flex");
                    }
                  } else if (item.classList) {
                    item.classList.add("inline-flex");
                  }
                }
              }
            });
          }
        };
        hideLinkFn();
      }
    },
    initEvent: {
      value: function initEvent() {
        this.filterLinks();
      }
    }
  });

  return WebLinkController;
})(Controller);

module.exports = WebLinkController;

},{"../Caller/CallerForNative":2,"../DomUtil":12,"../InterfaceProtocol":13,"../LogUtil":14,"../najssdk":18,"./Controller":6}],12:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var LogUtil = _interopRequire(require("./LogUtil"));

/**
   *
   *
   * @static 将选择器转换成数组返回
   * @param {*} selectors 字符串选择器
   * @returns [HTMLElement]
   * @memberof DomUtil
   */
var domListToArray = function (selectors) {
  var list = [];
  if (selectors instanceof HTMLElement) {
    list.push(selectors);
  } else if (typeof selectors === "string") {
    list = Array.prototype.slice.call(document.querySelectorAll(selectors), 0);
  } else if (selectors instanceof NodeList) {
    list = Array.prototype.slice.call(selectors, 0);
  } else if (selectors instanceof Array) {
    list = selectors;
  }
  return list;
};

exports.domListToArray = domListToArray;
/**
   *
   * @param selectors 选择器或HTMLELEMENT
   * @param touchStart touchstart事件
   * @param toucheMove touchmove事件
   * @param touchEnd touchend事件
   * @param needPressClass 是否需要press初始化
   * @todo 想去掉,得把所有的点按控件改成a标签,但是实现的效果是无法定义圆角
   */
var initButtonPressActive = function (_ref) {
  var selectors = _ref.selectors;
  var touchStart = _ref.touchStart;
  var toucheMove = _ref.toucheMove;
  var touchEnd = _ref.touchEnd;
  var _ref$needPressClass = _ref.needPressClass;
  var needPressClass = _ref$needPressClass === undefined ? true : _ref$needPressClass;

  var touch = 0;
  var buttons = domListToArray(selectors);

  function onTouChMove(e) {
    var point = e.changedTouches[0];
    var rect = this.getBoundingClientRect();
    var isOutside = point.clientX - rect.left < 0 || point.clientX - rect.right > 0;
    isOutside = isOutside || (point.clientY - rect.top < 0 || point.clientY - rect.bottom > 0);
    if (isOutside) {
      if (needPressClass) {
        this.classList.remove("press");
      }
      this.removeEventListener("touchmove", onTouChMove);
      this.removeEventListener("touchend", onTouchEnd); // eslint-disable-line no-use-before-define
    } else if (toucheMove) {
      toucheMove(e);
    }
  }

  function onTouchEnd(e) {
    if (needPressClass) {
      this.classList.remove("press");
    }
    if (new Date().getTime() - touch > 300) {
      if (touchEnd) {
        touchEnd(e);
        touch = new Date().getTime();
      }
    }
    this.removeEventListener("touchmove", onTouChMove);
    this.removeEventListener("touchend", onTouchEnd);
  }

  function onTouchStart(e) {
    if (this.classList.contains("disabled")) {
      return false;
    }
    if (needPressClass) {
      this.classList.add("press");
    }
    if (touchStart) {
      touchStart(e);
    }
    this.removeEventListener("touchmove", onTouChMove);
    this.removeEventListener("touchend", onTouchEnd);
    this.addEventListener("touchmove", onTouChMove);
    this.addEventListener("touchend", onTouchEnd);
  }

  buttons.map(function (item) {
    var fn = onTouchStart.bind(item);
    item.removeEventListener("touchstart", fn);
    item.addEventListener("touchstart", fn);
  });
};

exports.initButtonPressActive = initButtonPressActive;
/**
* 加滚动框的工具类,模拟手机效果,
* 如果自定义滚动条,这个就可以废弃了
* @param selectors
*/
var initScrollClass = function (selectors) {
  var domList = domListToArray(selectors);
  domList.map(function (item) {
    var timer = null;

    function removeScrollBar() {
      var _this = this;

      timer = setTimeout(function () {
        _this.classList.add("no_scroll");
        clearTimeout(timer);
      }, 2000);
    }
    var fn = removeScrollBar.bind(item);
    item.classList.remove("no_scroll");
    fn();
    item.addEventListener("touchstart", function () {
      item.classList.remove("no_scroll");
    });
    item.addEventListener("scroll", function () {
      item.classList.remove("no_scroll");
      clearTimeout(timer);
      timer = setTimeout(function () {
        item.classList.add("no_scroll");
        clearTimeout(timer);
      }, 2000);
    });
    item.removeEventListener("touchend", fn);
    item.removeEventListener("touchcancel", fn);
    item.addEventListener("touchend", fn);
    item.addEventListener("touchcancel", fn);
  });
};

exports.initScrollClass = initScrollClass;
/**
*
*
* @static window切换或者滑到一半的时候,要取消按压效果
* 如果用a标签可能没这个问题
* @memberof DomUtil
*/
var onWindowTouchCancel = function () {
  window.addEventListener("touchcancel", function () {
    var clickBtns = domListToArray(document.querySelectorAll(".press"));
    clickBtns.map(function (item) {
      if (item && item.classList) {
        item.classList.remove("press");
      }
    });
  });
};
exports.onWindowTouchCancel = onWindowTouchCancel;
var getFunAndRes = function () {
  var json = {};
  json.funNum = getFunNum();
  json.resourceType = getResourceType();
  return json;
};
exports.getFunAndRes = getFunAndRes;
/**
 * ring布局适配,
 * @param {string} ringWidth 曲面安全边距
 * @param {string} selectors 选择器,
 */
var hackRingWidth = function (ringWidth, selectors) {
  if (ringWidth) {
    (function () {
      var domList = domListToArray(document.querySelectorAll(selectors));
      domList.map(function (item) {
        var originLeft = window.getComputedStyle(item, null).paddingLeft;
        var originRight = window.getComputedStyle(item, null).paddingRight;
        item.setAttribute("data-paddingLeft", originLeft);
        item.setAttribute("data-paddingRight", originRight);
        var ringSafeLeft = "" + (parseFloat(originLeft) + ringWidth) + "px";
        var ringSafeRight = "" + (parseFloat(originRight) + ringWidth) + "px";
        item.setAttribute("data-ringleft", ringSafeLeft);
        item.setAttribute("data-ringright", ringSafeRight);
        if (window.orientation !== 90 && window.orientation !== -90) {
          item.style.paddingLeft = ringSafeLeft; // eslint-disable-line no-param-reassign
          item.style.paddingRight = ringSafeRight; // eslint-disable-line  no-param-reassign
        }
      });

      window.addEventListener("orientationchange", function () {
        if (window.orientation === 90 || window.orientation === -90) {
          //    横屏
          domList.map(function (item) {
            var originLeft = item.dataset.paddingleft;
            var originRight = item.dataset.paddingright;
            item.style.paddingLeft = originLeft; // eslint-disable-line no-param-reassign
            item.style.paddingRight = originRight; // eslint-disable-line no-param-reassign
          });
        } else {
          // 竖屏
          domList.map(function (item) {
            var ringSafeLeft = item.dataset.ringleft;
            var ringSafeRight = item.dataset.ringright;
            item.style.paddingLeft = ringSafeLeft; // eslint-disable-line no-param-reassign
            item.style.paddingRight = ringSafeRight; // eslint-disable-line no-param-reassign
          });
        }
      });
    })();
  }
};

exports.hackRingWidth = hackRingWidth;
/**
 *
 * 双击同一链接的时候,取消第二次行为
 * @static
 * @memberof DomUtil
 */
var hackDoubleClick = function () {
  var body = document.querySelector("body");
  var lastClickTime = 0;
  body.addEventListener("click", function (e) {
    var currentClickTime = new Date().getTime();
    if (currentClickTime - lastClickTime < 300) {
      LogUtil.devLog("dbclick");
      e.preventDefault();
      e.stopImmediatePropagation();
      return false;
    }
    lastClickTime = currentClickTime;
  }, true);
};
exports.hackDoubleClick = hackDoubleClick;
/**
*
*
* @static 添加滚动条,自定义滚动条,dom实际内容需要在两层包裹下
* @param {*} {
*     target,
*   }
* @memberof DomUtil
*/
var createScrollBar = function (_ref) {
  var target = _ref.target;

  var flag = false;
  var scrollBar = document.createElement("div");
  scrollBar.className = "scrollBar";
  var scrollThumb = document.createElement("div");
  scrollThumb.className = "scrollBarThumb";
  scrollBar.appendChild(scrollThumb);
  var content = target.querySelector(".scrollContent");
  var scrollTarget = target.querySelector(".scrollWrap");
  var wrapHeight = target.getBoundingClientRect().height;
  var contentHeight = content.getBoundingClientRect().height;
  if (wrapHeight < contentHeight) {
    scrollThumb.style.height = "" + wrapHeight * 100 / contentHeight + "%";
  }
  scrollTarget.addEventListener("touchmove", function () {
    if (!flag) {
      flag = true;
      scrollThumb.style.height = "" + wrapHeight * 100 / contentHeight + "%";
      scrollThumb.style.top = "" + scrollTarget.scrollTop * 100 / wrapHeight + "%";
      scrollThumb.style.opacity = 1;
      setTimeout(function () {
        scrollThumb.style.opacity = 0;
        flag = false;
      }, 2000);
    }
  });
  scrollTarget.addEventListener("scroll", function () {
    scrollThumb.style.top = "" + scrollTarget.scrollTop * 100 / wrapHeight + "%";
  });
  target.appendChild(scrollBar);
};

exports.createScrollBar = createScrollBar;
/**
 * 添加style rule 规则
 *
 * @param {string} ruleText
 */
var addStyleRule = function (ruleText) {
  if (ruleText) {
    // 这里如果用insertRule 会报错,file协议下 会有安全问题
    var styleSheet = document.querySelector("#styleDef");
    var headDom = undefined;
    if (!styleSheet) {
      headDom = document.querySelector("head");
      styleSheet = document.createElement("style");
      styleSheet.type = "text/css";
      styleSheet.id = "styleDef";
    }
    var ruleTextNode = document.createTextNode(ruleText);
    styleSheet.appendChild(ruleTextNode);
    if (headDom) {
      headDom.appendChild(styleSheet);
    }
  }
};

exports.addStyleRule = addStyleRule;
/**
 *
 * 添加字体样式
 * 暂时未用,未生效
 * @static
 * @memberof DomUtil
 */
var addFontStyle = function () {
  var fontRuleText = "@font-face{\n      font-family: 'MyanmarFont';\n      font-display: swap;\n      font-weight: normal;\n      src: local('SmartZawgyi'),\n          url('./SmartZawgyi.ttf'),\n          url('file://system/fonts/SmartZawgyi.ttf');\n    }\n    \n    @font-face{\n        font-family: 'HWText-Regular';\n        font-display: swap;\n        font-weight: normal;\n        src: local('汉仪旗黑'),\n            url('./DroidSansChinese.ttf'),\n            url('file://system/fonts/DroidSansChinese.ttf');\n    }\n    \n    @font-face{\n        font-family: 'HWText-Medium';\n        font-display: swap;\n        font-weight: normal;\n        src: local('汉仪旗黑 Medium'),\n        url('./HwChinese-Medium.ttf'),\n        url('file://system/fonts/HwChinese-Medium.ttf');\n    }\n\n    @font-face{\n      font-family: 'Roboto-Medium';\n      font-display: swap;\n      font-weight: normal;\n      src: local('Roboto Medium'),\n            url('./Roboto-Medium.ttf'),\n            url('file://system/fonts/Roboto-Medium.ttf');\n    }\n    \n    @font-face{\n      font-family: 'Roboto-Regular';\n      font-display: swap;\n      font-weight: normal;\n      src:local('Roboto'),\n         url('./Roboto-Regular.ttf'),\n         url('file://system/fonts/Roboto-Regular.ttf');\n    }\n    ";
  addStyleRule(fontRuleText);
};
exports.addFontStyle = addFontStyle;
/**
 * 获得functionNumber
 * 获得标识id
 * 根据meta取,name ="funNum"
 */
var getFunNum = function () {
  var func = document.querySelector("meta[name=\"funNum\"]");
  if (func) {
    return func.getAttribute("content");
  }
};
exports.getFunNum = getFunNum;
/**
 * 获得resourceType
 * 获得资源类型
 * 根据meta取,name = "resourceType"
 */
var getResourceType = function () {
  var resouce = document.querySelector("meta[name=\"resourceType\"]");
  if (resouce) {
    return resouce.getAttribute("content");
  }
};

exports.getResourceType = getResourceType;
/**
 * 获得Identifier
 * 目前仅供手册
 * 根据meta取,name = "DC.Identifier"
 */
var getIdentifier = function () {
  var Identifier = document.querySelector("[name=\"DC.Identifier\"]");
  if (Identifier) {
    return Identifier.getAttribute("content");
  }
};

exports.getIdentifier = getIdentifier;
/**
 * 去掉native默认的darkMode样式
 */
var removeNativeDarkStyle = function () {
  // 这里不知道时机,所以干脆创建一个,这样native就不会创建
  var darkStyle = document.getElementById("darkHack");
  if (darkStyle && darkStyle.parentNode && darkStyle.parentNode.removeChild) {
    darkStyle.parentNode.removeChild(darkStyle);
  } else {
    var head = document.querySelector("head");
    var darkStyleEle = document.createElement("style");
    darkStyleEle.id = "darkHack";
    head.appendChild(darkStyleEle);
  }
};

exports.removeNativeDarkStyle = removeNativeDarkStyle;
exports["default"] = {
  domListToArray: domListToArray,
  initButtonPressActive: initButtonPressActive,
  initScrollClass: initScrollClass,
  onWindowTouchCancel: onWindowTouchCancel,
  hackRingWidth: hackRingWidth,
  hackDoubleClick: hackDoubleClick,
  createScrollBar: createScrollBar,
  addStyleRule: addStyleRule,
  addFontStyle: addFontStyle,
  getFunNum: getFunNum,
  getResourceType: getResourceType,
  getFunAndRes: getFunAndRes };

},{"./LogUtil":14}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * 点击收藏
 */
var JS_INTERFACE_CLICKPRAISE = "clickPraise";
exports.JS_INTERFACE_CLICKPRAISE = JS_INTERFACE_CLICKPRAISE;
var JS_INTERFACE_TOGGLEPRAISE = "togglePraise";
exports.JS_INTERFACE_TOGGLEPRAISE = JS_INTERFACE_TOGGLEPRAISE;
/**
 * 取消收藏
 */
var JS_INTERFACE_CANCELPRAISE = "cancelPraise";
exports.JS_INTERFACE_CANCELPRAISE = JS_INTERFACE_CANCELPRAISE;
/**
 * 刷新收藏状态
 */
var JS_INTERFACE_REFRESHPRAISE = "refreshPraise";
exports.JS_INTERFACE_REFRESHPRAISE = JS_INTERFACE_REFRESHPRAISE;
/**
 * 立即体验
 */
var JS_INTERFACE_EXPRIENCE = "exprience";

exports.JS_INTERFACE_EXPRIENCE = JS_INTERFACE_EXPRIENCE;
/**
 * call from js to get tip comment data , then send tip comment data to js.
 */
var JS_INTERFACE_UPDATECOMMENTSFROMNATIVE = "updateCommentsFromNative";
exports.JS_INTERFACE_UPDATECOMMENTSFROMNATIVE = JS_INTERFACE_UPDATECOMMENTSFROMNATIVE;
var JS_INTERFACE_AFTER_COMMENT_FN = "afterCommentFromNative";

exports.JS_INTERFACE_AFTER_COMMENT_FN = JS_INTERFACE_AFTER_COMMENT_FN;
/**
 * open tip comment page
 */
var JS_INTERFACE_OPENCOMMENTPAGE = "openCommentPage";
exports.JS_INTERFACE_OPENCOMMENTPAGE = JS_INTERFACE_OPENCOMMENTPAGE;
var JS_INTERFACE_ROAST = "openRoastActionSheet";

exports.JS_INTERFACE_ROAST = JS_INTERFACE_ROAST;
/**
 * open tip re-comment page
 */
var JS_INTERFACE_OPENRECOMMENTPAGE = "openReCommentPage";

exports.JS_INTERFACE_OPENRECOMMENTPAGE = JS_INTERFACE_OPENRECOMMENTPAGE;
/**
 * comment tate changeed
 */
var JS_INTERFACE_RATECHANGED = "rateChanged";

exports.JS_INTERFACE_RATECHANGED = JS_INTERFACE_RATECHANGED;
/**
 * comment tag toggleed
 */
var JS_INTERFACE_TAGTOGGLED = "tagToggled";

exports.JS_INTERFACE_TAGTOGGLED = JS_INTERFACE_TAGTOGGLED;
/**
 * submit tip comment
 */
var JS_INTERFACE_SUBMITCOMMENT = "submitComment";

exports.JS_INTERFACE_SUBMITCOMMENT = JS_INTERFACE_SUBMITCOMMENT;
/**
 * js加载完成
 */
var JS_INTERFACE_JS_LAOD_FINISH = "JSloadFinish";
exports.JS_INTERFACE_JS_LAOD_FINISH = JS_INTERFACE_JS_LAOD_FINISH;
var JS_INTERFACE_JS_LAOD_FINISH_EX = "jsloadfinish";

exports.JS_INTERFACE_JS_LAOD_FINISH_EX = JS_INTERFACE_JS_LAOD_FINISH_EX;
/**
 * 打开长视频
 */
var JS_INTERFACE_OPEN_LONG_VIDEO = "openlongvideo";

exports.JS_INTERFACE_OPEN_LONG_VIDEO = JS_INTERFACE_OPEN_LONG_VIDEO;
/**
 * 关闭当前页面
 */
var JS_INTERFACE_CLOSE_PAGE = "closePage";

exports.JS_INTERFACE_CLOSE_PAGE = JS_INTERFACE_CLOSE_PAGE;
/**
 * 关闭当前页面
 */
var JS_INTERFACE_REFRESH_PAGE_NUMBER = "pageNum";

exports.JS_INTERFACE_REFRESH_PAGE_NUMBER = JS_INTERFACE_REFRESH_PAGE_NUMBER;
/**
 * 浏览手册详情，用作打点
 */
var JS_INTERFACE_VIEW_MANUAL = "viewManual";

exports.JS_INTERFACE_VIEW_MANUAL = JS_INTERFACE_VIEW_MANUAL;
/**
 * 浏览手册列表，用作打点
 */
var JS_INTERFACE_VIEW_MANUAL_LIST = "viewManualList";

exports.JS_INTERFACE_VIEW_MANUAL_LIST = JS_INTERFACE_VIEW_MANUAL_LIST;
/**
 * 跳转手册首个topic
 * 目前仅大溪地调用
 */
var JS_INTERFACE_VIEW_MANUAL_FIRST_TOPIC = "initTopic4Special";

exports.JS_INTERFACE_VIEW_MANUAL_FIRST_TOPIC = JS_INTERFACE_VIEW_MANUAL_FIRST_TOPIC;
/**
 * 全屏
 */
var JS_INTERFACE_FULL_SCREEN = "fullscreen";

exports.JS_INTERFACE_FULL_SCREEN = JS_INTERFACE_FULL_SCREEN;
/**
 * 检查链接 隐藏入口
 */
var JS_INTERFACE_HIDE_LINK = "hidelink";

exports.JS_INTERFACE_HIDE_LINK = JS_INTERFACE_HIDE_LINK;
/**
 * 检查链接 隐藏专题互链跳转专题入口
 */
var JS_INTERFACE_HIDE_SUBJECT_LINK = "hidesubjectlink";

exports.JS_INTERFACE_HIDE_SUBJECT_LINK = JS_INTERFACE_HIDE_SUBJECT_LINK;
/**
 * 是否显示需要显示网络未连接
 */
var JS_INTERFACE_SET_NET = "setnet";

exports.JS_INTERFACE_SET_NET = JS_INTERFACE_SET_NET;
/**
 * 跳转到卡片
 */
var JS_INTERFACE_JUMP_TO_CARD = "jumptocard";

exports.JS_INTERFACE_JUMP_TO_CARD = JS_INTERFACE_JUMP_TO_CARD;
/**
 * 跳转到专题
 */
var JS_INTERFACE_JUMP_TO_SUBJECT = "jumptosubject";

exports.JS_INTERFACE_JUMP_TO_SUBJECT = JS_INTERFACE_JUMP_TO_SUBJECT;
/**
 * 打开外部网页
 */
var JS_INTERFACE_JUMP_TO_WEB = "jumptoweb";

exports.JS_INTERFACE_JUMP_TO_WEB = JS_INTERFACE_JUMP_TO_WEB;
/**
 * 打开内部网页
 */
var JS_INTERFACE_JUMP_TO_PAGE = "jumptopage";

exports.JS_INTERFACE_JUMP_TO_PAGE = JS_INTERFACE_JUMP_TO_PAGE;
/**
 * Net Error JS
 */
var JS_INTERFACE_NET_WORK_ERROR = "netWorkError";

exports.JS_INTERFACE_NET_WORK_ERROR = JS_INTERFACE_NET_WORK_ERROR;
/**
 * JS send data of manual history state to native
 */
var JS_INTERFACE_SEND_HISTORY_TO_NATIVE = "sendHistoryToNative";
exports.JS_INTERFACE_SEND_HISTORY_TO_NATIVE = JS_INTERFACE_SEND_HISTORY_TO_NATIVE;
/**
 * get data of manual history state form native to js
 */
var JS_INTERFACE_GET_HISTORY_FROM_NATIVE = "getHistoryFromNative";
exports.JS_INTERFACE_GET_HISTORY_FROM_NATIVE = JS_INTERFACE_GET_HISTORY_FROM_NATIVE;

/**
 * JS reportEvent
 */
var JS_INTERFACE_REPORT_EVENT = "reportEvent";
exports.JS_INTERFACE_REPORT_EVENT = JS_INTERFACE_REPORT_EVENT;

/**
 * JS initInfo
 */
var JS_INTERFACE_INITINFO = "initInfo";
exports.JS_INTERFACE_INITINFO = JS_INTERFACE_INITINFO;

/**
 * JS Fit data of Jump
 */
var JS_INTERFACE_CAN_I_JUMP = "canIJump";
exports.JS_INTERFACE_CAN_I_JUMP = JS_INTERFACE_CAN_I_JUMP;
var UPDATE_SCHEMA = "updateSchemaUrl";
exports.UPDATE_SCHEMA = UPDATE_SCHEMA;
/**
 * JS Jump to other app
 */
var JS_INTERFACE_OPEN_APP = "jumptoapp";

exports.JS_INTERFACE_OPEN_APP = JS_INTERFACE_OPEN_APP;
var JS_INTERFACE_SELF_BACK_FN = "onNativeBackPressed";

exports.JS_INTERFACE_SELF_BACK_FN = JS_INTERFACE_SELF_BACK_FN;
var JS_INTERFACE_SET_JUMPLINK_FN = "setJumpLink";
exports.JS_INTERFACE_SET_JUMPLINK_FN = JS_INTERFACE_SET_JUMPLINK_FN;
var JS_NATIVE_PLAY_FN = "nativePlay";
exports.JS_NATIVE_PLAY_FN = JS_NATIVE_PLAY_FN;
var JS_NATIVE_PAUSE_FN = "videoPause";
exports.JS_NATIVE_PAUSE_FN = JS_NATIVE_PAUSE_FN;
var JS_UPDATE_MODAL_STATUS = "updateModal";
exports.JS_UPDATE_MODAL_STATUS = JS_UPDATE_MODAL_STATUS;
var SUBMIT_COMMENT = "submitComment";
exports.SUBMIT_COMMENT = SUBMIT_COMMENT;
var OPEN_MANUAL_DETAIL_JUMP_ACTION = "jumpAction=openmanualdetail";
exports.OPEN_MANUAL_DETAIL_JUMP_ACTION = OPEN_MANUAL_DETAIL_JUMP_ACTION;
var OPEN_MANUAL_INDEX = "manual#openmanual";
exports.OPEN_MANUAL_INDEX = OPEN_MANUAL_INDEX;
var OPEN_MANUAL_DETAIL = "url#openmanualdetail";

exports.OPEN_MANUAL_DETAIL = OPEN_MANUAL_DETAIL;
var JS_INTERFACE_RESOURCEINFO = "getFunAndRes";
exports.JS_INTERFACE_RESOURCEINFO = JS_INTERFACE_RESOURCEINFO;

},{}],14:[function(require,module,exports){

// Log输出工具
"use strict";

var LogUtil = {
  devLog: function (str) {
    var strLog = str;
    if (typeof strLog === "object") {
      strLog = JSON.stringify(strLog);
    }
    console.log("log: " + strLog);
  } };
module.exports = LogUtil;

},{}],15:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _slicedToArray = function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; for (var _iterator = arr[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) { _arr.push(_step.value); if (i && _arr.length === i) break; } return _arr; } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var has = require("./Util").has;

var Base64 = _interopRequire(require("./Base64"));

var _Constants = require("./Constants");

var TIPSAPPTYPE = _Constants.TIPSAPPTYPE;
var HIAPPTYPE = _Constants.HIAPPTYPE;
var NOT_EXIST = _Constants.NOT_EXIST;

var LogUtil = _interopRequire(require("./LogUtil"));

var NativeSdk = _interopRequire(require("./najssdk"));

var JS_INTERFACE_INITINFO = require("./InterfaceProtocol").JS_INTERFACE_INITINFO;

// import 'babel-polyfill';
// IE兼容才需要用的,需要引入第三方插件

var initStatus = false;
var versionInfo = {};
/**
 *
 * 设置单个key的value
 * @
 * @memberof Param
 */
var setValue = function (key, value) {
  if (versionInfo[key] !== value) {
    versionInfo[key] = value;
  }
};
/**
 *
 * 更新参数信息
 * @
 * @param {*} json
 * @memberof Param
 */
var updateVersionInfo = function (json) {
  var keys = Object.keys(json);
  for (var i = 0; i < keys.length; i += 1) {
    var key = keys[i];
    setValue(key, json[key]);
  }
};

/**
 *
 * 初始化参数信息
 * @
 * @memberof Param
 */
var initVersionInfo = function () {
  var search = decodeURIComponent(window.location.search);
  var params = {};
  var urlArray = search.split("?");
  if (urlArray[1]) {
    urlArray = urlArray[1].split("&");
    for (var i = 0; i < urlArray.length; i += 1) {
      var key = urlArray[i].split("=")[0];

      var _ref = urlArray[i].split("=");

      var _ref2 = _slicedToArray(_ref, 2);

      params[key] = _ref2[1];

      versionInfo[key] = params[key];
    }
  }
};
/**
 *
 * 获得单个key的value
 * @todo 待优化
 * @
 * @memberof Param
 */
var getValue = function (key) {
  if (!initStatus) {
    initStatus = true;
    initVersionInfo();
  }
  if (has.call(versionInfo, key)) {
    if (versionInfo[key] && versionInfo[key].toUpperCase) {
      return versionInfo[key].toUpperCase();
    }
    return String(versionInfo[key]).toUpperCase();
  }
  return NOT_EXIST;
};
exports.getValue = getValue;
var Param = {
  /**
   *
   *
   * 判断是否是玩机技巧内打开
   * @returns boolean
   */
  isTips: function isTips() {
    return getValue("appType") === TIPSAPPTYPE || getValue("appVersion") !== NOT_EXIST;
  },

  /**
   *
   * 判断是否点赞
   * @returns boolean
   */
  isPraised: function isPraised() {
    return getValue("isPraised") === "1";
  },

  /**
   *
   *
   * 判断是否是分享的页面
   * @returns boolean
   */
  isForShare: function isForShare() {
    return getValue("share") !== NOT_EXIST;
  },

  /**
   *
   *
   * @ 判断是app内打开
   * @returns boolean
   */
  isInApp: function isInApp() {
    return getValue("appVersion") !== NOT_EXIST || getValue("isPraised") !== NOT_EXIST || getValue("appType") !== NOT_EXIST;
  },

  /**
   * 判断是否是深色模式
   * @returns boolean
   */
  isDarkMode: function isDarkMode() {
    return getValue("darkMode") === "TRUE";
  },

  /**
   *
   *
   * 判断是否是平板
   * @returns boolean
   */
  isPad: function isPad() {
    return getValue("isPad") === "TRUE";
  },

  /**
   * 是否折叠屏
   */
  isFoldablePhone: function isFoldablePhone() {
    return getValue("isFoldablePhone") === "TRUE";
  },
  /**
   * 折叠屏是否展开
   */
  isExpandState: function isExpandState() {
    return getValue("isExpandState") === "TRUE";
  },

  /**
   *
   *
   * 判断是否是分屏模式
   * @returns boolean
   */
  isSplitMode: function isSplitMode() {
    return getValue("splitScreen") === "TRUE";
  },

  /**
   *
   *
   * 判断是否是卖场版本
   * @returns boolean
   */
  isDisplayVersion: function isDisplayVersion() {
    return getValue("isDisplayVersion") === "TRUE";
  },

  /**
   *
   *
   * 判断是否是手机上的分屏模式
   * @returns boolean
   */
  isPhoneSplitMode: function isPhoneSplitMode() {
    return Param.isSplitMode() && !Param.isPad() && !(Param.isFoldablePhone() && Param.isExpandState());
  },

  /**
   *
   *
   * 判断是否是语音助手内打开
   * @returns boolean
   */

  isHivoice: function isHivoice() {
    return getValue("appType") === HIAPPTYPE;
  },

  /**
   *
   *
   * 获取设备高度
   * @returns number
   */

  getDeviceHeight: function getDeviceHeight() {
    var height = getValue("deviceHeight");
    return height !== NOT_EXIST ? parseFloat(height) : 0;
  },

  /**
   *
   *
   * 获取机型
   * @returns string
   */

  getThemeType: function getThemeType() {
    return getValue("themeType");
  },
  /**
   * 得到app版本
   *
   * @returns
   */
  getAppVersion: function getAppVersion() {
    return getValue("appVersion") === NOT_EXIST ? null : parseFloat(getValue("appVersion"));
  },

  /**
   * 获得曲面屏手机的安全边距
   * @returns number
   */
  getRingWidth: function getRingWidth() {
    var ringSafeWidth = getValue("ringSafeWidth");
    return ringSafeWidth !== NOT_EXIST ? parseFloat(ringSafeWidth) : 0;
  },

  /**
   *
   *
   * 获取设备宽度
   * @returns number
   */

  getDeviceWidth: function getDeviceWidth() {
    var width = getValue("deviceWidth");
    return width !== NOT_EXIST ? parseFloat(width) : 0;
  },

  /**
   *
   *
   * 判断是否可以打点上报
   * @returns boolean
   */
  shouldReport: function shouldReport() {
    return Param.isForShare() && getValue("share") === "DOMESTIC";
  },

  /**
   *
   * 是否显示立即体验文字按钮
   * @returns boolean
   */
  hasExpericenButton: function hasExpericenButton() {
    return getValue("ImmediateExperienceBtn") === "1";
  },

  /**
   * @ 获得用户代理信息
   * @returns string
   */
  getUserAgent: function getUserAgent() {
    return navigator.userAgent;
  } };
Param.getUserAgent();

/**
 *
 * 页面初始化动作,判断是initInfo里面回调
 * 还是直接执行
 * @param {*} Param
 * @param {*} fn
 */
var onPageStarted = function (fn) {
  if (Param.isTips()) {
    window[JS_INTERFACE_INITINFO] = function (args) {
      if (args) {
        try {
          var options = args;
          if (typeof args === "string") {
            options = Base64.decode(args);
            LogUtil.devLog("ARGS_FROM_NATIVE:" + options);
            options = JSON.parse(options);
          }
          updateVersionInfo(options);
        } catch (error) {
          LogUtil.devLog(error);
        }
      }
      if (fn) {
        fn();
        // 防止native多次调用initInfo,初始化一次以后即可销毁初始化方法
        window[JS_INTERFACE_INITINFO] = function () {
          LogUtil.devLog("error -- " + JS_INTERFACE_INITINFO + " fn can only be executed once!");
        };
      }
    };
    NativeSdk.startInit();
    return false;
  }
  if (fn) {
    fn();
  }
};
exports.onPageStarted = onPageStarted;
exports["default"] = Param;

},{"./Base64":1,"./Constants":5,"./InterfaceProtocol":13,"./LogUtil":14,"./Util":17,"./najssdk":18}],16:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var Controller = _interopRequire(require("./Controllers/Controller"));

var LogUtil = _interopRequire(require("./LogUtil"));

var callInterfaceHook = require("./Util").callInterfaceHook;

var _CallerInterfaceJson = require("./Caller/InterfaceJson");

var SUCCESS_CB = _CallerInterfaceJson.SUCCESS_CB;
var COMPLETE_CB = _CallerInterfaceJson.COMPLETE_CB;
var ERROR_CB = _CallerInterfaceJson.ERROR_CB;

var RenderMaster = (function () {
  function RenderMaster(tag) {
    _classCallCheck(this, RenderMaster);

    this.tag = tag;
    this.controllers = [];
    this.beforeRunHooks = [];
    this.afterShowHooks = [];
  }

  _createClass(RenderMaster, {
    addBeforeRunHook: {

      /**
       * 添加beforeRun钩子
       * 在controller开始初始化之前跑
       * 主要放一下与视图无关的逻辑
       * 例如打点啊,之类的
       * @param {function} fn 方法回调
       * @memberof RenderMaster
       */

      value: function addBeforeRunHook(fn) {
        if (fn && fn instanceof Function) {
          this.beforeRunHooks.push(fn);
        }
      }
    },
    addAfterShowHook: {

      /** 添加钩子
       * 整个视图显示后执行
       * @param {function} fn 方法回调
       * @memberof RenderMaster
       */

      value: function addAfterShowHook(fn) {
        if (fn && fn instanceof Function) {
          this.afterShowHooks.push(fn);
        }
      }
    },
    beforeControllersRun: {

      /**
       * 执行beforeRun钩子
       *
       * @memberof RenderMaster
       */

      value: function beforeControllersRun() {
        this.beforeRunHooks.map(function (hook) {
          if (hook && hook instanceof Function) {
            hook();
          }
        });
      }
    },
    triggerControllersRun: {

      /**
       * 触发所有controller.run方法,执行控件/模块级初始化
       * @memberof RenderMaster
       */

      value: function triggerControllersRun() {
        this.controllers.map(function (item) {
          if (item && item instanceof Controller) {
            item.run();
          }
        });
      }
    },
    afterShow: {

      /**
       * 触发controller.afterShow方法,遍历执行rm 添加的aftershow钩子
       *
       * @memberof RenderMaster
       */

      value: function afterShow() {
        this.afterShowHooks.map(function (hook) {
          if (hook && hook instanceof Function) {
            hook();
          }
        });
        this.controllers.map(function (controller) {
          if (controller && controller.afterShow) {
            controller.afterShow();
          }
        });
      }
    },
    addController: {

      /**
       *
       * 添加组件/模块控制器
       * @param {Controller} controller
       * @memberof RenderMaster
       */

      value: function addController(controller) {
        if (controller && controller instanceof Controller) {
          this.controllers.push(controller);
        }
      }
    },
    run: {

      /**
       * 流程控制
       * 执行render方法,并显示视图,执行afterShow回调
       * @memberof RenderMaster
       */

      value: function run() {
        var _this = this;

        this.render({
          onComplete: function () {
            RenderMaster.showDocument();
            _this.afterShow();
          } });
      }
    },
    render: {

      /**
       * 流程控制
       * 执行beforeRun钩子,触发控制器run
       *
       * @memberof RenderMaster
       */

      value: function render() {
        var options = arguments[0] === undefined ? {} : arguments[0];

        var callHook = callInterfaceHook.bind(options);
        try {
          this.beforeControllersRun();
          this.triggerControllersRun();
          callHook(SUCCESS_CB);
        } catch (error) {
          LogUtil.devLog("render error:" + error);
          callHook(ERROR_CB);
        }
        callHook(COMPLETE_CB);
      }
    }
  }, {
    showDocument: {

      /**
       * 让整个视图都可见
       * 失败成功以后都要调用
       */

      value: function showDocument() {
        document.querySelector("body").classList.add("inited");
      }
    }
  });

  return RenderMaster;
})();

module.exports = RenderMaster;

},{"./Caller/InterfaceJson":4,"./Controllers/Controller":6,"./LogUtil":14,"./Util":17}],17:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _toConsumableArray = function (arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } };

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var LogUtil = _interopRequire(require("./LogUtil"));

/**
* 打点上报的方法,
* 这个方法使用的前置条件是,hajssdk与path在同一层级
* @param {*} path 路径
* @todo 修改一下供可配置
*/
var shareReport = function (path) {
  var scriptDom = document.createElement("script");
  var headDom = document.querySelector("head");
  headDom.appendChild(scriptDom);
  var srcUrl = "";
  if (path) {
    if (path.endsWith("/")) {
      srcUrl = "" + path + "hajssdk.js";
    } else {
      srcUrl = "" + path + "/hajssdk.js";
    }
  } else {
    srcUrl = "./hajssdk.js";
  }
  scriptDom.src = srcUrl;
  scriptDom.onload = function () {
    if (window._hasdk && window._hasdk.baseReport) {
      // eslint-disable-line
      _hasdk.baseReport(); // eslint-disable-line
    }
  };
  scriptDom.onerror = function () {
    LogUtil.devLog("hasdk not found");
  };
};
exports.shareReport = shareReport;
/**
 * 召唤钩子
 */
var callInterfaceHook = function callInterfaceHook(type) {
  if (this && this[type] && this[type] instanceof Function) {
    var args = Array.prototype.slice.call(arguments, 1);
    LogUtil.devLog(type);
    this[type].apply(this, _toConsumableArray(args));
  }
};

exports.callInterfaceHook = callInterfaceHook;
/**
 * URL构造器兼容,更方便处理search的参数及产生新的url
 */

var URLUtil = exports.URLUtil = (function () {
  function URLUtil(url) {
    var _this = this;

    _classCallCheck(this, URLUtil);

    try {
      this.urlObject = new URL(url);
      this.searchPrames = this.urlObject.searchParams;
    } catch (error) {
      (function () {
        // IE11不兼容new URL构造函数,自己写的一个兼容的方法,优雅降级
        var originUrl = url.split("?")[0];
        var hash = url.split("#")[1] || "";
        var searchParams = url.split("?")[1].split("&");
        _this.urlObject = {
          toString: function () {
            if (hash) {
              return "" + originUrl + "?" + searchParams.join("&") + "#" + hash;
            }
            return "" + originUrl + "?" + searchParams.join("&");
          } };
        _this.searchPrames = {
          append: function (key, value) {
            searchParams.push("" + key + "=" + value);
          } };
      })();
    }
  }

  _createClass(URLUtil, {
    addParam: {
      value: function addParam(key, value) {
        this.searchPrames.append(key, value);
      }
    },
    getUrl: {
      value: function getUrl() {
        return this.urlObject.toString();
      }
    }
  });

  return URLUtil;
})();

var has = Object.prototype.hasOwnProperty;
exports.has = has;

},{"./LogUtil":14}],18:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var CallerForNative = _interopRequire(require("./Caller/CallerForNative"));

var CallerForWeb = _interopRequire(require("./Caller/CallerForWeb"));

var _CallerInterfaceJson = require("./Caller/InterfaceJson");

var CODE_NATIVE = _CallerInterfaceJson.CODE_NATIVE;
var CAN_USE_MOBILE = _CallerInterfaceJson.CAN_USE_MOBILE;

var _InterfaceProtocol = require("./InterfaceProtocol");

var JS_INTERFACE_REPORT_EVENT = _InterfaceProtocol.JS_INTERFACE_REPORT_EVENT;
var JS_INTERFACE_INITINFO = _InterfaceProtocol.JS_INTERFACE_INITINFO;
var JS_INTERFACE_CANCELPRAISE = _InterfaceProtocol.JS_INTERFACE_CANCELPRAISE;
var JS_INTERFACE_CLICKPRAISE = _InterfaceProtocol.JS_INTERFACE_CLICKPRAISE;
var JS_INTERFACE_EXPRIENCE = _InterfaceProtocol.JS_INTERFACE_EXPRIENCE;
var JS_INTERFACE_ROAST = _InterfaceProtocol.JS_INTERFACE_ROAST;
var JS_UPDATE_MODAL_STATUS = _InterfaceProtocol.JS_UPDATE_MODAL_STATUS;
var SUBMIT_COMMENT = _InterfaceProtocol.SUBMIT_COMMENT;
var JS_INTERFACE_UPDATECOMMENTSFROMNATIVE = _InterfaceProtocol.JS_INTERFACE_UPDATECOMMENTSFROMNATIVE;
var JS_INTERFACE_TAGTOGGLED = _InterfaceProtocol.JS_INTERFACE_TAGTOGGLED;
var JS_INTERFACE_CAN_I_JUMP = _InterfaceProtocol.JS_INTERFACE_CAN_I_JUMP;
var UPDATE_SCHEMA = _InterfaceProtocol.UPDATE_SCHEMA;
var JS_INTERFACE_REFRESHPRAISE = _InterfaceProtocol.JS_INTERFACE_REFRESHPRAISE;
var JS_INTERFACE_RESOURCEINFO = _InterfaceProtocol.JS_INTERFACE_RESOURCEINFO;

var Base64 = _interopRequire(require("./Base64"));

/**
* 通过console.log调用native接口
*
* @param {*} eventName
* @param {*} args
* @returns
*/
var callNaInterface = function (eventName, args) {
  if (!args) {
    console.log("" + eventName + ":");
    return false;
  }
  if (typeof args === "number" || typeof args === "string") {
    console.log("" + eventName + ":" + args);
    return false;
  }
  var str = JSON.stringify(args);
  console.log("" + eventName + ":" + str);
};
exports.callNaInterface = callNaInterface;
var callNaReportEvent = function (args) {
  callNaInterface(JS_INTERFACE_REPORT_EVENT, args);
};

exports.callNaReportEvent = callNaReportEvent;
var NativeSdk = (function () {
  // 默认的配置项
  var defaultOptions = {
    moduel: "tips" };
  var sdk = {
    /**
     * 配置参数(暂未使用)
     * 以后用来做appid,appkey
     * 还有其他什么什么的,等待挖掘
     */
    config: function (options) {
      defaultOptions = Object.assign(defaultOptions, options);
    },
    /**
     * 开始初始化
     * 调用initInfo:
     */
    startInit: function () {
      callNaInterface(JS_INTERFACE_INITINFO);
    },
    /**
     * 点赞
     */
    clickPraise: function (data) {
      var params = data;
      params.status = 1;
      CallerForWeb.togglePraise(params, {
        onError: function () {
          if (data) {
            callNaInterface(JS_INTERFACE_CLICKPRAISE, data);
            return false;
          }
          callNaInterface(JS_INTERFACE_CLICKPRAISE);
        } });
    },
    /**
     * 取消点赞
     *
     */
    cancelPraise: function (data) {
      var params = data;
      params.status = 0;
      CallerForWeb.togglePraise(params, {
        onError: function () {
          if (data) {
            callNaInterface(JS_INTERFACE_CANCELPRAISE, data);
            return false;
          }
          callNaInterface(JS_INTERFACE_CANCELPRAISE);
        } });
    },
    /**
     * 刷新点赞
     */
    refreshPraise: function (options) {
      var onSuccess = options.onSuccess;
      var data = options.data;

      CallerForWeb.refreshPraise(data, {
        onSuccess: onSuccess,
        onError: function () {
          CallerForNative.registerFn(JS_INTERFACE_REFRESHPRAISE, onSuccess);
          callNaInterface(JS_INTERFACE_REFRESHPRAISE, data);
        } });
    },
    /**
     * (暂未使用)
     * @param 包含立即体验的一些信息
     * 1.卡片立即体验直接调用exp接口
     * 2.jumptoapp那种就调用a标签点击行为
     * 必须 packageName: 包名
     * 必须 appVersion: app版本
     * 必须 id: funNum/sectionId 打点用
     * 必须 resourceType: card/ug/banner/subject
     * 必须 appVersion: app版本
     * 可选 action: string
     * 可选 category: string
     * 可选 type: any
     * 可选 data: any
     */
    experience: function (data) {
      if (data) {
        var expLink = document.querySelector("expLink");
        if (!expLink) {
          var body = document.querySelector("body");
          expLink = document.createElement("a");
          expLink.style.display = "none";
          expLink.id = "expLink";
          body.appendChild(expLink);
        }
        expLink.href = "jumptoapp:" + encodeURIComponent(data);
        expLink.click();
        return false;
      }
      callNaInterface(JS_INTERFACE_EXPRIENCE);
    },
    /**
     * 打开吐槽弹框的时候通知native
     */
    openRoastActionSheet: function (data) {
      CallerForWeb.openRoastActionSheet(data, {
        onError: function () {
          callNaInterface(JS_INTERFACE_ROAST, Base64.encode(data));
        } });
    },
    /**
     * 更新native层面的弹框状态,阻止左右滑及监听返回需要用到
     * @param data 一个json对象
     * 包含字段
     * action:open/close
     * type:any
     */
    updateModalStatus: function (options) {
      var callBack = options.callBack;
      var data = options.data;

      CallerForWeb.updateModalStatus(data, {
        onError: function () {
          if (callBack) {
            CallerForNative.registerFn(JS_UPDATE_MODAL_STATUS, callBack);
          }
          callNaInterface(JS_UPDATE_MODAL_STATUS, data);
        } });
    },
    /**
     * 刷新吐槽回调
     */
    onUpdateModalStatus: function (fn) {
      CallerForNative.addKeyListener(CODE_NATIVE[JS_UPDATE_MODAL_STATUS], fn);
    },
    /**
     * 提交评论/吐槽的内筒
     * @param data 一个json对象
     * 包含字段
     * contentTags 内容标签
     * functionTags 功能标签
     * commentTime new Date().getTime()
     */
    submitComment: function (data) {
      CallerForWeb.submitComment(data, {
        onError: function () {
          callNaInterface(SUBMIT_COMMENT, Base64.encode(data));
        } });
    },
    /**
     * 通知native调用吐槽初始化事件,并注册回调
     * 手册详情,仅调用新接口
     */
    updateCommentsFromNative: function (options) {
      var onSuccess = options.onSuccess;
      var data = options.data;
      var onlyUseNewInterface = options.onlyUseNewInterface;

      CallerForWeb.updateCommentsFromNative(data, {
        onSuccess: onSuccess,
        onError: function () {
          if (onlyUseNewInterface) {
            return false;
          }
          if (onSuccess) {
            CallerForNative.registerFn(JS_INTERFACE_UPDATECOMMENTSFROMNATIVE, onSuccess);
          }
          callNaInterface(JS_INTERFACE_UPDATECOMMENTSFROMNATIVE, Base64.encode(data));
        } });
    },
    /**
     * 标签选中/反选事件.通知native打点
     */
    tagChanged: function (data) {
      CallerForWeb.tagToggled(data, {
        onError: function () {
          callNaInterface(JS_INTERFACE_TAGTOGGLED, Base64.encode(data));
        } });
    },
    /**
     * 校验一键直达链接
     * @param options 为配置项
     * 包含 linkMap 需要校验的链接map
     * callBack,为校验后的回调,参数为可跳转的链接的map
     * onUpdate,为系统app卸载时,玩机调用隐藏链接的办法,参数为appName
     */
    validateSchemaUrls: function (options) {
      var linkMap = options.linkMap;
      var callBack = options.callBack;
      var onUpdate = options.onUpdate;

      if (linkMap) {
        callNaInterface(JS_INTERFACE_CAN_I_JUMP, JSON.stringify(linkMap));
      }
      if (callBack) {
        CallerForNative.registerFn(JS_INTERFACE_CAN_I_JUMP, callBack);
      }
      if (onUpdate) {
        CallerForNative.registerFn(UPDATE_SCHEMA, onUpdate);
      }
    },

    /**
     * 网络状况(是否同意使用数据流量)改变时的回调 native发起
     * @param fn 注册的回到函数
     * @returns boolean 表示是否显示移动数据流量弹框
     */
    onNetworkChange: function (fn) {
      CallerForNative.addKeyListener(CODE_NATIVE[CAN_USE_MOBILE], fn);
    },
    getResource: function (fn) {
      CallerForNative.addKeyListener(CODE_NATIVE[JS_INTERFACE_RESOURCEINFO], fn);
    },

    /**
     * 主动获取是否同意使用数据流量状态
     * @returns boolean 表示是否显示移动数据流量弹框
     */
    getMobileWarnStatus: CallerForWeb.getMobileWarnStatus,
    /**
     * 主动获取提示文字
     * @returns array 目前仅包含2个字符串,对每个字串进行换行处理
    */
    getNetworkWarnText: CallerForWeb.getNetworkWarnText,
    /**
     * 通知native,用户主动点击使用数据流量
    */
    agreeUseMobile: CallerForWeb.agreeUseMobile,
    /**
     * 告诉native,页面是否有视频
     */
    pageHasMedia: CallerForWeb.pageHasMedia,
    /**
     * 通过id获取对应的ID值(暂未使用)
     */
    getDefs: CallerForWeb.getDefs };
  return sdk;
})();
exports["default"] = NativeSdk;

},{"./Base64":1,"./Caller/CallerForNative":2,"./Caller/CallerForWeb":3,"./Caller/InterfaceJson":4,"./InterfaceProtocol":13}],19:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var MainContentController = _interopRequire(require("../../../public_assets/Controllers/MainContentController"));

var body = document.querySelector("body");
var mainCtrl = new MainContentController({
  target: body,
  cName: "body" });
module.exports = mainCtrl;

},{"../../../public_assets/Controllers/MainContentController":8}],20:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var PraiseButtonController = _interopRequire(require("../../../public_assets/Controllers/PraiseButtonController"));

var _public_assetsDomUtil = require("../../../public_assets/DomUtil");

var getFunNum = _public_assetsDomUtil.getFunNum;
var getResourceType = _public_assetsDomUtil.getResourceType;
var getIdentifier = _public_assetsDomUtil.getIdentifier;

var praiseButtonCtrl = new PraiseButtonController({
  target: document.querySelector("#praise"),
  cName: "praiseButton" });

function initMetas() {
  var Identifier = getIdentifier();
  var funNum = getFunNum();
  var resourceType = getResourceType();
  if (Identifier) {
    this.metas.Identifier = Identifier;
  }
  if (funNum) {
    this.metas.funNum = funNum;
  }
  if (resourceType) {
    this.metas.resourceType = resourceType;
  }
}
praiseButtonCtrl.initMetas = initMetas;
module.exports = praiseButtonCtrl;

},{"../../../public_assets/Controllers/PraiseButtonController":9,"../../../public_assets/DomUtil":12}],21:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var RoastButtonController = _interopRequire(require("../../../public_assets/Controllers/RoastButtonController"));

var roastButton = document.querySelector("#comment-button");
var roastCtrl = new RoastButtonController({
  target: roastButton,
  cName: "roastButton",
  onlyUseNewInterface: true });

module.exports = roastCtrl;

},{"../../../public_assets/Controllers/RoastButtonController":10}],22:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var Controller = _interopRequire(require("../../../public_assets/Controllers/Controller"));

var NativeSdk = _interopRequire(require("../../../public_assets/najssdk"));

var _public_assetsDomUtil = require("../../../public_assets/DomUtil");

var domListToArray = _public_assetsDomUtil.domListToArray;
var getFunNum = _public_assetsDomUtil.getFunNum;
var getResourceType = _public_assetsDomUtil.getResourceType;

var target = document.querySelectorAll(".tipsexperience");
var linkMap = {};
var schemaLinkCtrl = new Controller({
  cName: "schemaLinkCtrl",
  target: target });
function toggleSchema() {
  var show = arguments[0] === undefined ? false : arguments[0];

  if (this) {
    var _ref = this;

    var parentNode = _ref.parentNode;

    if (parentNode) {
      if (show) {
        parentNode.style.display = "block";
        return false;
      }
      parentNode.style.display = "none";
    }
  }
}
function getSchemaLinkOption(item) {
  var hrefParam = item.getAttribute("href");
  hrefParam = hrefParam.replace(/'/g, "\"").replace(/\/"/g, "'");
  var hrefJson = JSON.parse(hrefParam);
  var tempObj = {
    packageName: hrefJson.appName,
    appVersion: hrefJson.appVersion };
  var str = hrefJson.appParam || "";
  str = str.replace(/'/g, "\"") || "{}";
  var param = JSON.parse(str);
  tempObj = Object.assign(tempObj, param);
  return tempObj;
}

function callBack(args) {
  var params = args;
  if (params) {
    params = JSON.parse(args);
    if (params && params.map) {
      params.map(function (index) {
        var targetSchema = document.querySelector("a[data-skey=\"" + index + "\"]");
        toggleSchema.call(targetSchema, true);
      });
    }
  }
}

function onUpdate(appName) {
  var appKey = decodeURIComponent(appName);
  var hideTarget = domListToArray("[appname=\"" + appKey + "\"]");
  hideTarget.map(function (item) {
    toggleSchema.call(item);
  });
}
/**
 * 设置url,初始化map
 *
 */
function initUrl() {
  var list = domListToArray(target);
  for (var i = 0; i < list.length; i += 1) {
    var item = list[i].querySelector(".tipslink");
    item.setAttribute("data-skey", i);
    var link = getSchemaLinkOption(item);
    linkMap[i] = link;
    link.resourceType = getResourceType();
    if (list[i].parentNode.classList.contains("section")) {
      link.id = list[i].parentNode.querySelector(".sectiontitle").getAttribute("id");
    } else {
      link.id = getFunNum();
    }
    if (item) {
      item.setAttribute("href", "jumptoapp:" + encodeURIComponent(JSON.stringify(link)));
      item.setAttribute("appname", encodeURIComponent(link.packageName));
    }
  }
}
schemaLinkCtrl.initView = initUrl;
schemaLinkCtrl.initCallbackForNative = function () {
  NativeSdk.validateSchemaUrls({
    linkMap: linkMap,
    callBack: callBack,
    onUpdate: onUpdate });
};
module.exports = schemaLinkCtrl;

},{"../../../public_assets/Controllers/Controller":6,"../../../public_assets/DomUtil":12,"../../../public_assets/najssdk":18}],23:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var WebLinkController = _interopRequire(require("../../../public_assets/Controllers/WebLinkController"));

var domListToArray = require("../../../public_assets/DomUtil").domListToArray;

var getValue = require("../../../public_assets/Param").getValue;

var target = document.querySelectorAll("a[href ^= \"jumpto\"],a[href $= \"#openmanualdetail\"]");
var webLinkCtrl = new WebLinkController({
  target: target,
  cName: "weblink" });
function initView() {
  var links = domListToArray(webLinkCtrl.target);
  for (var i = 0; i < links.length; i += 1) {
    var item = links[i];
    if (item) {
      if (getValue("supportLink") === "TRUE") {
        item.classList.add("supportLink");
      } else {
        item.removeAttribute("href");
        item.classList.remove("supportLink");
      }
    }
  }
}
webLinkCtrl.initView = initView;
module.exports = webLinkCtrl;

},{"../../../public_assets/Controllers/WebLinkController":11,"../../../public_assets/DomUtil":12,"../../../public_assets/Param":15}],24:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _public_assetsConstants = require("../../public_assets/Constants");

var NOT_EXIST = _public_assetsConstants.NOT_EXIST;
var themeOptions = _public_assetsConstants.themeOptions;

var _public_assetsParam = require("../../public_assets/Param");

var Param = _interopRequire(_public_assetsParam);

var onPageStarted = _public_assetsParam.onPageStarted;

var shareReport = require("../../public_assets/Util").shareReport;

var NativeCaller = _interopRequire(require("../../public_assets/Caller/CallerForNative"));

var RenderMaster = _interopRequire(require("../../public_assets/RenderMaster"));

var mainCtrl = _interopRequire(require("./ctrls/mainCtrl"));

var praiseButtonCtrl = _interopRequire(require("./ctrls/praiseButtonCtrl"));

var webLinkCtrl = _interopRequire(require("./ctrls/webLinkCtrl"));

var schemaLinkCtrl = _interopRequire(require("./ctrls/schemaLinkCtrl"));

var _public_assetsDomUtil = require("../../public_assets/DomUtil");

var onWindowTouchCancel = _public_assetsDomUtil.onWindowTouchCancel;
var hackRingWidth = _public_assetsDomUtil.hackRingWidth;
var removeNativeDarkStyle = _public_assetsDomUtil.removeNativeDarkStyle;
var getFunAndRes = _public_assetsDomUtil.getFunAndRes;

var roastCtrl = _interopRequire(require("./ctrls/roastCtrl"));

var _public_assetsInterfaceProtocol = require("../../public_assets/InterfaceProtocol");

var JS_INTERFACE_VIEW_MANUAL = _public_assetsInterfaceProtocol.JS_INTERFACE_VIEW_MANUAL;
var JS_INTERFACE_VIEW_MANUAL_LIST = _public_assetsInterfaceProtocol.JS_INTERFACE_VIEW_MANUAL_LIST;
var JS_INTERFACE_RESOURCEINFO = _public_assetsInterfaceProtocol.JS_INTERFACE_RESOURCEINFO;

var CODE_NATIVE = require("../../public_assets/Caller/InterfaceJson").CODE_NATIVE;

var _public_assetsNajssdk = require("../../public_assets/najssdk");

var NativeSdk = _interopRequire(_public_assetsNajssdk);

var callNaInterface = _public_assetsNajssdk.callNaInterface;

var Master = new RenderMaster("manual");
Master.addController(mainCtrl);
Master.addController(praiseButtonCtrl);
Master.addController(schemaLinkCtrl);
Master.addController(webLinkCtrl);
Master.addController(roastCtrl);

Master.addBeforeRunHook(function () {
  if (Param.shouldReport()) {
    // 分享打点信息
    var haSdkPath = document.querySelector("[src$=\"guideCommon.js\"]");
    if (haSdkPath) {
      haSdkPath = haSdkPath.src.replace("guideCommon.js", "");
      shareReport(haSdkPath);
    }
  }
});

Master.addBeforeRunHook(function () {
  // 打点交互信息
  var docTitle = document.querySelector("title").innerText;
  docTitle = encodeURIComponent(docTitle);
  var praiseButton = document.getElementById("praise");
  if (!praiseButton) {
    callNaInterface(JS_INTERFACE_VIEW_MANUAL_LIST, docTitle);
  } else {
    callNaInterface(JS_INTERFACE_VIEW_MANUAL, docTitle);
  }
});

Master.addBeforeRunHook(function () {
  NativeSdk.getResource(getFunAndRes);
  removeNativeDarkStyle();
});
// Master.addBeforeRunHook(() => {
//   // 不知道这是干嘛的...
//   const themeColor = window.jsInterface
//     ? window.jsInterface.getSkinHexColor()
//     : '#ffffff';
//   if (themeColor === 'ffe05a6d') {
//     document.getElementsByTagName('body')[0].className = 'pink';
//   } else if (themeColor === 'ff9e7837') {
//     document.getElementsByTagName('body')[0].className = 'white';
//   } else if (themeColor === 'ccdc7832') {
//     document.getElementsByTagName('body')[0].className = 'taste';
//   } else if (themeColor === 'ff23a7d9') {
//     // 蓝色无需给body赋值
//   }
//   if (window.jsInterface) {
//     window.jsInterface.setOwnPage();
//   }
// });
Master.addBeforeRunHook(function () {
  // touch cancle时,取消press类
  onWindowTouchCancel();
});

Master.addBeforeRunHook(function () {
  var seletor = "";
  // 这个是手册ring适配的
  if (document.getElementById("jd-content1")) {
    // 证明是手册首页index.html
    seletor = ".gd-list a";
  } else if (document.getElementById("jd-content")) {
    // 证明是手册搜索页面的node_html或者详情页
    if (document.getElementById("praise")) {
      // 手册样式简直了..
      document.querySelector("#jd-content").style.padding = "24px";
      // 证明是详情
      seletor = "body";
    } else {
      // 证明是手册搜索页面
      // 想吐..
      seletor = ".ulchildlink a";
    }
  }
  addThemeType();

  if (seletor) {
    var ringWidth = Param.getRingWidth();
    hackRingWidth(ringWidth, seletor);
  }
});
NativeCaller.registerFn("returnMenu", function () {
  // 也不知道是干嘛的,看名字是返回的
  window.jsInterface.returnMenu();
});
NativeCaller.registerFn("searchContent", function () {
  // 不知道干嘛的,看名字是搜索的
  window.jsInterface.searchContent();
});
NativeCaller.addKeyListener(CODE_NATIVE[JS_INTERFACE_RESOURCEINFO], getFunAndRes);
// goParent 不知道是干啥的,看起来是返回的
function goParent() {
  // eslint-disable-line no-unused-vars
  var backHref = document.getElementById("backLink");
  if (backHref) {
    if (backHref.getAttribute("href").indexOf("returnMenu") >= 0) {
      returnMenu(); // eslint-disable-line no-undef
    } else {
      window.location.href = backHref.getAttribute("href");
    }
  } else {
    window.history.go(-1);
  }
}

function addThemeType() {
  var themeType = Param.getThemeType();
  var content = document.querySelector("#jd-content");
  if (themeType !== NOT_EXIST) {
    content.classList.add(themeOptions[themeType].className);
  }
}

onPageStarted(function () {
  Master.run();
});

},{"../../public_assets/Caller/CallerForNative":2,"../../public_assets/Caller/InterfaceJson":4,"../../public_assets/Constants":5,"../../public_assets/DomUtil":12,"../../public_assets/InterfaceProtocol":13,"../../public_assets/Param":15,"../../public_assets/RenderMaster":16,"../../public_assets/Util":17,"../../public_assets/najssdk":18,"./ctrls/mainCtrl":19,"./ctrls/praiseButtonCtrl":20,"./ctrls/roastCtrl":21,"./ctrls/schemaLinkCtrl":22,"./ctrls/webLinkCtrl":23}]},{},[24])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJEOi9NeXNlcnZlci9DbG91ZERyYWdvbkNvZGUvdGlwcy93ZWIvRU1VSTEwL3NyYy9wdWJsaWNfYXNzZXRzL0Jhc2U2NC5qcyIsIkQ6L015c2VydmVyL0Nsb3VkRHJhZ29uQ29kZS90aXBzL3dlYi9FTVVJMTAvc3JjL3B1YmxpY19hc3NldHMvQ2FsbGVyL0NhbGxlckZvck5hdGl2ZS5qcyIsIkQ6L015c2VydmVyL0Nsb3VkRHJhZ29uQ29kZS90aXBzL3dlYi9FTVVJMTAvc3JjL3B1YmxpY19hc3NldHMvQ2FsbGVyL0NhbGxlckZvcldlYi5qcyIsIkQ6L015c2VydmVyL0Nsb3VkRHJhZ29uQ29kZS90aXBzL3dlYi9FTVVJMTAvc3JjL3B1YmxpY19hc3NldHMvQ2FsbGVyL0ludGVyZmFjZUpzb24uanMiLCJEOi9NeXNlcnZlci9DbG91ZERyYWdvbkNvZGUvdGlwcy93ZWIvRU1VSTEwL3NyYy9wdWJsaWNfYXNzZXRzL0NvbnN0YW50cy5qcyIsIkQ6L015c2VydmVyL0Nsb3VkRHJhZ29uQ29kZS90aXBzL3dlYi9FTVVJMTAvc3JjL3B1YmxpY19hc3NldHMvQ29udHJvbGxlcnMvQ29udHJvbGxlci5qcyIsIkQ6L015c2VydmVyL0Nsb3VkRHJhZ29uQ29kZS90aXBzL3dlYi9FTVVJMTAvc3JjL3B1YmxpY19hc3NldHMvQ29udHJvbGxlcnMvRXZhbHVhdGUuanMiLCJEOi9NeXNlcnZlci9DbG91ZERyYWdvbkNvZGUvdGlwcy93ZWIvRU1VSTEwL3NyYy9wdWJsaWNfYXNzZXRzL0NvbnRyb2xsZXJzL01haW5Db250ZW50Q29udHJvbGxlci5qcyIsIkQ6L015c2VydmVyL0Nsb3VkRHJhZ29uQ29kZS90aXBzL3dlYi9FTVVJMTAvc3JjL3B1YmxpY19hc3NldHMvQ29udHJvbGxlcnMvUHJhaXNlQnV0dG9uQ29udHJvbGxlci5qcyIsIkQ6L015c2VydmVyL0Nsb3VkRHJhZ29uQ29kZS90aXBzL3dlYi9FTVVJMTAvc3JjL3B1YmxpY19hc3NldHMvQ29udHJvbGxlcnMvUm9hc3RCdXR0b25Db250cm9sbGVyLmpzIiwiRDovTXlzZXJ2ZXIvQ2xvdWREcmFnb25Db2RlL3RpcHMvd2ViL0VNVUkxMC9zcmMvcHVibGljX2Fzc2V0cy9Db250cm9sbGVycy9XZWJMaW5rQ29udHJvbGxlci5qcyIsIkQ6L015c2VydmVyL0Nsb3VkRHJhZ29uQ29kZS90aXBzL3dlYi9FTVVJMTAvc3JjL3B1YmxpY19hc3NldHMvRG9tVXRpbC5qcyIsIkQ6L015c2VydmVyL0Nsb3VkRHJhZ29uQ29kZS90aXBzL3dlYi9FTVVJMTAvc3JjL3B1YmxpY19hc3NldHMvSW50ZXJmYWNlUHJvdG9jb2wuanMiLCJEOi9NeXNlcnZlci9DbG91ZERyYWdvbkNvZGUvdGlwcy93ZWIvRU1VSTEwL3NyYy9wdWJsaWNfYXNzZXRzL0xvZ1V0aWwuanMiLCJEOi9NeXNlcnZlci9DbG91ZERyYWdvbkNvZGUvdGlwcy93ZWIvRU1VSTEwL3NyYy9wdWJsaWNfYXNzZXRzL1BhcmFtLmpzIiwiRDovTXlzZXJ2ZXIvQ2xvdWREcmFnb25Db2RlL3RpcHMvd2ViL0VNVUkxMC9zcmMvcHVibGljX2Fzc2V0cy9SZW5kZXJNYXN0ZXIuanMiLCJEOi9NeXNlcnZlci9DbG91ZERyYWdvbkNvZGUvdGlwcy93ZWIvRU1VSTEwL3NyYy9wdWJsaWNfYXNzZXRzL1V0aWwuanMiLCJEOi9NeXNlcnZlci9DbG91ZERyYWdvbkNvZGUvdGlwcy93ZWIvRU1VSTEwL3NyYy9wdWJsaWNfYXNzZXRzL25hanNzZGsuanMiLCJEOi9NeXNlcnZlci9DbG91ZERyYWdvbkNvZGUvdGlwcy93ZWIvRU1VSTEwL3NyYy90aXBzX21hbnVhbC9hc3NldHMvY3RybHMvbWFpbkN0cmwuanMiLCJEOi9NeXNlcnZlci9DbG91ZERyYWdvbkNvZGUvdGlwcy93ZWIvRU1VSTEwL3NyYy90aXBzX21hbnVhbC9hc3NldHMvY3RybHMvcHJhaXNlQnV0dG9uQ3RybC5qcyIsIkQ6L015c2VydmVyL0Nsb3VkRHJhZ29uQ29kZS90aXBzL3dlYi9FTVVJMTAvc3JjL3RpcHNfbWFudWFsL2Fzc2V0cy9jdHJscy9yb2FzdEN0cmwuanMiLCJEOi9NeXNlcnZlci9DbG91ZERyYWdvbkNvZGUvdGlwcy93ZWIvRU1VSTEwL3NyYy90aXBzX21hbnVhbC9hc3NldHMvY3RybHMvc2NoZW1hTGlua0N0cmwuanMiLCJEOi9NeXNlcnZlci9DbG91ZERyYWdvbkNvZGUvdGlwcy93ZWIvRU1VSTEwL3NyYy90aXBzX21hbnVhbC9hc3NldHMvY3RybHMvd2ViTGlua0N0cmwuanMiLCJEOi9NeXNlcnZlci9DbG91ZERyYWdvbkNvZGUvdGlwcy93ZWIvRU1VSTEwL3NyYy90aXBzX21hbnVhbC9hc3NldHMvZ3VpZGVDb21tb24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7SUNBTSxNQUFNO0FBQ0MsV0FEUCxNQUFNLEdBQ0k7MEJBRFYsTUFBTTs7O0FBR1IsUUFBSSxDQUFDLE9BQU8sR0FBRyxtRUFBbUUsQ0FBQztHQUNwRjs7ZUFKRyxNQUFNO0FBTVYsVUFBTTthQUFBLGdCQUFDLEtBQUssRUFBRTtBQUNaLFlBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxJQUFJLEtBQUssS0FBSyxJQUFJLElBQUksS0FBSyxLQUFLLFNBQVMsRUFBRTtBQUN0RSxlQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUMvQjtBQUNELFlBQUksTUFBTSxHQUFHLEVBQUU7WUFBRSxJQUFJLFlBQUE7WUFBRSxJQUFJLFlBQUE7WUFBRSxJQUFJLFlBQUE7WUFBRSxJQUFJLFlBQUE7WUFBRSxJQUFJLFlBQUE7WUFBRSxJQUFJLFlBQUE7WUFBRSxJQUFJLFlBQUE7WUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ2pFLGFBQUssR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ25DLGVBQU8sQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUU7QUFDdkIsY0FBSSxHQUFHLEtBQUssQ0FBQyxV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RCxnQkFBVSxFQUFFLENBQUM7S0FDZCxNQUFNO0FBQ0wsWUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUN0RDtHQUNGLE1BQU07QUFDTCxVQUFNLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0dBQ3ZCO0NBQ0Y7O0FBRUQsU0FBUyxZQUFZLEdBQUU7QUFDckIsTUFBSSxTQUFTLEdBQUcsS0FBSyxDQUFDLFlBQVksRUFBRSxDQUFDO0FBQ3JDLE1BQUksT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDcEQsTUFBRyxTQUFTLEtBQUssU0FBUyxFQUFDO0FBQ3pCLFdBQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQztHQUMxRDtDQUNGOztBQUVELGFBQWEsQ0FBQyxZQUFNO0FBQ2xCLFFBQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQztDQUNkLENBQUMsQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImNsYXNzIEJhc2U2NCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIC8vIHByaXZhdGUgcHJvcGVydHlcbiAgICB0aGlzLl9rZXlTdHIgPSBcIkFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky89XCI7XG4gIH1cblxuICBlbmNvZGUoaW5wdXQpIHtcbiAgICBpZiAodHlwZW9mIGlucHV0ID09PSAnb2JqZWN0JyAmJiBpbnB1dCAhPT0gbnVsbCAmJiBpbnB1dCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBpbnB1dCA9IEpTT04uc3RyaW5naWZ5KGlucHV0KTtcbiAgICB9XG4gICAgbGV0IG91dHB1dCA9IFwiXCIsIGNocjEsIGNocjIsIGNocjMsIGVuYzEsIGVuYzIsIGVuYzMsIGVuYzQsIGkgPSAwO1xuICAgIGlucHV0ID0gQmFzZTY0Ll91dGY4X2VuY29kZShpbnB1dCk7XG4gICAgd2hpbGUgKGkgPCBpbnB1dC5sZW5ndGgpIHtcbiAgICAgIGNocjEgPSBpbnB1dC5jaGFyQ29kZUF0KGkrKyk7XG4gICAgICBjaHIyID0gaW5wdXQuY2hhckNvZGVBdChpKyspO1xuICAgICAgY2hyMyA9IGlucHV0LmNoYXJDb2RlQXQoaSsrKTtcbiAgICAgIGVuYzEgPSBjaHIxID4+IDI7XG4gICAgICBlbmMyID0gKChjaHIxICYgMykgPDwgNCkgfCAoY2hyMiA+PiA0KTtcbiAgICAgIGVuYzMgPSAoKGNocjIgJiAxNSkgPDwgMikgfCAoY2hyMyA+PiA2KTtcbiAgICAgIGVuYzQgPSBjaHIzICYgNjM7XG4gICAgICBpZiAoaXNOYU4oY2hyMikpIHtcbiAgICAgICAgZW5jMyA9IGVuYzQgPSA2NDtcbiAgICAgIH0gZWxzZSBpZiAoaXNOYU4oY2hyMykpIHtcbiAgICAgICAgZW5jNCA9IDY0O1xuICAgICAgfVxuICAgICAgb3V0cHV0ID0gb3V0cHV0ICtcbiAgICAgICAgdGhpcy5fa2V5U3RyLmNoYXJBdChlbmMxKSArIHRoaXMuX2tleVN0ci5jaGFyQXQoZW5jMikgK1xuICAgICAgICB0aGlzLl9rZXlTdHIuY2hhckF0KGVuYzMpICsgdGhpcy5fa2V5U3RyLmNoYXJBdChlbmM0KTtcbiAgICB9XG4gICAgcmV0dXJuIG91dHB1dDtcbiAgfVxuXG4gIGRlY29kZShpbnB1dCkge1xuICAgIGxldCBvdXRwdXQgPSBcIlwiLCBjaHIxLCBjaHIyLCBjaHIzLCBlbmMxLCBlbmMyLCBlbmMzLCBlbmM0LCBpID0gMDtcbiAgICBpbnB1dCA9IGlucHV0LnJlcGxhY2UoL1teQS1aYS16MC05XFwrXFwvXFw9XS9nLCBcIlwiKTtcbiAgICB3aGlsZSAoaSA8IGlucHV0Lmxlbmd0aCkge1xuICAgICAgZW5jMSA9IHRoaXMuX2tleVN0ci5pbmRleE9mKGlucHV0LmNoYXJBdChpKyspKTtcbiAgICAgIGVuYzIgPSB0aGlzLl9rZXlTdHIuaW5kZXhPZihpbnB1dC5jaGFyQXQoaSsrKSk7XG4gICAgICBlbmMzID0gdGhpcy5fa2V5U3RyLmluZGV4T2YoaW5wdXQuY2hhckF0KGkrKykpO1xuICAgICAgZW5jNCA9IHRoaXMuX2tleVN0ci5pbmRleE9mKGlucHV0LmNoYXJBdChpKyspKTtcbiAgICAgIGNocjEgPSAoZW5jMSA8PCAyKSB8IChlbmMyID4+IDQpO1xuICAgICAgY2hyMiA9ICgoZW5jMiAmIDE1KSA8PCA0KSB8IChlbmMzID4+IDIpO1xuICAgICAgY2hyMyA9ICgoZW5jMyAmIDMpIDw8IDYpIHwgZW5jNDtcbiAgICAgIG91dHB1dCA9IG91dHB1dCArIFN0cmluZy5mcm9tQ2hhckNvZGUoY2hyMSk7XG4gICAgICBpZiAoZW5jMyAhPSA2NCkge1xuICAgICAgICBvdXRwdXQgPSBvdXRwdXQgKyBTdHJpbmcuZnJvbUNoYXJDb2RlKGNocjIpO1xuICAgICAgfVxuICAgICAgaWYgKGVuYzQgIT0gNjQpIHtcbiAgICAgICAgb3V0cHV0ID0gb3V0cHV0ICsgU3RyaW5nLmZyb21DaGFyQ29kZShjaHIzKTtcbiAgICAgIH1cbiAgICB9XG4gICAgb3V0cHV0ID0gQmFzZTY0Ll91dGY4X2RlY29kZShvdXRwdXQpO1xuICAgIHJldHVybiBvdXRwdXQ7XG4gIH1cblxuICBzdGF0aWMgX3V0ZjhfZW5jb2RlKHN0cmluZykge1xuICAgIHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC9cXHJcXG4vZywgXCJcXG5cIik7XG4gICAgbGV0IHV0ZnRleHQgPSBcIlwiO1xuICAgIGZvciAodmFyIG4gPSAwOyBuIDwgc3RyaW5nLmxlbmd0aDsgbisrKSB7XG4gICAgICB2YXIgYyA9IHN0cmluZy5jaGFyQ29kZUF0KG4pO1xuICAgICAgaWYgKGMgPCAxMjgpIHtcbiAgICAgICAgdXRmdGV4dCArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGMpO1xuICAgICAgfSBlbHNlIGlmICgoYyA+IDEyNykgJiYgKGMgPCAyMDQ4KSkge1xuICAgICAgICB1dGZ0ZXh0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoKGMgPj4gNikgfCAxOTIpO1xuICAgICAgICB1dGZ0ZXh0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoKGMgJiA2MykgfCAxMjgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdXRmdGV4dCArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKChjID4+IDEyKSB8IDIyNCk7XG4gICAgICAgIHV0ZnRleHQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZSgoKGMgPj4gNikgJiA2MykgfCAxMjgpO1xuICAgICAgICB1dGZ0ZXh0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoKGMgJiA2MykgfCAxMjgpO1xuICAgICAgfVxuXG4gICAgfVxuICAgIHJldHVybiB1dGZ0ZXh0O1xuICB9XG5cbiAgc3RhdGljIF91dGY4X2RlY29kZSh1dGZ0ZXh0KSB7XG4gICAgbGV0IHN0cmluZyA9IFwiXCIsIGkgPSAwLCBjID0gMCwgYzEgPSAwLCBjMiA9IDAsIGMzID0gMDtcbiAgICB3aGlsZSAoaSA8IHV0ZnRleHQubGVuZ3RoKSB7XG4gICAgICBjID0gdXRmdGV4dC5jaGFyQ29kZUF0KGkpO1xuICAgICAgaWYgKGMgPCAxMjgpIHtcbiAgICAgICAgc3RyaW5nICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoYyk7XG4gICAgICAgIGkrKztcbiAgICAgIH0gZWxzZSBpZiAoKGMgPiAxOTEpICYmIChjIDwgMjI0KSkge1xuICAgICAgICBjMiA9IHV0ZnRleHQuY2hhckNvZGVBdChpICsgMSk7XG4gICAgICAgIHN0cmluZyArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKCgoYyAmIDMxKSA8PCA2KSB8IChjMiAmIDYzKSk7XG4gICAgICAgIGkgKz0gMjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGMyID0gdXRmdGV4dC5jaGFyQ29kZUF0KGkgKyAxKTtcbiAgICAgICAgYzMgPSB1dGZ0ZXh0LmNoYXJDb2RlQXQoaSArIDIpO1xuICAgICAgICBzdHJpbmcgKz0gU3RyaW5nLmZyb21DaGFyQ29kZSgoKGMgJiAxNSkgPDwgMTIpIHwgKChjMiAmIDYzKSA8PCA2KSB8IChjMyAmIDYzKSk7XG4gICAgICAgIGkgKz0gMztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHN0cmluZztcbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgIG5ldyBCYXNlNjQoKTtcbiIsImltcG9ydCBMb2dVdGlsIGZyb20gJy4uL0xvZ1V0aWwnO1xuaW1wb3J0IEJhc2U2NCBmcm9tICcuLi9CYXNlNjQnO1xuXG4vLyBOYXRpdmXosIPnlKjliY3lj7DnmoTnsbtcblxuY29uc3QgcmVsZWFzZSA9IGZhbHNlO1xuY29uc3QgZm5NYXAgPSB7fTtcbmNvbnN0IGtleU1hcCA9IHt9O1xuY29uc3QgcmVzdWx0SnNvbiA9IHt9O1xuLy8g6Kem5Y+R5omn6KGMY29kZeeahOebkeWQrOS6i+S7tlxuY29uc3QgZmlyZUtleUZucyA9IChjb2RlLCBkYXRhKSA9PiB7XG4gIGlmIChrZXlNYXBbY29kZV0pIHtcbiAgICBrZXlNYXBbY29kZV0ubWFwKChmbikgPT4ge1xuICAgICAgcmVzdWx0SnNvbi5kYXRhID0gZm4oZGF0YSk7XG4gICAgfSk7XG4gIH1cbn07XG5jbGFzcyBOYXRpdmVDYWxsZXIge1xuICAvKipcbiAgICpcbiAgICpcbiAgICogQHN0YXRpYyDmt7vliqDmiafooYxjb2Rl55qE55uR5ZCs5LqL5Lu2XG4gICAqIEBwYXJhbSB7Kn0gY29kZVxuICAgKiBAcGFyYW0geyp9IGZuIOaWueazlVxuICAgKiBAbWVtYmVyb2YgTmF0aXZlQ2FsbGVyXG4gICAqL1xuICBzdGF0aWMgYWRkS2V5TGlzdGVuZXIoY29kZSwgZm4pIHtcbiAgICBpZiAoIWtleU1hcFtjb2RlXSkge1xuICAgICAga2V5TWFwW2NvZGVdID0gW107XG4gICAgfVxuICAgIGtleU1hcFtjb2RlXS5wdXNoKGZuKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAc3RhdGljIOazqOWGjOWFqOWxgOaWueazlee7mW5hdGl2ZeeUqCzku6XlkI7lj6/og73kvJrlup/lvINcbiAgICogQHBhcmFtIHsqfSBmTmFtZSDmlrnms5XlkI1cbiAgICogQHBhcmFtIHsqfSBmbiDmlrnms5XkvZNcbiAgICogQG1lbWJlcm9mIE5hdGl2ZUNhbGxlclxuICAgKi9cbiAgc3RhdGljIHJlZ2lzdGVyRm4oZk5hbWUsIGZuKSB7XG4gICAgaWYgKHR5cGVvZiBmTmFtZSA9PT0gJ3N0cmluZycgJiYgZm4gJiYgKHR5cGVvZiBmbiA9PT0gJ29iamVjdCcgfHwgdHlwZW9mIGZuID09PSAnZnVuY3Rpb24nKSkge1xuICAgICAgaWYgKGZuTWFwW2ZOYW1lXSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7Zk5hbWV9IGhhcyBiZWVuIGRlZmluZWRgKTtcbiAgICAgIH1cbiAgICAgIGZuTWFwW2ZOYW1lXSA9IGZuO1xuICAgICAgaWYgKCFyZWxlYXNlKSB7XG4gICAgICAgIHdpbmRvd1tmTmFtZV0gPSBmbjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzdGF0aWMgZmlyZVdpbmRvd0ZuKGZOYW1lLCBkYXRhKSB7XG4gICAgaWYgKHdpbmRvd1tmTmFtZV0gJiYgdHlwZW9mIHdpbmRvd1tmTmFtZV0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHdpbmRvd1tmTmFtZV0oZGF0YSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqXG4gICAqIEBzdGF0aWMg5omn6KGMXG4gICAqIEBwYXJhbSB7Kn0ganNvblN0ciBuYXRpdmUg5LyganNvbuWtl+espuS4slxuICAgKiBAcmV0dXJucyDlrZfnrKbkuLJKU09OLnN0cmluZ2lmeVxuICAgKiBAbWVtYmVyb2YgTmF0aXZlQ2FsbGVyXG4gICAqL1xuICBzdGF0aWMgcnVuKGpzb25TdHIpIHtcbiAgICBsZXQganNvbiA9IGpzb25TdHI7XG4gICAgaWYgKHR5cGVvZiBqc29uU3RyID09PSAnc3RyaW5nJykge1xuICAgICAgTG9nVXRpbC5kZXZMb2coYG5hdGl2ZSBydW4gZGF0YToke2pzb259YCk7XG4gICAgICB0cnkge1xuICAgICAgICBqc29uID0gSlNPTi5wYXJzZShqc29uU3RyKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIExvZ1V0aWwuZGV2TG9nKGBuYXRpdmVjYWxsZXIgcnVuIGVycm9yOiAke2Vycm9yfWApO1xuICAgICAgfVxuICAgIH1cbiAgICBjb25zdCB7IGNvZGUsIGRhdGEgfSA9IGpzb247XG4gICAgZmlyZUtleUZucyhjb2RlLCBkYXRhKTtcbiAgICByZXR1cm4gcmVzdWx0SnNvbi5kYXRhO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqXG4gICAqIEBzdGF0aWMg5omn6KGMXG4gICAqIEBwYXJhbSB7Kn0ganNvblN0ciBuYXRpdmUg5LyganNvbuWtl+espuS4slxuICAgKiBAcmV0dXJucyDlrZfnrKbkuLJKU09OLnN0cmluZ2lmeVxuICAgKiBAbWVtYmVyb2YgTmF0aXZlQ2FsbGVyXG4gICAqL1xuICBzdGF0aWMgcnVuV2l0aEJhc2U2NChqc29uU3RyKSB7XG4gICAgbGV0IGpzb24gPSBqc29uU3RyO1xuICAgIGlmICh0eXBlb2YganNvblN0ciA9PT0gJ3N0cmluZycpIHtcbiAgICAgIExvZ1V0aWwuZGV2TG9nKGBuYXRpdmUgNjQgcnVuIGRhdGE6JHtqc29ufWApO1xuICAgICAgdHJ5IHtcbiAgICAgICAganNvbiA9IEJhc2U2NC5kZWNvZGUoanNvblN0cik7XG4gICAgICAgIExvZ1V0aWwuZGV2TG9nKGBuYXRpdmVjYWxsZXIgNjQgZGVjb2RlIHJlc3VsdDogJHtqc29ufWApO1xuICAgICAgICBqc29uID0gSlNPTi5wYXJzZShqc29uKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIExvZ1V0aWwuZGV2TG9nKGBuYXRpdmVjYWxsZXIgNjQgcnVuIGVycm9yOiAke2Vycm9yfWApO1xuICAgICAgfVxuICAgIH1cbiAgICBjb25zdCB7IGNvZGUsIGRhdGEgfSA9IGpzb247XG4gICAgZmlyZUtleUZucyhjb2RlLCBkYXRhKTtcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoe30pO1xuICB9XG59XG4vLyDmiorlr7nosaHmjILlnKh3aW5kb3fkuIos5L6bbmF0aXZl6LCD55SoXG53aW5kb3cuTmF0aXZlQ2FsbGVyID0gTmF0aXZlQ2FsbGVyO1xuXG5leHBvcnQgZGVmYXVsdCBOYXRpdmVDYWxsZXI7XG4iLCJpbXBvcnQge1xuICBKU19DQUxMLFxuICBDQU5fVVNFX01PQklMRSxcbiAgTkVUV09SS19XQVJOX1RFWFQsXG4gIFVTRV9NT0JJTEUsXG4gIEhBU19NRURJQSxcbiAgR0VUX0FUVFIsXG4gIFNVQ0NFU1NfQ0IsXG4gIEVSUk9SX0NCLFxuICBDT01QTEVURV9DQixcbn0gZnJvbSAnLi9JbnRlcmZhY2VKc29uJztcbmltcG9ydCB7XG4gIEpTX0lOVEVSRkFDRV9UT0dHTEVQUkFJU0UsXG4gIEpTX0lOVEVSRkFDRV9SRUZSRVNIUFJBSVNFLFxuICBKU19JTlRFUkZBQ0VfUk9BU1QsXG4gIEpTX1VQREFURV9NT0RBTF9TVEFUVVMsXG4gIFNVQk1JVF9DT01NRU5ULFxuICBKU19JTlRFUkZBQ0VfVEFHVE9HR0xFRCxcbiAgSlNfSU5URVJGQUNFX1VQREFURUNPTU1FTlRTRlJPTU5BVElWRSxcbn0gZnJvbSAnLi4vSW50ZXJmYWNlUHJvdG9jb2wnO1xuaW1wb3J0IExvZ1V0aWwgZnJvbSAnLi4vTG9nVXRpbCc7XG5pbXBvcnQgeyBjYWxsSW50ZXJmYWNlSG9vayB9IGZyb20gJy4uL1V0aWwnO1xuaW1wb3J0IEJhc2U2NCBmcm9tICcuLi9CYXNlNjQnO1xubGV0IEludGVyZmFjZSA9IG51bGw7XG5sZXQgaW5pdGVkID0gZmFsc2U7XG5cbi8vIOWIpOaWreaOpeWPo+aYr+WQpuWPr+eUqFxuY29uc3QgaXNJbnRlcmZhY2VWYWxpZCA9ICgpID0+IHtcbiAgaWYgKEludGVyZmFjZSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn07XG5jb25zdCBjYWxsTmF0aXZlID0gKGpzb24sIG9wdGlvbnMgPSB7fSkgPT4ge1xuICBjb25zdCBjYWxsSG9vayA9IGNhbGxJbnRlcmZhY2VIb29rLmJpbmQob3B0aW9ucyk7XG4gIGlmICghaXNJbnRlcmZhY2VWYWxpZCgpKSB7XG4gICAgY2FsbEhvb2soRVJST1JfQ0IsIGpzb24pO1xuICAgIGNhbGxIb29rKENPTVBMRVRFX0NCLCBqc29uKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgbGV0IG9wdGlvbiA9IGpzb247XG4gIGlmICh0eXBlb2YganNvbiA9PT0gJ29iamVjdCcpIHtcbiAgICBvcHRpb24gPSBKU09OLnN0cmluZ2lmeShvcHRpb24pO1xuICB9XG4gIGxldCByZXN1bHQgPSBKU09OLnN0cmluZ2lmeSh7fSk7XG4gIHRyeSB7XG4gICAgcmVzdWx0ID0gSW50ZXJmYWNlLmpzQ2FsbGVyKG9wdGlvbik7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgTG9nVXRpbC5kZXZMb2coYCR7anNvbi5jb2RlfSBlcnJvcjoke2Vycm9yfWApO1xuICB9XG4gIGlmICh0eXBlb2YgcmVzdWx0ID09PSAnc3RyaW5nJykge1xuICAgIExvZ1V0aWwuZGV2TG9nKGByZXR1cm5WYWx1ZToke3Jlc3VsdH1gKTtcbiAgICB0cnkge1xuICAgICAgcmVzdWx0ID0gSlNPTi5wYXJzZShyZXN1bHQpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgTG9nVXRpbC5kZXZMb2coZXJyKTtcbiAgICB9XG4gIH1cbiAgaWYgKE9iamVjdC5rZXlzKHJlc3VsdCkubGVuZ3RoID09PSAwKSB7XG4gICAgY2FsbEhvb2soRVJST1JfQ0IsIGpzb24pO1xuICB9IGVsc2Uge1xuICAgIGNhbGxIb29rKFNVQ0NFU1NfQ0IsIHJlc3VsdC5kYXRhKTtcbiAgfVxuICBjYWxsSG9vayhDT01QTEVURV9DQiwgcmVzdWx0Lm1lc3NhZ2UpO1xuICByZXR1cm4gcmVzdWx0O1xufTtcbmNvbnN0IGNhbGxOYXRpdmVXaXRoQmFzZTY0ID0gKGpzb24sIG9wdGlvbnMgPSB7fSkgPT4ge1xuICBjb25zdCBjYWxsSG9vayA9IGNhbGxJbnRlcmZhY2VIb29rLmJpbmQob3B0aW9ucyk7XG4gIGlmICghaXNJbnRlcmZhY2VWYWxpZCgpKSB7XG4gICAgY2FsbEhvb2soRVJST1JfQ0IsIGpzb24pO1xuICAgIGNhbGxIb29rKENPTVBMRVRFX0NCLCBqc29uKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgbGV0IGpzb25TdHIgPSBqc29uO1xuICBpZiAodHlwZW9mIGpzb25TdHIgPT09ICdvYmplY3QnKSB7XG4gICAganNvblN0ciA9IEpTT04uc3RyaW5naWZ5KGpzb25TdHIpO1xuICB9XG4gIGpzb25TdHIgPSBCYXNlNjQuZW5jb2RlKGpzb25TdHIpO1xuICBsZXQgcmVzdWx0ID0gQmFzZTY0LmVuY29kZShKU09OLnN0cmluZ2lmeSh7fSkpO1xuICB0cnkge1xuICAgIHJlc3VsdCA9IEludGVyZmFjZS5qc0NhbGxlcldpdGhCYXNlNjQoanNvblN0cik7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgTG9nVXRpbC5kZXZMb2coYCR7anNvbi5jb2RlfSA2NCBlcnJvcjoke2Vycm9yfWApO1xuICB9XG4gIGlmICh0eXBlb2YgcmVzdWx0ID09PSAnc3RyaW5nJykge1xuICAgIExvZ1V0aWwuZGV2TG9nKGByZXR1cm5WYWx1ZTY0OiR7cmVzdWx0fWApO1xuICAgIHRyeSB7XG4gICAgICByZXN1bHQgPSBCYXNlNjQuZGVjb2RlKHJlc3VsdCk7XG4gICAgICByZXN1bHQgPSBKU09OLnBhcnNlKHJlc3VsdCk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBMb2dVdGlsLmRldkxvZyhlcnIpO1xuICAgIH1cbiAgfVxuICBpZiAoT2JqZWN0LmtleXMocmVzdWx0KS5sZW5ndGggPT09IDApIHtcbiAgICBjYWxsSG9vayhFUlJPUl9DQiwganNvbik7XG4gIH0gZWxzZSB7XG4gICAgY2FsbEhvb2soU1VDQ0VTU19DQiwgcmVzdWx0LmRhdGEpO1xuICB9XG4gIGNhbGxIb29rKENPTVBMRVRFX0NCLCByZXN1bHQubWVzc2FnZSk7XG4gIHJldHVybiByZXN1bHQ7XG59O1xuLy8g5Yid5aeL5YyWaW50ZXJmYWNl5o6l5Y+jXG5jb25zdCBpbml0TmF0aXZlSW50ZXJmYWNlID0gKCkgPT4ge1xuICBpZiAoaW5pdGVkKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmICh3aW5kb3cuVGlwcykge1xuICAgIEludGVyZmFjZSA9IHdpbmRvdy5UaXBzO1xuICB9XG4gIGluaXRlZCA9IHRydWU7XG59O1xuXG5pbml0TmF0aXZlSW50ZXJmYWNlKCk7XG5jbGFzcyBXZWJDYWxsZXIge1xuICAvKipcbiAgICpcbiAgICpcbiAgICogQHN0YXRpYyDojrflvpfmmK/lkKblhYHorrjkvb/nlKjmlbDmja7mtYHmtarnmoTnirbmgIFcbiAgICogQG1lbWJlcm9mIFdlYkNhbGxlclxuICAgKi9cbiAgc3RhdGljIGdldE1vYmlsZVdhcm5TdGF0dXMob3B0aW9ucykge1xuICAgIGNhbGxOYXRpdmUoSlNfQ0FMTFtDQU5fVVNFX01PQklMRV0sIG9wdGlvbnMpO1xuICB9XG5cbiAgLyoqXG4gKlxuICpcbiAqIEBzdGF0aWMg6I635b6X5pWw5o2u5rWB6YeP5o+Q56S65paH5a2XXG4gKiBAbWVtYmVyb2YgV2ViQ2FsbGVyXG4gKi9cbiAgc3RhdGljIGdldE5ldHdvcmtXYXJuVGV4dChvcHRpb25zKSB7XG4gICAgY2FsbE5hdGl2ZShKU19DQUxMW05FVFdPUktfV0FSTl9URVhUXSwgb3B0aW9ucyk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICpcbiAgICogQHN0YXRpYyDlkIzmhI/kvb/nlKjmlbDmja7mtYHph49cbiAgICogQG1lbWJlcm9mIFdlYkNhbGxlclxuICAgKi9cbiAgc3RhdGljIGFncmVlVXNlTW9iaWxlKG9wdGlvbnMpIHtcbiAgICBjYWxsTmF0aXZlKEpTX0NBTExbVVNFX01PQklMRV0sIG9wdGlvbnMpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqXG4gICAqIEBzdGF0aWMg6YCa55+lbmF0aXZlIOmhtemdouacieinhumikVxuICAgKiBAbWVtYmVyb2YgV2ViQ2FsbGVyXG4gICAqL1xuICBzdGF0aWMgcGFnZUhhc01lZGlhKGRhdGEsIG9wdGlvbnMpIHtcbiAgICBjb25zdCBqc29uID0gSlNfQ0FMTFtIQVNfTUVESUFdO1xuICAgIGlmIChkYXRhKSB7XG4gICAgICB0cnkge1xuICAgICAgICBqc29uLmRhdGEgPSBPYmplY3QuYXNzaWduKGpzb24uZGF0YSwgZGF0YSk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBqc29uLmRhdGEgPSBkYXRhO1xuICAgICAgfVxuICAgIH1cbiAgICBjYWxsTmF0aXZlKGpzb24sIG9wdGlvbnMpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqXG4gICAqIEBzdGF0aWMg6YCa6L+H5a2X5LiySUTojrflvpfns7vnu59JROWAvFxuICAgKiBAcGFyYW0geyp9IGRhdGFcbiAgICogQHBhcmFtIHsqfSBvcHRpb25zXG4gICAqIEBtZW1iZXJvZiBXZWJDYWxsZXJcbiAgICovXG4gIHN0YXRpYyBnZXREZWZzKGRhdGEsIG9wdGlvbnMpIHtcbiAgICBjb25zdCBqc29uID0gSlNfQ0FMTFtHRVRfQVRUUl07XG4gICAgaWYgKGRhdGEpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGpzb24uZGF0YSA9IE9iamVjdC5hc3NpZ24oanNvbi5kYXRhLCBkYXRhKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGpzb24uZGF0YSA9IGRhdGE7XG4gICAgICB9XG4gICAgfVxuICAgIGNhbGxOYXRpdmUoanNvbiwgb3B0aW9ucyk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICpcbiAgICogQHN0YXRpYyDngrnotZ4v5Y+W5raI54K56LWe6Kem5Y+RXG4gICAqIEBwYXJhbSB7Kn0gZGF0YVxuICAgKiBAcGFyYW0geyp9IG9wdGlvbnNcbiAgICogQG1lbWJlcm9mIFdlYkNhbGxlclxuICAgKi9cbiAgc3RhdGljIHRvZ2dsZVByYWlzZShkYXRhLCBvcHRpb25zKSB7XG4gICAgY29uc3QganNvbiA9IEpTX0NBTExbSlNfSU5URVJGQUNFX1RPR0dMRVBSQUlTRV07XG4gICAgaWYgKGRhdGEpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGpzb24uZGF0YSA9IE9iamVjdC5hc3NpZ24oanNvbi5kYXRhLCBkYXRhKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGpzb24uZGF0YSA9IGRhdGE7XG4gICAgICB9XG4gICAgfVxuICAgIGNhbGxOYXRpdmVXaXRoQmFzZTY0KGpzb24sIG9wdGlvbnMpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqXG4gICAqIEBzdGF0aWMg5Yi35paw54K56LWe54q25oCBXG4gICAqIEBwYXJhbSB7Kn0gZGF0YVxuICAgKiBAcGFyYW0geyp9IG9wdGlvbnNcbiAgICogQG1lbWJlcm9mIFdlYkNhbGxlclxuICAgKi9cbiAgc3RhdGljIHJlZnJlc2hQcmFpc2UoZGF0YSwgb3B0aW9ucykge1xuICAgIGNvbnN0IGpzb24gPSBKU19DQUxMW0pTX0lOVEVSRkFDRV9SRUZSRVNIUFJBSVNFXTtcbiAgICBpZiAoZGF0YSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAganNvbi5kYXRhID0gT2JqZWN0LmFzc2lnbihqc29uLmRhdGEsIGRhdGEpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAganNvbi5kYXRhID0gZGF0YTtcbiAgICAgIH1cbiAgICB9XG4gICAgY2FsbE5hdGl2ZVdpdGhCYXNlNjQoanNvbiwgb3B0aW9ucyk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICpcbiAgICogQHN0YXRpYyDliLfmlrDngrnotZ7nirbmgIFcbiAgICogQHBhcmFtIHsqfSBkYXRhXG4gICAqIEBwYXJhbSB7Kn0gb3B0aW9uc1xuICAgKiBAbWVtYmVyb2YgV2ViQ2FsbGVyXG4gICAqL1xuICBzdGF0aWMgb3BlblJvYXN0QWN0aW9uU2hlZXQoZGF0YSwgb3B0aW9ucykge1xuICAgIGNvbnN0IGpzb24gPSBKU19DQUxMW0pTX0lOVEVSRkFDRV9ST0FTVF07XG4gICAgaWYgKGRhdGEpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGpzb24uZGF0YSA9IE9iamVjdC5hc3NpZ24oanNvbi5kYXRhLCBkYXRhKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGpzb24uZGF0YSA9IGRhdGE7XG4gICAgICB9XG4gICAgfVxuICAgIGNhbGxOYXRpdmVXaXRoQmFzZTY0KGpzb24sIG9wdGlvbnMpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqXG4gICAqIEBzdGF0aWMg5Yi35paw54K56LWe54q25oCBXG4gICAqIEBwYXJhbSB7Kn0gZGF0YVxuICAgKiBAcGFyYW0geyp9IG9wdGlvbnNcbiAgICogQG1lbWJlcm9mIFdlYkNhbGxlclxuICAgKi9cbiAgc3RhdGljIHVwZGF0ZU1vZGFsU3RhdHVzKGRhdGEsIG9wdGlvbnMpIHtcbiAgICBjb25zdCBqc29uID0gSlNfQ0FMTFtKU19VUERBVEVfTU9EQUxfU1RBVFVTXTtcbiAgICBpZiAoZGF0YSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAganNvbi5kYXRhID0gT2JqZWN0LmFzc2lnbihqc29uLmRhdGEsIGRhdGEpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAganNvbi5kYXRhID0gZGF0YTtcbiAgICAgIH1cbiAgICB9XG4gICAgY2FsbE5hdGl2ZVdpdGhCYXNlNjQoanNvbiwgb3B0aW9ucyk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICpcbiAgICogQHN0YXRpYyDmj5DkuqTlkJDmp71cbiAgICogQHBhcmFtIHsqfSBkYXRhXG4gICAqIEBwYXJhbSB7Kn0gb3B0aW9uc1xuICAgKiBAbWVtYmVyb2YgV2ViQ2FsbGVyXG4gICAqL1xuICBzdGF0aWMgc3VibWl0Q29tbWVudChkYXRhLCBvcHRpb25zKSB7XG4gICAgY29uc3QganNvbiA9IEpTX0NBTExbU1VCTUlUX0NPTU1FTlRdO1xuICAgIGlmIChkYXRhKSB7XG4gICAgICB0cnkge1xuICAgICAgICBqc29uLmRhdGEgPSBPYmplY3QuYXNzaWduKGpzb24uZGF0YSwgZGF0YSk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBqc29uLmRhdGEgPSBkYXRhO1xuICAgICAgfVxuICAgIH1cbiAgICBjYWxsTmF0aXZlV2l0aEJhc2U2NChqc29uLCBvcHRpb25zKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKlxuICAgKiBAc3RhdGljIOagh+etvueKtuaAgeabtOaWsFxuICAgKiBAcGFyYW0geyp9IGRhdGFcbiAgICogQHBhcmFtIHsqfSBvcHRpb25zXG4gICAqIEBtZW1iZXJvZiBXZWJDYWxsZXJcbiAgICovXG4gIHN0YXRpYyB0YWdUb2dnbGVkKGRhdGEsIG9wdGlvbnMpIHtcbiAgICBjb25zdCBqc29uID0gSlNfQ0FMTFtKU19JTlRFUkZBQ0VfVEFHVE9HR0xFRF07XG4gICAgaWYgKGRhdGEpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGpzb24uZGF0YSA9IE9iamVjdC5hc3NpZ24oanNvbi5kYXRhLCBkYXRhKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGpzb24uZGF0YSA9IGRhdGE7XG4gICAgICB9XG4gICAgfVxuICAgIGNhbGxOYXRpdmVXaXRoQmFzZTY0KGpzb24sIG9wdGlvbnMpO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqXG4gICAqIEBzdGF0aWMg5o+Q5Lqk5ZCQ5qe9XG4gICAqIEBwYXJhbSB7Kn0gZGF0YVxuICAgKiBAcGFyYW0geyp9IG9wdGlvbnNcbiAgICogQG1lbWJlcm9mIFdlYkNhbGxlclxuICAgKi9cbiAgc3RhdGljIHVwZGF0ZUNvbW1lbnRzRnJvbU5hdGl2ZShkYXRhLCBvcHRpb25zKSB7XG4gICAgY29uc3QganNvbiA9IEpTX0NBTExbSlNfSU5URVJGQUNFX1VQREFURUNPTU1FTlRTRlJPTU5BVElWRV07XG4gICAgaWYgKGRhdGEpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGpzb24uZGF0YSA9IE9iamVjdC5hc3NpZ24oanNvbi5kYXRhLCBkYXRhKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGpzb24uZGF0YSA9IGRhdGE7XG4gICAgICB9XG4gICAgfVxuICAgIGNhbGxOYXRpdmVXaXRoQmFzZTY0KGpzb24sIG9wdGlvbnMpO1xuICB9XG59XG5leHBvcnQgZGVmYXVsdCBXZWJDYWxsZXI7XG4iLCJpbXBvcnQge1xuICBKU19JTlRFUkZBQ0VfVE9HR0xFUFJBSVNFLFxuICBKU19JTlRFUkZBQ0VfUkVGUkVTSFBSQUlTRSxcbiAgSlNfSU5URVJGQUNFX1VQREFURUNPTU1FTlRTRlJPTU5BVElWRSxcbiAgSlNfSU5URVJGQUNFX1JPQVNULFxuICBKU19JTlRFUkZBQ0VfVEFHVE9HR0xFRCxcbiAgU1VCTUlUX0NPTU1FTlQsXG4gIEpTX1VQREFURV9NT0RBTF9TVEFUVVMsXG4gIEpTX0lOVEVSRkFDRV9WSUVXX01BTlVBTF9GSVJTVF9UT1BJQyxcbiAgSlNfSU5URVJGQUNFX1JFU09VUkNFSU5GTyxcbn0gZnJvbSAnLi4vSW50ZXJmYWNlUHJvdG9jb2wnO1xuXG5leHBvcnQgY29uc3QgU1VDQ0VTU19DQiA9ICdvblN1Y2Nlc3MnO1xuZXhwb3J0IGNvbnN0IEVSUk9SX0NCID0gJ29uRXJyb3InO1xuZXhwb3J0IGNvbnN0IENPTVBMRVRFX0NCID0gJ29uQ29tcGxldGUnO1xuZXhwb3J0IGNvbnN0IENBTl9VU0VfTU9CSUxFID0gJ2NhblVzZU1vYmlsZSc7XG5leHBvcnQgY29uc3QgTkVUV09SS19XQVJOX1RFWFQgPSAnbmV0V29ya1dhcm5UZXh0JztcbmV4cG9ydCBjb25zdCBVU0VfTU9CSUxFID0gJ3VzZU1vYmlsZSc7XG5leHBvcnQgY29uc3QgSEFTX01FRElBID0gJ2hhc01lZGlhJztcbmV4cG9ydCBjb25zdCBHRVRfQVRUUiA9ICdnZXRBdHRyJztcbmV4cG9ydCBjb25zdCBDT0RFX05BVElWRSA9IHtcbiAgW0NBTl9VU0VfTU9CSUxFXTogMTAwMDEsXG4gIFtORVRXT1JLX1dBUk5fVEVYVF06IDEwMDAyLFxuICBbVVNFX01PQklMRV06IDEwMDA2LFxuICBbSEFTX01FRElBXTogMTAwMDQsXG4gIFtHRVRfQVRUUl06IDEwMDEwLFxuICBbSlNfSU5URVJGQUNFX1JFRlJFU0hQUkFJU0VdOiAxMDAyMCxcbiAgW0pTX0lOVEVSRkFDRV9UT0dHTEVQUkFJU0VdOiAxMDAwMjEsXG4gIFtKU19JTlRFUkZBQ0VfVVBEQVRFQ09NTUVOVFNGUk9NTkFUSVZFXTogMTAwMzAsXG4gIFtKU19JTlRFUkZBQ0VfUk9BU1RdOiAxMDAzMSxcbiAgW0pTX0lOVEVSRkFDRV9UQUdUT0dHTEVEXTogMTAwMzIsXG4gIFtTVUJNSVRfQ09NTUVOVF06IDEwMDMzLFxuICBbSlNfVVBEQVRFX01PREFMX1NUQVRVU106IDEwMDM0LFxuICBbSlNfSU5URVJGQUNFX1ZJRVdfTUFOVUFMX0ZJUlNUX1RPUElDXTogMTAwNzAsXG4gIFtKU19JTlRFUkZBQ0VfUkVTT1VSQ0VJTkZPXTogMTAwNTAsXG59O1xuZXhwb3J0IGNvbnN0IENPREVfSlMgPSB7XG4gIFtDQU5fVVNFX01PQklMRV06IDkwMDAxLFxuICBbTkVUV09SS19XQVJOX1RFWFRdOiA5MDAwMixcbiAgW1VTRV9NT0JJTEVdOiA5MDAwNixcbiAgW0hBU19NRURJQV06IDkwMDA0LFxuICBbR0VUX0FUVFJdOiA5MDAxMCxcbiAgW0pTX0lOVEVSRkFDRV9SRUZSRVNIUFJBSVNFXTogOTAwMjAsXG4gIFtKU19JTlRFUkZBQ0VfVE9HR0xFUFJBSVNFXTogOTAwMjEsXG4gIFtKU19JTlRFUkZBQ0VfVVBEQVRFQ09NTUVOVFNGUk9NTkFUSVZFXTogOTAwMzAsXG4gIFtKU19JTlRFUkZBQ0VfUk9BU1RdOiA5MDAzMSxcbiAgW0pTX0lOVEVSRkFDRV9UQUdUT0dHTEVEXTogOTAwMzIsXG4gIFtTVUJNSVRfQ09NTUVOVF06IDkwMDMzLFxuICBbSlNfVVBEQVRFX01PREFMX1NUQVRVU106IDkwMDM0LFxuICBbSlNfSU5URVJGQUNFX1ZJRVdfTUFOVUFMX0ZJUlNUX1RPUElDXTogOTAwNzAsXG59O1xuZXhwb3J0IGNvbnN0IEpTX0NBTEwgPSB7XG4gIFtDQU5fVVNFX01PQklMRV06IHtcbiAgICBjb2RlOiBDT0RFX0pTW0NBTl9VU0VfTU9CSUxFXSxcbiAgICBtZXNzYWdlOiAnanMgZ2V0IDogbmVlZCBzaG93IG1vYmlsZSBkaWFsb2cnLFxuICB9LFxuICBbTkVUV09SS19XQVJOX1RFWFRdOiB7XG4gICAgY29kZTogQ09ERV9KU1tORVRXT1JLX1dBUk5fVEVYVF0sXG4gICAgbWVzc2FnZTogJ2pzIGdldCA6IG1vYmlsZSB0aXAgdGV4dCcsXG4gIH0sXG4gIFtVU0VfTU9CSUxFXToge1xuICAgIGNvZGU6IENPREVfSlNbVVNFX01PQklMRV0sXG4gICAgbWVzc2FnZTogJ2pzIGNhbGwgOiB1c2VyIGFncmVlIHVzZSBtb2JpbGUnLFxuICB9LFxuICBbSEFTX01FRElBXToge1xuICAgIGNvZGU6IENPREVfSlNbSEFTX01FRElBXSxcbiAgICBtZXNzYWdlOiAnanMgY2FsbDogcGFnZSBoYXMgbWVkaWEnLFxuICAgIGRhdGE6IHRydWUsXG4gIH0sXG4gIFtHRVRfQVRUUl06IHtcbiAgICBjb2RlOiBDT0RFX0pTW0dFVF9BVFRSXSxcbiAgICBtZXNzYWdlOiAnanMgY2FsbDogZ2V0IGF0dHIgYnkgaWQnLFxuICAgIGRhdGE6IFtdLFxuICB9LFxuICBbSlNfSU5URVJGQUNFX1JFRlJFU0hQUkFJU0VdOiB7XG4gICAgY29kZTogQ09ERV9KU1tKU19JTlRFUkZBQ0VfUkVGUkVTSFBSQUlTRV0sXG4gICAgbWVzc2FnZTogJ2dldCBwcmFpc2Ugc3RhdHVzJyxcbiAgICBkYXRhOiB7XG4gICAgICBmdW5OdW06ICcnLFxuICAgICAgcmVzb3VyY2VUeXBlOiAnJyxcbiAgICAgIElkZW50aWZpZXI6ICcnLFxuICAgIH0sXG4gIH0sXG4gIFtKU19JTlRFUkZBQ0VfVE9HR0xFUFJBSVNFXToge1xuICAgIGNvZGU6IENPREVfSlNbSlNfSU5URVJGQUNFX1RPR0dMRVBSQUlTRV0sXG4gICAgbWVzc2FnZTogJ2NsaWNrIHByYWlzZScsXG4gICAgZGF0YToge1xuICAgICAgZnVuTnVtOiAnJyxcbiAgICAgIHJlc291cmNlVHlwZTogJycsXG4gICAgICBzdGF0dXM6IDEsXG4gICAgfSxcbiAgfSxcbiAgW0pTX0lOVEVSRkFDRV9VUERBVEVDT01NRU5UU0ZST01OQVRJVkVdOiB7XG4gICAgY29kZTogQ09ERV9KU1tKU19JTlRFUkZBQ0VfVVBEQVRFQ09NTUVOVFNGUk9NTkFUSVZFXSxcbiAgICBtZXNzYWdlOiAnZ2V0IHRhZ3MgZnJvbSBuYXRpdmUnLFxuICAgIGRhdGE6IHtcbiAgICAgIGZ1bk51bTogJycsXG4gICAgICByZXNvdXJjZVR5cGU6ICcnLFxuICAgIH0sXG4gIH0sXG4gIFtKU19JTlRFUkZBQ0VfUk9BU1RdOiB7XG4gICAgY29kZTogQ09ERV9KU1tKU19JTlRFUkZBQ0VfUk9BU1RdLFxuICAgIG1lc3NhZ2U6ICdvcGVuIHJvYXN0IGFjdGlvbnNoZWV0JyxcbiAgICBkYXRhOiB7XG4gICAgICBmdW5OdW06ICcnLFxuICAgICAgcmVzb3VyY2VUeXBlOiAnJyxcbiAgICB9LFxuICB9LFxuICBbSlNfSU5URVJGQUNFX1RBR1RPR0dMRURdOiB7XG4gICAgY29kZTogQ09ERV9KU1tKU19JTlRFUkZBQ0VfVEFHVE9HR0xFRF0sXG4gICAgbWVzc2FnZTogJ3RhZyB0b2dnbGVzJyxcbiAgICBkYXRhOiB7XG4gICAgICBmdW5OdW06ICcnLFxuICAgICAgcmVzb3VyY2VUeXBlOiAnJyxcbiAgICB9LFxuICB9LFxuICBbU1VCTUlUX0NPTU1FTlRdOiB7XG4gICAgY29kZTogQ09ERV9KU1tTVUJNSVRfQ09NTUVOVF0sXG4gICAgbWVzc2FnZTogJ3N1bWl0IHJhb3N0IGRhdGEnLFxuICAgIGRhdGE6IHtcbiAgICAgIGZ1bk51bTogJycsXG4gICAgICByZXNvdXJjZVR5cGU6ICcnLFxuICAgIH0sXG4gIH0sXG4gIFtKU19VUERBVEVfTU9EQUxfU1RBVFVTXToge1xuICAgIGNvZGU6IENPREVfSlNbSlNfVVBEQVRFX01PREFMX1NUQVRVU10sXG4gICAgbWVzc2FnZTogJ3VwZGF0ZSBtb2RhbCBzdGF0dXMnLFxuICAgIGRhdGE6IHtcbiAgICAgIGZ1bk51bTogJycsXG4gICAgICByZXNvdXJjZVR5cGU6ICcnLFxuICAgICAgYWN0aW9uOiAnJyxcbiAgICAgIHR5cGU6ICcnLFxuICAgIH0sXG4gIH0sXG59O1xuIiwiLy8g5bi455So55qE5bi46YePXG5jb25zdCBIT05PUl9USEVNRSA9IFwiSE9OT1JcIjtcbmNvbnN0IEhVQVdFSV9USEVNRSA9IFwiSFVBV0VJXCI7XG5jb25zdCBOT1ZBX1RIRU1FID0gXCJOT1ZBXCI7XG5jb25zdCB0aGVtZU9wdGlvbnMgPSB7XG4gIFtIT05PUl9USEVNRV06IHtcbiAgICBjb2xvcjogXCIjMDBCMUZGXCIsXG4gICAgY2xhc3NOYW1lOiBIT05PUl9USEVNRS50b0xvd2VyQ2FzZSgpXG4gIH0sXG4gIFtIVUFXRUlfVEhFTUVdOiB7XG4gICAgY29sb3I6IFwiIzAwN0RGRlwiLFxuICAgIGNsYXNzTmFtZTogSFVBV0VJX1RIRU1FLnRvTG93ZXJDYXNlKClcbiAgfSxcbiAgW05PVkFfVEhFTUVdOiB7XG4gICAgY29sb3I6IFwiIzAwQjFGRlwiLFxuICAgIGNsYXNzTmFtZTogTk9WQV9USEVNRS50b0xvd2VyQ2FzZSgpXG4gIH1cbn07XG5jb25zdCBUSVBTQVBQVFlQRSA9ICdUSVBTJztcbmNvbnN0IEhJQVBQVFlQRSA9ICdISVZPSUNFJztcbmNvbnN0IFBST1RPQ09MU19FWFAgPSAvanVtcHRvY2FyZHxqdW1wdG9wYWdlfGp1bXB0b3dlYnwjb3Blbm1hbnVhbGRldGFpbHwjb3Blbm1hbnVhbHxqdW1wdG9zdWJqZWN0L2k7XG5jb25zdCBOT1RfRVhJU1QgPSAnTk9UIEVYSVNUIFRISVMgS0VZJztcbmNvbnN0IFVHID0gJ3VnJztcblxuZXhwb3J0IHtcbiAgVElQU0FQUFRZUEUsIEhJQVBQVFlQRSwgUFJPVE9DT0xTX0VYUCwgTk9UX0VYSVNULCBVRywgdGhlbWVPcHRpb25zLFxufTtcbiIsImltcG9ydCBMb2dVdGlsIGZyb20gJy4uL0xvZ1V0aWwnO1xuXG5jbGFzcyBDb250cm9sbGVyIHtcbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIGNvbnN0IHsgY05hbWUsIHRhcmdldCB9ID0gb3B0aW9ucztcbiAgICB0aGlzLmN0cmxOYW1lID0gY05hbWU7XG4gICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XG4gIH1cblxuICBpbml0KCkge1xuICAgIHRoaXMuaW5pdFZpZXcoKTtcbiAgICB0aGlzLmluaXRFdmVudCgpO1xuICAgIHRoaXMuaW5pdENhbGxiYWNrRm9yTmF0aXZlKCk7XG4gIH1cblxuICAvKipcbiAgICog5aSE55CG6KeG5Zu+XG4gICAqXG4gICAqIEBtZW1iZXJvZiBDb250cm9sbGVyXG4gICAqL1xuICBpbml0VmlldygpIHtcbiAgICBMb2dVdGlsLmRldkxvZyh0aGlzLmN0cmxOYW1lKTtcbiAgfVxuXG4gIC8qKlxuICAgKiDlpITnkIbkuovku7ZcbiAgICpcbiAgICogQG1lbWJlcm9mIENvbnRyb2xsZXJcbiAgICovXG4gIGluaXRFdmVudCgpIHtcbiAgICBMb2dVdGlsLmRldkxvZyh0aGlzLmN0cmxOYW1lKTtcbiAgfVxuXG4gIC8qKlxuICAgKiAg5Yid5aeL5YyW5LiA5LqbbmF0aXZl6KaB6LCD55So55qE5LiA5Lqb5Zue6LCDXG4gICAqXG4gICAqIEBtZW1iZXJvZiBDb250cm9sbGVyXG4gICAqL1xuICBpbml0Q2FsbGJhY2tGb3JOYXRpdmUoKSB7XG4gICAgTG9nVXRpbC5kZXZMb2codGhpcy5jdHJsTmFtZSk7XG4gIH1cblxuICBhZnRlclNob3coKSB7XG4gICAgTG9nVXRpbC5kZXZMb2codGhpcy5jdHJsTmFtZSk7XG4gIH1cblxuXG4gIHJ1bigpIHtcbiAgICBpZiAoIXRoaXMudGFyZ2V0KSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHRoaXMuaW5pdCgpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENvbnRyb2xsZXI7XG4iLCJpbXBvcnQgeyBoYXMgfSBmcm9tICcuLi9VdGlsJztcbmltcG9ydCBCYXNlNjQgZnJvbSAnLi4vQmFzZTY0JztcbmltcG9ydCB7IE5PVF9FWElTVCwgdGhlbWVPcHRpb25zIH0gZnJvbSAnLi4vQ29uc3RhbnRzJztcbmltcG9ydCB7XG4gIEpTX1VQREFURV9NT0RBTF9TVEFUVVMsXG59IGZyb20gJy4uL0ludGVyZmFjZVByb3RvY29sJztcbmltcG9ydCBQYXJhbSBmcm9tICcuLi9QYXJhbSc7XG5pbXBvcnQge1xuICBpbml0QnV0dG9uUHJlc3NBY3RpdmUsXG4gIGRvbUxpc3RUb0FycmF5LFxuICBpbml0U2Nyb2xsQ2xhc3MsXG4gIGFkZFN0eWxlUnVsZSxcbiAgZ2V0RnVuTnVtLFxuICBnZXRSZXNvdXJjZVR5cGUsXG59IGZyb20gJy4uL0RvbVV0aWwnO1xuaW1wb3J0IE5hdGl2ZUNhbGxlciBmcm9tICcuLi9DYWxsZXIvQ2FsbGVyRm9yTmF0aXZlJztcbmltcG9ydCBMb2dVdGlsIGZyb20gJy4uL0xvZ1V0aWwnO1xuaW1wb3J0IE5hdGl2ZVNkayBmcm9tICcuLi9uYWpzc2RrJztcblxubGV0IGxhc3RWYWxpZENvbW1lbnQgPSB7fTtcbmxldCBtb2RpZmllZCA9IGZhbHNlO1xubGV0IGNvbW1lbnRlZCA9IGZhbHNlO1xubGV0IGFsbFRhZ3MgPSB7fTtcbmNvbnN0IHNlbGVjdGVkVGFncyA9IHtcbiAgY29udGVudFRhZ3M6IFtdLFxuICBmdW5jdGlvblRhZ3M6IFtdLFxufTtcbmNvbnN0IGZ1bk51bSA9IGdldEZ1bk51bSgpO1xuY29uc3QgcmVzb3VyY2VUeXBlID0gZ2V0UmVzb3VyY2VUeXBlKCk7XG5cbi8qKlxuICog6K+E5Lu35pWw5o2u566h55CGXG4gKi9cbmNvbnN0IENvbW1lbnRTdG9yZSA9IHtcbiAgLyoqXG4gICAqIOiOt+W+l+S4iuasoeaPkOS6pOeahOacieaViOaVsOaNrlxuICAgKlxuICAgKiBAcmV0dXJucyBqc29uXG4gICAqL1xuICBnZXRMYXN0VmFsaWRDb21tZW50KCkge1xuICAgIHJldHVybiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGxhc3RWYWxpZENvbW1lbnQpKTtcbiAgfSxcbiAgLyoqXG4gICAgICAgICAqIOiuvue9ruS4iuasoeaPkOS6pOeahOacieaViOaVsOaNrixjYW5jZWzlj6/kvb/nlKhcbiAgICAgICAgICogQHBhcmFtIGpzb25cbiAgICAgICAgICovXG4gIHNldExhc3RWYWxpZENvbW1lbnQoanNvbikge1xuICAgIGxhc3RWYWxpZENvbW1lbnQgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGpzb24pKTtcbiAgfSxcbiAgLyoqXG4gICAgICAgICAqIOaPkOS6pC/ph43mlrDmj5DkuqTml7bnmoTlm57osINcbiAgICAgICAgICovXG4gIHN1Ym1pdCgpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgIGlmICh0aGlzLmdldFNlbGVjdGVkU2l6ZSgpID4gMCAmJiB0aGlzLmdldE1vZGlmaWVkU3RhdHVzKCkpIHtcbiAgICAgICAgY29uc3QgdGFncyA9IENvbW1lbnRTdG9yZS5nZXRTZWxlY3RlZFRhZ3MoKTtcbiAgICAgICAgY29uc3QgY29tbWVudFRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgY29uc3QgeyBjb250ZW50VGFncywgZnVuY3Rpb25UYWdzIH0gPSB0YWdzO1xuICAgICAgICB0aGlzLnNldExhc3RWYWxpZENvbW1lbnQoeyBjb250ZW50VGFncywgZnVuY3Rpb25UYWdzLCBjb21tZW50VGltZSB9KTtcbiAgICAgICAgdGhpcy5zZXRNb2RpZmllZFN0YXR1cyhmYWxzZSk7XG4gICAgICAgIHRoaXMuc2V0Q29tbWVudGVkU3RhdHVzKHRydWUpO1xuICAgICAgICBjb25zdCBhcmcgPSB7XG4gICAgICAgICAgY29udGVudFRhZ3MsXG4gICAgICAgICAgZnVuY3Rpb25UYWdzLFxuICAgICAgICAgIGNvbW1lbnRUaW1lLFxuICAgICAgICAgIGZ1bk51bSxcbiAgICAgICAgICByZXNvdXJjZVR5cGUsXG4gICAgICAgIH07XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgTmF0aXZlU2RrLnN1Ym1pdENvbW1lbnQoYXJnKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICBMb2dVdGlsLmRldkxvZyhgc3VibWl0IGVycm9yOiAke2Vycm9yfWApO1xuICAgICAgICB9XG4gICAgICAgIHJlc29sdmUoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSxcbiAgLyoqXG4gICAgICAgICAqIOWPlua2iC/lhbPpl60v6L+U5Zue5pON5L2c5pe255qE5Zue6LCDXG4gICAgICAgICAqL1xuICBjYW5jZWwoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICBpZiAodGhpcy5nZXRNb2RpZmllZFN0YXR1cygpKSB7XG4gICAgICAgIGNvbnN0IGxhc3RDb21tZW50ID0gdGhpcy5nZXRMYXN0VmFsaWRDb21tZW50KCk7XG4gICAgICAgIHRoaXMuc2V0U2VsZWN0ZWRUYWdzKHtcbiAgICAgICAgICBjb250ZW50VGFnczogbGFzdENvbW1lbnQuY29udGVudFRhZ3MgfHwgW10sXG4gICAgICAgICAgZnVuY3Rpb25UYWdzOiBsYXN0Q29tbWVudC5mdW5jdGlvblRhZ3MgfHwgW10sXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnNldE1vZGlmaWVkU3RhdHVzKGZhbHNlKTtcbiAgICAgICAgcmVzb2x2ZSh0cnVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc2V0TW9kaWZpZWRTdGF0dXMoZmFsc2UpO1xuICAgICAgICByZXNvbHZlKGZhbHNlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSxcbiAgLyoqXG4gICAgICAgICAqIOiuvue9ruWQkOanveeKtuaAgVxuICAgICAgICAgKiBAcGFyYW0gYm9vXG4gICAgICAgICAqL1xuICBzZXRDb21tZW50ZWRTdGF0dXMoYm9vKSB7XG4gICAgY29tbWVudGVkID0gYm9vO1xuICB9LFxuICAvKipcbiAgICAgICAgKiDojrflvpfnvJbovpHnirbmgIFcbiAgICAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgICAgKi9cbiAgZ2V0TW9kaWZpZWRTdGF0dXMoKSB7XG4gICAgcmV0dXJuIG1vZGlmaWVkO1xuICB9LFxuICAvKipcbiAgICAgICAgICog6K6+572u57yW6L6R54q25oCBXG4gICAgICAgICAqIEBwYXJhbSBib29cbiAgICAgICAgICovXG4gIHNldE1vZGlmaWVkU3RhdHVzKGJvbykge1xuICAgIG1vZGlmaWVkID0gYm9vO1xuICB9LFxuICAvKipcbiAgICAgICAgICog6YeN5paw5o+Q5Lqk5pON5L2c5pe2LOabtOaWsOe8lui+keeKtuaAgVxuICAgICAgICAgKi9cbiAgdXBkYXRlTW9kaWZpZWRTdGF0dXMoKSB7XG4gICAgY29uc3Qgc1QgPSB0aGlzLmdldFNlbGVjdGVkVGFncygpO1xuICAgIGNvbnN0IGxUID0ge1xuICAgICAgY29udGVudFRhZ3M6IGxhc3RWYWxpZENvbW1lbnQuY29udGVudFRhZ3MsXG4gICAgICBmdW5jdGlvblRhZ3M6IGxhc3RWYWxpZENvbW1lbnQuZnVuY3Rpb25UYWdzLFxuICAgIH07XG4gICAgaWYgKEpTT04uc3RyaW5naWZ5KHNUKSA9PT0gSlNPTi5zdHJpbmdpZnkobFQpKSB7XG4gICAgICB0aGlzLnNldE1vZGlmaWVkU3RhdHVzKGZhbHNlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZXRNb2RpZmllZFN0YXR1cyh0cnVlKTtcbiAgICB9XG4gIH0sXG4gIC8qKlxuICAgICAgICAgKiDojrflvpfooqvpgInkuK3nmoTmoIfnrb5cbiAgICAgICAgICogQHBhcmFtIGtleVxuICAgICAgICAgKiBAcGFyYW0gb3JpZ2luXG4gICAgICAgICAqIEByZXR1cm5zIHsqfVxuICAgICAgICAgKi9cbiAgZ2V0U2VsZWN0ZWRUYWdzKGtleSwgb3JpZ2luID0gZmFsc2UpIHtcbiAgICBpZiAob3JpZ2luID09PSB0cnVlKSB7XG4gICAgICBpZiAoaGFzLmNhbGwoc2VsZWN0ZWRUYWdzLCBrZXkpKSB7XG4gICAgICAgIHJldHVybiBzZWxlY3RlZFRhZ3Nba2V5XTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzZWxlY3RlZFRhZ3M7XG4gICAgfVxuICAgIGlmIChoYXMuY2FsbChzZWxlY3RlZFRhZ3MsIGtleSkpIHtcbiAgICAgIHJldHVybiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHNlbGVjdGVkVGFnc1trZXldKSk7XG4gICAgfVxuICAgIHJldHVybiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHNlbGVjdGVkVGFncykpO1xuICB9LFxuICAvKipcbiAgICAgICAgICogZGF0YeagoemqjFxuICAgICAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgICAgICovXG4gIGlzRGF0YVZhbGlkKCkge1xuICAgIGxldCByZXN1bHQgPSBmYWxzZTtcbiAgICBPYmplY3QudmFsdWVzKGFsbFRhZ3MpLnNvbWUoKGl0ZW0pID0+IHtcbiAgICAgIGlmIChpdGVtLmxlbmd0aCA+IDApIHtcbiAgICAgICAgcmVzdWx0ID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9LFxuICAvKipcbiAgICAgICAgICog6K6+572u6YCJ5Lit5qCH562+55qE5YC8XG4gICAgICAgICAqIEBwYXJhbSBjb250ZW50VGFnc1xuICAgICAgICAgKiBAcGFyYW0gZnVuY3Rpb25UYWdzXG4gICAgICAgICAqL1xuICBzZXRTZWxlY3RlZFRhZ3MoeyBjb250ZW50VGFncywgZnVuY3Rpb25UYWdzIH0pIHtcbiAgICBzZWxlY3RlZFRhZ3MuY29udGVudFRhZ3MgPSBjb250ZW50VGFncztcbiAgICBzZWxlY3RlZFRhZ3MuZnVuY3Rpb25UYWdzID0gZnVuY3Rpb25UYWdzO1xuICB9LFxuICAvKipcbiAgICAgICAgICog6I635b6X6YCJ5Lit5qCH562+55qE5Liq5pWwXG4gICAgICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAgICAgICAqL1xuICBnZXRTZWxlY3RlZFNpemUoKSB7XG4gICAgbGV0IHNpemUgPSAwO1xuICAgIE9iamVjdC52YWx1ZXMoc2VsZWN0ZWRUYWdzKS5tYXAoKGl0ZW0pID0+IHtcbiAgICAgIHNpemUgKz0gaXRlbS5sZW5ndGg7XG4gICAgfSk7XG4gICAgcmV0dXJuIHNpemU7XG4gIH0sXG4gIC8qKlxuICAgICAgICAgKiDmmK/lkKblt7Lnu4/or4Tku7fov4dcbiAgICAgICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICAgICAqL1xuICBpc0NvbW1lbnRlZCgpIHtcbiAgICByZXR1cm4gY29tbWVudGVkO1xuICB9LFxuICAvKipcbiAgICAgICAgICog5pCc57Si55uu5qCHdGFnXG4gICAgICAgICAqIEBwYXJhbSB0YWdcbiAgICAgICAgICogQHBhcmFtIGtleVxuICAgICAgICAgKiBAcmV0dXJucyB7e2tleTogKiwgaW5kZXg6IG51bWJlcn19XG4gICAgICAgICAqL1xuICBmaW5kVGFyZ2V0VGFnKHsgdGFnLCBrZXkgfSkge1xuICAgIGNvbnN0IHNlbGVjdGVkID0gdGhpcy5nZXRTZWxlY3RlZFRhZ3Moa2V5KTtcbiAgICBjb25zdCByZXN1bHQgPSB7XG4gICAgICBrZXksXG4gICAgICBpbmRleDogLTEsXG4gICAgICB0YWcsXG4gICAgfTtcblxuICAgIGlmIChzZWxlY3RlZCBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICBzZWxlY3RlZC5zb21lKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgICBpZiAoaXRlbS5pZCA9PT0gdGFnLmlkKSB7XG4gICAgICAgICAgcmVzdWx0LmluZGV4ID0gaW5kZXg7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBPYmplY3QudmFsdWVzKHNlbGVjdGVkKS5zb21lKCh2YWx1ZSkgPT4ge1xuICAgICAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgIHZhbHVlLnNvbWUoKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBpZiAoaXRlbS5pZCA9PT0gdGFnLmlkKSB7XG4gICAgICAgICAgICAgIHJlc3VsdC5pbmRleCA9IGluZGV4O1xuICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0LmluZGV4ID4gLTE7XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfSxcbiAgLyoqXG4gICAgICAgICAqIOiuvue9ruaJgOacieeahHRhZ3NcbiAgICAgICAgICog5YW85a656ICB5pWw5o2uXG4gICAgICAgICAqIEBwYXJhbSBqc29uXG4gICAgICAgICAqL1xuICBzZXRBbGxUYWdzKHsgY29udGVudFRhZ3MsIGZ1bmN0aW9uVGFncyB9KSB7XG4gICAgYWxsVGFncyA9IHtcbiAgICAgIGNvbnRlbnRUYWdzOiBbXSxcbiAgICAgIGZ1bmN0aW9uVGFnczogW10sXG4gICAgfTtcbiAgICBpZiAoY29udGVudFRhZ3MgaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvblRhZ3MgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgYWxsVGFncy5jb250ZW50VGFncy5wdXNoKC4uLmNvbnRlbnRUYWdzKTtcbiAgICAgIGFsbFRhZ3MuZnVuY3Rpb25UYWdzLnB1c2goLi4uZnVuY3Rpb25UYWdzKTtcbiAgICB9XG4gICAgaWYgKGFsbFRhZ3MuY29udGVudFRhZ3MubGVuZ3RoID09PSAwICYmIGFsbFRhZ3MuZnVuY3Rpb25UYWdzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCk7XG4gICAgfVxuICB9LFxuICAvKipcbiAgICAgICAgICog6I635Y+W5a+55bqUa2V555qE5a+55bqU5pif57qn6K+E5YiG55qE5qCH562+XG4gICAgICAgICAqIEBwYXJhbSBrZXlcbiAgICAgICAgICogQHJldHVybnMgeyp8QXJyYXl9XG4gICAgICAgICAqL1xuICBnZXRUYWdzKGtleSkge1xuICAgIGlmIChoYXMuY2FsbChhbGxUYWdzLCBrZXkpKSB7XG4gICAgICByZXR1cm4gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShhbGxUYWdzW2tleV0pKTtcbiAgICB9XG4gICAgcmV0dXJuIEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoYWxsVGFncykpO1xuICB9LFxuICAvKipcbiAgICAgICAgICog54K55Ye75p+Q5LiqdGFn5pe255qE5Zue6LCD5Ye95pWwXG4gICAgICAgICAqIEBwYXJhbSBpdGVtXG4gICAgICAgICAqIEBwYXJhbSBrZXlcbiAgICAgICAgICogQHBhcmFtIGRvbVxuICAgICAgICAgKi9cbiAgdG9nZ2xlVGFnSXRlbSh7IGl0ZW0sIGtleSB9KSB7XG4gICAgY29uc3Qgc2VsZWN0ZWQgPSB0aGlzLmdldFNlbGVjdGVkVGFncyhrZXksIHRydWUpO1xuICAgIGNvbnN0IHRhZ0luZm8gPSB0aGlzLmZpbmRUYXJnZXRUYWcoeyB0YWc6IGl0ZW0sIGtleSB9KTtcbiAgICBpZiAodGFnSW5mby5pbmRleCA+IC0xKSB7XG4gICAgICBzZWxlY3RlZC5zcGxpY2UodGFnSW5mby5pbmRleCwgMSk7XG4gICAgICB0YWdJbmZvLm1ldGhvZCA9ICdERUxFVEUnO1xuICAgIH0gZWxzZSB7XG4gICAgICBzZWxlY3RlZC5wdXNoKGl0ZW0pO1xuICAgICAgdGFnSW5mby5tZXRob2QgPSAnQUREJztcbiAgICB9XG4gICAgdGhpcy51cGRhdGVNb2RpZmllZFN0YXR1cygpO1xuICAgIGRlbGV0ZSB0YWdJbmZvLmluZGV4O1xuICAgIHJldHVybiB0YWdJbmZvO1xuICB9LFxuXG4gIC8qKlxuICAgICAgICAgKiBuYXRpdmXkvKDpgJLov4fmnaXnmoTmlbDmja7mmK/lkKblkIjms5VcbiAgICAgICAgICogQHBhcmFtIGpzb25cbiAgICAgICAgICovXG4gIGRhdGFBZGFwdGVyKGpzb24pIHtcbiAgICBsZXQgc3RyO1xuICAgIHN0ciA9IGpzb247XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKCgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBpZiAoanNvbiA9PT0gbnVsbCkge1xuICAgICAgICByZWplY3QoJ2RhdGEgZXJyb3InKTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YganNvbiA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgc3RyID0gQmFzZTY0LmRlY29kZShzdHIpO1xuICAgICAgICBzdHIgPSBKU09OLnBhcnNlKHN0cik7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIHN0ciA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgbGV0IGNvbnRlbnRUYWdzID0gc3RyLmNvbnRlbnRUYWdzIHx8IHt9O1xuICAgICAgICBsZXQgZnVuY3Rpb25UYWdzID0gc3RyLmZ1bmN0aW9uVGFncyB8fCB7fTtcbiAgICAgICAgaWYgKE9iamVjdC5rZXlzKGNvbnRlbnRUYWdzKS5sZW5ndGggPT09IDAgJiYgT2JqZWN0LmtleXMoZnVuY3Rpb25UYWdzKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICByZWplY3QoJ2RhdGEgZXJyb3InKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNldEFsbFRhZ3MoeyBjb250ZW50VGFncywgZnVuY3Rpb25UYWdzIH0pO1xuICAgICAgICAvLyDpppblhYjlvpfliKTmlq3mmK/mlrDmlbDmja7ov5jmmK8s5Lul5YmN55qE6K+E5Lu35pWw5o2uXG4gICAgICAgIGlmIChoYXMuY2FsbChzdHIsICdsYXN0Q29tbWVudCcpKSB7XG4gICAgICAgICAgLy8g6K+E6K666L+H55qE5pWw5o2uXG4gICAgICAgICAgY29uc3QgZGF0YSA9IHN0ci5sYXN0Q29tbWVudDtcbiAgICAgICAgICBpZiAodHlwZW9mIGRhdGEgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICBMb2dVdGlsLmRldkxvZyhgdGFncyBmcm9tIG5hdGl2ZTorICR7SlNPTi5zdHJpbmdpZnkoZGF0YSl9YCk7XG4gICAgICAgICAgICBjb250ZW50VGFncyA9IGRhdGEuY29udGVudFRhZ3MgfHwgW107XG4gICAgICAgICAgICBmdW5jdGlvblRhZ3MgPSBkYXRhLmZ1bmN0aW9uVGFncyB8fCBbXTtcbiAgICAgICAgICAgIGlmICgoY29udGVudFRhZ3MubGVuZ3RoID09PSAwICYmIGZ1bmN0aW9uVGFncy5sZW5ndGggPT09IDApKSB7XG4gICAgICAgICAgICAgIExvZ1V0aWwuZGV2TG9nKCdvbGQgZGF0YSBpbnZhbGlkJyk7XG4gICAgICAgICAgICAgIHJlc29sdmUoZmFsc2UpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdGhpcy5zZXRDb21tZW50ZWRTdGF0dXModHJ1ZSk7XG4gICAgICAgICAgICAgIHRoaXMuc2V0U2VsZWN0ZWRUYWdzKHsgY29udGVudFRhZ3MsIGZ1bmN0aW9uVGFncyB9KTtcbiAgICAgICAgICAgICAgdGhpcy5zZXRMYXN0VmFsaWRDb21tZW50KGRhdGEpO1xuICAgICAgICAgICAgICByZXNvbHZlKHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXNvbHZlKGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVqZWN0KCdkYXRhIGludmFsaWQnKTtcbiAgICAgIH1cbiAgICB9KSk7XG4gIH0sXG4gIC8qKlxuICAgKiBAcGFyYW0geyp9IGZuIHN1Y2Nlc3Mg5Zue6LCDXG4gICAqIEBwYXJhbSB7Kn0gb25seVVzZU5ld0ludGVyZmFjZSDku4Xkvb/nlKjmlrDmjqXlj6Ms5paw6LWE5paZ6ICBYXBrLOS8muWHuueOsOWQkOanvVxuICAgKi9cbiAgb25FbnRlcihmbiwgb25seVVzZU5ld0ludGVyZmFjZSkge1xuICAgIE5hdGl2ZVNkay51cGRhdGVDb21tZW50c0Zyb21OYXRpdmUoe1xuICAgICAgb25TdWNjZXNzOiAoanNvbikgPT4ge1xuICAgICAgICBDb21tZW50U3RvcmUub25EYXRhUmVjZWl2ZWQoanNvbiwgZm4pO1xuICAgICAgfSxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgZnVuTnVtLCByZXNvdXJjZVR5cGUsXG4gICAgICB9LFxuICAgICAgb25seVVzZU5ld0ludGVyZmFjZSxcbiAgICB9KTtcbiAgfSxcbiAgLyoqXG4gICAgICAgICAqIOWIneWni+WMluaWueazlVxuICAgICAgICAgKiBAcGFyYW0ganNvblxuICAgICAgICAgKi9cbiAgb25EYXRhUmVjZWl2ZWQoanNvbiwgZm4pIHtcbiAgICB0aGlzLmRhdGFBZGFwdGVyKGpzb24pLnRoZW4oKCkgPT4ge1xuICAgICAgaWYgKGZuKSB7XG4gICAgICAgIGZuKCk7XG4gICAgICB9XG4gICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgY29uc3QgY29tbWVudEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjb21tZW50LWJ1dHRvbicpO1xuICAgICAgY29tbWVudEJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgfSk7XG4gIH0sXG59O1xuXG5jb25zdCBWaWV3TWFuYWdlciA9IHtcblxuICAvKipcbiAgICAgKiAg5riy5p+T5qCH562+XG4gICAgICovXG4gIHJlbmRlclRhZ3MoKSB7XG4gICAgZnVuY3Rpb24gdGFnKHsgaXRlbSwga2V5IH0pIHtcbiAgICAgIGNvbnN0IHRhZ0RvbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgICB0YWdEb20uY2xhc3NMaXN0LmFkZCgndGFnJyk7XG4gICAgICBjb25zdCByZXN1bHRPYmogPSBDb21tZW50U3RvcmUuZmluZFRhcmdldFRhZyh7IHRhZzogaXRlbSwga2V5IH0pO1xuICAgICAgaWYgKHJlc3VsdE9iai5pbmRleCA+IC0xKSB7XG4gICAgICAgIHRhZ0RvbS5jbGFzc0xpc3QuYWRkKCdvbicpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGFnRG9tLmNsYXNzTGlzdC5yZW1vdmUoJ29uJyk7XG4gICAgICB9XG4gICAgICB0YWdEb20uaW5uZXJUZXh0ID0gaXRlbS50YWcucmVwbGFjZSgnXFxcXCcsICcnKTtcbiAgICAgIGluaXRCdXR0b25QcmVzc0FjdGl2ZSh7XG4gICAgICAgIHNlbGVjdG9yczogdGFnRG9tLFxuICAgICAgICB0b3VjaEVuZCgpIHtcbiAgICAgICAgICBjb25zdCByZXN1bHQgPSBDb21tZW50U3RvcmUudG9nZ2xlVGFnSXRlbSh7IGl0ZW0sIGtleSB9KTtcbiAgICAgICAgICBjb25zdCBzdGF0ZSA9IHJlc3VsdC5tZXRob2QgPT09ICdERUxFVEUnID8gMCA6IDE7XG4gICAgICAgICAgaWYgKHN0YXRlKSB7XG4gICAgICAgICAgICB0YWdEb20uY2xhc3NMaXN0LmFkZCgnb24nKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGFnRG9tLmNsYXNzTGlzdC5yZW1vdmUoJ29uJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnN0IHR5cGUgPSBrZXkgPT09ICdjb250ZW50VGFncycgPyAxIDogMjtcbiAgICAgICAgICBjb25zdCBhcmcgPSB7XG4gICAgICAgICAgICB0eXBlLFxuICAgICAgICAgICAgdGFnOiBpdGVtLFxuICAgICAgICAgICAgc3RhdGUsXG4gICAgICAgICAgICBmdW5OdW0sXG4gICAgICAgICAgICByZXNvdXJjZVR5cGUsXG4gICAgICAgICAgfTtcbiAgICAgICAgICBOYXRpdmVTZGsudGFnQ2hhbmdlZChhcmcpO1xuICAgICAgICAgIGxldCBzdWJtaXRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc3VibWl0Jyk7XG4gICAgICAgICAgaWYgKENvbW1lbnRTdG9yZS5pc0NvbW1lbnRlZCgpKSB7XG4gICAgICAgICAgICBzdWJtaXRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcmVkbycpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoQ29tbWVudFN0b3JlLmdldFNlbGVjdGVkU2l6ZSgpID4gMCAmJiBDb21tZW50U3RvcmUuZ2V0TW9kaWZpZWRTdGF0dXMoKSkge1xuICAgICAgICAgICAgc3VibWl0QnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoJ2Rpc2FibGVkJyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN1Ym1pdEJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdkaXNhYmxlZCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHRhZ0RvbTtcbiAgICB9XG4gICAgZnVuY3Rpb24gdGFnc1dyYXAoeyB0YWdzLCBrZXkgfSkge1xuICAgICAgY29uc3QgdWxEb20gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpO1xuICAgICAgdWxEb20uY2xhc3NMaXN0LmFkZCgndGFncycsICdjbGVhcmZpeCcpO1xuICAgICAgdGFncy5tYXAoKGl0ZW0pID0+IHtcbiAgICAgICAgdWxEb20uYXBwZW5kQ2hpbGQodGFnKHsgaXRlbSwga2V5IH0pKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHVsRG9tO1xuICAgIH1cbiAgICBjb25zdCB0YWdzV3JhcERvbSA9IGRvbUxpc3RUb0FycmF5KCcuZnVuY3Rpb25JdGVtJyk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0YWdzV3JhcERvbS5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgY29uc3QgaXRlbSA9IHRhZ3NXcmFwRG9tW2ldO1xuICAgICAgY29uc3QgdGFncyA9IGl0ZW0ucXVlcnlTZWxlY3RvcignLnRhZ3NXcmFwJyk7XG4gICAgICB0YWdzLmlubmVySFRNTCA9ICcnO1xuICAgICAgY29uc3QgY3VycmVudFRhZ3MgPSBDb21tZW50U3RvcmUuZ2V0VGFncyhpdGVtLmlkKTtcbiAgICAgIGlmIChjdXJyZW50VGFncy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGNvbnN0IHRhZ3NEb20gPSB0YWdzV3JhcCh7IHRhZ3M6IGN1cnJlbnRUYWdzLCBrZXk6IGl0ZW0uaWQgfSk7XG4gICAgICAgIHRhZ3MuYXBwZW5kQ2hpbGQodGFnc0RvbSk7XG4gICAgICAgIGl0ZW0uc3R5bGUudmlzaWJpbGl0eSA9ICd2aXNpYmxlJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGl0ZW0uc3R5bGUudmlzaWJpbGl0eSA9ICdoaWRkZW4nO1xuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgLyoqXG4gICAgICog5ZCQ5qe954q25oCB5Y+R55Sf5ZCO55qE5LqL5Lu2XG4gICAgICogMS7liJ3lp4vljJblrozmiJDlkI5cbiAgICAgKiAyLuaPkOS6pOaMiemSrueCueWHu+WQjlxuICAgICAqIDMu5Y+W5raI5oyJ6ZKu54K55Ye75ZCOXG4gICAgICovXG4gIG9uQ29tbWVudFN0YXR1c0NoYW5nZWQoKSB7XG4gICAgY29uc3QgaXNDb21tZW50ZWQgPSBDb21tZW50U3RvcmUuaXNDb21tZW50ZWQoKTtcbiAgICBjb25zdCBjb21tZW50QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NvbW1lbnQtYnV0dG9uJyk7XG4gICAgaWYgKCFDb21tZW50U3RvcmUuaXNEYXRhVmFsaWQoKSkge1xuICAgICAgY29tbWVudEJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGNvbnN0IGNvbW1lbnRXcmFwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NvbW1lbnRXcmFwJyk7XG4gICAgaWYgKGlzQ29tbWVudGVkKSB7XG4gICAgICBjb21tZW50QnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2RpZCcpO1xuICAgICAgY29tbWVudFdyYXAuY2xhc3NMaXN0LmFkZCgnY29tbWVudGVkJyk7XG4gICAgICBjb25zdCByZWRvQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3JlZG8nKTtcbiAgICAgIHJlZG9CdXR0b24uY2xhc3NMaXN0LmFkZCgnZGlzYWJsZWQnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29tbWVudFdyYXAuY2xhc3NMaXN0LnJlbW92ZSgnY29tbWVudGVkJyk7XG4gICAgICBjb25zdCBzdWJtaXRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc3VibWl0Jyk7XG4gICAgICBzdWJtaXRCdXR0b24uY2xhc3NMaXN0LmFkZCgnZGlzYWJsZWQnKTtcbiAgICB9XG4gICAgY29tbWVudEJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gIH0sXG5cbiAgLyoqXG4gICAgICog5Yid5aeL5YyW5oyJ6ZKuXG4gICAgICovXG4gIGluaXRCdXR0b25zKCkge1xuICAgIHRoaXMuaW5pdENhbmNlbEJ1dHRvbigpO1xuICAgIHRoaXMuaW5pdFN1Ym1pdEJ1dHRvbigpO1xuICB9LFxuICAvKipcbiAgICAgKiDliJ3lp4vljJbmj5DkuqTmjInpkq4v6YeN5paw5o+Q5Lqk5oyJ6ZKuXG4gICAgICovXG4gIGluaXRTdWJtaXRCdXR0b24oKSB7XG4gICAgY29uc3QgJHRoaXMgPSB0aGlzO1xuICAgIGNvbnN0IHNlbGVjdG9yID0gJyNzdWJtaXQsI3JlZG8nO1xuICAgIGRvbUxpc3RUb0FycmF5KHNlbGVjdG9yKS5tYXAoKGl0ZW0pID0+IHtcbiAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZCgnZGlzYWJsZWQnKTtcbiAgICB9KTtcbiAgICBpbml0QnV0dG9uUHJlc3NBY3RpdmUoe1xuICAgICAgc2VsZWN0b3JzOiBzZWxlY3RvcixcbiAgICAgIHRvdWNoRW5kOiAoKSA9PiB7XG4gICAgICAgIENvbW1lbnRTdG9yZS5zdWJtaXQoKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAkdGhpcy5vblN1Ym1pdCgpO1xuICAgICAgICB9KS5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICBMb2dVdGlsLmRldkxvZyhlcnJvcik7XG4gICAgICAgICAgJHRoaXMub25DYW5jZWwoKTtcbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgIH0pO1xuICB9LFxuICAvKipcbiAgICAgKiDmj5DkuqTlm57osINcbiAgICAgKi9cbiAgb25TdWJtaXQoKSB7XG4gICAgdGhpcy5vbkNvbW1lbnRTdGF0dXNDaGFuZ2VkKCk7XG4gICAgdGhpcy5hY3Rpb25TaGVldE91dCgpO1xuICB9LFxuICAvKipcbiAgICAgKiDlj5bmtogv5YWz6Zet5Zue6LCDXG4gICAgICogQHBhcmFtIHJlc2V0XG4gICAgICovXG4gIG9uQ2FuY2VsKHJlc2V0ID0gZmFsc2UpIHtcbiAgICB0aGlzLm9uQ29tbWVudFN0YXR1c0NoYW5nZWQoKTtcbiAgICBpZiAocmVzZXQpIHtcbiAgICAgIHRoaXMucmVuZGVyVGFncygpO1xuICAgIH1cbiAgICB0aGlzLmFjdGlvblNoZWV0T3V0KCk7XG4gIH0sXG4gIC8qKlxuICAgICAqIOWPlua2iOaMiemSruWIneWni+WMllxuICAgICAqL1xuICBpbml0Q2FuY2VsQnV0dG9uKCkge1xuICAgIGNvbnN0ICR0aGlzID0gdGhpcztcbiAgICBpbml0QnV0dG9uUHJlc3NBY3RpdmUoe1xuICAgICAgc2VsZWN0b3JzOiAnI2NhbmNlbCcsXG4gICAgICB0b3VjaEVuZDogKCkgPT4ge1xuICAgICAgICBDb21tZW50U3RvcmUuY2FuY2VsKCkudGhlbigocmVzZXQpID0+IHtcbiAgICAgICAgICAkdGhpcy5vbkNhbmNlbChyZXNldCk7XG4gICAgICAgIH0pO1xuICAgICAgfSxcbiAgICB9KTtcbiAgfSxcblxuICAvKipcbiAgICAgKiDml6DlhbPmlbDmja7nmoTliJ3lp4vljJZcbiAgICAgKlxuICAgICAqL1xuICBvbkVudGVyKCkge1xuICAgIGNvbnN0IG1vZGFsV3JhcERvbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNtb2RhbFdyYXAnKTtcbiAgICBpZiAoIW1vZGFsV3JhcERvbSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICB0aGlzLmluaXRBY3Rpb25IZWlnaHQoKTtcbiAgICB0aGlzLmluaXRCdXR0b25zKCk7XG4gICAgaW5pdFNjcm9sbENsYXNzKCcubWFpbkNvbW1lbnQnKTtcbiAgfSxcbiAgLyoqXG4gICAqIOagueaNruWxj+mrmOS/ruaUueW8ueahhueahOmrmOW6plxuICAgKiDku4XmiYvmnLrmqKrlsY/kuIvljaA4MCVcbiAgICovXG4gIGluaXRBY3Rpb25IZWlnaHQoKSB7XG4gICAgY29uc3QgZGV2aWNlSGVpZ2h0ID0gUGFyYW0uZ2V0RGV2aWNlSGVpZ2h0KCk7XG4gICAgY29uc3QgZGV2aWNlV2lkdGggPSBQYXJhbS5nZXREZXZpY2VXaWR0aCgpO1xuICAgIGxldCBydWxlVGV4dCA9ICcnO1xuXG4gICAgaWYgKGRldmljZUhlaWdodCkge1xuICAgICAgcnVsZVRleHQgKz0gYEBtZWRpYSBzY3JlZW4gYW5kIChvcmllbnRhdGlvbjogcG9ydHJhaXQpIHtcbiAgICAgICAgI2NvbW1lbnRBUyB7XG4gICAgICAgICAgICBoZWlnaHQ6ICR7ZGV2aWNlSGVpZ2h0IC8gMn1weDtcbiAgICAgICAgfVxuICAgIH1gO1xuICAgIH1cbiAgICBpZiAoZGV2aWNlV2lkdGgpIHtcbiAgICAgIHJ1bGVUZXh0ICs9IGBAbWVkaWEgc2NyZWVuIGFuZCAob3JpZW50YXRpb246IGxhbmRzY2FwZSkge1xuICAgICAgICAjY29tbWVudEFTIHtcbiAgICAgICAgICAgIGhlaWdodDogJHtkZXZpY2VXaWR0aCAqIDAuOH1weDtcbiAgICAgICAgfVxuICAgIH1gO1xuICAgIH1cbiAgICBpZiAoUGFyYW0uaXNTcGxpdE1vZGUoKSkge1xuICAgICAgcnVsZVRleHQgPSAnJztcbiAgICB9XG4gICAgaWYgKFBhcmFtLmlzRm9sZGFibGVQaG9uZSgpICYmIFBhcmFtLmlzRXhwYW5kU3RhdGUoKSkge1xuICAgICAgcnVsZVRleHQgKz0gYEBtZWRpYSBzY3JlZW4gYW5kIChvcmllbnRhdGlvbjogcG9ydHJhaXQpIHtcbiAgICAgICAgI2NvbW1lbnRBUyB7XG4gICAgICAgICAgICBoZWlnaHQ6ICR7ZGV2aWNlSGVpZ2h0IC8gMn1weDtcbiAgICAgICAgfVxuICAgIH1cbiAgICBAbWVkaWEgc2NyZWVuIGFuZCAob3JpZW50YXRpb246IGxhbmRzY2FwZSkge1xuICAgICAgICAjY29tbWVudEFTIHtcbiAgICAgICAgICAgIGhlaWdodDogJHtkZXZpY2VIZWlnaHQgLyAyfXB4O1xuICAgICAgICB9XG4gICAgfWA7XG4gICAgfVxuICAgIGlmIChydWxlVGV4dCkge1xuICAgICAgYWRkU3R5bGVSdWxlKHJ1bGVUZXh0KTtcbiAgICB9XG4gIH0sXG5cbiAgaXNCaWdTY3JlZW5EZXZpY2VzKCkge1xuICAgIHJldHVybiBQYXJhbS5pc1BhZCgpIHx8IChQYXJhbS5pc0ZvbGRhYmxlUGhvbmUoKSAmJiBQYXJhbS5pc0V4cGFuZFN0YXRlKCkpO1xuICB9LFxuXG4gIC8qKlxuICAgICAqIOW8ueahhuWFpeWcuuWKqOeUu1xuICAgICAqL1xuICBhY3Rpb25TaGVldEluKCkge1xuICAgIGNvbnN0IG1vZGFsV3JhcERvbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNtb2RhbFdyYXAnKTtcbiAgICBjb25zdCBjb21tZW50QVNEb20gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY29tbWVudEFTJyk7XG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgbW9kYWxXcmFwRG9tLmNsYXNzTGlzdC5yZW1vdmUoJ291dCcsICdoaWRlJyk7XG4gICAgICAgIGNvbW1lbnRBU0RvbS5jbGFzc0xpc3QucmVtb3ZlKCdvdXQnLCAnaGlkZScpO1xuICAgICAgICBtb2RhbFdyYXBEb20uY2xhc3NMaXN0LmFkZCgnaW4nLCAnbW9kYWwnKTtcbiAgICAgICAgY29tbWVudEFTRG9tLmNsYXNzTGlzdC5hZGQoJ2luJywgJ2FjdGlvblNoZWV0Jyk7XG4gICAgICAgIE5hdGl2ZVNkay51cGRhdGVNb2RhbFN0YXR1cyh7XG4gICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgYWN0aW9uOiAnb3BlbicsXG4gICAgICAgICAgICB0eXBlOiAnY29tbWVudCcsXG4gICAgICAgICAgICByZXNvdXJjZVR5cGUsXG4gICAgICAgICAgICBmdW5OdW0sXG4gICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgICB9LCAwKTtcbiAgICB9KTtcbiAgfSxcbiAgLyoqXG4gICAgICog5Yid5aeL5YyW5by55qGG5bGC55qE5LiA5Lqb5omL5Yq/5LqL5Lu2XG4gICAgICovXG4gIGluaXREaWFsb2coKSB7XG4gICAgY29uc3QgbW9kYWxXcmFwRG9tID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI21vZGFsV3JhcCcpO1xuICAgIGNvbnN0IGFycm93ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Fycm93Jyk7XG4gICAgY29uc3QgY29tbWVudFdyYXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvbW1lbnRXcmFwXCIpO1xuICAgIGlmICghbW9kYWxXcmFwRG9tIHx8ICFjb21tZW50V3JhcCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBjb25zdCB0aGVtZVR5cGUgPSBQYXJhbS5nZXRUaGVtZVR5cGUoKTtcbiAgICBpZiAodGhlbWVUeXBlICE9PSBOT1RfRVhJU1QpIHtcbiAgICAgIGNvbW1lbnRXcmFwLmNsYXNzTGlzdC5hZGQodGhlbWVPcHRpb25zW3RoZW1lVHlwZV0uY2xhc3NOYW1lKVxuICAgIH1cbiAgICBtb2RhbFdyYXBEb20ub25jbGljayA9ICgpID0+IHtcbiAgICAgIENvbW1lbnRTdG9yZS5jYW5jZWwoKS50aGVuKChyZXNldCkgPT4ge1xuICAgICAgICB0aGlzLm9uQ2FuY2VsKHJlc2V0KTtcbiAgICAgIH0pO1xuICAgIH07XG4gICAgLy8gYXJyb3dcbiAgICBhcnJvdy5vbmNsaWNrID0gKCkgPT4ge1xuICAgICAgQ29tbWVudFN0b3JlLmNhbmNlbCgpLnRoZW4oKHJlc2V0KSA9PiB7XG4gICAgICAgIHRoaXMub25DYW5jZWwocmVzZXQpO1xuICAgICAgfSk7XG4gICAgfTtcbiAgICBjb25zdCBjYWxsQmFjayA9IChkYXRhKSA9PiB7XG4gICAgICBsZXQgYXJncyA9IGRhdGEgfHwge307XG4gICAgICBpZiAodHlwZW9mIGFyZ3MgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgYXJncyA9IEpTT04ucGFyc2UoZGF0YSk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgTG9nVXRpbC5kZXZMb2coYHJvYXN0IGVycm9yOiR7ZXJyb3J9YCk7XG4gICAgICAgICAgYXJncyA9IHtcbiAgICAgICAgICAgIGFjdGlvbjogJ2Nsb3NlJyxcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoYXJncy5hY3Rpb24gPT09ICdjbG9zZScpIHtcbiAgICAgICAgQ29tbWVudFN0b3JlLmNhbmNlbCgpLnRoZW4oKHJlc2V0KSA9PiB7XG4gICAgICAgICAgdGhpcy5vbkNhbmNlbChyZXNldCk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIGlmIChhcmdzLmFjdGlvbiA9PT0gJ29wZW4nKSB7XG4gICAgICAgIHRoaXMuYWN0aW9uU2hlZXRJbigpO1xuICAgICAgfVxuICAgIH07XG4gICAgLy8g5pu05paw5by55qGGc3RhdHVzLFxuICAgIE5hdGl2ZUNhbGxlci5yZWdpc3RlckZuKEpTX1VQREFURV9NT0RBTF9TVEFUVVMsIGNhbGxCYWNrKTtcbiAgICBOYXRpdmVTZGsub25VcGRhdGVNb2RhbFN0YXR1cyhjYWxsQmFjayk7XG4gIH0sXG4gIC8qKlxuICAgICAqIOW8ueahhumAgOWcuuWKqOeUu1xuICAgICAqIOa7muWKqOadoeWkjeS9jVxuICAgICAqL1xuICBhY3Rpb25TaGVldE91dCgpIHtcbiAgICBjb25zdCBtb2RhbFdyYXBEb20gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbW9kYWxXcmFwJyk7XG4gICAgY29uc3QgY29tbWVudEFTRG9tID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NvbW1lbnRBUycpO1xuICAgIGNvbnN0IG1haW5Db21tZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1haW5Db21tZW50Jyk7XG5cbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBtb2RhbFdyYXBEb20uY2xhc3NMaXN0LnJlbW92ZSgnaW4nKTtcbiAgICAgICAgY29tbWVudEFTRG9tLmNsYXNzTGlzdC5yZW1vdmUoJ2luJyk7XG4gICAgICAgIG1vZGFsV3JhcERvbS5jbGFzc0xpc3QuYWRkKCdvdXQnKTtcbiAgICAgICAgY29tbWVudEFTRG9tLmNsYXNzTGlzdC5hZGQoJ291dCcpO1xuICAgICAgICBOYXRpdmVTZGsudXBkYXRlTW9kYWxTdGF0dXMoe1xuICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIGFjdGlvbjogJ2Nsb3NlJyxcbiAgICAgICAgICAgIHR5cGU6ICdjb21tZW50JyxcbiAgICAgICAgICAgIGZ1bk51bSxcbiAgICAgICAgICAgIHJlc291cmNlVHlwZSxcbiAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICAgIH0sIDApO1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIG1haW5Db21tZW50LnNjcm9sbFRvcCA9IDA7XG4gICAgICB9LCAzMDApO1xuICAgIH0pO1xuICB9LFxufTtcblxuXG5leHBvcnQgeyBDb21tZW50U3RvcmUsIFZpZXdNYW5hZ2VyIH07XG4iLCJpbXBvcnQgQ29udHJvbGxlciBmcm9tICcuL0NvbnRyb2xsZXInO1xuaW1wb3J0IHsgTk9UX0VYSVNULCB0aGVtZU9wdGlvbnMgfSBmcm9tICcuLi9Db25zdGFudHMnO1xuaW1wb3J0IFBhcmFtIGZyb20gJy4uL1BhcmFtJztcblxuY2xhc3MgTWFpbkNvbnRlbnRDb250cm9sbGVyIGV4dGVuZHMgQ29udHJvbGxlciB7XG4gIGluaXRWaWV3KCkge1xuICAgIHRoaXMuaW5pdENsYXNzKCk7XG4gIH1cblxuICAvKipcbiAgICog5Yid5aeL5YyW57G75ZCNXG4gICAqXG4gICAqIEBtZW1iZXJvZiBNYWluQ29udGVudENvbnRyb2xsZXJcbiAgICovXG4gIGluaXRDbGFzcygpIHtcbiAgICAvLyDmt7vliqB2b2ljZSDnsbvlkI0g6K+t6Z+z5Yqp5omL5omT5byAXG4gICAgaWYgKFBhcmFtLmlzSGl2b2ljZSgpKSB7XG4gICAgICB0aGlzLnRhcmdldC5jbGFzc0xpc3QuYWRkKCd2b2ljZScpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCd2b2ljZScpO1xuICAgIH1cbiAgICAvLyDmt7vliqB0aXBzIOexu+WQjSDnjqnmnLrmioDlt6flhoXmiZPlvIBcbiAgICBpZiAoUGFyYW0uaXNUaXBzKCkpIHtcbiAgICAgIHRoaXMudGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ3RpcHMnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy50YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgndGlwcycpO1xuICAgIH1cbiAgICAvLyDmt7vliqB0YWJsZXQg57G75ZCNIOW5s+adv+WGheaJk+W8gFxuICAgIGlmIChQYXJhbS5pc1BhZCgpKSB7XG4gICAgICB0aGlzLnRhcmdldC5jbGFzc0xpc3QuYWRkKCd0YWJsZXQnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy50YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgndGFibGV0Jyk7XG4gICAgfVxuICAgIC8vIOa3u+WKoOWNluWcuuaooeW8jyDnsbvlkI0g6ZqQ6JeP6ZyA572R57uc55qE6ZO+5o6lXG4gICAgaWYgKFBhcmFtLmlzRGlzcGxheVZlcnNpb24oKSkge1xuICAgICAgdGhpcy50YXJnZXQuY2xhc3NMaXN0LmFkZCgnZGlzcGxheVZlcnNpb24nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy50YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnZGlzcGxheVZlcnNpb24nKTtcbiAgICB9XG4gICAgaWYgKFBhcmFtLmlzUGhvbmVTcGxpdE1vZGUoKSkge1xuICAgICAgdGhpcy50YXJnZXQuY2xhc3NMaXN0LmFkZCgnc3BsaXRNb2RlJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ3NwbGl0TW9kZScpO1xuICAgIH1cbiAgICAvLyBAd2FybmluZyDov5nph4zkuYvmiYDku6Xkvb/nlKjkuKTkuKrnsbvlkI3liIbliKvmjqfliLZsaWdodOaooeW8j+S4jmRhcmvmqKHlvI8s5piv5Zug5Li65Zyo6YOo5YiG5py65Z6L5LiK5rWL6K+V5YiwLHdlYnZpZXfkvJrpl6rnmb0s5Zug5q2k5LiN6IO96K6+572u6buY6K6k6IOM5pmv6Imy6Zmk5LqG6YCP5piOXG4gICAgLy8g5Y2z5L2/Ym9keSBkaXNwbGF5Om5vbmUg5Lmf5peg5rOV6YG/5YWNLOWIneatpeaOqOaWrSzlj6/og73mmK/mnInnmoR3ZWJ2aWV35Lya5Y+WYm9keeeahOminOiJsuiuvue9rizorr7nva7kuLroh6rlt7Hmjqfku7bnmoTog4zmma/oibJcbiAgICBpZiAoUGFyYW0uaXNEYXJrTW9kZSgpKSB7XG4gICAgICB0aGlzLnRhcmdldC5jbGFzc0xpc3QuYWRkKCdkYXJrTW9kZScpO1xuICAgICAgdGhpcy50YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnbGlnaHRNb2RlJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ2RhcmtNb2RlJyk7XG4gICAgICB0aGlzLnRhcmdldC5jbGFzc0xpc3QuYWRkKCdsaWdodE1vZGUnKTtcbiAgICB9XG4gICAgY29uc3QgdGhlbWVUeXBlID0gUGFyYW0uZ2V0VGhlbWVUeXBlKCk7XG4gICAgY29uc3QgYUxhYmVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnYScpO1xuICAgIGlmICh0aGVtZVR5cGUgIT09IE5PVF9FWElTVCkge1xuICAgICAgYUxhYmVsLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZCh0aGVtZU9wdGlvbnNbdGhlbWVUeXBlXS5jbGFzc05hbWUpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1haW5Db250ZW50Q29udHJvbGxlcjtcbiIsImltcG9ydCBDb250cm9sbGVyIGZyb20gJy4vQ29udHJvbGxlcic7XG5pbXBvcnQge1xufSBmcm9tICcuLi9JbnRlcmZhY2VQcm90b2NvbCc7XG5pbXBvcnQgUGFyYW0gZnJvbSAnLi4vUGFyYW0nO1xuaW1wb3J0IHtcbiAgaW5pdEJ1dHRvblByZXNzQWN0aXZlLFxufSBmcm9tICcuLi9Eb21VdGlsJztcbmltcG9ydCBOYXRpdmVTZGsgZnJvbSAnLi4vbmFqc3Nkayc7XG5pbXBvcnQgTG9nVXRpbCBmcm9tICcuLi9Mb2dVdGlsJztcblxuY2xhc3MgUHJhaXNlQnV0dG9uQ29udHJvbGxlciBleHRlbmRzIENvbnRyb2xsZXIge1xuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgc3VwZXIob3B0aW9ucyk7XG4gICAgdGhpcy5tZXRhcyA9IHt9O1xuICB9XG5cbiAgLyoqXG4gICAqIOaJi+WGjOi3n+WNoeeJh+eCuei1nuimgeS8oOeahOS/oeaBr+S4jeS4gOagt1xuICAgKi9cbiAgaW5pdE1ldGFzKCkge1xuICAgIExvZ1V0aWwuZGV2TG9nKHRoaXMubWV0YXMpO1xuICB9XG5cbiAgaW5pdFZpZXcoKSB7XG4gICAgY29uc3QgaXNQcmFpc2VkID0gUGFyYW0uaXNQcmFpc2VkKCk7XG4gICAgdGhpcy50YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgIGlmIChpc1ByYWlzZWQpIHtcbiAgICAgIHRoaXMudGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2RpZCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdkaWQnKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICog54K56LWeXG4gICAqXG4gICAqIEBtZW1iZXJvZiBQcmFpc2VCdXR0b25Db250cm9sbGVyXG4gICAqL1xuICBjbGlja1ByYWlzZSgpIHtcbiAgICB0aGlzLnRhcmdldC5jbGFzc0xpc3QuYWRkKCdkaWQnKTtcbiAgICBOYXRpdmVTZGsuY2xpY2tQcmFpc2UodGhpcy5tZXRhcyk7XG4gIH1cblxuICAvKipcbiAgICog5Y+W5raI54K56LWeXG4gICAqXG4gICAqIEBtZW1iZXJvZiBQcmFpc2VCdXR0b25Db250cm9sbGVyXG4gICAqL1xuICBjYW5jZWxQcmFpc2UoKSB7XG4gICAgdGhpcy50YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnZGlkJyk7XG4gICAgTmF0aXZlU2RrLmNhbmNlbFByYWlzZSh0aGlzLm1ldGFzKTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiDliLfmlrDngrnotZ5cbiAgICogQG1lbWJlcm9mIFByYWlzZUJ1dHRvbkNvbnRyb2xsZXJcbiAgICovXG4gIHJlZnJlc2hQcmFpc2UoKSB7XG4gICAgY29uc3Qgb25TdWNjZXNzID0gKGRhdGEpID0+IHtcbiAgICAgIGxldCBwcmFpc2VTdGF0dXMgPSBkYXRhO1xuICAgICAgaWYgKHR5cGVvZiBkYXRhID09PSAnb2JqZWN0Jykge1xuICAgICAgICBwcmFpc2VTdGF0dXMgPSBkYXRhLnN0YXR1cztcbiAgICAgIH1cbiAgICAgIHByYWlzZVN0YXR1cyA9IFN0cmluZyhwcmFpc2VTdGF0dXMpO1xuICAgICAgaWYgKHByYWlzZVN0YXR1cyA9PT0gJzEnKSB7XG4gICAgICAgIHRoaXMudGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2RpZCcpO1xuICAgICAgfSBlbHNlIGlmIChwcmFpc2VTdGF0dXMgPT09ICcwJykge1xuICAgICAgICB0aGlzLnRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdkaWQnKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICBvblN1Y2Nlc3MsXG4gICAgfTtcbiAgICBvcHRpb25zLmRhdGEgPSB0aGlzLm1ldGFzO1xuICAgIE5hdGl2ZVNkay5yZWZyZXNoUHJhaXNlKG9wdGlvbnMpO1xuICB9XG5cblxuICBpbml0RXZlbnQoKSB7XG4gICAgaW5pdEJ1dHRvblByZXNzQWN0aXZlKHtcbiAgICAgIHNlbGVjdG9yczogdGhpcy50YXJnZXQsXG4gICAgICB0b3VjaEVuZDogKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy50YXJnZXQgJiYgdGhpcy50YXJnZXQuY2xhc3NMaXN0KSB7XG4gICAgICAgICAgdGhpcy50YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgncHJlc3MnKTtcbiAgICAgICAgICAvLyDlpoLmnpzlvZPliY3mmK/mnKrngrnotZ5cbiAgICAgICAgICBpZiAodGhpcy50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdkaWQnKSkge1xuICAgICAgICAgICAgdGhpcy5jYW5jZWxQcmFpc2UoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8g5aaC5p6c5piv5bey6LWeXG4gICAgICAgICAgICB0aGlzLmNsaWNrUHJhaXNlKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgIH0pO1xuICB9XG5cbiAgaW5pdENhbGxiYWNrRm9yTmF0aXZlKCkge1xuICAgIHRoaXMuaW5pdE1ldGFzKCk7XG4gICAgdGhpcy5yZWZyZXNoUHJhaXNlKCk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUHJhaXNlQnV0dG9uQ29udHJvbGxlcjtcbiIsImltcG9ydCBDb250cm9sbGVyIGZyb20gJy4vQ29udHJvbGxlcic7XG5pbXBvcnQgeyBWaWV3TWFuYWdlciwgQ29tbWVudFN0b3JlIH0gZnJvbSAnLi9FdmFsdWF0ZSc7XG5pbXBvcnQgQ2FsbGVyRm9yTmF0aXZlIGZyb20gJy4uL0NhbGxlci9DYWxsZXJGb3JOYXRpdmUnO1xuaW1wb3J0IE5hdGl2ZVNkayBmcm9tICcuLi9uYWpzc2RrJztcbmltcG9ydCB7XG4gIGluaXRCdXR0b25QcmVzc0FjdGl2ZSxcbiAgZ2V0RnVuTnVtLFxuICBnZXRSZXNvdXJjZVR5cGUsXG59IGZyb20gJy4uL0RvbVV0aWwnO1xuaW1wb3J0IHsgSlNfTkFUSVZFX1BBVVNFX0ZOIH0gZnJvbSAnLi4vSW50ZXJmYWNlUHJvdG9jb2wnO1xuXG5jb25zdCBtZXRhcyA9IHtcbiAgZnVuTnVtOiBnZXRGdW5OdW0oKSxcbiAgcmVzb3VyY2VUeXBlOiBnZXRSZXNvdXJjZVR5cGUoKSxcbn07XG5jbGFzcyBSb2FzdEJ1dHRvbkNvbnRyb2xsZXIgZXh0ZW5kcyBDb250cm9sbGVyIHtcbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIHN1cGVyKG9wdGlvbnMpO1xuICAgIGNvbnN0IHsgb25seVVzZU5ld0ludGVyZmFjZSB9ID0gb3B0aW9ucztcbiAgICB0aGlzLm9ubHlVc2VOZXdJbnRlcmZhY2UgPSBvbmx5VXNlTmV3SW50ZXJmYWNlO1xuICB9XG5cbiAgaW5pdFZpZXcoKSB7XG4gICAgQ29tbWVudFN0b3JlLm9uRW50ZXIoKCkgPT4ge1xuICAgICAgVmlld01hbmFnZXIub25Db21tZW50U3RhdHVzQ2hhbmdlZCh0aGlzKTtcbiAgICAgIFZpZXdNYW5hZ2VyLnJlbmRlclRhZ3ModGhpcyk7XG4gICAgfSwgdGhpcy5vbmx5VXNlTmV3SW50ZXJmYWNlKTtcbiAgICBWaWV3TWFuYWdlci5vbkVudGVyKCk7XG4gICAgVmlld01hbmFnZXIuaW5pdERpYWxvZyhDb21tZW50U3RvcmUpO1xuICB9XG5cblxuICBpbml0RXZlbnQoKSB7XG4gICAgaW5pdEJ1dHRvblByZXNzQWN0aXZlKHtcbiAgICAgIHNlbGVjdG9yczogdGhpcy50YXJnZXQsXG4gICAgICB0b3VjaEVuZDogKGUpID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBDYWxsZXJGb3JOYXRpdmUuZmlyZVdpbmRvd0ZuKEpTX05BVElWRV9QQVVTRV9GTik7XG4gICAgICAgIFZpZXdNYW5hZ2VyLmFjdGlvblNoZWV0SW4oKTtcbiAgICAgICAgTmF0aXZlU2RrLm9wZW5Sb2FzdEFjdGlvblNoZWV0KG1ldGFzKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSxcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBSb2FzdEJ1dHRvbkNvbnRyb2xsZXI7XG4iLCJpbXBvcnQgQ29udHJvbGxlciBmcm9tICcuL0NvbnRyb2xsZXInO1xuaW1wb3J0IHsgSlNfSU5URVJGQUNFX0hJREVfU1VCSkVDVF9MSU5LLCBKU19JTlRFUkZBQ0VfU0VUX0pVTVBMSU5LX0ZOLCBKU19JTlRFUkZBQ0VfSElERV9MSU5LIH0gZnJvbSAnLi4vSW50ZXJmYWNlUHJvdG9jb2wnO1xuaW1wb3J0IENhbGxlckZvck5hdGl2ZSBmcm9tICcuLi9DYWxsZXIvQ2FsbGVyRm9yTmF0aXZlJztcbmltcG9ydCBMb2dVdGlsIGZyb20gJy4uL0xvZ1V0aWwnO1xuaW1wb3J0IHsgZG9tTGlzdFRvQXJyYXkgfSBmcm9tICcuLi9Eb21VdGlsJztcbmltcG9ydCB7IGNhbGxOYUludGVyZmFjZSB9IGZyb20gJy4uL25hanNzZGsnO1xuXG5cbmNsYXNzIFdlYkxpbmtDb250cm9sbGVyIGV4dGVuZHMgQ29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yKHRhcmdldCkge1xuICAgIHN1cGVyKHRhcmdldCk7XG4gICAgdGhpcy5zdWJqZWN0TGlua3NEb20gPSBbXTsgLy8g6Lez6L2s5Yiw5LiT6aKY55qE5LqS6ZO+XG4gICAgdGhpcy5jYXJkTGlua3NEb20gPSBbXTsgLy8g6Lez6L2s5Yiw5Y2h54mH55qE5LqS6ZO+XG4gIH1cblxuICBmaWx0ZXJMaW5rcygpIHtcbiAgICBjb25zdCBzdWJqZWN0c0xpbmtzID0gW107XG4gICAgY29uc3QgY2FyZExpbmtzID0gW107XG4gICAgZG9tTGlzdFRvQXJyYXkodGhpcy50YXJnZXQpLm1hcCgoaXRlbSkgPT4ge1xuICAgICAgaWYgKGl0ZW0pIHtcbiAgICAgICAgY29uc3QgaHJlZiA9IGl0ZW0uZ2V0QXR0cmlidXRlKCdocmVmJykgfHwgJyc7XG4gICAgICAgIGlmIChocmVmLmluZGV4T2YoJ2p1bXB0b3N1YmplY3QnKSA9PT0gMCkge1xuICAgICAgICAgIHN1YmplY3RzTGlua3MucHVzaChocmVmLnJlcGxhY2UoJ2p1bXB0b3N1YmplY3Q6JywgJycpKTtcbiAgICAgICAgICB0aGlzLnN1YmplY3RMaW5rc0RvbS5wdXNoKGl0ZW0pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChocmVmLmluZGV4T2YoJ2p1bXB0b2NhcmQnKSA9PT0gMCkge1xuICAgICAgICAgIGNhcmRMaW5rcy5wdXNoKGhyZWYucmVwbGFjZSgnanVtcHRvY2FyZDonLCAnJykpO1xuICAgICAgICAgIHRoaXMuY2FyZExpbmtzRG9tLnB1c2goaXRlbSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAoc3ViamVjdHNMaW5rcy5sZW5ndGggPiAwKSB7XG4gICAgICAvLyDlj6rpnIDopoHkvKDljY/orq7lkI7pnaLnmoRpZOWNs+WPr1xuICAgICAgY2FsbE5hSW50ZXJmYWNlKEpTX0lOVEVSRkFDRV9ISURFX1NVQkpFQ1RfTElOSywgc3ViamVjdHNMaW5rcy5qb2luKCcjJykpO1xuICAgIH1cbiAgICBpZiAoY2FyZExpbmtzLmxlbmd0aCA+IDApIHtcbiAgICAgIGNhbGxOYUludGVyZmFjZShKU19JTlRFUkZBQ0VfSElERV9MSU5LLCBjYXJkTGlua3Muam9pbignIycpKTtcbiAgICB9XG4gIH1cblxuICBpbml0Q2FsbGJhY2tGb3JOYXRpdmUoKSB7XG4gICAgY29uc3QgaGlkZUxpbmtGbiA9ICgpID0+IHtcbiAgICAgIGlmICh0aGlzLnN1YmplY3RMaW5rc0RvbS5sZW5ndGggPiAwIHx8IHRoaXMuY2FyZExpbmtzRG9tLmxlbmd0aCA+IDApIHtcbiAgICAgICAgLy8gcmVzcG9uc2VMaW5rcyDkuLpuYXRpdmXov5Tlm57nmoTkuI3og73ot7PovazkupLpk77nmoTlrZfnrKbkuLLmi7zmjqVcbiAgICAgICAgQ2FsbGVyRm9yTmF0aXZlLnJlZ2lzdGVyRm4oSlNfSU5URVJGQUNFX1NFVF9KVU1QTElOS19GTiwgKHJlc3BvbnNlTGlua3MpID0+IHtcbiAgICAgICAgICBMb2dVdGlsLmRldkxvZyhyZXNwb25zZUxpbmtzKTtcbiAgICAgICAgICBsZXQgbGlzdCA9IHRoaXMuc3ViamVjdExpbmtzRG9tO1xuICAgICAgICAgIC8vIOWMuuWIhuaYr+i3s+WIsOWNoeeJh+eahOS6kumTvizov5jmmK/ot7PliLDkuJPpopjnmoTkupLpk74s5LuO6ICM5aSE55CG5LiN5ZCM55qE55uu5qCHXG4gICAgICAgICAgaWYgKHJlc3BvbnNlTGlua3MgJiYgcmVzcG9uc2VMaW5rcy5pbmRleE9mKCcmaXNjYXJkbGluaycpICE9PSAtMSkge1xuICAgICAgICAgICAgbGlzdCA9IHRoaXMuY2FyZExpbmtzRG9tO1xuICAgICAgICAgIH1cbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSBsaXN0W2ldO1xuICAgICAgICAgICAgaWYgKGl0ZW0gJiYgaXRlbS5nZXRBdHRyaWJ1dGUgJiYgaXRlbS5nZXRBdHRyaWJ1dGUoJ2hyZWYnKSkge1xuICAgICAgICAgICAgICBjb25zdCBsaW5rID0gaXRlbS5nZXRBdHRyaWJ1dGUoJ2hyZWYnKS5zcGxpdCgnOicpWzFdO1xuICAgICAgICAgICAgICBpZiAocmVzcG9uc2VMaW5rcyAmJiByZXNwb25zZUxpbmtzLmluZGV4T2YobGluaykgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0uY2xhc3NMaXN0KSB7XG4gICAgICAgICAgICAgICAgICBpdGVtLmNhbHNzTGlzdC5yZW1vdmUoJ2lubGluZS1mbGV4Jyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9IGVsc2UgaWYgKGl0ZW0uY2xhc3NMaXN0KSB7XG4gICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QuYWRkKCdpbmxpbmUtZmxleCcpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuICAgIGhpZGVMaW5rRm4oKTtcbiAgfVxuXG4gIGluaXRFdmVudCgpIHtcbiAgICB0aGlzLmZpbHRlckxpbmtzKCk7XG4gIH1cbn1cbmV4cG9ydCBkZWZhdWx0IFdlYkxpbmtDb250cm9sbGVyO1xuIiwiaW1wb3J0IExvZ1V0aWwgZnJvbSAnLi9Mb2dVdGlsJztcblxuLyoqXG4gICAqXG4gICAqXG4gICAqIEBzdGF0aWMg5bCG6YCJ5oup5Zmo6L2s5o2i5oiQ5pWw57uE6L+U5ZueXG4gICAqIEBwYXJhbSB7Kn0gc2VsZWN0b3JzIOWtl+espuS4sumAieaLqeWZqFxuICAgKiBAcmV0dXJucyBbSFRNTEVsZW1lbnRdXG4gICAqIEBtZW1iZXJvZiBEb21VdGlsXG4gICAqL1xuZXhwb3J0IGNvbnN0IGRvbUxpc3RUb0FycmF5ID0gKHNlbGVjdG9ycykgPT4ge1xuICBsZXQgbGlzdCA9IFtdO1xuICBpZiAoc2VsZWN0b3JzIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcbiAgICBsaXN0LnB1c2goc2VsZWN0b3JzKTtcbiAgfSBlbHNlIGlmICh0eXBlb2Ygc2VsZWN0b3JzID09PSAnc3RyaW5nJykge1xuICAgIGxpc3QgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9ycyksIDApO1xuICB9IGVsc2UgaWYgKHNlbGVjdG9ycyBpbnN0YW5jZW9mIE5vZGVMaXN0KSB7XG4gICAgbGlzdCA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHNlbGVjdG9ycywgMCk7XG4gIH0gZWxzZSBpZiAoc2VsZWN0b3JzIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICBsaXN0ID0gc2VsZWN0b3JzO1xuICB9XG4gIHJldHVybiBsaXN0O1xufTtcblxuXG4vKipcbiAgICpcbiAgICogQHBhcmFtIHNlbGVjdG9ycyDpgInmi6nlmajmiJZIVE1MRUxFTUVOVFxuICAgKiBAcGFyYW0gdG91Y2hTdGFydCB0b3VjaHN0YXJ05LqL5Lu2XG4gICAqIEBwYXJhbSB0b3VjaGVNb3ZlIHRvdWNobW92ZeS6i+S7tlxuICAgKiBAcGFyYW0gdG91Y2hFbmQgdG91Y2hlbmTkuovku7ZcbiAgICogQHBhcmFtIG5lZWRQcmVzc0NsYXNzIOaYr+WQpumcgOimgXByZXNz5Yid5aeL5YyWXG4gICAqIEB0b2RvIOaDs+WOu+aOiSzlvpfmiormiYDmnInnmoTngrnmjInmjqfku7bmlLnmiJBh5qCH562+LOS9huaYr+WunueOsOeahOaViOaenOaYr+aXoOazleWumuS5ieWchuinklxuICAgKi9cbmV4cG9ydCBjb25zdCBpbml0QnV0dG9uUHJlc3NBY3RpdmUgPSAoe1xuICBzZWxlY3RvcnMsXG4gIHRvdWNoU3RhcnQsXG4gIHRvdWNoZU1vdmUsXG4gIHRvdWNoRW5kLFxuICBuZWVkUHJlc3NDbGFzcyA9IHRydWUsXG59KSA9PiB7XG4gIGxldCB0b3VjaCA9IDA7XG4gIGNvbnN0IGJ1dHRvbnMgPSBkb21MaXN0VG9BcnJheShzZWxlY3RvcnMpO1xuXG4gIGZ1bmN0aW9uIG9uVG91Q2hNb3ZlKGUpIHtcbiAgICBjb25zdCBwb2ludCA9IGUuY2hhbmdlZFRvdWNoZXNbMF07XG4gICAgY29uc3QgcmVjdCA9IHRoaXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgbGV0IGlzT3V0c2lkZSA9IChwb2ludC5jbGllbnRYIC0gcmVjdC5sZWZ0IDwgMCB8fCBwb2ludC5jbGllbnRYIC0gcmVjdC5yaWdodCA+IDApO1xuICAgIGlzT3V0c2lkZSA9IGlzT3V0c2lkZSB8fCAocG9pbnQuY2xpZW50WSAtIHJlY3QudG9wIDwgMCB8fCBwb2ludC5jbGllbnRZIC0gcmVjdC5ib3R0b20gPiAwKTtcbiAgICBpZiAoaXNPdXRzaWRlKSB7XG4gICAgICBpZiAobmVlZFByZXNzQ2xhc3MpIHtcbiAgICAgICAgdGhpcy5jbGFzc0xpc3QucmVtb3ZlKCdwcmVzcycpO1xuICAgICAgfVxuICAgICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCBvblRvdUNoTW92ZSk7XG4gICAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgb25Ub3VjaEVuZCk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdXNlLWJlZm9yZS1kZWZpbmVcbiAgICB9IGVsc2UgaWYgKHRvdWNoZU1vdmUpIHtcbiAgICAgIHRvdWNoZU1vdmUoZSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gb25Ub3VjaEVuZChlKSB7XG4gICAgaWYgKG5lZWRQcmVzc0NsYXNzKSB7XG4gICAgICB0aGlzLmNsYXNzTGlzdC5yZW1vdmUoJ3ByZXNzJyk7XG4gICAgfVxuICAgIGlmIChuZXcgRGF0ZSgpLmdldFRpbWUoKSAtIHRvdWNoID4gMzAwKSB7XG4gICAgICBpZiAodG91Y2hFbmQpIHtcbiAgICAgICAgdG91Y2hFbmQoZSk7XG4gICAgICAgIHRvdWNoID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgb25Ub3VDaE1vdmUpO1xuICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCBvblRvdWNoRW5kKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG9uVG91Y2hTdGFydChlKSB7XG4gICAgaWYgKHRoaXMuY2xhc3NMaXN0LmNvbnRhaW5zKCdkaXNhYmxlZCcpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmIChuZWVkUHJlc3NDbGFzcykge1xuICAgICAgdGhpcy5jbGFzc0xpc3QuYWRkKCdwcmVzcycpO1xuICAgIH1cbiAgICBpZiAodG91Y2hTdGFydCkge1xuICAgICAgdG91Y2hTdGFydChlKTtcbiAgICB9XG4gICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCBvblRvdUNoTW92ZSk7XG4gICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIG9uVG91Y2hFbmQpO1xuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgb25Ub3VDaE1vdmUpO1xuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCBvblRvdWNoRW5kKTtcbiAgfVxuXG4gIGJ1dHRvbnMubWFwKChpdGVtKSA9PiB7XG4gICAgY29uc3QgZm4gPSBvblRvdWNoU3RhcnQuYmluZChpdGVtKTtcbiAgICBpdGVtLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBmbik7XG4gICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgZm4pO1xuICB9KTtcbn07XG5cbi8qKlxuKiDliqDmu5rliqjmoYbnmoTlt6Xlhbfnsbss5qih5ouf5omL5py65pWI5p6cLFxuKiDlpoLmnpzoh6rlrprkuYnmu5rliqjmnaEs6L+Z5Liq5bCx5Y+v5Lul5bqf5byD5LqGXG4qIEBwYXJhbSBzZWxlY3RvcnNcbiovXG5leHBvcnQgY29uc3QgaW5pdFNjcm9sbENsYXNzID0gKHNlbGVjdG9ycykgPT4ge1xuICBjb25zdCBkb21MaXN0ID0gZG9tTGlzdFRvQXJyYXkoc2VsZWN0b3JzKTtcbiAgZG9tTGlzdC5tYXAoKGl0ZW0pID0+IHtcbiAgICBsZXQgdGltZXIgPSBudWxsO1xuXG4gICAgZnVuY3Rpb24gcmVtb3ZlU2Nyb2xsQmFyKCkge1xuICAgICAgdGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5jbGFzc0xpc3QuYWRkKCdub19zY3JvbGwnKTtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKTtcbiAgICAgIH0sIDIwMDApO1xuICAgIH1cbiAgICBjb25zdCBmbiA9IHJlbW92ZVNjcm9sbEJhci5iaW5kKGl0ZW0pO1xuICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnbm9fc2Nyb2xsJyk7XG4gICAgZm4oKTtcbiAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCAoKSA9PiB7XG4gICAgICBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ25vX3Njcm9sbCcpO1xuICAgIH0pO1xuICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgKCkgPT4ge1xuICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdub19zY3JvbGwnKTtcbiAgICAgIGNsZWFyVGltZW91dCh0aW1lcik7XG4gICAgICB0aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoJ25vX3Njcm9sbCcpO1xuICAgICAgICBjbGVhclRpbWVvdXQodGltZXIpO1xuICAgICAgfSwgMjAwMCk7XG4gICAgfSk7XG4gICAgaXRlbS5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIGZuKTtcbiAgICBpdGVtLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoY2FuY2VsJywgZm4pO1xuICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCBmbik7XG4gICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGNhbmNlbCcsIGZuKTtcbiAgfSk7XG59O1xuXG4vKipcbipcbipcbiogQHN0YXRpYyB3aW5kb3fliIfmjaLmiJbogIXmu5HliLDkuIDljYrnmoTml7blgJks6KaB5Y+W5raI5oyJ5Y6L5pWI5p6cXG4qIOWmguaenOeUqGHmoIfnrb7lj6/og73msqHov5nkuKrpl67pophcbiogQG1lbWJlcm9mIERvbVV0aWxcbiovXG5leHBvcnQgY29uc3Qgb25XaW5kb3dUb3VjaENhbmNlbCA9ICgpID0+IHtcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoY2FuY2VsJywgKCkgPT4ge1xuICAgIGNvbnN0IGNsaWNrQnRucyA9IGRvbUxpc3RUb0FycmF5KGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wcmVzcycpKTtcbiAgICBjbGlja0J0bnMubWFwKChpdGVtKSA9PiB7XG4gICAgICBpZiAoaXRlbSAmJiBpdGVtLmNsYXNzTGlzdCkge1xuICAgICAgICBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ3ByZXNzJyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufTtcbmV4cG9ydCBjb25zdCBnZXRGdW5BbmRSZXMgPSAoKSA9PiB7XG4gIGNvbnN0IGpzb24gPSB7fTtcbiAganNvbi5mdW5OdW0gPSBnZXRGdW5OdW0oKTtcbiAganNvbi5yZXNvdXJjZVR5cGUgPSBnZXRSZXNvdXJjZVR5cGUoKTtcbiAgcmV0dXJuIGpzb247XG59O1xuLyoqXG4gKiByaW5n5biD5bGA6YCC6YWNLFxuICogQHBhcmFtIHtzdHJpbmd9IHJpbmdXaWR0aCDmm7LpnaLlronlhajovrnot51cbiAqIEBwYXJhbSB7c3RyaW5nfSBzZWxlY3RvcnMg6YCJ5oup5ZmoLFxuICovXG5leHBvcnQgY29uc3QgaGFja1JpbmdXaWR0aCA9IChyaW5nV2lkdGgsIHNlbGVjdG9ycykgPT4ge1xuICBpZiAocmluZ1dpZHRoKSB7XG4gICAgY29uc3QgZG9tTGlzdCA9IGRvbUxpc3RUb0FycmF5KGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3JzKSk7XG4gICAgZG9tTGlzdC5tYXAoKGl0ZW0pID0+IHtcbiAgICAgIGNvbnN0IG9yaWdpbkxlZnQgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShpdGVtLCBudWxsKS5wYWRkaW5nTGVmdDtcbiAgICAgIGNvbnN0IG9yaWdpblJpZ2h0ID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoaXRlbSwgbnVsbCkucGFkZGluZ1JpZ2h0O1xuICAgICAgaXRlbS5zZXRBdHRyaWJ1dGUoJ2RhdGEtcGFkZGluZ0xlZnQnLCBvcmlnaW5MZWZ0KTtcbiAgICAgIGl0ZW0uc2V0QXR0cmlidXRlKCdkYXRhLXBhZGRpbmdSaWdodCcsIG9yaWdpblJpZ2h0KTtcbiAgICAgIGNvbnN0IHJpbmdTYWZlTGVmdCA9IGAke3BhcnNlRmxvYXQob3JpZ2luTGVmdCkgKyByaW5nV2lkdGh9cHhgO1xuICAgICAgY29uc3QgcmluZ1NhZmVSaWdodCA9IGAke3BhcnNlRmxvYXQob3JpZ2luUmlnaHQpICsgcmluZ1dpZHRofXB4YDtcbiAgICAgIGl0ZW0uc2V0QXR0cmlidXRlKCdkYXRhLXJpbmdsZWZ0JywgcmluZ1NhZmVMZWZ0KTtcbiAgICAgIGl0ZW0uc2V0QXR0cmlidXRlKCdkYXRhLXJpbmdyaWdodCcsIHJpbmdTYWZlUmlnaHQpO1xuICAgICAgaWYgKHdpbmRvdy5vcmllbnRhdGlvbiAhPT0gOTAgJiYgd2luZG93Lm9yaWVudGF0aW9uICE9PSAtOTApIHtcbiAgICAgICAgaXRlbS5zdHlsZS5wYWRkaW5nTGVmdCA9IHJpbmdTYWZlTGVmdDsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgICAgICBpdGVtLnN0eWxlLnBhZGRpbmdSaWdodCA9IHJpbmdTYWZlUmlnaHQ7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignb3JpZW50YXRpb25jaGFuZ2UnLCAoKSA9PiB7XG4gICAgICBpZiAod2luZG93Lm9yaWVudGF0aW9uID09PSA5MCB8fCB3aW5kb3cub3JpZW50YXRpb24gPT09IC05MCkge1xuICAgICAgICAvLyAgICDmqKrlsY9cbiAgICAgICAgZG9tTGlzdC5tYXAoKGl0ZW0pID0+IHtcbiAgICAgICAgICBjb25zdCBvcmlnaW5MZWZ0ID0gaXRlbS5kYXRhc2V0LnBhZGRpbmdsZWZ0O1xuICAgICAgICAgIGNvbnN0IG9yaWdpblJpZ2h0ID0gaXRlbS5kYXRhc2V0LnBhZGRpbmdyaWdodDtcbiAgICAgICAgICBpdGVtLnN0eWxlLnBhZGRpbmdMZWZ0ID0gb3JpZ2luTGVmdDsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgICAgICAgIGl0ZW0uc3R5bGUucGFkZGluZ1JpZ2h0ID0gb3JpZ2luUmlnaHQ7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyDnq5blsY9cbiAgICAgICAgZG9tTGlzdC5tYXAoKGl0ZW0pID0+IHtcbiAgICAgICAgICBjb25zdCByaW5nU2FmZUxlZnQgPSBpdGVtLmRhdGFzZXQucmluZ2xlZnQ7XG4gICAgICAgICAgY29uc3QgcmluZ1NhZmVSaWdodCA9IGl0ZW0uZGF0YXNldC5yaW5ncmlnaHQ7XG4gICAgICAgICAgaXRlbS5zdHlsZS5wYWRkaW5nTGVmdCA9IHJpbmdTYWZlTGVmdDsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgICAgICAgIGl0ZW0uc3R5bGUucGFkZGluZ1JpZ2h0ID0gcmluZ1NhZmVSaWdodDsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufTtcblxuLyoqXG4gKlxuICog5Y+M5Ye75ZCM5LiA6ZO+5o6l55qE5pe25YCZLOWPlua2iOesrOS6jOasoeihjOS4ulxuICogQHN0YXRpY1xuICogQG1lbWJlcm9mIERvbVV0aWxcbiAqL1xuZXhwb3J0IGNvbnN0IGhhY2tEb3VibGVDbGljayA9ICgpID0+IHtcbiAgY29uc3QgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcbiAgbGV0IGxhc3RDbGlja1RpbWUgPSAwO1xuICBib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICBjb25zdCBjdXJyZW50Q2xpY2tUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgaWYgKGN1cnJlbnRDbGlja1RpbWUgLSBsYXN0Q2xpY2tUaW1lIDwgMzAwKSB7XG4gICAgICBMb2dVdGlsLmRldkxvZygnZGJjbGljaycpO1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgbGFzdENsaWNrVGltZSA9IGN1cnJlbnRDbGlja1RpbWU7XG4gIH0sIHRydWUpO1xufTtcbi8qKlxuKlxuKlxuKiBAc3RhdGljIOa3u+WKoOa7muWKqOadoSzoh6rlrprkuYnmu5rliqjmnaEsZG9t5a6e6ZmF5YaF5a656ZyA6KaB5Zyo5Lik5bGC5YyF6KO55LiLXG4qIEBwYXJhbSB7Kn0ge1xuKiAgICAgdGFyZ2V0LFxuKiAgIH1cbiogQG1lbWJlcm9mIERvbVV0aWxcbiovXG5leHBvcnQgY29uc3QgY3JlYXRlU2Nyb2xsQmFyID0gKHsgdGFyZ2V0IH0pID0+IHtcbiAgbGV0IGZsYWcgPSBmYWxzZTtcbiAgY29uc3Qgc2Nyb2xsQmFyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIHNjcm9sbEJhci5jbGFzc05hbWUgPSAnc2Nyb2xsQmFyJztcbiAgY29uc3Qgc2Nyb2xsVGh1bWIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgc2Nyb2xsVGh1bWIuY2xhc3NOYW1lID0gJ3Njcm9sbEJhclRodW1iJztcbiAgc2Nyb2xsQmFyLmFwcGVuZENoaWxkKHNjcm9sbFRodW1iKTtcbiAgY29uc3QgY29udGVudCA9IHRhcmdldC5xdWVyeVNlbGVjdG9yKCcuc2Nyb2xsQ29udGVudCcpO1xuICBjb25zdCBzY3JvbGxUYXJnZXQgPSB0YXJnZXQucXVlcnlTZWxlY3RvcignLnNjcm9sbFdyYXAnKTtcbiAgY29uc3Qgd3JhcEhlaWdodCA9IHRhcmdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQ7XG4gIGNvbnN0IGNvbnRlbnRIZWlnaHQgPSBjb250ZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodDtcbiAgaWYgKHdyYXBIZWlnaHQgPCBjb250ZW50SGVpZ2h0KSB7XG4gICAgc2Nyb2xsVGh1bWIuc3R5bGUuaGVpZ2h0ID0gYCR7d3JhcEhlaWdodCAqIDEwMCAvIGNvbnRlbnRIZWlnaHR9JWA7XG4gIH1cbiAgc2Nyb2xsVGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsICgpID0+IHtcbiAgICBpZiAoIWZsYWcpIHtcbiAgICAgIGZsYWcgPSB0cnVlO1xuICAgICAgc2Nyb2xsVGh1bWIuc3R5bGUuaGVpZ2h0ID0gYCR7d3JhcEhlaWdodCAqIDEwMCAvIGNvbnRlbnRIZWlnaHR9JWA7XG4gICAgICBzY3JvbGxUaHVtYi5zdHlsZS50b3AgPSBgJHtzY3JvbGxUYXJnZXQuc2Nyb2xsVG9wICogMTAwIC8gd3JhcEhlaWdodH0lYDtcbiAgICAgIHNjcm9sbFRodW1iLnN0eWxlLm9wYWNpdHkgPSAxO1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHNjcm9sbFRodW1iLnN0eWxlLm9wYWNpdHkgPSAwO1xuICAgICAgICBmbGFnID0gZmFsc2U7XG4gICAgICB9LCAyMDAwKTtcbiAgICB9XG4gIH0pO1xuICBzY3JvbGxUYXJnZXQuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgKCkgPT4ge1xuICAgIHNjcm9sbFRodW1iLnN0eWxlLnRvcCA9IGAke3Njcm9sbFRhcmdldC5zY3JvbGxUb3AgKiAxMDAgLyB3cmFwSGVpZ2h0fSVgO1xuICB9KTtcbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHNjcm9sbEJhcik7XG59O1xuXG4vKipcbiAqIOa3u+WKoHN0eWxlIHJ1bGUg6KeE5YiZXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHJ1bGVUZXh0XG4gKi9cbmV4cG9ydCBjb25zdCBhZGRTdHlsZVJ1bGUgPSAocnVsZVRleHQpID0+IHtcbiAgaWYgKHJ1bGVUZXh0KSB7XG4gICAgLy8g6L+Z6YeM5aaC5p6c55SoaW5zZXJ0UnVsZSDkvJrmiqXplJksZmlsZeWNj+iuruS4iyDkvJrmnInlronlhajpl67pophcbiAgICBsZXQgc3R5bGVTaGVldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzdHlsZURlZicpO1xuICAgIGxldCBoZWFkRG9tO1xuICAgIGlmICghc3R5bGVTaGVldCkge1xuICAgICAgaGVhZERvbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2hlYWQnKTtcbiAgICAgIHN0eWxlU2hlZXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgICAgc3R5bGVTaGVldC50eXBlID0gJ3RleHQvY3NzJztcbiAgICAgIHN0eWxlU2hlZXQuaWQgPSAnc3R5bGVEZWYnO1xuICAgIH1cbiAgICBjb25zdCBydWxlVGV4dE5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShydWxlVGV4dCk7XG4gICAgc3R5bGVTaGVldC5hcHBlbmRDaGlsZChydWxlVGV4dE5vZGUpO1xuICAgIGlmIChoZWFkRG9tKSB7XG4gICAgICBoZWFkRG9tLmFwcGVuZENoaWxkKHN0eWxlU2hlZXQpO1xuICAgIH1cbiAgfVxufTtcblxuLyoqXG4gKlxuICog5re75Yqg5a2X5L2T5qC35byPXG4gKiDmmoLml7bmnKrnlKgs5pyq55Sf5pWIXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyb2YgRG9tVXRpbFxuICovXG5leHBvcnQgY29uc3QgYWRkRm9udFN0eWxlID0gKCkgPT4ge1xuICBjb25zdCBmb250UnVsZVRleHQgPSBgQGZvbnQtZmFjZXtcbiAgICAgIGZvbnQtZmFtaWx5OiAnTXlhbm1hckZvbnQnO1xuICAgICAgZm9udC1kaXNwbGF5OiBzd2FwO1xuICAgICAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcbiAgICAgIHNyYzogbG9jYWwoJ1NtYXJ0WmF3Z3lpJyksXG4gICAgICAgICAgdXJsKCcuL1NtYXJ0WmF3Z3lpLnR0ZicpLFxuICAgICAgICAgIHVybCgnZmlsZTovL3N5c3RlbS9mb250cy9TbWFydFphd2d5aS50dGYnKTtcbiAgICB9XG4gICAgXG4gICAgQGZvbnQtZmFjZXtcbiAgICAgICAgZm9udC1mYW1pbHk6ICdIV1RleHQtUmVndWxhcic7XG4gICAgICAgIGZvbnQtZGlzcGxheTogc3dhcDtcbiAgICAgICAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcbiAgICAgICAgc3JjOiBsb2NhbCgn5rGJ5Luq5peX6buRJyksXG4gICAgICAgICAgICB1cmwoJy4vRHJvaWRTYW5zQ2hpbmVzZS50dGYnKSxcbiAgICAgICAgICAgIHVybCgnZmlsZTovL3N5c3RlbS9mb250cy9Ecm9pZFNhbnNDaGluZXNlLnR0ZicpO1xuICAgIH1cbiAgICBcbiAgICBAZm9udC1mYWNle1xuICAgICAgICBmb250LWZhbWlseTogJ0hXVGV4dC1NZWRpdW0nO1xuICAgICAgICBmb250LWRpc3BsYXk6IHN3YXA7XG4gICAgICAgIGZvbnQtd2VpZ2h0OiBub3JtYWw7XG4gICAgICAgIHNyYzogbG9jYWwoJ+axieS7quaXl+m7kSBNZWRpdW0nKSxcbiAgICAgICAgdXJsKCcuL0h3Q2hpbmVzZS1NZWRpdW0udHRmJyksXG4gICAgICAgIHVybCgnZmlsZTovL3N5c3RlbS9mb250cy9Id0NoaW5lc2UtTWVkaXVtLnR0ZicpO1xuICAgIH1cblxuICAgIEBmb250LWZhY2V7XG4gICAgICBmb250LWZhbWlseTogJ1JvYm90by1NZWRpdW0nO1xuICAgICAgZm9udC1kaXNwbGF5OiBzd2FwO1xuICAgICAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcbiAgICAgIHNyYzogbG9jYWwoJ1JvYm90byBNZWRpdW0nKSxcbiAgICAgICAgICAgIHVybCgnLi9Sb2JvdG8tTWVkaXVtLnR0ZicpLFxuICAgICAgICAgICAgdXJsKCdmaWxlOi8vc3lzdGVtL2ZvbnRzL1JvYm90by1NZWRpdW0udHRmJyk7XG4gICAgfVxuICAgIFxuICAgIEBmb250LWZhY2V7XG4gICAgICBmb250LWZhbWlseTogJ1JvYm90by1SZWd1bGFyJztcbiAgICAgIGZvbnQtZGlzcGxheTogc3dhcDtcbiAgICAgIGZvbnQtd2VpZ2h0OiBub3JtYWw7XG4gICAgICBzcmM6bG9jYWwoJ1JvYm90bycpLFxuICAgICAgICAgdXJsKCcuL1JvYm90by1SZWd1bGFyLnR0ZicpLFxuICAgICAgICAgdXJsKCdmaWxlOi8vc3lzdGVtL2ZvbnRzL1JvYm90by1SZWd1bGFyLnR0ZicpO1xuICAgIH1cbiAgICBgO1xuICBhZGRTdHlsZVJ1bGUoZm9udFJ1bGVUZXh0KTtcbn07XG4vKipcbiAqIOiOt+W+l2Z1bmN0aW9uTnVtYmVyXG4gKiDojrflvpfmoIfor4ZpZFxuICog5qC55o2ubWV0YeWPlixuYW1lID1cImZ1bk51bVwiXG4gKi9cbmV4cG9ydCBjb25zdCBnZXRGdW5OdW0gPSAoKSA9PiB7XG4gIGNvbnN0IGZ1bmMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdtZXRhW25hbWU9XCJmdW5OdW1cIl0nKTtcbiAgaWYgKGZ1bmMpIHtcbiAgICByZXR1cm4gZnVuYy5nZXRBdHRyaWJ1dGUoJ2NvbnRlbnQnKTtcbiAgfVxufTtcbi8qKlxuICog6I635b6XcmVzb3VyY2VUeXBlXG4gKiDojrflvpfotYTmupDnsbvlnotcbiAqIOagueaNrm1ldGHlj5YsbmFtZSA9IFwicmVzb3VyY2VUeXBlXCJcbiAqL1xuZXhwb3J0IGNvbnN0IGdldFJlc291cmNlVHlwZSA9ICgpID0+IHtcbiAgY29uc3QgcmVzb3VjZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ21ldGFbbmFtZT1cInJlc291cmNlVHlwZVwiXScpO1xuICBpZiAocmVzb3VjZSkge1xuICAgIHJldHVybiByZXNvdWNlLmdldEF0dHJpYnV0ZSgnY29udGVudCcpO1xuICB9XG59O1xuXG4vKipcbiAqIOiOt+W+l0lkZW50aWZpZXJcbiAqIOebruWJjeS7heS+m+aJi+WGjFxuICog5qC55o2ubWV0YeWPlixuYW1lID0gXCJEQy5JZGVudGlmaWVyXCJcbiAqL1xuZXhwb3J0IGNvbnN0IGdldElkZW50aWZpZXIgPSAoKSA9PiB7XG4gIGNvbnN0IElkZW50aWZpZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbbmFtZT1cIkRDLklkZW50aWZpZXJcIl0nKTtcbiAgaWYgKElkZW50aWZpZXIpIHtcbiAgICByZXR1cm4gSWRlbnRpZmllci5nZXRBdHRyaWJ1dGUoJ2NvbnRlbnQnKTtcbiAgfVxufTtcblxuLyoqXG4gKiDljrvmjoluYXRpdmXpu5jorqTnmoRkYXJrTW9kZeagt+W8j1xuICovXG5leHBvcnQgY29uc3QgcmVtb3ZlTmF0aXZlRGFya1N0eWxlID0gKCkgPT4ge1xuICAvLyDov5nph4zkuI3nn6XpgZPml7bmnLos5omA5Lul5bmy6ISG5Yib5bu65LiA5LiqLOi/meagt25hdGl2ZeWwseS4jeS8muWIm+W7ulxuICBjb25zdCBkYXJrU3R5bGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGFya0hhY2snKTtcbiAgaWYgKGRhcmtTdHlsZSAmJiBkYXJrU3R5bGUucGFyZW50Tm9kZSAmJiBkYXJrU3R5bGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCkge1xuICAgIGRhcmtTdHlsZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGRhcmtTdHlsZSk7XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgaGVhZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2hlYWQnKTtcbiAgICBjb25zdCBkYXJrU3R5bGVFbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgIGRhcmtTdHlsZUVsZS5pZCA9ICdkYXJrSGFjayc7XG4gICAgaGVhZC5hcHBlbmRDaGlsZChkYXJrU3R5bGVFbGUpO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGRvbUxpc3RUb0FycmF5LFxuICBpbml0QnV0dG9uUHJlc3NBY3RpdmUsXG4gIGluaXRTY3JvbGxDbGFzcyxcbiAgb25XaW5kb3dUb3VjaENhbmNlbCxcbiAgaGFja1JpbmdXaWR0aCxcbiAgaGFja0RvdWJsZUNsaWNrLFxuICBjcmVhdGVTY3JvbGxCYXIsXG4gIGFkZFN0eWxlUnVsZSxcbiAgYWRkRm9udFN0eWxlLFxuICBnZXRGdW5OdW0sXG4gIGdldFJlc291cmNlVHlwZSxcbiAgZ2V0RnVuQW5kUmVzLFxufTtcbiIsIlxuLyoqXG4gKiDngrnlh7vmlLbol49cbiAqL1xuZXhwb3J0IGNvbnN0IEpTX0lOVEVSRkFDRV9DTElDS1BSQUlTRSA9ICdjbGlja1ByYWlzZSc7XG5leHBvcnQgY29uc3QgSlNfSU5URVJGQUNFX1RPR0dMRVBSQUlTRSA9ICd0b2dnbGVQcmFpc2UnO1xuLyoqXG4gKiDlj5bmtojmlLbol49cbiAqL1xuZXhwb3J0IGNvbnN0IEpTX0lOVEVSRkFDRV9DQU5DRUxQUkFJU0UgPSAnY2FuY2VsUHJhaXNlJztcbi8qKlxuICog5Yi35paw5pS26JeP54q25oCBXG4gKi9cbmV4cG9ydCBjb25zdCBKU19JTlRFUkZBQ0VfUkVGUkVTSFBSQUlTRSA9ICdyZWZyZXNoUHJhaXNlJztcbi8qKlxuICog56uL5Y2z5L2T6aqMXG4gKi9cbmV4cG9ydCBjb25zdCBKU19JTlRFUkZBQ0VfRVhQUklFTkNFID0gJ2V4cHJpZW5jZSc7XG5cbi8qKlxuICogY2FsbCBmcm9tIGpzIHRvIGdldCB0aXAgY29tbWVudCBkYXRhICwgdGhlbiBzZW5kIHRpcCBjb21tZW50IGRhdGEgdG8ganMuXG4gKi9cbmV4cG9ydCBjb25zdCBKU19JTlRFUkZBQ0VfVVBEQVRFQ09NTUVOVFNGUk9NTkFUSVZFID0gJ3VwZGF0ZUNvbW1lbnRzRnJvbU5hdGl2ZSc7XG5leHBvcnQgY29uc3QgSlNfSU5URVJGQUNFX0FGVEVSX0NPTU1FTlRfRk4gPSAnYWZ0ZXJDb21tZW50RnJvbU5hdGl2ZSc7XG5cbi8qKlxuICogb3BlbiB0aXAgY29tbWVudCBwYWdlXG4gKi9cbmV4cG9ydCBjb25zdCBKU19JTlRFUkZBQ0VfT1BFTkNPTU1FTlRQQUdFID0gJ29wZW5Db21tZW50UGFnZSc7XG5leHBvcnQgY29uc3QgSlNfSU5URVJGQUNFX1JPQVNUID0gJ29wZW5Sb2FzdEFjdGlvblNoZWV0JztcblxuLyoqXG4gKiBvcGVuIHRpcCByZS1jb21tZW50IHBhZ2VcbiAqL1xuZXhwb3J0IGNvbnN0IEpTX0lOVEVSRkFDRV9PUEVOUkVDT01NRU5UUEFHRSA9ICdvcGVuUmVDb21tZW50UGFnZSc7XG5cbi8qKlxuICogY29tbWVudCB0YXRlIGNoYW5nZWVkXG4gKi9cbmV4cG9ydCBjb25zdCBKU19JTlRFUkZBQ0VfUkFURUNIQU5HRUQgPSAncmF0ZUNoYW5nZWQnO1xuXG4vKipcbiAqIGNvbW1lbnQgdGFnIHRvZ2dsZWVkXG4gKi9cbmV4cG9ydCBjb25zdCBKU19JTlRFUkZBQ0VfVEFHVE9HR0xFRCA9ICd0YWdUb2dnbGVkJztcblxuLyoqXG4gKiBzdWJtaXQgdGlwIGNvbW1lbnRcbiAqL1xuZXhwb3J0IGNvbnN0IEpTX0lOVEVSRkFDRV9TVUJNSVRDT01NRU5UID0gJ3N1Ym1pdENvbW1lbnQnO1xuXG4vKipcbiAqIGpz5Yqg6L295a6M5oiQXG4gKi9cbmV4cG9ydCBjb25zdCBKU19JTlRFUkZBQ0VfSlNfTEFPRF9GSU5JU0ggPSAnSlNsb2FkRmluaXNoJztcbmV4cG9ydCBjb25zdCBKU19JTlRFUkZBQ0VfSlNfTEFPRF9GSU5JU0hfRVggPSAnanNsb2FkZmluaXNoJztcblxuLyoqXG4gKiDmiZPlvIDplb/op4bpopFcbiAqL1xuZXhwb3J0IGNvbnN0IEpTX0lOVEVSRkFDRV9PUEVOX0xPTkdfVklERU8gPSAnb3Blbmxvbmd2aWRlbyc7XG5cbi8qKlxuICog5YWz6Zet5b2T5YmN6aG16Z2iXG4gKi9cbmV4cG9ydCBjb25zdCBKU19JTlRFUkZBQ0VfQ0xPU0VfUEFHRSA9ICdjbG9zZVBhZ2UnO1xuXG4vKipcbiAqIOWFs+mXreW9k+WJjemhtemdolxuICovXG5leHBvcnQgY29uc3QgSlNfSU5URVJGQUNFX1JFRlJFU0hfUEFHRV9OVU1CRVIgPSAncGFnZU51bSc7XG5cbi8qKlxuICog5rWP6KeI5omL5YaM6K+m5oOF77yM55So5L2c5omT54K5XG4gKi9cbmV4cG9ydCBjb25zdCBKU19JTlRFUkZBQ0VfVklFV19NQU5VQUwgPSAndmlld01hbnVhbCc7XG5cbi8qKlxuICog5rWP6KeI5omL5YaM5YiX6KGo77yM55So5L2c5omT54K5XG4gKi9cbmV4cG9ydCBjb25zdCBKU19JTlRFUkZBQ0VfVklFV19NQU5VQUxfTElTVCA9ICd2aWV3TWFudWFsTGlzdCc7XG5cbi8qKlxuICog6Lez6L2s5omL5YaM6aaW5LiqdG9waWNcbiAqIOebruWJjeS7heWkp+a6quWcsOiwg+eUqFxuICovXG5leHBvcnQgY29uc3QgSlNfSU5URVJGQUNFX1ZJRVdfTUFOVUFMX0ZJUlNUX1RPUElDID0gJ2luaXRUb3BpYzRTcGVjaWFsJztcblxuLyogU1IwMDBCRTZFQSBaMDA0NTQ5NzEgMjAxOC8xMS8xNyBiZWdpbiAqL1xuLyoqXG4gKiDlhajlsY9cbiAqL1xuZXhwb3J0IGNvbnN0IEpTX0lOVEVSRkFDRV9GVUxMX1NDUkVFTiA9ICdmdWxsc2NyZWVuJztcblxuLyoqXG4gKiDmo4Dmn6Xpk77mjqUg6ZqQ6JeP5YWl5Y+jXG4gKi9cbmV4cG9ydCBjb25zdCBKU19JTlRFUkZBQ0VfSElERV9MSU5LID0gJ2hpZGVsaW5rJztcblxuLyoqXG4gKiDmo4Dmn6Xpk77mjqUg6ZqQ6JeP5LiT6aKY5LqS6ZO+6Lez6L2s5LiT6aKY5YWl5Y+jXG4gKi9cbmV4cG9ydCBjb25zdCBKU19JTlRFUkZBQ0VfSElERV9TVUJKRUNUX0xJTksgPSAnaGlkZXN1YmplY3RsaW5rJztcblxuLyoqXG4gKiDmmK/lkKbmmL7npLrpnIDopoHmmL7npLrnvZHnu5zmnKrov57mjqVcbiAqL1xuZXhwb3J0IGNvbnN0IEpTX0lOVEVSRkFDRV9TRVRfTkVUID0gJ3NldG5ldCc7XG5cbi8qKlxuICog6Lez6L2s5Yiw5Y2h54mHXG4gKi9cbmV4cG9ydCBjb25zdCBKU19JTlRFUkZBQ0VfSlVNUF9UT19DQVJEID0gJ2p1bXB0b2NhcmQnO1xuXG4vKipcbiAqIOi3s+i9rOWIsOS4k+mimFxuICovXG5leHBvcnQgY29uc3QgSlNfSU5URVJGQUNFX0pVTVBfVE9fU1VCSkVDVCA9ICdqdW1wdG9zdWJqZWN0JztcblxuLyoqXG4gKiDmiZPlvIDlpJbpg6jnvZHpobVcbiAqL1xuZXhwb3J0IGNvbnN0IEpTX0lOVEVSRkFDRV9KVU1QX1RPX1dFQiA9ICdqdW1wdG93ZWInO1xuXG4vKipcbiAqIOaJk+W8gOWGhemDqOe9kemhtVxuICovXG5leHBvcnQgY29uc3QgSlNfSU5URVJGQUNFX0pVTVBfVE9fUEFHRSA9ICdqdW1wdG9wYWdlJztcblxuLyoqXG4gKiBOZXQgRXJyb3IgSlNcbiAqL1xuZXhwb3J0IGNvbnN0IEpTX0lOVEVSRkFDRV9ORVRfV09SS19FUlJPUiA9ICduZXRXb3JrRXJyb3InO1xuXG4vKipcbiAqIEpTIHNlbmQgZGF0YSBvZiBtYW51YWwgaGlzdG9yeSBzdGF0ZSB0byBuYXRpdmVcbiAqL1xuZXhwb3J0IGNvbnN0IEpTX0lOVEVSRkFDRV9TRU5EX0hJU1RPUllfVE9fTkFUSVZFID0gJ3NlbmRIaXN0b3J5VG9OYXRpdmUnO1xuLyoqXG4gKiBnZXQgZGF0YSBvZiBtYW51YWwgaGlzdG9yeSBzdGF0ZSBmb3JtIG5hdGl2ZSB0byBqc1xuICovXG5leHBvcnQgY29uc3QgSlNfSU5URVJGQUNFX0dFVF9ISVNUT1JZX0ZST01fTkFUSVZFID0gJ2dldEhpc3RvcnlGcm9tTmF0aXZlJztcbi8qIFNSMDAwQkU2RUEgWjAwNDU0OTcxIDIwMTgvMTEvMTcgZW5kICovXG5cbi8qIEFSMDAwQklQVEMgc3d4NTk4MTUwIDIwMTgvMTIvMTIgYmVnaW4gKi9cbi8qKlxuICogSlMgcmVwb3J0RXZlbnRcbiAqL1xuZXhwb3J0IGNvbnN0IEpTX0lOVEVSRkFDRV9SRVBPUlRfRVZFTlQgPSAncmVwb3J0RXZlbnQnO1xuLyogQVIwMDBCSVBUQyBzd3g1OTgxNTAgMjAxOC8xMi8xMiBlbmQgKi9cblxuLyogRFRTMjAxOTAxMTIwNDIwNiB3ZWl5b25nemhvbmcgd3d4NDM2Nzk1IDIwMTkwMTEyIGJlZ2luICovXG4vKipcbiAqIEpTIGluaXRJbmZvXG4gKi9cbmV4cG9ydCBjb25zdCBKU19JTlRFUkZBQ0VfSU5JVElORk8gPSAnaW5pdEluZm8nO1xuLyogRFRTMjAxOTAxMTIwNDIwNiB3ZWl5b25nemhvbmcgd3d4NDM2Nzk1IDIwMTkwMTEyIGVuZCAqL1xuXG4vKiBTUjAwMEJEVERWIHd3eDU0MzEyOSAyMDE5MDExNiBhZGQgYmVnaW4gKi9cbi8qKlxuICogSlMgRml0IGRhdGEgb2YgSnVtcFxuICovXG5leHBvcnQgY29uc3QgSlNfSU5URVJGQUNFX0NBTl9JX0pVTVAgPSAnY2FuSUp1bXAnO1xuZXhwb3J0IGNvbnN0IFVQREFURV9TQ0hFTUEgPSAndXBkYXRlU2NoZW1hVXJsJztcbi8qKlxuICogSlMgSnVtcCB0byBvdGhlciBhcHBcbiAqL1xuZXhwb3J0IGNvbnN0IEpTX0lOVEVSRkFDRV9PUEVOX0FQUCA9ICdqdW1wdG9hcHAnO1xuXG5leHBvcnQgY29uc3QgSlNfSU5URVJGQUNFX1NFTEZfQkFDS19GTiA9ICdvbk5hdGl2ZUJhY2tQcmVzc2VkJztcblxuZXhwb3J0IGNvbnN0IEpTX0lOVEVSRkFDRV9TRVRfSlVNUExJTktfRk4gPSAnc2V0SnVtcExpbmsnO1xuZXhwb3J0IGNvbnN0IEpTX05BVElWRV9QTEFZX0ZOID0gJ25hdGl2ZVBsYXknO1xuZXhwb3J0IGNvbnN0IEpTX05BVElWRV9QQVVTRV9GTiA9ICd2aWRlb1BhdXNlJztcbmV4cG9ydCBjb25zdCBKU19VUERBVEVfTU9EQUxfU1RBVFVTID0gJ3VwZGF0ZU1vZGFsJztcbmV4cG9ydCBjb25zdCBTVUJNSVRfQ09NTUVOVCA9ICdzdWJtaXRDb21tZW50JztcbmV4cG9ydCBjb25zdCBPUEVOX01BTlVBTF9ERVRBSUxfSlVNUF9BQ1RJT04gPSAnanVtcEFjdGlvbj1vcGVubWFudWFsZGV0YWlsJztcbmV4cG9ydCBjb25zdCBPUEVOX01BTlVBTF9JTkRFWCA9ICdtYW51YWwjb3Blbm1hbnVhbCc7XG5leHBvcnQgY29uc3QgT1BFTl9NQU5VQUxfREVUQUlMID0gJ3VybCNvcGVubWFudWFsZGV0YWlsJztcblxuZXhwb3J0IGNvbnN0IEpTX0lOVEVSRkFDRV9SRVNPVVJDRUlORk8gPSAnZ2V0RnVuQW5kUmVzJztcbiIsIlxuLy8gTG9n6L6T5Ye65bel5YW3XG5jb25zdCBMb2dVdGlsID0ge1xuICBkZXZMb2c6IChzdHIpID0+IHtcbiAgICBsZXQgc3RyTG9nID0gc3RyO1xuICAgIGlmICh0eXBlb2Ygc3RyTG9nID09PSAnb2JqZWN0Jykge1xuICAgICAgc3RyTG9nID0gSlNPTi5zdHJpbmdpZnkoc3RyTG9nKTtcbiAgICB9XG4gICAgY29uc29sZS5sb2coYGxvZzogJHtzdHJMb2d9YCk7XG4gIH0sXG59O1xuZXhwb3J0IGRlZmF1bHQgTG9nVXRpbDtcbiIsImltcG9ydCB7XG4gIGhhc1xufSBmcm9tICcuL1V0aWwnO1xuaW1wb3J0IEJhc2U2NCBmcm9tICcuL0Jhc2U2NCc7XG5pbXBvcnQge1xuICBUSVBTQVBQVFlQRSxcbiAgSElBUFBUWVBFLFxuICBOT1RfRVhJU1QsXG59IGZyb20gJy4vQ29uc3RhbnRzJztcbmltcG9ydCBMb2dVdGlsIGZyb20gJy4vTG9nVXRpbCc7XG5pbXBvcnQgTmF0aXZlU2RrIGZyb20gJy4vbmFqc3Nkayc7XG5pbXBvcnQge1xuICBKU19JTlRFUkZBQ0VfSU5JVElORk9cbn0gZnJvbSAnLi9JbnRlcmZhY2VQcm90b2NvbCc7XG4vLyBpbXBvcnQgJ2JhYmVsLXBvbHlmaWxsJztcbi8vIElF5YW85a655omN6ZyA6KaB55So55qELOmcgOimgeW8leWFpeesrOS4ieaWueaPkuS7tlxuXG5sZXQgaW5pdFN0YXR1cyA9IGZhbHNlO1xuY29uc3QgdmVyc2lvbkluZm8gPSB7fTtcbi8qKlxuICpcbiAqIOiuvue9ruWNleS4qmtleeeahHZhbHVlXG4gKiBAXG4gKiBAbWVtYmVyb2YgUGFyYW1cbiAqL1xuY29uc3Qgc2V0VmFsdWUgPSAoa2V5LCB2YWx1ZSkgPT4ge1xuICBpZiAodmVyc2lvbkluZm9ba2V5XSAhPT0gdmFsdWUpIHtcbiAgICB2ZXJzaW9uSW5mb1trZXldID0gdmFsdWU7XG4gIH1cbn07XG4vKipcbiAqXG4gKiDmm7TmlrDlj4LmlbDkv6Hmga9cbiAqIEBcbiAqIEBwYXJhbSB7Kn0ganNvblxuICogQG1lbWJlcm9mIFBhcmFtXG4gKi9cbmNvbnN0IHVwZGF0ZVZlcnNpb25JbmZvID0gKGpzb24pID0+IHtcbiAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKGpzb24pO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICBjb25zdCBrZXkgPSBrZXlzW2ldO1xuICAgIHNldFZhbHVlKGtleSwganNvbltrZXldKTtcbiAgfVxufTtcblxuLyoqXG4gKlxuICog5Yid5aeL5YyW5Y+C5pWw5L+h5oGvXG4gKiBAXG4gKiBAbWVtYmVyb2YgUGFyYW1cbiAqL1xuY29uc3QgaW5pdFZlcnNpb25JbmZvID0gKCkgPT4ge1xuICBjb25zdCBzZWFyY2ggPSBkZWNvZGVVUklDb21wb25lbnQod2luZG93LmxvY2F0aW9uLnNlYXJjaCk7XG4gIGNvbnN0IHBhcmFtcyA9IHt9O1xuICBsZXQgdXJsQXJyYXkgPSAoc2VhcmNoKS5zcGxpdCgnPycpO1xuICBpZiAodXJsQXJyYXlbMV0pIHtcbiAgICB1cmxBcnJheSA9ICh1cmxBcnJheVsxXSkuc3BsaXQoJyYnKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHVybEFycmF5Lmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBjb25zdCBrZXkgPSAodXJsQXJyYXlbaV0uc3BsaXQoJz0nKSlbMF07XG4gICAgICBbLCBwYXJhbXNba2V5XV0gPSAodXJsQXJyYXlbaV0uc3BsaXQoJz0nKSk7XG4gICAgICB2ZXJzaW9uSW5mb1trZXldID0gcGFyYW1zW2tleV07XG4gICAgfVxuICB9XG59O1xuLyoqXG4gKlxuICog6I635b6X5Y2V5Liqa2V555qEdmFsdWVcbiAqIEB0b2RvIOW+heS8mOWMllxuICogQFxuICogQG1lbWJlcm9mIFBhcmFtXG4gKi9cbmV4cG9ydCBjb25zdCBnZXRWYWx1ZSA9IChrZXkpID0+IHtcbiAgaWYgKCFpbml0U3RhdHVzKSB7XG4gICAgaW5pdFN0YXR1cyA9IHRydWU7XG4gICAgaW5pdFZlcnNpb25JbmZvKCk7XG4gIH1cbiAgaWYgKGhhcy5jYWxsKHZlcnNpb25JbmZvLCBrZXkpKSB7XG4gICAgaWYgKHZlcnNpb25JbmZvW2tleV0gJiYgdmVyc2lvbkluZm9ba2V5XS50b1VwcGVyQ2FzZSkge1xuICAgICAgcmV0dXJuIHZlcnNpb25JbmZvW2tleV0udG9VcHBlckNhc2UoKTtcbiAgICB9XG4gICAgcmV0dXJuIFN0cmluZyh2ZXJzaW9uSW5mb1trZXldKS50b1VwcGVyQ2FzZSgpO1xuICB9XG4gIHJldHVybiBOT1RfRVhJU1Q7XG59O1xuY29uc3QgUGFyYW0gPSB7XG4gIC8qKlxuICAgKlxuICAgKlxuICAgKiDliKTmlq3mmK/lkKbmmK/njqnmnLrmioDlt6flhoXmiZPlvIBcbiAgICogQHJldHVybnMgYm9vbGVhblxuICAgKi9cbiAgaXNUaXBzKCkge1xuICAgIHJldHVybiBnZXRWYWx1ZSgnYXBwVHlwZScpID09PSBUSVBTQVBQVFlQRSB8fCBnZXRWYWx1ZSgnYXBwVmVyc2lvbicpICE9PSBOT1RfRVhJU1Q7XG4gIH0sXG5cbiAgLyoqXG4gICAqXG4gICAqIOWIpOaWreaYr+WQpueCuei1nlxuICAgKiBAcmV0dXJucyBib29sZWFuXG4gICAqL1xuICBpc1ByYWlzZWQoKSB7XG4gICAgcmV0dXJuIGdldFZhbHVlKCdpc1ByYWlzZWQnKSA9PT0gJzEnO1xuICB9LFxuXG4gIC8qKlxuICAgKlxuICAgKlxuICAgKiDliKTmlq3mmK/lkKbmmK/liIbkuqvnmoTpobXpnaJcbiAgICogQHJldHVybnMgYm9vbGVhblxuICAgKi9cbiAgaXNGb3JTaGFyZSgpIHtcbiAgICByZXR1cm4gZ2V0VmFsdWUoJ3NoYXJlJykgIT09IE5PVF9FWElTVDtcbiAgfSxcblxuXG4gIC8qKlxuICAgKlxuICAgKlxuICAgKiBAIOWIpOaWreaYr2FwcOWGheaJk+W8gFxuICAgKiBAcmV0dXJucyBib29sZWFuXG4gICAqL1xuICBpc0luQXBwKCkge1xuICAgIHJldHVybiBnZXRWYWx1ZSgnYXBwVmVyc2lvbicpICE9PSBOT1RfRVhJU1QgfHwgZ2V0VmFsdWUoJ2lzUHJhaXNlZCcpICE9PSBOT1RfRVhJU1QgfHwgZ2V0VmFsdWUoJ2FwcFR5cGUnKSAhPT0gTk9UX0VYSVNUO1xuICB9LFxuXG4gIC8qKlxuICAgKiDliKTmlq3mmK/lkKbmmK/mt7HoibLmqKHlvI9cbiAgICogQHJldHVybnMgYm9vbGVhblxuICAgKi9cbiAgaXNEYXJrTW9kZSgpIHtcbiAgICByZXR1cm4gZ2V0VmFsdWUoJ2RhcmtNb2RlJykgPT09ICdUUlVFJztcbiAgfSxcblxuICAvKipcbiAgICpcbiAgICpcbiAgICog5Yik5pat5piv5ZCm5piv5bmz5p2/XG4gICAqIEByZXR1cm5zIGJvb2xlYW5cbiAgICovXG4gIGlzUGFkKCkge1xuICAgIHJldHVybiBnZXRWYWx1ZSgnaXNQYWQnKSA9PT0gJ1RSVUUnO1xuICB9LFxuXG4gIC8qKlxuICAgKiDmmK/lkKbmipjlj6DlsY9cbiAgICovXG4gIGlzRm9sZGFibGVQaG9uZSgpIHtcbiAgICByZXR1cm4gZ2V0VmFsdWUoJ2lzRm9sZGFibGVQaG9uZScpID09PSAnVFJVRSc7XG4gIH0sXG4gIC8qKlxuICAgKiDmipjlj6DlsY/mmK/lkKblsZXlvIBcbiAgICovXG4gIGlzRXhwYW5kU3RhdGUoKSB7XG4gICAgcmV0dXJuIGdldFZhbHVlKCdpc0V4cGFuZFN0YXRlJykgPT09ICdUUlVFJztcbiAgfSxcblxuICAvKipcbiAgICpcbiAgICpcbiAgICog5Yik5pat5piv5ZCm5piv5YiG5bGP5qih5byPXG4gICAqIEByZXR1cm5zIGJvb2xlYW5cbiAgICovXG4gIGlzU3BsaXRNb2RlKCkge1xuICAgIHJldHVybiBnZXRWYWx1ZSgnc3BsaXRTY3JlZW4nKSA9PT0gJ1RSVUUnO1xuICB9LFxuXG4gIC8qKlxuICAgKlxuICAgKlxuICAgKiDliKTmlq3mmK/lkKbmmK/ljZblnLrniYjmnKxcbiAgICogQHJldHVybnMgYm9vbGVhblxuICAgKi9cbiAgaXNEaXNwbGF5VmVyc2lvbigpIHtcbiAgICByZXR1cm4gZ2V0VmFsdWUoJ2lzRGlzcGxheVZlcnNpb24nKSA9PT0gJ1RSVUUnO1xuICB9LFxuXG4gIC8qKlxuICAgKlxuICAgKlxuICAgKiDliKTmlq3mmK/lkKbmmK/miYvmnLrkuIrnmoTliIblsY/mqKHlvI9cbiAgICogQHJldHVybnMgYm9vbGVhblxuICAgKi9cbiAgaXNQaG9uZVNwbGl0TW9kZSgpIHtcbiAgICByZXR1cm4gUGFyYW0uaXNTcGxpdE1vZGUoKSAmJiAhUGFyYW0uaXNQYWQoKSAmJiAhKFBhcmFtLmlzRm9sZGFibGVQaG9uZSgpICYmIFBhcmFtLmlzRXhwYW5kU3RhdGUoKSk7XG4gIH0sXG5cbiAgLyoqXG4gICAqXG4gICAqXG4gICAqIOWIpOaWreaYr+WQpuaYr+ivremfs+WKqeaJi+WGheaJk+W8gFxuICAgKiBAcmV0dXJucyBib29sZWFuXG4gICAqL1xuXG4gIGlzSGl2b2ljZSgpIHtcbiAgICByZXR1cm4gZ2V0VmFsdWUoJ2FwcFR5cGUnKSA9PT0gSElBUFBUWVBFO1xuICB9LFxuXG4gIC8qKlxuICAgKlxuICAgKlxuICAgKiDojrflj5borr7lpIfpq5jluqZcbiAgICogQHJldHVybnMgbnVtYmVyXG4gICAqL1xuXG4gIGdldERldmljZUhlaWdodCgpIHtcbiAgICBjb25zdCBoZWlnaHQgPSBnZXRWYWx1ZSgnZGV2aWNlSGVpZ2h0Jyk7XG4gICAgcmV0dXJuIGhlaWdodCAhPT0gTk9UX0VYSVNUID8gcGFyc2VGbG9hdChoZWlnaHQpIDogMDtcbiAgfSxcblxuICAvKipcbiAgICpcbiAgICpcbiAgICog6I635Y+W5py65Z6LXG4gICAqIEByZXR1cm5zIHN0cmluZ1xuICAgKi9cblxuICBnZXRUaGVtZVR5cGUoKSB7XG4gICAgcmV0dXJuIGdldFZhbHVlKCd0aGVtZVR5cGUnKTtcbiAgfSxcbiAgLyoqXG4gICAqIOW+l+WIsGFwcOeJiOacrFxuICAgKlxuICAgKiBAcmV0dXJuc1xuICAgKi9cbiAgZ2V0QXBwVmVyc2lvbigpIHtcbiAgICByZXR1cm4gZ2V0VmFsdWUoJ2FwcFZlcnNpb24nKSA9PT0gTk9UX0VYSVNUID8gbnVsbCA6IHBhcnNlRmxvYXQoZ2V0VmFsdWUoJ2FwcFZlcnNpb24nKSk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIOiOt+W+l+absumdouWxj+aJi+acuueahOWuieWFqOi+uei3nVxuICAgKiBAcmV0dXJucyBudW1iZXJcbiAgICovXG4gIGdldFJpbmdXaWR0aCgpIHtcbiAgICBjb25zdCByaW5nU2FmZVdpZHRoID0gZ2V0VmFsdWUoJ3JpbmdTYWZlV2lkdGgnKTtcbiAgICByZXR1cm4gcmluZ1NhZmVXaWR0aCAhPT0gTk9UX0VYSVNUID8gcGFyc2VGbG9hdChyaW5nU2FmZVdpZHRoKSA6IDA7XG4gIH0sXG5cbiAgLyoqXG4gICAqXG4gICAqXG4gICAqIOiOt+WPluiuvuWkh+WuveW6plxuICAgKiBAcmV0dXJucyBudW1iZXJcbiAgICovXG5cbiAgZ2V0RGV2aWNlV2lkdGgoKSB7XG4gICAgY29uc3Qgd2lkdGggPSBnZXRWYWx1ZSgnZGV2aWNlV2lkdGgnKTtcbiAgICByZXR1cm4gd2lkdGggIT09IE5PVF9FWElTVCA/IHBhcnNlRmxvYXQod2lkdGgpIDogMDtcbiAgfSxcblxuICAvKipcbiAgICpcbiAgICpcbiAgICog5Yik5pat5piv5ZCm5Y+v5Lul5omT54K55LiK5oqlXG4gICAqIEByZXR1cm5zIGJvb2xlYW5cbiAgICovXG4gIHNob3VsZFJlcG9ydCgpIHtcbiAgICByZXR1cm4gUGFyYW0uaXNGb3JTaGFyZSgpICYmIChnZXRWYWx1ZSgnc2hhcmUnKSA9PT0gJ0RPTUVTVElDJyk7XG4gIH0sXG5cbiAgLyoqXG4gICAqXG4gICAqIOaYr+WQpuaYvuekuueri+WNs+S9k+mqjOaWh+Wtl+aMiemSrlxuICAgKiBAcmV0dXJucyBib29sZWFuXG4gICAqL1xuICBoYXNFeHBlcmljZW5CdXR0b24oKSB7XG4gICAgcmV0dXJuIGdldFZhbHVlKCdJbW1lZGlhdGVFeHBlcmllbmNlQnRuJykgPT09ICcxJztcbiAgfSxcblxuICAvKipcbiAgICogQCDojrflvpfnlKjmiLfku6PnkIbkv6Hmga9cbiAgICogQHJldHVybnMgc3RyaW5nXG4gICAqL1xuICBnZXRVc2VyQWdlbnQoKSB7XG4gICAgcmV0dXJuIG5hdmlnYXRvci51c2VyQWdlbnQ7XG4gIH0sXG59O1xuUGFyYW0uZ2V0VXNlckFnZW50KCk7XG5cbi8qKlxuICpcbiAqIOmhtemdouWIneWni+WMluWKqOS9nCzliKTmlq3mmK9pbml0SW5mb+mHjOmdouWbnuiwg1xuICog6L+Y5piv55u05o6l5omn6KGMXG4gKiBAcGFyYW0geyp9IFBhcmFtXG4gKiBAcGFyYW0geyp9IGZuXG4gKi9cbmV4cG9ydCBjb25zdCBvblBhZ2VTdGFydGVkID0gKGZuKSA9PiB7XG4gIGlmIChQYXJhbS5pc1RpcHMoKSkge1xuICAgIHdpbmRvd1tKU19JTlRFUkZBQ0VfSU5JVElORk9dID0gKGFyZ3MpID0+IHtcbiAgICAgIGlmIChhcmdzKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgbGV0IG9wdGlvbnMgPSBhcmdzO1xuICAgICAgICAgIGlmICh0eXBlb2YgYXJncyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIG9wdGlvbnMgPSBCYXNlNjQuZGVjb2RlKGFyZ3MpO1xuICAgICAgICAgICAgTG9nVXRpbC5kZXZMb2coYEFSR1NfRlJPTV9OQVRJVkU6JHtvcHRpb25zfWApO1xuICAgICAgICAgICAgb3B0aW9ucyA9IEpTT04ucGFyc2Uob3B0aW9ucyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHVwZGF0ZVZlcnNpb25JbmZvKG9wdGlvbnMpO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgIExvZ1V0aWwuZGV2TG9nKGVycm9yKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGZuKSB7XG4gICAgICAgIGZuKCk7XG4gICAgICAgIC8vIOmYsuatom5hdGl2ZeWkmuasoeiwg+eUqGluaXRJbmZvLOWIneWni+WMluS4gOasoeS7peWQjuWNs+WPr+mUgOavgeWIneWni+WMluaWueazlVxuICAgICAgICB3aW5kb3dbSlNfSU5URVJGQUNFX0lOSVRJTkZPXSA9ICgpID0+IHtcbiAgICAgICAgICBMb2dVdGlsLmRldkxvZyhgZXJyb3IgLS0gJHtKU19JTlRFUkZBQ0VfSU5JVElORk99IGZuIGNhbiBvbmx5IGJlIGV4ZWN1dGVkIG9uY2UhYCk7XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfTtcbiAgICBOYXRpdmVTZGsuc3RhcnRJbml0KCk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmIChmbikge1xuICAgIGZuKCk7XG4gIH1cbn07XG5leHBvcnQgZGVmYXVsdCBQYXJhbTsiLCJpbXBvcnQgQ29udHJvbGxlciBmcm9tICcuL0NvbnRyb2xsZXJzL0NvbnRyb2xsZXInO1xuaW1wb3J0IExvZ1V0aWwgZnJvbSAnLi9Mb2dVdGlsJztcbmltcG9ydCB7IGNhbGxJbnRlcmZhY2VIb29rIH0gZnJvbSAnLi9VdGlsJztcbmltcG9ydCB7IFNVQ0NFU1NfQ0IsIENPTVBMRVRFX0NCLCBFUlJPUl9DQiB9IGZyb20gJy4vQ2FsbGVyL0ludGVyZmFjZUpzb24nO1xuXG5jbGFzcyBSZW5kZXJNYXN0ZXIge1xuICBjb25zdHJ1Y3Rvcih0YWcpIHtcbiAgICB0aGlzLnRhZyA9IHRhZztcbiAgICB0aGlzLmNvbnRyb2xsZXJzID0gW107XG4gICAgdGhpcy5iZWZvcmVSdW5Ib29rcyA9IFtdO1xuICAgIHRoaXMuYWZ0ZXJTaG93SG9va3MgPSBbXTtcbiAgfVxuXG4gIC8qKlxuICAgKiDmt7vliqBiZWZvcmVSdW7pkqnlrZBcbiAgICog5ZyoY29udHJvbGxlcuW8gOWni+WIneWni+WMluS5i+WJjei3kVxuICAgKiDkuLvopoHmlL7kuIDkuIvkuI7op4blm77ml6DlhbPnmoTpgLvovpFcbiAgICog5L6L5aaC5omT54K55ZWKLOS5i+exu+eahFxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBmbiDmlrnms5Xlm57osINcbiAgICogQG1lbWJlcm9mIFJlbmRlck1hc3RlclxuICAgKi9cbiAgYWRkQmVmb3JlUnVuSG9vayhmbikge1xuICAgIGlmIChmbiAmJiBmbiBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XG4gICAgICB0aGlzLmJlZm9yZVJ1bkhvb2tzLnB1c2goZm4pO1xuICAgIH1cbiAgfVxuXG4gIC8qKiDmt7vliqDpkqnlrZBcbiAgICog5pW05Liq6KeG5Zu+5pi+56S65ZCO5omn6KGMXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGZuIOaWueazleWbnuiwg1xuICAgKiBAbWVtYmVyb2YgUmVuZGVyTWFzdGVyXG4gICAqL1xuICBhZGRBZnRlclNob3dIb29rKGZuKSB7XG4gICAgaWYgKGZuICYmIGZuIGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcbiAgICAgIHRoaXMuYWZ0ZXJTaG93SG9va3MucHVzaChmbik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIOaJp+ihjGJlZm9yZVJ1bumSqeWtkFxuICAgKlxuICAgKiBAbWVtYmVyb2YgUmVuZGVyTWFzdGVyXG4gICAqL1xuICBiZWZvcmVDb250cm9sbGVyc1J1bigpIHtcbiAgICB0aGlzLmJlZm9yZVJ1bkhvb2tzLm1hcCgoaG9vaykgPT4ge1xuICAgICAgaWYgKGhvb2sgJiYgaG9vayBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XG4gICAgICAgIGhvb2soKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiDop6blj5HmiYDmnIljb250cm9sbGVyLnJ1buaWueazlSzmiafooYzmjqfku7Yv5qih5Z2X57qn5Yid5aeL5YyWXG4gICAqIEBtZW1iZXJvZiBSZW5kZXJNYXN0ZXJcbiAgICovXG4gIHRyaWdnZXJDb250cm9sbGVyc1J1bigpIHtcbiAgICB0aGlzLmNvbnRyb2xsZXJzLm1hcCgoaXRlbSkgPT4ge1xuICAgICAgaWYgKGl0ZW0gJiYgaXRlbSBpbnN0YW5jZW9mIENvbnRyb2xsZXIpIHtcbiAgICAgICAgaXRlbS5ydW4oKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiDop6blj5Fjb250cm9sbGVyLmFmdGVyU2hvd+aWueazlSzpgY3ljobmiafooYxybSDmt7vliqDnmoRhZnRlcnNob3fpkqnlrZBcbiAgICpcbiAgICogQG1lbWJlcm9mIFJlbmRlck1hc3RlclxuICAgKi9cbiAgYWZ0ZXJTaG93KCkge1xuICAgIHRoaXMuYWZ0ZXJTaG93SG9va3MubWFwKChob29rKSA9PiB7XG4gICAgICBpZiAoaG9vayAmJiBob29rIGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcbiAgICAgICAgaG9vaygpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMuY29udHJvbGxlcnMubWFwKChjb250cm9sbGVyKSA9PiB7XG4gICAgICBpZiAoY29udHJvbGxlciAmJiBjb250cm9sbGVyLmFmdGVyU2hvdykge1xuICAgICAgICBjb250cm9sbGVyLmFmdGVyU2hvdygpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIOa3u+WKoOe7hOS7ti/mqKHlnZfmjqfliLblmahcbiAgICogQHBhcmFtIHtDb250cm9sbGVyfSBjb250cm9sbGVyXG4gICAqIEBtZW1iZXJvZiBSZW5kZXJNYXN0ZXJcbiAgICovXG4gIGFkZENvbnRyb2xsZXIoY29udHJvbGxlcikge1xuICAgIGlmIChjb250cm9sbGVyICYmIGNvbnRyb2xsZXIgaW5zdGFuY2VvZiBDb250cm9sbGVyKSB7XG4gICAgICB0aGlzLmNvbnRyb2xsZXJzLnB1c2goY29udHJvbGxlcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIOiuqeaVtOS4quinhuWbvumDveWPr+ingVxuICAgKiDlpLHotKXmiJDlip/ku6XlkI7pg73opoHosIPnlKhcbiAgICovXG4gIHN0YXRpYyBzaG93RG9jdW1lbnQoKSB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpLmNsYXNzTGlzdC5hZGQoJ2luaXRlZCcpO1xuICB9XG5cbiAgLyoqXG4gICAqIOa1geeoi+aOp+WItlxuICAgKiDmiafooYxyZW5kZXLmlrnms5Us5bm25pi+56S66KeG5Zu+LOaJp+ihjGFmdGVyU2hvd+Wbnuiwg1xuICAgKiBAbWVtYmVyb2YgUmVuZGVyTWFzdGVyXG4gICAqL1xuICBydW4oKSB7XG4gICAgdGhpcy5yZW5kZXIoe1xuICAgICAgb25Db21wbGV0ZTogKCkgPT4ge1xuICAgICAgICBSZW5kZXJNYXN0ZXIuc2hvd0RvY3VtZW50KCk7XG4gICAgICAgIHRoaXMuYWZ0ZXJTaG93KCk7XG4gICAgICB9LFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIOa1geeoi+aOp+WItlxuICAgKiDmiafooYxiZWZvcmVSdW7pkqnlrZAs6Kem5Y+R5o6n5Yi25ZmocnVuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBSZW5kZXJNYXN0ZXJcbiAgICovXG4gIHJlbmRlcihvcHRpb25zID0ge30pIHtcbiAgICBjb25zdCBjYWxsSG9vayA9IGNhbGxJbnRlcmZhY2VIb29rLmJpbmQob3B0aW9ucyk7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuYmVmb3JlQ29udHJvbGxlcnNSdW4oKTtcbiAgICAgIHRoaXMudHJpZ2dlckNvbnRyb2xsZXJzUnVuKCk7XG4gICAgICBjYWxsSG9vayhTVUNDRVNTX0NCKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgTG9nVXRpbC5kZXZMb2coYHJlbmRlciBlcnJvcjoke2Vycm9yfWApO1xuICAgICAgY2FsbEhvb2soRVJST1JfQ0IpO1xuICAgIH1cbiAgICBjYWxsSG9vayhDT01QTEVURV9DQik7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUmVuZGVyTWFzdGVyO1xuIiwiaW1wb3J0IExvZ1V0aWwgZnJvbSAnLi9Mb2dVdGlsJztcbi8qKlxuKiDmiZPngrnkuIrmiqXnmoTmlrnms5UsXG4qIOi/meS4quaWueazleS9v+eUqOeahOWJjee9ruadoeS7tuaYryxoYWpzc2Rr5LiOcGF0aOWcqOWQjOS4gOWxgue6p1xuKiBAcGFyYW0geyp9IHBhdGgg6Lev5b6EXG4qIEB0b2RvIOS/ruaUueS4gOS4i+S+m+WPr+mFjee9rlxuKi9cbmV4cG9ydCBjb25zdCBzaGFyZVJlcG9ydCA9IChwYXRoKSA9PiB7XG4gIGNvbnN0IHNjcmlwdERvbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICBjb25zdCBoZWFkRG9tID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaGVhZCcpO1xuICBoZWFkRG9tLmFwcGVuZENoaWxkKHNjcmlwdERvbSk7XG4gIGxldCBzcmNVcmwgPSAnJztcbiAgaWYgKHBhdGgpIHtcbiAgICBpZiAocGF0aC5lbmRzV2l0aCgnLycpKSB7XG4gICAgICBzcmNVcmwgPSBgJHtwYXRofWhhanNzZGsuanNgO1xuICAgIH0gZWxzZSB7XG4gICAgICBzcmNVcmwgPSBgJHtwYXRofS9oYWpzc2RrLmpzYDtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgc3JjVXJsID0gJy4vaGFqc3Nkay5qcyc7XG4gIH1cbiAgc2NyaXB0RG9tLnNyYyA9IHNyY1VybDtcbiAgc2NyaXB0RG9tLm9ubG9hZCA9ICgpID0+IHtcbiAgICBpZiAod2luZG93Ll9oYXNkayAmJiB3aW5kb3cuX2hhc2RrLmJhc2VSZXBvcnQpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBcbiAgICAgIF9oYXNkay5iYXNlUmVwb3J0KCk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgXG4gICAgfVxuICB9O1xuICBzY3JpcHREb20ub25lcnJvciA9ICgpID0+IHtcbiAgICBMb2dVdGlsLmRldkxvZygnaGFzZGsgbm90IGZvdW5kJyk7XG4gIH07XG59O1xuLyoqXG4gKiDlj6zllKTpkqnlrZBcbiAqL1xuZXhwb3J0IGNvbnN0IGNhbGxJbnRlcmZhY2VIb29rID0gZnVuY3Rpb24gKHR5cGUpIHtcbiAgaWYgKHRoaXMgJiYgdGhpc1t0eXBlXSAmJiB0aGlzW3R5cGVdIGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcbiAgICBjb25zdCBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgICBMb2dVdGlsLmRldkxvZyh0eXBlKTtcbiAgICB0aGlzW3R5cGVdKC4uLmFyZ3MpO1xuICB9XG59O1xuXG4vKipcbiAqIFVSTOaehOmAoOWZqOWFvOWuuSzmm7Tmlrnkvr/lpITnkIZzZWFyY2jnmoTlj4LmlbDlj4rkuqfnlJ/mlrDnmoR1cmxcbiAqL1xuZXhwb3J0IGNsYXNzIFVSTFV0aWwge1xuICBjb25zdHJ1Y3Rvcih1cmwpIHtcbiAgICB0cnkge1xuICAgICAgdGhpcy51cmxPYmplY3QgPSBuZXcgVVJMKHVybCk7XG4gICAgICB0aGlzLnNlYXJjaFByYW1lcyA9IHRoaXMudXJsT2JqZWN0LnNlYXJjaFBhcmFtcztcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgLy8gSUUxMeS4jeWFvOWuuW5ldyBVUkzmnoTpgKDlh73mlbAs6Ieq5bex5YaZ55qE5LiA5Liq5YW85a6555qE5pa55rOVLOS8mOmbhemZjee6p1xuICAgICAgY29uc3Qgb3JpZ2luVXJsID0gdXJsLnNwbGl0KCc/JylbMF07XG4gICAgICBjb25zdCBoYXNoID0gdXJsLnNwbGl0KCcjJylbMV0gfHwgJyc7XG4gICAgICBjb25zdCBzZWFyY2hQYXJhbXMgPSB1cmwuc3BsaXQoJz8nKVsxXS5zcGxpdCgnJicpO1xuICAgICAgdGhpcy51cmxPYmplY3QgPSB7XG4gICAgICAgIHRvU3RyaW5nOiAoKSA9PiB7XG4gICAgICAgICAgaWYgKGhhc2gpIHtcbiAgICAgICAgICAgIHJldHVybiBgJHtvcmlnaW5Vcmx9PyR7c2VhcmNoUGFyYW1zLmpvaW4oJyYnKX0jJHtoYXNofWA7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBgJHtvcmlnaW5Vcmx9PyR7c2VhcmNoUGFyYW1zLmpvaW4oJyYnKX1gO1xuICAgICAgICB9LFxuICAgICAgfTtcbiAgICAgIHRoaXMuc2VhcmNoUHJhbWVzID0ge1xuICAgICAgICBhcHBlbmQ6IChrZXksIHZhbHVlKSA9PiB7XG4gICAgICAgICAgc2VhcmNoUGFyYW1zLnB1c2goYCR7a2V5fT0ke3ZhbHVlfWApO1xuICAgICAgICB9LFxuICAgICAgfTtcbiAgICB9XG4gIH1cblxuICBhZGRQYXJhbShrZXksIHZhbHVlKSB7XG4gICAgdGhpcy5zZWFyY2hQcmFtZXMuYXBwZW5kKGtleSwgdmFsdWUpO1xuICB9XG5cbiAgZ2V0VXJsKCkge1xuICAgIHJldHVybiB0aGlzLnVybE9iamVjdC50b1N0cmluZygpO1xuICB9XG59XG5leHBvcnQgY29uc3QgaGFzID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbiIsImltcG9ydCBDYWxsZXJGb3JOYXRpdmUgZnJvbSAnLi9DYWxsZXIvQ2FsbGVyRm9yTmF0aXZlJztcbmltcG9ydCBDYWxsZXJGb3JXZWIgZnJvbSAnLi9DYWxsZXIvQ2FsbGVyRm9yV2ViJztcbmltcG9ydCB7IENPREVfTkFUSVZFLCBDQU5fVVNFX01PQklMRX0gZnJvbSAnLi9DYWxsZXIvSW50ZXJmYWNlSnNvbic7XG5pbXBvcnQge1xuICBKU19JTlRFUkZBQ0VfUkVQT1JUX0VWRU5ULFxuICBKU19JTlRFUkZBQ0VfSU5JVElORk8sXG4gIEpTX0lOVEVSRkFDRV9DQU5DRUxQUkFJU0UsXG4gIEpTX0lOVEVSRkFDRV9DTElDS1BSQUlTRSxcbiAgSlNfSU5URVJGQUNFX0VYUFJJRU5DRSxcbiAgSlNfSU5URVJGQUNFX1JPQVNULFxuICBKU19VUERBVEVfTU9EQUxfU1RBVFVTLFxuICBTVUJNSVRfQ09NTUVOVCxcbiAgSlNfSU5URVJGQUNFX1VQREFURUNPTU1FTlRTRlJPTU5BVElWRSxcbiAgSlNfSU5URVJGQUNFX1RBR1RPR0dMRUQsXG4gIEpTX0lOVEVSRkFDRV9DQU5fSV9KVU1QLFxuICBVUERBVEVfU0NIRU1BLFxuICBKU19JTlRFUkZBQ0VfUkVGUkVTSFBSQUlTRSxcbiAgSlNfSU5URVJGQUNFX1JFU09VUkNFSU5GTyxcbn0gZnJvbSAnLi9JbnRlcmZhY2VQcm90b2NvbCc7XG5pbXBvcnQgQmFzZTY0IGZyb20gJy4vQmFzZTY0JztcblxuLyoqXG4qIOmAmui/h2NvbnNvbGUubG9n6LCD55SobmF0aXZl5o6l5Y+jXG4qXG4qIEBwYXJhbSB7Kn0gZXZlbnROYW1lXG4qIEBwYXJhbSB7Kn0gYXJnc1xuKiBAcmV0dXJuc1xuKi9cbmV4cG9ydCBjb25zdCBjYWxsTmFJbnRlcmZhY2UgPSAoZXZlbnROYW1lLCBhcmdzKSA9PiB7XG4gIGlmICghYXJncykge1xuICAgIGNvbnNvbGUubG9nKGAke2V2ZW50TmFtZX06YCk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmICh0eXBlb2YgYXJncyA9PT0gJ251bWJlcicgfHwgdHlwZW9mIGFyZ3MgPT09ICdzdHJpbmcnKSB7XG4gICAgY29uc29sZS5sb2coYCR7ZXZlbnROYW1lfToke2FyZ3N9YCk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGNvbnN0IHN0ciA9IEpTT04uc3RyaW5naWZ5KGFyZ3MpO1xuICBjb25zb2xlLmxvZyhgJHtldmVudE5hbWV9OiR7c3RyfWApO1xufTtcbmV4cG9ydCBjb25zdCBjYWxsTmFSZXBvcnRFdmVudCA9IChhcmdzKSA9PiB7XG4gIGNhbGxOYUludGVyZmFjZShKU19JTlRFUkZBQ0VfUkVQT1JUX0VWRU5ULCBhcmdzKTtcbn07XG5cbmNvbnN0IE5hdGl2ZVNkayA9ICgoKSA9PiB7XG4gIC8vIOm7mOiupOeahOmFjee9rumhuVxuICBsZXQgZGVmYXVsdE9wdGlvbnMgPSB7XG4gICAgbW9kdWVsOiAndGlwcycsXG4gIH07XG4gIGNvbnN0IHNkayA9IHtcbiAgICAvKipcbiAgICAgKiDphY3nva7lj4LmlbAo5pqC5pyq5L2/55SoKVxuICAgICAqIOS7peWQjueUqOadpeWBmmFwcGlkLGFwcGtleVxuICAgICAqIOi/mOacieWFtuS7luS7gOS5iOS7gOS5iOeahCznrYnlvoXmjJbmjphcbiAgICAgKi9cbiAgICBjb25maWc6IChvcHRpb25zKSA9PiB7XG4gICAgICBkZWZhdWx0T3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oZGVmYXVsdE9wdGlvbnMsIG9wdGlvbnMpO1xuICAgIH0sXG4gICAgLyoqXG4gICAgICog5byA5aeL5Yid5aeL5YyWXG4gICAgICog6LCD55SoaW5pdEluZm86XG4gICAgICovXG4gICAgc3RhcnRJbml0OiAoKSA9PiB7XG4gICAgICBjYWxsTmFJbnRlcmZhY2UoSlNfSU5URVJGQUNFX0lOSVRJTkZPKTtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIOeCuei1nlxuICAgICAqL1xuICAgIGNsaWNrUHJhaXNlOiAoZGF0YSkgPT4ge1xuICAgICAgY29uc3QgcGFyYW1zID0gZGF0YTtcbiAgICAgIHBhcmFtcy5zdGF0dXMgPSAxO1xuICAgICAgQ2FsbGVyRm9yV2ViLnRvZ2dsZVByYWlzZShwYXJhbXMsIHtcbiAgICAgICAgb25FcnJvcjogKCkgPT4ge1xuICAgICAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgICAgICBjYWxsTmFJbnRlcmZhY2UoSlNfSU5URVJGQUNFX0NMSUNLUFJBSVNFLCBkYXRhKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY2FsbE5hSW50ZXJmYWNlKEpTX0lOVEVSRkFDRV9DTElDS1BSQUlTRSk7XG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIOWPlua2iOeCuei1nlxuICAgICAqXG4gICAgICovXG4gICAgY2FuY2VsUHJhaXNlOiAoZGF0YSkgPT4ge1xuICAgICAgY29uc3QgcGFyYW1zID0gZGF0YTtcbiAgICAgIHBhcmFtcy5zdGF0dXMgPSAwO1xuICAgICAgQ2FsbGVyRm9yV2ViLnRvZ2dsZVByYWlzZShwYXJhbXMsIHtcbiAgICAgICAgb25FcnJvcjogKCkgPT4ge1xuICAgICAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgICAgICBjYWxsTmFJbnRlcmZhY2UoSlNfSU5URVJGQUNFX0NBTkNFTFBSQUlTRSwgZGF0YSk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNhbGxOYUludGVyZmFjZShKU19JTlRFUkZBQ0VfQ0FOQ0VMUFJBSVNFKTtcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgLyoqXG4gICAgICog5Yi35paw54K56LWeXG4gICAgICovXG4gICAgcmVmcmVzaFByYWlzZTogKG9wdGlvbnMpID0+IHtcbiAgICAgIGNvbnN0IHsgb25TdWNjZXNzLCBkYXRhIH0gPSBvcHRpb25zO1xuICAgICAgQ2FsbGVyRm9yV2ViLnJlZnJlc2hQcmFpc2UoZGF0YSwge1xuICAgICAgICBvblN1Y2Nlc3MsXG4gICAgICAgIG9uRXJyb3I6ICgpID0+IHtcbiAgICAgICAgICBDYWxsZXJGb3JOYXRpdmUucmVnaXN0ZXJGbihKU19JTlRFUkZBQ0VfUkVGUkVTSFBSQUlTRSwgb25TdWNjZXNzKTtcbiAgICAgICAgICBjYWxsTmFJbnRlcmZhY2UoSlNfSU5URVJGQUNFX1JFRlJFU0hQUkFJU0UsIGRhdGEpO1xuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiAo5pqC5pyq5L2/55SoKVxuICAgICAqIEBwYXJhbSDljIXlkKvnq4vljbPkvZPpqoznmoTkuIDkupvkv6Hmga9cbiAgICAgKiAxLuWNoeeJh+eri+WNs+S9k+mqjOebtOaOpeiwg+eUqGV4cOaOpeWPo1xuICAgICAqIDIuanVtcHRvYXBw6YKj56eN5bCx6LCD55SoYeagh+etvueCueWHu+ihjOS4ulxuICAgICAqIOW/hemhuyBwYWNrYWdlTmFtZTog5YyF5ZCNXG4gICAgICog5b+F6aG7IGFwcFZlcnNpb246IGFwcOeJiOacrFxuICAgICAqIOW/hemhuyBpZDogZnVuTnVtL3NlY3Rpb25JZCDmiZPngrnnlKhcbiAgICAgKiDlv4XpobsgcmVzb3VyY2VUeXBlOiBjYXJkL3VnL2Jhbm5lci9zdWJqZWN0XG4gICAgICog5b+F6aG7IGFwcFZlcnNpb246IGFwcOeJiOacrFxuICAgICAqIOWPr+mAiSBhY3Rpb246IHN0cmluZ1xuICAgICAqIOWPr+mAiSBjYXRlZ29yeTogc3RyaW5nXG4gICAgICog5Y+v6YCJIHR5cGU6IGFueVxuICAgICAqIOWPr+mAiSBkYXRhOiBhbnlcbiAgICAgKi9cbiAgICBleHBlcmllbmNlOiAoZGF0YSkgPT4ge1xuICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgbGV0IGV4cExpbmsgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdleHBMaW5rJyk7XG4gICAgICAgIGlmICghZXhwTGluaykge1xuICAgICAgICAgIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XG4gICAgICAgICAgZXhwTGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICAgICAgICBleHBMaW5rLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgZXhwTGluay5pZCA9ICdleHBMaW5rJztcbiAgICAgICAgICBib2R5LmFwcGVuZENoaWxkKGV4cExpbmspO1xuICAgICAgICB9XG4gICAgICAgIGV4cExpbmsuaHJlZiA9IGBqdW1wdG9hcHA6JHtlbmNvZGVVUklDb21wb25lbnQoZGF0YSl9YDtcbiAgICAgICAgZXhwTGluay5jbGljaygpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBjYWxsTmFJbnRlcmZhY2UoSlNfSU5URVJGQUNFX0VYUFJJRU5DRSk7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiDmiZPlvIDlkJDmp73lvLnmoYbnmoTml7blgJnpgJrnn6VuYXRpdmVcbiAgICAgKi9cbiAgICBvcGVuUm9hc3RBY3Rpb25TaGVldDogKGRhdGEpID0+IHtcbiAgICAgIENhbGxlckZvcldlYi5vcGVuUm9hc3RBY3Rpb25TaGVldChkYXRhLCB7XG4gICAgICAgIG9uRXJyb3I6ICgpID0+IHtcbiAgICAgICAgICBjYWxsTmFJbnRlcmZhY2UoSlNfSU5URVJGQUNFX1JPQVNULCBCYXNlNjQuZW5jb2RlKGRhdGEpKTtcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgLyoqXG4gICAgICog5pu05pawbmF0aXZl5bGC6Z2i55qE5by55qGG54q25oCBLOmYu+atouW3puWPs+a7keWPiuebkeWQrOi/lOWbnumcgOimgeeUqOWIsFxuICAgICAqIEBwYXJhbSBkYXRhIOS4gOS4qmpzb27lr7nosaFcbiAgICAgKiDljIXlkKvlrZfmrrVcbiAgICAgKiBhY3Rpb246b3Blbi9jbG9zZVxuICAgICAqIHR5cGU6YW55XG4gICAgICovXG4gICAgdXBkYXRlTW9kYWxTdGF0dXM6IChvcHRpb25zKSA9PiB7XG4gICAgICBjb25zdCB7IGNhbGxCYWNrLCBkYXRhIH0gPSBvcHRpb25zO1xuICAgICAgQ2FsbGVyRm9yV2ViLnVwZGF0ZU1vZGFsU3RhdHVzKGRhdGEsIHtcbiAgICAgICAgb25FcnJvcjogKCkgPT4ge1xuICAgICAgICAgIGlmIChjYWxsQmFjaykge1xuICAgICAgICAgICAgQ2FsbGVyRm9yTmF0aXZlLnJlZ2lzdGVyRm4oSlNfVVBEQVRFX01PREFMX1NUQVRVUywgY2FsbEJhY2spO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjYWxsTmFJbnRlcmZhY2UoSlNfVVBEQVRFX01PREFMX1NUQVRVUywgZGF0YSk7XG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIOWIt+aWsOWQkOanveWbnuiwg1xuICAgICAqL1xuICAgIG9uVXBkYXRlTW9kYWxTdGF0dXM6IChmbikgPT4ge1xuICAgICAgQ2FsbGVyRm9yTmF0aXZlLmFkZEtleUxpc3RlbmVyKENPREVfTkFUSVZFW0pTX1VQREFURV9NT0RBTF9TVEFUVVNdLCBmbik7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiDmj5DkuqTor4Torrov5ZCQ5qe955qE5YaF562SXG4gICAgICogQHBhcmFtIGRhdGEg5LiA5LiqanNvbuWvueixoVxuICAgICAqIOWMheWQq+Wtl+autVxuICAgICAqIGNvbnRlbnRUYWdzIOWGheWuueagh+etvlxuICAgICAqIGZ1bmN0aW9uVGFncyDlip/og73moIfnrb5cbiAgICAgKiBjb21tZW50VGltZSBuZXcgRGF0ZSgpLmdldFRpbWUoKVxuICAgICAqL1xuICAgIHN1Ym1pdENvbW1lbnQ6IChkYXRhKSA9PiB7XG4gICAgICBDYWxsZXJGb3JXZWIuc3VibWl0Q29tbWVudChkYXRhLCB7XG4gICAgICAgIG9uRXJyb3I6ICgpID0+IHtcbiAgICAgICAgICBjYWxsTmFJbnRlcmZhY2UoU1VCTUlUX0NPTU1FTlQsIEJhc2U2NC5lbmNvZGUoZGF0YSkpO1xuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiDpgJrnn6VuYXRpdmXosIPnlKjlkJDmp73liJ3lp4vljJbkuovku7Ys5bm25rOo5YaM5Zue6LCDXG4gICAgICog5omL5YaM6K+m5oOFLOS7heiwg+eUqOaWsOaOpeWPo1xuICAgICAqL1xuICAgIHVwZGF0ZUNvbW1lbnRzRnJvbU5hdGl2ZTogKG9wdGlvbnMpID0+IHtcbiAgICAgIGNvbnN0IHsgb25TdWNjZXNzLCBkYXRhLCBvbmx5VXNlTmV3SW50ZXJmYWNlIH0gPSBvcHRpb25zO1xuICAgICAgQ2FsbGVyRm9yV2ViLnVwZGF0ZUNvbW1lbnRzRnJvbU5hdGl2ZShkYXRhLCB7XG4gICAgICAgIG9uU3VjY2VzcyxcbiAgICAgICAgb25FcnJvcjogKCkgPT4ge1xuICAgICAgICAgIGlmIChvbmx5VXNlTmV3SW50ZXJmYWNlKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChvblN1Y2Nlc3MpIHtcbiAgICAgICAgICAgIENhbGxlckZvck5hdGl2ZS5yZWdpc3RlckZuKEpTX0lOVEVSRkFDRV9VUERBVEVDT01NRU5UU0ZST01OQVRJVkUsIG9uU3VjY2Vzcyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNhbGxOYUludGVyZmFjZShKU19JTlRFUkZBQ0VfVVBEQVRFQ09NTUVOVFNGUk9NTkFUSVZFLCBCYXNlNjQuZW5jb2RlKGRhdGEpKTtcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgLyoqXG4gICAgICog5qCH562+6YCJ5LitL+WPjemAieS6i+S7ti7pgJrnn6VuYXRpdmXmiZPngrlcbiAgICAgKi9cbiAgICB0YWdDaGFuZ2VkOiAoZGF0YSkgPT4ge1xuICAgICAgQ2FsbGVyRm9yV2ViLnRhZ1RvZ2dsZWQoZGF0YSwge1xuICAgICAgICBvbkVycm9yOiAoKSA9PiB7XG4gICAgICAgICAgY2FsbE5hSW50ZXJmYWNlKEpTX0lOVEVSRkFDRV9UQUdUT0dHTEVELCBCYXNlNjQuZW5jb2RlKGRhdGEpKTtcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgLyoqXG4gICAgICog5qCh6aqM5LiA6ZSu55u06L6+6ZO+5o6lXG4gICAgICogQHBhcmFtIG9wdGlvbnMg5Li66YWN572u6aG5XG4gICAgICog5YyF5ZCrIGxpbmtNYXAg6ZyA6KaB5qCh6aqM55qE6ZO+5o6lbWFwXG4gICAgICogY2FsbEJhY2ss5Li65qCh6aqM5ZCO55qE5Zue6LCDLOWPguaVsOS4uuWPr+i3s+i9rOeahOmTvuaOpeeahG1hcFxuICAgICAqIG9uVXBkYXRlLOS4uuezu+e7n2FwcOWNuOi9veaXtiznjqnmnLrosIPnlKjpmpDol4/pk77mjqXnmoTlip7ms5Us5Y+C5pWw5Li6YXBwTmFtZVxuICAgICAqL1xuICAgIHZhbGlkYXRlU2NoZW1hVXJsczogKG9wdGlvbnMpID0+IHtcbiAgICAgIGNvbnN0IHsgbGlua01hcCwgY2FsbEJhY2ssIG9uVXBkYXRlIH0gPSBvcHRpb25zO1xuICAgICAgaWYgKGxpbmtNYXApIHtcbiAgICAgICAgY2FsbE5hSW50ZXJmYWNlKEpTX0lOVEVSRkFDRV9DQU5fSV9KVU1QLCBKU09OLnN0cmluZ2lmeShsaW5rTWFwKSk7XG4gICAgICB9XG4gICAgICBpZiAoY2FsbEJhY2spIHtcbiAgICAgICAgQ2FsbGVyRm9yTmF0aXZlLnJlZ2lzdGVyRm4oSlNfSU5URVJGQUNFX0NBTl9JX0pVTVAsIGNhbGxCYWNrKTtcbiAgICAgIH1cbiAgICAgIGlmIChvblVwZGF0ZSkge1xuICAgICAgICBDYWxsZXJGb3JOYXRpdmUucmVnaXN0ZXJGbihVUERBVEVfU0NIRU1BLCBvblVwZGF0ZSk7XG4gICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIOe9kee7nOeKtuWGtSjmmK/lkKblkIzmhI/kvb/nlKjmlbDmja7mtYHph48p5pS55Y+Y5pe255qE5Zue6LCDIG5hdGl2ZeWPkei1t1xuICAgICAqIEBwYXJhbSBmbiDms6jlhoznmoTlm57liLDlh73mlbBcbiAgICAgKiBAcmV0dXJucyBib29sZWFuIOihqOekuuaYr+WQpuaYvuekuuenu+WKqOaVsOaNrua1gemHj+W8ueahhlxuICAgICAqL1xuICAgIG9uTmV0d29ya0NoYW5nZTogKGZuKSA9PiB7XG4gICAgICBDYWxsZXJGb3JOYXRpdmUuYWRkS2V5TGlzdGVuZXIoQ09ERV9OQVRJVkVbQ0FOX1VTRV9NT0JJTEVdLCBmbik7XG4gICAgfSxcbiAgICBnZXRSZXNvdXJjZTogKGZuKSA9PiB7XG4gICAgICBDYWxsZXJGb3JOYXRpdmUuYWRkS2V5TGlzdGVuZXIoQ09ERV9OQVRJVkVbSlNfSU5URVJGQUNFX1JFU09VUkNFSU5GT10sIGZuKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICog5Li75Yqo6I635Y+W5piv5ZCm5ZCM5oSP5L2/55So5pWw5o2u5rWB6YeP54q25oCBXG4gICAgICogQHJldHVybnMgYm9vbGVhbiDooajnpLrmmK/lkKbmmL7npLrnp7vliqjmlbDmja7mtYHph4/lvLnmoYZcbiAgICAgKi9cbiAgICBnZXRNb2JpbGVXYXJuU3RhdHVzOiBDYWxsZXJGb3JXZWIuZ2V0TW9iaWxlV2FyblN0YXR1cyxcbiAgICAvKipcbiAgICAgKiDkuLvliqjojrflj5bmj5DnpLrmloflrZdcbiAgICAgKiBAcmV0dXJucyBhcnJheSDnm67liY3ku4XljIXlkKsy5Liq5a2X56ym5LiyLOWvueavj+S4quWtl+S4sui/m+ihjOaNouihjOWkhOeQhlxuICAgICovXG4gICAgZ2V0TmV0d29ya1dhcm5UZXh0OiBDYWxsZXJGb3JXZWIuZ2V0TmV0d29ya1dhcm5UZXh0LFxuICAgIC8qKlxuICAgICAqIOmAmuefpW5hdGl2ZSznlKjmiLfkuLvliqjngrnlh7vkvb/nlKjmlbDmja7mtYHph49cbiAgICAqL1xuICAgIGFncmVlVXNlTW9iaWxlOiBDYWxsZXJGb3JXZWIuYWdyZWVVc2VNb2JpbGUsXG4gICAgLyoqXG4gICAgICog5ZGK6K+JbmF0aXZlLOmhtemdouaYr+WQpuacieinhumikVxuICAgICAqL1xuICAgIHBhZ2VIYXNNZWRpYTogQ2FsbGVyRm9yV2ViLnBhZ2VIYXNNZWRpYSxcbiAgICAvKipcbiAgICAgKiDpgJrov4dpZOiOt+WPluWvueW6lOeahElE5YC8KOaaguacquS9v+eUqClcbiAgICAgKi9cbiAgICBnZXREZWZzOiBDYWxsZXJGb3JXZWIuZ2V0RGVmcyxcbiAgfTtcbiAgcmV0dXJuIHNkaztcbn0pKCk7XG5leHBvcnQgZGVmYXVsdCBOYXRpdmVTZGs7XG4iLCJpbXBvcnQgTWFpbkNvbnRlbnRDb250cm9sbGVyIGZyb20gJy4uLy4uLy4uL3B1YmxpY19hc3NldHMvQ29udHJvbGxlcnMvTWFpbkNvbnRlbnRDb250cm9sbGVyJztcblxuY29uc3QgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcbmNvbnN0IG1haW5DdHJsID0gbmV3IE1haW5Db250ZW50Q29udHJvbGxlcih7XG4gIHRhcmdldDogYm9keSxcbiAgY05hbWU6ICdib2R5Jyxcbn0pO1xuZXhwb3J0IGRlZmF1bHQgbWFpbkN0cmw7XG4iLCJpbXBvcnQgUHJhaXNlQnV0dG9uQ29udHJvbGxlciBmcm9tICcuLi8uLi8uLi9wdWJsaWNfYXNzZXRzL0NvbnRyb2xsZXJzL1ByYWlzZUJ1dHRvbkNvbnRyb2xsZXInO1xuaW1wb3J0IHtcbiAgZ2V0RnVuTnVtLFxuICBnZXRSZXNvdXJjZVR5cGUsXG4gIGdldElkZW50aWZpZXIsXG59IGZyb20gJy4uLy4uLy4uL3B1YmxpY19hc3NldHMvRG9tVXRpbCc7XG5cbmNvbnN0IHByYWlzZUJ1dHRvbkN0cmwgPSBuZXcgUHJhaXNlQnV0dG9uQ29udHJvbGxlcih7XG4gIHRhcmdldDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3ByYWlzZScpLFxuICBjTmFtZTogJ3ByYWlzZUJ1dHRvbicsXG59KTtcblxuZnVuY3Rpb24gaW5pdE1ldGFzKCkge1xuICBjb25zdCBJZGVudGlmaWVyID0gZ2V0SWRlbnRpZmllcigpO1xuICBjb25zdCBmdW5OdW0gPSBnZXRGdW5OdW0oKTtcbiAgY29uc3QgcmVzb3VyY2VUeXBlID0gZ2V0UmVzb3VyY2VUeXBlKCk7XG4gIGlmIChJZGVudGlmaWVyKSB7XG4gICAgdGhpcy5tZXRhcy5JZGVudGlmaWVyID0gSWRlbnRpZmllcjtcbiAgfVxuICBpZiAoZnVuTnVtKSB7XG4gICAgdGhpcy5tZXRhcy5mdW5OdW0gPSBmdW5OdW07XG4gIH1cbiAgaWYgKHJlc291cmNlVHlwZSkge1xuICAgIHRoaXMubWV0YXMucmVzb3VyY2VUeXBlID0gcmVzb3VyY2VUeXBlO1xuICB9XG59XG5wcmFpc2VCdXR0b25DdHJsLmluaXRNZXRhcyA9IGluaXRNZXRhcztcbmV4cG9ydCBkZWZhdWx0IHByYWlzZUJ1dHRvbkN0cmw7XG4iLCJpbXBvcnQgUm9hc3RCdXR0b25Db250cm9sbGVyIGZyb20gJy4uLy4uLy4uL3B1YmxpY19hc3NldHMvQ29udHJvbGxlcnMvUm9hc3RCdXR0b25Db250cm9sbGVyJztcblxuY29uc3Qgcm9hc3RCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY29tbWVudC1idXR0b24nKTtcbmNvbnN0IHJvYXN0Q3RybCA9IG5ldyBSb2FzdEJ1dHRvbkNvbnRyb2xsZXIoe1xuICB0YXJnZXQ6IHJvYXN0QnV0dG9uLFxuICBjTmFtZTogJ3JvYXN0QnV0dG9uJyxcbiAgb25seVVzZU5ld0ludGVyZmFjZTogdHJ1ZSxcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCByb2FzdEN0cmw7XG4iLCJpbXBvcnQgQ29udHJvbGxlciBmcm9tICcuLi8uLi8uLi9wdWJsaWNfYXNzZXRzL0NvbnRyb2xsZXJzL0NvbnRyb2xsZXInO1xuaW1wb3J0IE5hdGl2ZVNkayBmcm9tICcuLi8uLi8uLi9wdWJsaWNfYXNzZXRzL25hanNzZGsnO1xuaW1wb3J0IHsgZG9tTGlzdFRvQXJyYXksIGdldEZ1bk51bSwgZ2V0UmVzb3VyY2VUeXBlIH0gZnJvbSAnLi4vLi4vLi4vcHVibGljX2Fzc2V0cy9Eb21VdGlsJztcblxuY29uc3QgdGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRpcHNleHBlcmllbmNlJyk7XG5jb25zdCBsaW5rTWFwID0ge307XG5jb25zdCBzY2hlbWFMaW5rQ3RybCA9IG5ldyBDb250cm9sbGVyKHtcbiAgY05hbWU6ICdzY2hlbWFMaW5rQ3RybCcsXG4gIHRhcmdldCxcbn0pO1xuZnVuY3Rpb24gdG9nZ2xlU2NoZW1hKHNob3cgPSBmYWxzZSkge1xuICBpZiAodGhpcykge1xuICAgIGNvbnN0IHsgcGFyZW50Tm9kZSB9ID0gdGhpcztcbiAgICBpZiAocGFyZW50Tm9kZSkge1xuICAgICAgaWYgKHNob3cpIHtcbiAgICAgICAgcGFyZW50Tm9kZS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgcGFyZW50Tm9kZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIH1cbiAgfVxufVxuZnVuY3Rpb24gZ2V0U2NoZW1hTGlua09wdGlvbihpdGVtKSB7XG4gIGxldCBocmVmUGFyYW0gPSBpdGVtLmdldEF0dHJpYnV0ZSgnaHJlZicpO1xuICBocmVmUGFyYW0gPSBocmVmUGFyYW0ucmVwbGFjZSgvJy9nLCAnXCInKS5yZXBsYWNlKC9cXC9cIi9nLCBcIidcIik7XG4gIGNvbnN0IGhyZWZKc29uID0gSlNPTi5wYXJzZShocmVmUGFyYW0pO1xuICBsZXQgdGVtcE9iaiA9IHtcbiAgICBwYWNrYWdlTmFtZTogaHJlZkpzb24uYXBwTmFtZSxcbiAgICBhcHBWZXJzaW9uOiBocmVmSnNvbi5hcHBWZXJzaW9uLFxuICB9O1xuICBsZXQgc3RyID0gaHJlZkpzb24uYXBwUGFyYW0gfHwgJyc7XG4gIHN0ciA9IHN0ci5yZXBsYWNlKC8nL2csICdcIicpIHx8ICd7fSc7XG4gIGNvbnN0IHBhcmFtID0gSlNPTi5wYXJzZShzdHIpO1xuICB0ZW1wT2JqID0gT2JqZWN0LmFzc2lnbih0ZW1wT2JqLCBwYXJhbSk7XG4gIHJldHVybiB0ZW1wT2JqO1xufVxuXG5mdW5jdGlvbiBjYWxsQmFjayhhcmdzKSB7XG4gIGxldCBwYXJhbXMgPSBhcmdzO1xuICBpZiAocGFyYW1zKSB7XG4gICAgcGFyYW1zID0gSlNPTi5wYXJzZShhcmdzKTtcbiAgICBpZiAocGFyYW1zICYmIHBhcmFtcy5tYXApIHtcbiAgICAgIHBhcmFtcy5tYXAoKGluZGV4KSA9PiB7XG4gICAgICAgIGNvbnN0IHRhcmdldFNjaGVtYSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYGFbZGF0YS1za2V5PVwiJHtpbmRleH1cIl1gKTtcbiAgICAgICAgdG9nZ2xlU2NoZW1hLmNhbGwodGFyZ2V0U2NoZW1hLCB0cnVlKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBvblVwZGF0ZShhcHBOYW1lKSB7XG4gIGNvbnN0IGFwcEtleSA9IGRlY29kZVVSSUNvbXBvbmVudChhcHBOYW1lKTtcbiAgY29uc3QgaGlkZVRhcmdldCA9IGRvbUxpc3RUb0FycmF5KGBbYXBwbmFtZT1cIiR7YXBwS2V5fVwiXWApO1xuICBoaWRlVGFyZ2V0Lm1hcCgoaXRlbSkgPT4ge1xuICAgIHRvZ2dsZVNjaGVtYS5jYWxsKGl0ZW0pO1xuICB9KTtcbn1cbi8qKlxuICog6K6+572udXJsLOWIneWni+WMlm1hcFxuICpcbiAqL1xuZnVuY3Rpb24gaW5pdFVybCgpIHtcbiAgY29uc3QgbGlzdCA9IGRvbUxpc3RUb0FycmF5KHRhcmdldCk7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkgKz0gMSkge1xuICAgIGNvbnN0IGl0ZW0gPSBsaXN0W2ldLnF1ZXJ5U2VsZWN0b3IoJy50aXBzbGluaycpO1xuICAgIGl0ZW0uc2V0QXR0cmlidXRlKCdkYXRhLXNrZXknLCBpKTtcbiAgICBjb25zdCBsaW5rID0gZ2V0U2NoZW1hTGlua09wdGlvbihpdGVtKTtcbiAgICBsaW5rTWFwW2ldID0gbGluaztcbiAgICBsaW5rLnJlc291cmNlVHlwZSA9IGdldFJlc291cmNlVHlwZSgpO1xuICAgIGlmIChsaXN0W2ldLnBhcmVudE5vZGUuY2xhc3NMaXN0LmNvbnRhaW5zKCdzZWN0aW9uJykpIHtcbiAgICAgIGxpbmsuaWQgPSBsaXN0W2ldLnBhcmVudE5vZGUucXVlcnlTZWxlY3RvcignLnNlY3Rpb250aXRsZScpLmdldEF0dHJpYnV0ZSgnaWQnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGluay5pZCA9IGdldEZ1bk51bSgpO1xuICAgIH1cbiAgICBpZiAoaXRlbSkge1xuICAgICAgaXRlbS5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBganVtcHRvYXBwOiR7ZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGxpbmspKX1gKTtcbiAgICAgIGl0ZW0uc2V0QXR0cmlidXRlKCdhcHBuYW1lJywgZW5jb2RlVVJJQ29tcG9uZW50KGxpbmsucGFja2FnZU5hbWUpKTtcbiAgICB9XG4gIH1cbn1cbnNjaGVtYUxpbmtDdHJsLmluaXRWaWV3ID0gaW5pdFVybDtcbnNjaGVtYUxpbmtDdHJsLmluaXRDYWxsYmFja0Zvck5hdGl2ZSA9ICgpID0+IHtcbiAgTmF0aXZlU2RrLnZhbGlkYXRlU2NoZW1hVXJscyh7XG4gICAgbGlua01hcCxcbiAgICBjYWxsQmFjayxcbiAgICBvblVwZGF0ZSxcbiAgfSk7XG59O1xuZXhwb3J0IGRlZmF1bHQgc2NoZW1hTGlua0N0cmw7XG4iLCJpbXBvcnQgV2ViTGlua0NvbnRyb2xsZXIgZnJvbSAnLi4vLi4vLi4vcHVibGljX2Fzc2V0cy9Db250cm9sbGVycy9XZWJMaW5rQ29udHJvbGxlcic7XG5pbXBvcnQgeyBkb21MaXN0VG9BcnJheSB9IGZyb20gJy4uLy4uLy4uL3B1YmxpY19hc3NldHMvRG9tVXRpbCc7XG5pbXBvcnQgeyBnZXRWYWx1ZSB9IGZyb20gJy4uLy4uLy4uL3B1YmxpY19hc3NldHMvUGFyYW0nO1xuXG5jb25zdCB0YXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdhW2hyZWYgXj0gXCJqdW1wdG9cIl0sYVtocmVmICQ9IFwiI29wZW5tYW51YWxkZXRhaWxcIl0nKTtcbmNvbnN0IHdlYkxpbmtDdHJsID0gbmV3IFdlYkxpbmtDb250cm9sbGVyKHtcbiAgdGFyZ2V0LFxuICBjTmFtZTogJ3dlYmxpbmsnLFxufSk7XG5mdW5jdGlvbiBpbml0VmlldygpIHtcbiAgY29uc3QgbGlua3MgPSBkb21MaXN0VG9BcnJheSh3ZWJMaW5rQ3RybC50YXJnZXQpO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGxpbmtzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgY29uc3QgaXRlbSA9IGxpbmtzW2ldO1xuICAgIGlmIChpdGVtKSB7XG4gICAgICBpZiAoZ2V0VmFsdWUoJ3N1cHBvcnRMaW5rJykgPT09ICdUUlVFJykge1xuICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoJ3N1cHBvcnRMaW5rJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpdGVtLnJlbW92ZUF0dHJpYnV0ZSgnaHJlZicpO1xuICAgICAgICBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ3N1cHBvcnRMaW5rJyk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG53ZWJMaW5rQ3RybC5pbml0VmlldyA9IGluaXRWaWV3O1xuZXhwb3J0IGRlZmF1bHQgd2ViTGlua0N0cmw7XG4iLCJpbXBvcnQgeyBOT1RfRVhJU1QsdGhlbWVPcHRpb25zIH0gZnJvbSAnLi4vLi4vcHVibGljX2Fzc2V0cy9Db25zdGFudHMnO1xuaW1wb3J0IFBhcmFtLCB7IG9uUGFnZVN0YXJ0ZWQgfSBmcm9tICcuLi8uLi9wdWJsaWNfYXNzZXRzL1BhcmFtJztcbmltcG9ydCB7IHNoYXJlUmVwb3J0IH0gZnJvbSAnLi4vLi4vcHVibGljX2Fzc2V0cy9VdGlsJztcbmltcG9ydCBOYXRpdmVDYWxsZXIgZnJvbSAnLi4vLi4vcHVibGljX2Fzc2V0cy9DYWxsZXIvQ2FsbGVyRm9yTmF0aXZlJztcbmltcG9ydCBSZW5kZXJNYXN0ZXIgZnJvbSAnLi4vLi4vcHVibGljX2Fzc2V0cy9SZW5kZXJNYXN0ZXInO1xuaW1wb3J0IG1haW5DdHJsIGZyb20gJy4vY3RybHMvbWFpbkN0cmwnO1xuaW1wb3J0IHByYWlzZUJ1dHRvbkN0cmwgZnJvbSAnLi9jdHJscy9wcmFpc2VCdXR0b25DdHJsJztcbmltcG9ydCB3ZWJMaW5rQ3RybCBmcm9tICcuL2N0cmxzL3dlYkxpbmtDdHJsJztcbmltcG9ydCBzY2hlbWFMaW5rQ3RybCBmcm9tICcuL2N0cmxzL3NjaGVtYUxpbmtDdHJsJztcbmltcG9ydCB7IG9uV2luZG93VG91Y2hDYW5jZWwsIGhhY2tSaW5nV2lkdGgsIHJlbW92ZU5hdGl2ZURhcmtTdHlsZSxnZXRGdW5BbmRSZXMgfSBmcm9tICcuLi8uLi9wdWJsaWNfYXNzZXRzL0RvbVV0aWwnO1xuaW1wb3J0IHJvYXN0Q3RybCBmcm9tICcuL2N0cmxzL3JvYXN0Q3RybCc7XG5pbXBvcnQge1xuICBKU19JTlRFUkZBQ0VfVklFV19NQU5VQUwsXG4gIEpTX0lOVEVSRkFDRV9WSUVXX01BTlVBTF9MSVNULFxuICBKU19JTlRFUkZBQ0VfUkVTT1VSQ0VJTkZPXG59IGZyb20gJy4uLy4uL3B1YmxpY19hc3NldHMvSW50ZXJmYWNlUHJvdG9jb2wnO1xuaW1wb3J0IHsgQ09ERV9OQVRJVkUgfSBmcm9tICcuLi8uLi9wdWJsaWNfYXNzZXRzL0NhbGxlci9JbnRlcmZhY2VKc29uJztcbmltcG9ydCBOYXRpdmVTZGsseyBjYWxsTmFJbnRlcmZhY2UgfSBmcm9tICcuLi8uLi9wdWJsaWNfYXNzZXRzL25hanNzZGsnO1xuXG5jb25zdCBNYXN0ZXIgPSBuZXcgUmVuZGVyTWFzdGVyKCdtYW51YWwnKTtcbk1hc3Rlci5hZGRDb250cm9sbGVyKG1haW5DdHJsKTtcbk1hc3Rlci5hZGRDb250cm9sbGVyKHByYWlzZUJ1dHRvbkN0cmwpO1xuTWFzdGVyLmFkZENvbnRyb2xsZXIoc2NoZW1hTGlua0N0cmwpO1xuTWFzdGVyLmFkZENvbnRyb2xsZXIod2ViTGlua0N0cmwpO1xuTWFzdGVyLmFkZENvbnRyb2xsZXIocm9hc3RDdHJsKTtcblxuTWFzdGVyLmFkZEJlZm9yZVJ1bkhvb2soKCkgPT4ge1xuICBpZiAoUGFyYW0uc2hvdWxkUmVwb3J0KCkpIHtcbiAgLy8g5YiG5Lqr5omT54K55L+h5oGvXG4gICAgbGV0IGhhU2RrUGF0aCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tzcmMkPVwiZ3VpZGVDb21tb24uanNcIl0nKTtcbiAgICBpZiAoaGFTZGtQYXRoKSB7XG4gICAgICBoYVNka1BhdGggPSBoYVNka1BhdGguc3JjLnJlcGxhY2UoJ2d1aWRlQ29tbW9uLmpzJywgJycpO1xuICAgICAgc2hhcmVSZXBvcnQoaGFTZGtQYXRoKTtcbiAgICB9XG4gIH1cbn0pO1xuXG5NYXN0ZXIuYWRkQmVmb3JlUnVuSG9vaygoKSA9PiB7XG4gIC8vIOaJk+eCueS6pOS6kuS/oeaBr1xuICBsZXQgZG9jVGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCd0aXRsZScpLmlubmVyVGV4dDtcbiAgZG9jVGl0bGUgPSBlbmNvZGVVUklDb21wb25lbnQoZG9jVGl0bGUpO1xuICBjb25zdCBwcmFpc2VCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJhaXNlJyk7XG4gIGlmICghcHJhaXNlQnV0dG9uKSB7XG4gICAgY2FsbE5hSW50ZXJmYWNlKEpTX0lOVEVSRkFDRV9WSUVXX01BTlVBTF9MSVNULCBkb2NUaXRsZSk7XG4gIH0gZWxzZSB7XG4gICAgY2FsbE5hSW50ZXJmYWNlKEpTX0lOVEVSRkFDRV9WSUVXX01BTlVBTCwgZG9jVGl0bGUpO1xuICB9XG59KTtcblxuTWFzdGVyLmFkZEJlZm9yZVJ1bkhvb2soKCkgPT4ge1xuICBOYXRpdmVTZGsuZ2V0UmVzb3VyY2UoZ2V0RnVuQW5kUmVzKTtcbiAgcmVtb3ZlTmF0aXZlRGFya1N0eWxlKCk7XG59KTtcbi8vIE1hc3Rlci5hZGRCZWZvcmVSdW5Ib29rKCgpID0+IHtcbi8vICAgLy8g5LiN55+l6YGT6L+Z5piv5bmy5Zib55qELi4uXG4vLyAgIGNvbnN0IHRoZW1lQ29sb3IgPSB3aW5kb3cuanNJbnRlcmZhY2Vcbi8vICAgICA/IHdpbmRvdy5qc0ludGVyZmFjZS5nZXRTa2luSGV4Q29sb3IoKVxuLy8gICAgIDogJyNmZmZmZmYnO1xuLy8gICBpZiAodGhlbWVDb2xvciA9PT0gJ2ZmZTA1YTZkJykge1xuLy8gICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdib2R5JylbMF0uY2xhc3NOYW1lID0gJ3BpbmsnO1xuLy8gICB9IGVsc2UgaWYgKHRoZW1lQ29sb3IgPT09ICdmZjllNzgzNycpIHtcbi8vICAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYm9keScpWzBdLmNsYXNzTmFtZSA9ICd3aGl0ZSc7XG4vLyAgIH0gZWxzZSBpZiAodGhlbWVDb2xvciA9PT0gJ2NjZGM3ODMyJykge1xuLy8gICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdib2R5JylbMF0uY2xhc3NOYW1lID0gJ3Rhc3RlJztcbi8vICAgfSBlbHNlIGlmICh0aGVtZUNvbG9yID09PSAnZmYyM2E3ZDknKSB7XG4vLyAgICAgLy8g6JOd6Imy5peg6ZyA57uZYm9keei1i+WAvFxuLy8gICB9XG4vLyAgIGlmICh3aW5kb3cuanNJbnRlcmZhY2UpIHtcbi8vICAgICB3aW5kb3cuanNJbnRlcmZhY2Uuc2V0T3duUGFnZSgpO1xuLy8gICB9XG4vLyB9KTtcbk1hc3Rlci5hZGRCZWZvcmVSdW5Ib29rKCgpID0+IHtcbiAgLy8gdG91Y2ggY2FuY2xl5pe2LOWPlua2iHByZXNz57G7XG4gIG9uV2luZG93VG91Y2hDYW5jZWwoKTtcbn0pO1xuXG5NYXN0ZXIuYWRkQmVmb3JlUnVuSG9vaygoKSA9PiB7XG4gIGxldCBzZWxldG9yID0gJyc7XG4gIC8vIOi/meS4quaYr+aJi+WGjHJpbmfpgILphY3nmoRcbiAgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdqZC1jb250ZW50MScpKSB7XG4gICAgLy8g6K+B5piO5piv5omL5YaM6aaW6aG1aW5kZXguaHRtbFxuICAgIHNlbGV0b3IgPSAnLmdkLWxpc3QgYSc7XG4gIH0gZWxzZSBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2pkLWNvbnRlbnQnKSkge1xuICAgIC8vIOivgeaYjuaYr+aJi+WGjOaQnOe0oumhtemdoueahG5vZGVfaHRtbOaIluiAheivpuaDhemhtVxuICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJhaXNlJykpIHtcbiAgICAgIC8vIOaJi+WGjOagt+W8j+eugOebtOS6hi4uXG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjamQtY29udGVudCcpLnN0eWxlLnBhZGRpbmcgPSAnMjRweCc7XG4gICAgICAvLyDor4HmmI7mmK/or6bmg4VcbiAgICAgIHNlbGV0b3IgPSAnYm9keSc7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIOivgeaYjuaYr+aJi+WGjOaQnOe0oumhtemdolxuICAgICAgLy8g5oOz5ZCQLi5cbiAgICAgIHNlbGV0b3IgPSAnLnVsY2hpbGRsaW5rIGEnO1xuICAgIH1cbiAgfVxuICBhZGRUaGVtZVR5cGUoKTtcblxuICBpZiAoc2VsZXRvcikge1xuICAgIGNvbnN0IHJpbmdXaWR0aCA9IFBhcmFtLmdldFJpbmdXaWR0aCgpO1xuICAgIGhhY2tSaW5nV2lkdGgocmluZ1dpZHRoLCBzZWxldG9yKTtcbiAgfVxufSk7XG5OYXRpdmVDYWxsZXIucmVnaXN0ZXJGbigncmV0dXJuTWVudScsICgpID0+IHtcbiAgLy8g5Lmf5LiN55+l6YGT5piv5bmy5Zib55qELOeci+WQjeWtl+aYr+i/lOWbnueahFxuICB3aW5kb3cuanNJbnRlcmZhY2UucmV0dXJuTWVudSgpO1xufSk7XG5OYXRpdmVDYWxsZXIucmVnaXN0ZXJGbignc2VhcmNoQ29udGVudCcsICgpID0+IHtcbiAgLy8g5LiN55+l6YGT5bmy5Zib55qELOeci+WQjeWtl+aYr+aQnOe0oueahFxuICB3aW5kb3cuanNJbnRlcmZhY2Uuc2VhcmNoQ29udGVudCgpO1xufSk7XG5OYXRpdmVDYWxsZXIuYWRkS2V5TGlzdGVuZXIoQ09ERV9OQVRJVkVbSlNfSU5URVJGQUNFX1JFU09VUkNFSU5GT10sIGdldEZ1bkFuZFJlcyk7XG4vLyBnb1BhcmVudCDkuI3nn6XpgZPmmK/lubLllaXnmoQs55yL6LW35p2l5piv6L+U5Zue55qEXG5mdW5jdGlvbiBnb1BhcmVudCgpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICBjb25zdCBiYWNrSHJlZiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdiYWNrTGluaycpO1xuICBpZiAoYmFja0hyZWYpIHtcbiAgICBpZiAoYmFja0hyZWYuZ2V0QXR0cmlidXRlKCdocmVmJykuaW5kZXhPZigncmV0dXJuTWVudScpID49IDApIHtcbiAgICAgIHJldHVybk1lbnUoKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZlxuICAgIH0gZWxzZSB7XG4gICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGJhY2tIcmVmLmdldEF0dHJpYnV0ZSgnaHJlZicpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB3aW5kb3cuaGlzdG9yeS5nbygtMSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gYWRkVGhlbWVUeXBlKCl7XG4gIGxldCB0aGVtZVR5cGUgPSBQYXJhbS5nZXRUaGVtZVR5cGUoKTtcbiAgbGV0IGNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2pkLWNvbnRlbnRcIik7XG4gIGlmKHRoZW1lVHlwZSAhPT0gTk9UX0VYSVNUKXtcbiAgICBjb250ZW50LmNsYXNzTGlzdC5hZGQodGhlbWVPcHRpb25zW3RoZW1lVHlwZV0uY2xhc3NOYW1lKTtcbiAgfVxufVxuXG5vblBhZ2VTdGFydGVkKCgpID0+IHtcbiAgTWFzdGVyLnJ1bigpO1xufSk7XG4iXX0=

/* eslint-disable import/no-commonjs */
/* eslint-disable no-shadow */
'use strict';

const { netUpload } = require("./wx-net_error");

Object.defineProperty(exports, '__esModule', { value: true });

var __assign = function () {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}

// var SDK_NAME = '';
// var SDK_VERSION = '';
// var SERVER_URL = 'localhost:3009';

var ERRORTYPES;
(function (ERRORTYPES) {
    ERRORTYPES["UNKNOWN"] = "UNKNOWN";
    ERRORTYPES["UNKNOWN_FUNCTION"] = "UNKNOWN_FUNCTION";
    ERRORTYPES["JAVASCRIPT_ERROR"] = "JAVASCRIPT_ERROR";
    ERRORTYPES["LOG_ERROR"] = "LOG_ERROR";
    ERRORTYPES["REACT_ERROR"] = "REACT_ERROR";
    ERRORTYPES["RESOURCE_ERROR"] = "RESOURCE_ERROR";
    ERRORTYPES["PROMISE_ERROR"] = "PROMISE_ERROR";
    ERRORTYPES["ROUTE_ERROR"] = "ROUTE_ERROR";
})(ERRORTYPES || (ERRORTYPES = {}));
var WxAppEvents;
(function (WxAppEvents) {
    WxAppEvents["AppOnLaunch"] = "AppOnLaunch";
    WxAppEvents["AppOnShow"] = "AppOnShow";
    WxAppEvents["AppOnHide"] = "AppOnHide";
    WxAppEvents["AppOnError"] = "AppOnError";
    WxAppEvents["AppOnPageNotFound"] = "AppOnPageNotFound";
    WxAppEvents["AppOnUnhandledRejection"] = "AppOnUnhandledRejection";
})(WxAppEvents || (WxAppEvents = {}));
var WxPageEvents;
(function (WxPageEvents) {
    WxPageEvents["PageOnShow"] = "PageOnShow";
    WxPageEvents["PageOnHide"] = "PageOnHide";
    // WxPageEvents["PageOnShareAppMessage"] = "PageOnShareAppMessage";
    WxPageEvents["PageOnShareTimeline"] = "PageOnShareTimeline";
    WxPageEvents["PageOnTabItemTap"] = "PageOnTabItemTap";
})(WxPageEvents || (WxPageEvents = {}));
var WxRouteEvents;
(function (WxRouteEvents) {
    WxRouteEvents["SwitchTab"] = "switchTab";
    WxRouteEvents["ReLaunch"] = "reLaunch";
    WxRouteEvents["RedirectTo"] = "redirectTo";
    WxRouteEvents["NavigateTo"] = "navigateTo";
    WxRouteEvents["NavigateBack"] = "navigateBack";
    WxRouteEvents["RouteFail"] = "routeFail";
})(WxRouteEvents || (WxRouteEvents = {}));
__assign(__assign(__assign({}, WxAppEvents), WxPageEvents), ERRORTYPES);
var BREADCRUMBTYPES;
(function (BREADCRUMBTYPES) {
    BREADCRUMBTYPES["ROUTE"] = "Route";
    BREADCRUMBTYPES["CLICK"] = "UI.Click";
    BREADCRUMBTYPES["CONSOLE"] = "Console";
    BREADCRUMBTYPES["UNHANDLEDREJECTION"] = "Unhandledrejection";
    BREADCRUMBTYPES["REACT"] = "React";
    BREADCRUMBTYPES["RESOURCE"] = "Resource";
    BREADCRUMBTYPES["CODE_ERROR"] = "Code Error";
    BREADCRUMBTYPES["CUSTOMER"] = "Customer";
    BREADCRUMBTYPES["APP_ON_SHOW"] = "App On Show";
    BREADCRUMBTYPES["APP_ON_LAUNCH"] = "App On Launch";
    BREADCRUMBTYPES["APP_ON_HIDE"] = "App On Hide";
    BREADCRUMBTYPES["PAGE_ON_SHOW"] = "Page On Show";
    BREADCRUMBTYPES["PAGE_ON_HIDE"] = "Page On Hide";
    BREADCRUMBTYPES["PAGE_ON_SHARE_APP_MESSAGE"] = "Page On Share App Message";
    BREADCRUMBTYPES["PAGE_ON_SHARE_TIMELINE"] = "Page On Share Timeline";
    BREADCRUMBTYPES["PAGE_ON_TAB_ITEM_TAP"] = "Page On Tab Item Tap";
    BREADCRUMBTYPES["TAP"] = "UI.Tap";
    BREADCRUMBTYPES["TOUCHMOVE"] = "UI.Touchmove";
})(BREADCRUMBTYPES || (BREADCRUMBTYPES = {}));
var BREADCRUMBCATEGORYS;
(function (BREADCRUMBCATEGORYS) {
    BREADCRUMBCATEGORYS["USER"] = "user";
    BREADCRUMBCATEGORYS["DEBUG"] = "debug";
    BREADCRUMBCATEGORYS["EXCEPTION"] = "exception";
    BREADCRUMBCATEGORYS["LIFECYCLE"] = "lifecycle";
})(BREADCRUMBCATEGORYS || (BREADCRUMBCATEGORYS = {}));
var EVENTTYPES;
(function (EVENTTYPES) {
    EVENTTYPES["CONSOLE"] = "console";
    EVENTTYPES["DOM"] = "dom";
    EVENTTYPES["HISTORY"] = "history";
    EVENTTYPES["ERROR"] = "error";
    EVENTTYPES["HASHCHANGE"] = "hashchange";
    EVENTTYPES["UNHANDLEDREJECTION"] = "unhandledrejection";
    EVENTTYPES["MITO"] = "mito";
    EVENTTYPES["MINI_ROUTE"] = "miniRoute";
})(EVENTTYPES || (EVENTTYPES = {}));

var globalVar = {
    isLogAddBreadcrumb: true,
    crossOriginThreshold: 1000
};

var nativeToString = Object.prototype.toString;
function isType(type) {
    return function (value) {
        return nativeToString.call(value) === "[object " + type + "]";
    };
}
var variableTypeDetection = {
    isNumber: isType('Number'),
    isString: isType('String'),
    isBoolean: isType('Boolean'),
    isNull: isType('Null'),
    isUndefined: isType('Undefined'),
    isSymbol: isType('Symbol'),
    isFunction: isType('Function'),
    isObject: isType('Object'),
    isArray: isType('Array'),
    isProcess: isType('process'),
    isWindow: isType('Window')
};
function isError(wat) {
    switch (nativeToString.call(wat)) {
        case '[object Error]':
            return true;
        case '[object Exception]':
            return true;
        case '[object DOMException]':
            return true;
        default:
            return isInstanceOf(wat, Error);
    }
}

function isInstanceOf(wat, base) {
    try {
        return wat instanceof base;
    }
    catch (_e) {
        return false;
    }
}

var isNodeEnv = variableTypeDetection.isProcess(typeof process !== 'undefined' ? process : 0);
var isWxMiniEnv = variableTypeDetection.isObject(typeof wx !== 'undefined' ? wx : 0) &&
    variableTypeDetection.isFunction(typeof App !== 'undefined' ? App : 0);
var isBrowserEnv = variableTypeDetection.isWindow(typeof window !== 'undefined' ? window : 0);
function getGlobal() {
    if (isBrowserEnv)
        return window;
    if (isWxMiniEnv)
        return wx;
    if (isNodeEnv)
        return process;
}
var _global = getGlobal();
var _support = getGlobalMitoSupport();
_support.replaceFlag = _support.replaceFlag || {};
var replaceFlag = _support.replaceFlag;

function setFlag(replaceType, isSet) {
    if (replaceFlag[replaceType])
        return;
    replaceFlag[replaceType] = isSet;
}

function getFlag(replaceType) {
    return replaceFlag[replaceType] ? true : false;
}
function getGlobalMitoSupport() {
    _global.__MITO__ = _global.__MITO__ || {};
    return _global.__MITO__;
}

var PREFIX = 'Logger';
var Logger = (function () {
    function Logger() {
        var _this = this;
        this.enabled = false;
        this._console = {};
        _global.console = console || _global.console;
        if (console || _global.console) {
            var logType = [
                'log',
                'debug',
                'info',
                'warn',
                'error',
                'assert'
            ];
            logType.forEach(function (level) {
                if (!(level in _global.console))
                    return;
                _this._console[level] = _global.console[level];
            });
        }
    }
    Logger.prototype.bindOptions = function (debug) {
        this.enabled = debug ? true : false;
    };
    Logger.prototype.log = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (!this.enabled) {
            return;
        }
        (_a = this._console).log.apply(_a, __spreadArrays([PREFIX + "[Log]:"], args));
    };
    Logger.prototype.warn = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (!this.enabled) {
            return;
        }
        (_a = this._console).warn.apply(_a, __spreadArrays([PREFIX + "[Warn]:"], args));
    };
    Logger.prototype.error = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (!this.enabled) {
            return;
        }
        (_a = this._console).error.apply(_a, __spreadArrays([PREFIX + "[Error]:"], args));
    };
    return Logger;
}());
var logger = _support.logger || (_support.logger = new Logger());

function getLocationHref() {
    if (typeof document === 'undefined' || document.location == null)
        return '';
    return document.location.href;
}
function replaceOld(source, name, replacement, isForced) {
    if (isForced === void 0) { isForced = false; }
    if (name in source || isForced) {
        var original = source[name];
        var wrapped = replacement(original);
        if (typeof wrapped === 'function') {
            source[name] = wrapped;
        }
    }
}
var defaultFunctionName = '<anonymous>';
function getFunctionName(fn) {
    if (!fn || typeof fn !== 'function') {
        return defaultFunctionName;
    }
    return fn.name || defaultFunctionName;
}
var throttle = function (fn, delay) {
    var canRun = true;
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (!canRun)
            return;
        fn.apply(this, args);
        canRun = false;
        setTimeout(function () {
            canRun = true;
        }, delay);
    };
};
function getTimestamp() {
    return Date.now();
}
function typeofAny(target, type) {
    return typeof target === type;
}

function validateOption(target, targetName, expectType) {
    if (typeofAny(target, expectType))
        return true;
    typeof target !== 'undefined' && logger.error(targetName + "\u671F\u671B\u4F20\u5165" + expectType + "\u7C7B\u578B\uFF0C\u76EE\u524D\u662F" + typeof target + "\u7C7B\u578B");
    return false;
}

function slientConsoleScope(callback) {
    globalVar.isLogAddBreadcrumb = false;
    callback();
    globalVar.isLogAddBreadcrumb = true;
}

function unknownToString(target) {
    if (variableTypeDetection.isString(target)) {
        return target;
    }
    if (variableTypeDetection.isUndefined(target)) {
        return 'undefined';
    }
    return JSON.stringify(target);
}

function setUrlQuery(url, query) {
    var queryArr = [];
    Object.keys(query).forEach(function (k) {
        queryArr.push(k + "=" + query[k]);
    });
    if (url.indexOf('?') !== -1) {
        url = url + "&" + queryArr.join('&');
    }
    else {
        url = url + "?" + queryArr.join('&');
    }
    return url;
}
function getCurrentRoute() {
    if (!variableTypeDetection.isFunction(getCurrentPages)) {
        return '';
    }
    var pages = getCurrentPages();
    if (!pages.length) {
        return 'App';
    }
    var currentPage = pages.pop();
    return setUrlQuery(currentPage.route, currentPage.options);
}
function parseErrorString(str) {
    var splitLine = str.split('\n');
    if (splitLine.length < 2)
        return null;
    if (splitLine[0].indexOf('MiniProgramError') !== -1) {
        splitLine.splice(0, 1);
    }
    var message = splitLine.splice(0, 1)[0];
    var name = splitLine.splice(0, 1)[0].split(':')[0];
    var stacks = [];
    splitLine.forEach(function (errorLine) {
        var regexpGetFun = /at\s+([\S]+)\s+\(/;
        var regexGetFile = /\(([^)]+)\)/;
        var regexGetFileNoParenthese = /\s+at\s+(\S+)/;
        var funcExec = regexpGetFun.exec(errorLine);
        var fileURLExec = regexGetFile.exec(errorLine);
        if (!fileURLExec) {
            fileURLExec = regexGetFileNoParenthese.exec(errorLine);
        }
        var funcNameMatch = Array.isArray(funcExec) && funcExec.length > 0 ? funcExec[1].trim() : '';
        var fileURLMatch = Array.isArray(fileURLExec) && fileURLExec.length > 0 ? fileURLExec[1] : '';
        var lineInfo = fileURLMatch.split(':');
        stacks.push({
            args: [],
            func: funcNameMatch || ERRORTYPES.UNKNOWN_FUNCTION,
            column: Number(lineInfo.pop()),
            line: Number(lineInfo.pop()),
            url: lineInfo.join(':')
        });
    });
    return {
        message: message,
        name: name,
        stacks: stacks
    };
}

function setSilentFlag(opitons) {
    if (opitons === void 0) { opitons = {}; }
    setFlag(EVENTTYPES.CONSOLE, !!opitons.silentConsole);
    setFlag(EVENTTYPES.DOM, !!opitons.silentDom);
    setFlag(EVENTTYPES.HISTORY, !!opitons.silentHistory);
    setFlag(EVENTTYPES.ERROR, !!opitons.silentError);
    setFlag(EVENTTYPES.HASHCHANGE, !!opitons.silentHashchange);
    setFlag(EVENTTYPES.UNHANDLEDREJECTION, !!opitons.silentUnhandledrejection);
    setFlag(WxAppEvents.AppOnError, !!opitons.silentWxOnError);
    setFlag(WxAppEvents.AppOnUnhandledRejection, !!opitons.silentUnhandledrejection);
    setFlag(WxAppEvents.AppOnPageNotFound, !!opitons.silentWxOnPageNotFound);
    // setFlag(WxPageEvents.PageOnShareAppMessage, !!opitons.silentWxOnShareAppMessage);
    setFlag(EVENTTYPES.MINI_ROUTE, !!opitons.silentMiniRoute);
}
function extractErrorStack(ex, level) {
    var normal = {
        time: getTimestamp(),
        url: getLocationHref(),
        name: ex.name,
        level: level,
        message: ex.message
    };
    if (typeof ex.stack === 'undefined' || !ex.stack) {
        return normal;
    }
    var chrome = /^\s*at (.*?) ?\(((?:file|https?|blob|chrome-extension|native|eval|webpack|<anonymous>|[a-z]:|\/).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i, gecko = /^\s*(.*?)(?:\((.*?)\))?(?:^|@)((?:file|https?|blob|chrome|webpack|resource|\[native).*?|[^@]*bundle)(?::(\d+))?(?::(\d+))?\s*$/i, winjs = /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx|https?|webpack|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i, geckoEval = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i, chromeEval = /\((\S*)(?::(\d+))(?::(\d+))\)/, lines = ex.stack.split('\n'), stack = [];
    var submatch, parts, element;
    for (var i = 0, j = lines.length; i < j; ++i) {
        if ((parts = chrome.exec(lines[i]))) {
            var isNative = parts[2] && parts[2].indexOf('native') === 0;
            var isEval = parts[2] && parts[2].indexOf('eval') === 0;
            if (isEval && (submatch = chromeEval.exec(parts[2]))) {
                parts[2] = submatch[1];
                parts[3] = submatch[2];
                parts[4] = submatch[3];
            }
            element = {
                url: !isNative ? parts[2] : null,
                func: parts[1] || ERRORTYPES.UNKNOWN_FUNCTION,
                args: isNative ? [parts[2]] : [],
                line: parts[3] ? +parts[3] : null,
                column: parts[4] ? +parts[4] : null
            };
        }
        else if ((parts = winjs.exec(lines[i]))) {
            element = {
                url: parts[2],
                func: parts[1] || ERRORTYPES.UNKNOWN_FUNCTION,
                args: [],
                line: +parts[3],
                column: parts[4] ? +parts[4] : null
            };
        }
        else if ((parts = gecko.exec(lines[i]))) {
            var isEval = parts[3] && parts[3].indexOf(' > eval') > -1;
            if (isEval && (submatch = geckoEval.exec(parts[3]))) {
                parts[3] = submatch[1];
                parts[4] = submatch[2];
                parts[5] = null;
            }
            else if (i === 0 && !parts[5] && typeof ex.columnNumber !== 'undefined') {
                stack[0].column = ex.columnNumber + 1;
            }
            element = {
                url: parts[3],
                func: parts[1] || ERRORTYPES.UNKNOWN_FUNCTION,
                args: parts[2] ? parts[2].split(',') : [],
                line: parts[4] ? +parts[4] : null,
                column: parts[5] ? +parts[5] : null
            };
        }
        else {
            continue;
        }
        if (!element.func && element.line) {
            element.func = ERRORTYPES.UNKNOWN_FUNCTION;
        }
        stack.push(element);
    }
    if (!stack.length) {
        return null;
    }
    return __assign(__assign({}, normal), { stack: stack });
}

function nativeTryCatch(fn, errorFn) {
    try {
        fn();
    }
    catch (err) {
        console.log('err', err);
        if (errorFn) {
            errorFn(err);
        }
    }
}

var Severity;
(function (Severity) {
    Severity["Else"] = "else";
    Severity["Error"] = "error";
    Severity["Warning"] = "warning";
    Severity["Info"] = "info";
    Severity["Debug"] = "debug";
    Severity["Low"] = "low";
    Severity["Normal"] = "normal";
    Severity["High"] = "high";
    Severity["Critical"] = "critical";
})(Severity || (Severity = {}));
(function (Severity) {
    function fromString(level) {
        switch (level) {
            case 'debug':
                return Severity.Debug;
            case 'info':
            case 'log':
            case 'assert':
                return Severity.Info;
            case 'warn':
            case 'warning':
                return Severity.Warning;
            case Severity.Low:
            case Severity.Normal:
            case Severity.High:
            case Severity.Critical:
            case 'error':
                return Severity.Error;
            default:
                return Severity.Else;
        }
    }
    Severity.fromString = fromString;
})(Severity || (Severity = {}));

var SpanStatus;
(function (SpanStatus) {
    SpanStatus["Ok"] = "ok";
    SpanStatus["DeadlineExceeded"] = "deadline_exceeded";
    SpanStatus["Unauthenticated"] = "unauthenticated";
    SpanStatus["PermissionDenied"] = "permission_denied";
    SpanStatus["NotFound"] = "not_found";
    SpanStatus["ResourceExhausted"] = "resource_exhausted";
    SpanStatus["InvalidArgument"] = "invalid_argument";
    SpanStatus["Unimplemented"] = "unimplemented";
    SpanStatus["Unavailable"] = "unavailable";
    SpanStatus["InternalError"] = "internal_error";
    SpanStatus["UnknownError"] = "unknown_error";
    SpanStatus["Cancelled"] = "cancelled";
    SpanStatus["AlreadyExists"] = "already_exists";
    SpanStatus["FailedPrecondition"] = "failed_precondition";
    SpanStatus["Aborted"] = "aborted";
    SpanStatus["OutOfRange"] = "out_of_range";
    SpanStatus["DataLoss"] = "data_loss";
})(SpanStatus || (SpanStatus = {}));

var Breadcrumb = (function () {
    function Breadcrumb() {
        this.maxBreadcrumbs = 10;
        this.beforePushBreadcrumb = null;
        this.stack = [];
    }
    Breadcrumb.prototype.push = function (data) {
        var _this = this;
        if (typeof this.beforePushBreadcrumb === 'function') {
            var result_1 = null;
            var beforePushBreadcrumb_1 = this.beforePushBreadcrumb;
            slientConsoleScope(function () {
                result_1 = beforePushBreadcrumb_1(_this, data);
            });
            if (!result_1)
                return;
            this.immediatePush(result_1);
            return;
        }
        this.immediatePush(data);
    };
    Breadcrumb.prototype.immediatePush = function (data) {
        data.time = getTimestamp();
        const pages = getCurrentPages();
        const currentPage = pages[pages.length - 1]?.route;
        data.page = currentPage;
        if (this.stack.length >= this.maxBreadcrumbs) {
            this.shift();
        }
        this.stack.push(data);
        if (data.level === 'error') { // yyt
            netUpload(this.stack, data);
        }
        logger.log(this.stack);
    };
    Breadcrumb.prototype.shift = function () {
        return this.stack.shift() !== undefined;
    };
    Breadcrumb.prototype.clear = function () {
        this.stack = [];
    };
    Breadcrumb.prototype.getStack = function () {
        return this.stack;
    };
    Breadcrumb.prototype.getCategory = function (type) {
        switch (type) {
            case BREADCRUMBTYPES.CLICK:
            case BREADCRUMBTYPES.ROUTE:
            case BREADCRUMBTYPES.TAP:
            case BREADCRUMBTYPES.TOUCHMOVE:
                return BREADCRUMBCATEGORYS.USER;
            case BREADCRUMBTYPES.CUSTOMER:
            case BREADCRUMBTYPES.CONSOLE:
                return BREADCRUMBCATEGORYS.DEBUG;
            case BREADCRUMBTYPES.APP_ON_LAUNCH:
            case BREADCRUMBTYPES.APP_ON_SHOW:
            case BREADCRUMBTYPES.APP_ON_HIDE:
            case BREADCRUMBTYPES.PAGE_ON_SHOW:
            case BREADCRUMBTYPES.PAGE_ON_HIDE:
            case BREADCRUMBTYPES.PAGE_ON_SHARE_APP_MESSAGE:
            case BREADCRUMBTYPES.PAGE_ON_SHARE_TIMELINE:
            case BREADCRUMBTYPES.PAGE_ON_TAB_ITEM_TAP:
                return BREADCRUMBCATEGORYS.LIFECYCLE;
            case BREADCRUMBTYPES.UNHANDLEDREJECTION:
            case BREADCRUMBTYPES.CODE_ERROR:
            case BREADCRUMBTYPES.RESOURCE:
            case BREADCRUMBTYPES.REACT:
            default:
                return BREADCRUMBCATEGORYS.EXCEPTION;
        }
    };
    Breadcrumb.prototype.bindOptions = function (options) {
        if (options === void 0) { options = {}; }
        var maxBreadcrumbs = options.maxBreadcrumbs, beforePushBreadcrumb = options.beforePushBreadcrumb;
        validateOption(maxBreadcrumbs, 'maxBreadcrumbs', 'number') && (this.maxBreadcrumbs = maxBreadcrumbs);
        validateOption(beforePushBreadcrumb, 'beforePushBreadcrumb', 'function') && (this.beforePushBreadcrumb = beforePushBreadcrumb);
    };
    return Breadcrumb;
}());


var breadcrumb = _support.breadcrumb || (_support.breadcrumb = new Breadcrumb());


function log(_a) {
    var _b = _a.message, message = _b === void 0 ? 'emptyMsg' : _b, _c = _a.tag, tag = _c === void 0 ? '' : _c, _d = _a.level, level = _d === void 0 ? Severity.Critical : _d, _e = _a.ex, ex = _e === void 0 ? '' : _e;
    var errorInfo = {};
    if (isError(ex)) {
        errorInfo = extractErrorStack(ex, level);
    }
    var error = __assign({ type: ERRORTYPES.LOG_ERROR, level: level, message: unknownToString(message), name: 'MITO.log', customTag: unknownToString(tag), time: getTimestamp(), url: isWxMiniEnv ? getCurrentRoute() : getLocationHref() }, errorInfo);
    breadcrumb.push({
        type: BREADCRUMBTYPES.CUSTOMER,
        category: breadcrumb.getCategory(BREADCRUMBTYPES.CUSTOMER),
        data: message,
        level: Severity.fromString(level.toString())
    });
    console.log(error);
}


function handleConsole(data) {
    if (globalVar.isLogAddBreadcrumb) {
        breadcrumb.push({
            type: BREADCRUMBTYPES.CONSOLE,
            category: breadcrumb.getCategory(BREADCRUMBTYPES.CONSOLE),
            data: data,
            level: Severity.fromString(data.level)
        });
    }
}


function initOptions(paramOptions) {
    if (paramOptions === void 0) { paramOptions = {}; }
    setSilentFlag(paramOptions);
    breadcrumb.bindOptions(paramOptions);
    logger.bindOptions(paramOptions.debug);
}

var handlers = {};
function subscribeEvent(handler) {
    if (!handler || getFlag(handler.type))
        return false;
    setFlag(handler.type, true);
    handlers[handler.type] = handlers[handler.type] || [];
    handlers[handler.type].push(handler.callback);
    return true;
}
function triggerHandlers(type, data) {
    if (!type || !handlers[type])
        return;
    handlers[type].forEach(function (callback) {
        nativeTryCatch(function () {
            callback(data);
        }, function (e) {
            logger.error("\u91CD\u5199\u4E8B\u4EF6triggerHandlers\u7684\u56DE\u8C03\u51FD\u6570\u53D1\u751F\u9519\u8BEF\nType:" + type + "\nName: " + getFunctionName(callback) + "\nError: " + e);
        });
    });
}

function getNavigateBackTargetUrl(delta) {
    if (!variableTypeDetection.isFunction(getCurrentPages)) {
        return '';
    }
    var pages = getCurrentPages();
    if (!pages.length) {
        return 'App';
    }
    delta = delta || 1;
    var toPage = pages[pages.length - delta];
    return setUrlQuery(toPage.route, toPage.options);
}
function targetAsString(e) {
    var _a, _b;
    var id = ((_a = e.currentTarget) === null || _a === void 0 ? void 0 : _a.id) ? " id=\"" + ((_b = e.currentTarget) === null || _b === void 0 ? void 0 : _b.id) + "\"" : '';
    var dataSets = Object.keys(e.currentTarget.dataset).map(function (key) {
        return "data-" + key + "=" + e.currentTarget.dataset[key];
    });
    return "<element " + id + " " + dataSets.join(' ') + "/>";
}

var ELinstenerTypes;
(function (ELinstenerTypes) {
    ELinstenerTypes["Touchmove"] = "touchmove";
    ELinstenerTypes["Tap"] = "tap";
})(ELinstenerTypes || (ELinstenerTypes = {}));

var HandleWxAppEvents = {
    onLaunch: function (options) {
        var data = {
            path: options.path,
            query: options.query
        };
        breadcrumb.push({
            category: breadcrumb.getCategory(BREADCRUMBTYPES.APP_ON_LAUNCH),
            type: BREADCRUMBTYPES.APP_ON_LAUNCH,
            data: data,
            level: Severity.Info
        });
    },
    onShow: function (options) {
        var data = {
            path: options.path,
            query: options.query
        };
        breadcrumb.push({
            category: breadcrumb.getCategory(BREADCRUMBTYPES.APP_ON_SHOW),
            type: BREADCRUMBTYPES.APP_ON_SHOW,
            data: data,
            level: Severity.Info
        });
    },
    onHide: function () {
        breadcrumb.push({
            category: breadcrumb.getCategory(BREADCRUMBTYPES.APP_ON_HIDE),
            type: BREADCRUMBTYPES.APP_ON_HIDE,
            data: null,
            level: Severity.Info
        });
    },
    onError: function (error) {
        var parsedError = parseErrorString(error);
        var data = __assign(__assign({}, parsedError), { time: getTimestamp(), level: Severity.Normal, url: getCurrentRoute(), type: ERRORTYPES.JAVASCRIPT_ERROR });
        breadcrumb.push({
            category: breadcrumb.getCategory(BREADCRUMBTYPES.CODE_ERROR),
            type: BREADCRUMBTYPES.CODE_ERROR,
            level: Severity.Error,
            data: __assign({}, data)
        });

    },
    onUnhandledRejection: function (ev) {
        var data = {
            type: ERRORTYPES.PROMISE_ERROR,
            message: unknownToString(ev.reason),
            url: getCurrentRoute(),
            name: 'unhandledrejection',
            time: getTimestamp(),
            level: Severity.Low
        };
        if (isError(ev.reason)) {
            data = __assign(__assign(__assign({}, data), extractErrorStack(ev.reason, Severity.Low)), { url: getCurrentRoute() });
        }
        breadcrumb.push({
            type: BREADCRUMBTYPES.UNHANDLEDREJECTION,
            category: breadcrumb.getCategory(BREADCRUMBTYPES.UNHANDLEDREJECTION),
            data: __assign({}, data),
            level: Severity.Error
        });

    },
    onPageNotFound: function (data) {
        breadcrumb.push({
            category: breadcrumb.getCategory(BREADCRUMBTYPES.ROUTE),
            type: BREADCRUMBTYPES.ROUTE,
            data: data,
            level: Severity.Error
        });
    },
};
var HandleWxPageEvents = {
    onShow: function () {
        var page = getCurrentPages().pop();
        var data = {
            path: page.route,
            query: page.options
        };
        breadcrumb.push({
            category: breadcrumb.getCategory(BREADCRUMBTYPES.PAGE_ON_SHOW),
            type: BREADCRUMBTYPES.PAGE_ON_SHOW,
            data: data,
            level: Severity.Info
        });
    },
    onHide: function () {
        var page = getCurrentPages().pop();
        var data = {
            path: page.route,
            query: page.options
        };
        breadcrumb.push({
            category: breadcrumb.getCategory(BREADCRUMBTYPES.PAGE_ON_HIDE),
            type: BREADCRUMBTYPES.PAGE_ON_HIDE,
            data: data,
            level: Severity.Info
        });
    },
    // onShareAppMessage: function (options, params) {
    //     console.log(options, params);
    //     var page = getCurrentPages().pop();
    //     var data = {
    //         path: page.route,
    //         query: page.options,
    //         options: options
    //     };
    //     breadcrumb.push({
    //         category: breadcrumb.getCategory(BREADCRUMBTYPES.PAGE_ON_SHARE_APP_MESSAGE),
    //         type: BREADCRUMBTYPES.PAGE_ON_SHARE_APP_MESSAGE,
    //         data: data,
    //         level: Severity.Info
    //     });
    // },
    onShareTimeline: function () {
        var page = getCurrentPages().pop();
        var data = {
            path: page.route,
            query: page.options
        };
        breadcrumb.push({
            category: breadcrumb.getCategory(BREADCRUMBTYPES.PAGE_ON_SHARE_TIMELINE),
            type: BREADCRUMBTYPES.PAGE_ON_SHARE_TIMELINE,
            data: data,
            level: Severity.Info
        });
    },
    onTabItemTap: function (options) {
        var page = getCurrentPages().pop();
        var data = {
            path: page.route,
            query: page.options,
            options: options
        };
        breadcrumb.push({
            category: breadcrumb.getCategory(BREADCRUMBTYPES.PAGE_ON_TAB_ITEM_TAP),
            type: BREADCRUMBTYPES.PAGE_ON_TAB_ITEM_TAP,
            data: data,
            level: Severity.Info
        });
    },
    onAction: function (e) { // yyt
        var type = BREADCRUMBTYPES.TOUCHMOVE;
        if (e.type === ELinstenerTypes.Tap) {
            type = BREADCRUMBTYPES.TAP;
        }
        let pages = getCurrentPages();
        breadcrumb.push({
            category: breadcrumb.getCategory(type),
            type: type,
            data: targetAsString(e),
            level: Severity.Info,
            pages: pages[pages.length - 1].route,
        });
    },

};
var HandleWxConsoleEvents = {
    console: function (data) {  // 重写console
        handleConsole(data);
    }
};

var HandleWxEvents = {
    handleRoute: function (data) {
        if (data.isFail) {
            breadcrumb.push({
                type: BREADCRUMBTYPES.ROUTE,
                category: breadcrumb.getCategory(BREADCRUMBTYPES.CODE_ERROR),
                data: data,
                level: Severity.Error
            });
            var reportData = {
                type: ERRORTYPES.ROUTE_ERROR,
                message: data.message,
                url: data.to,
                name: 'MINI_' + ERRORTYPES.ROUTE_ERROR,
                level: Severity.Error
            };
            return reportData
        }
        breadcrumb.push({
            type: BREADCRUMBTYPES.ROUTE,
            category: breadcrumb.getCategory(BREADCRUMBTYPES.ROUTE),
            data: data,
            level: Severity.Info
        });
    }
};

function replace(type) {
    switch (type) {
        case EVENTTYPES.CONSOLE:
            replaceConsole();
            break;
        case EVENTTYPES.MINI_ROUTE:
            replaceRoute();
    }
}
function addReplaceHandler(handler) {
    if (!subscribeEvent(handler))
        return;
    replace(handler.type);
}
function replaceApp() {
    if (App) {
        var originApp_1 = App;
        App = function (appOptions) {
            var methods = [
                WxAppEvents.AppOnLaunch,
                WxAppEvents.AppOnShow,
                WxAppEvents.AppOnError,
                WxAppEvents.AppOnUnhandledRejection,
                WxAppEvents.AppOnPageNotFound,
                WxAppEvents.AppOnHide
            ];
            methods.forEach(function (method) {
                if (getFlag(method))
                    return;
                addReplaceHandler({
                    callback: function (data) { return HandleWxAppEvents[method.replace('AppOn', 'on')](data); },
                    type: method
                });
                replaceOld(appOptions, method.replace('AppOn', 'on'), function (originMethod) {
                    return function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i] = arguments[_i];
                        }
                        triggerHandlers.apply(null, __spreadArrays([method], args));
                        if (originMethod) {
                            originMethod.apply(this, args);
                        }
                    };
                }, true);
            });
            return originApp_1(appOptions);
        };
    }
}
var pageLifeMethods = [
    WxPageEvents.PageOnShow,
    WxPageEvents.PageOnHide,
    // WxPageEvents.PageOnShareAppMessage,
    WxPageEvents.PageOnShareTimeline,
    WxPageEvents.PageOnTabItemTap
];
function replacePageLifeMethods(options) {
    pageLifeMethods.forEach(function (method) {
        replaceOld(options, method.replace('PageOn', 'on'), function (originMethod) {
            return function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                triggerHandlers.apply(null, __spreadArrays([method], args));
                if (originMethod) {
                    originMethod.apply(this, args);
                }
            };
        }, true);
    });
}
function replacePage() {
    if (!Page) {
        return;
    }
    var originPage = Page;
    pageLifeMethods.forEach(function (method) {
        if (getFlag(method))
            return;
        addReplaceHandler({
            callback: function (data) {
                return HandleWxPageEvents[method.replace('PageOn', 'on')](data);
            },
            type: method
        });
    });

    Page = function (pageOptions) {
        replacePageLifeMethods(pageOptions);
        replaceAction(pageOptions);
        return originPage.call(this, pageOptions);
    };
}

function replaceAction(options) {
    function gestureTrigger(e) {
        e.mitoWorked = true;
        triggerHandlers(EVENTTYPES.DOM, e);
    }
    var throttleGesturetrigger = throttle(gestureTrigger, 500);
    var linstenerTypes = [ELinstenerTypes.Touchmove, ELinstenerTypes.Tap];
    Object.keys(options).forEach(function (m) {
        if ('function' !== typeof options[m]) {
            return;
        }
        replaceOld(options, m, function (originMethod) {
            return function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var e = args[0];
                if (e && e.type && e.currentTarget && !e.mitoWorked) {
                    if (linstenerTypes.indexOf(e.type) > -1) {
                        throttleGesturetrigger(e);
                    }
                }
                return originMethod.apply(this, args);
            };
        }, true);
    });
}
function replaceConsole() {  // 加入错误栈堆的信息
    if (console && variableTypeDetection.isObject(console)) {
        var logType = [
            // 'log', 
            // 'debug',
            //  'info',
            'warn',
            'error',
            //    'assert'
        ];
        logType.forEach(function (level) {
            if (!(level in console))
                return;
            replaceOld(console, level, function (originalConsole) {
                return function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    if (originalConsole) {
                        triggerHandlers(EVENTTYPES.CONSOLE, { args: args, level: level });
                        originalConsole.apply(console, args);
                    }
                };
            });
        });
    }
}

function replaceRoute() {
    var methods = [
        WxRouteEvents.SwitchTab,
        WxRouteEvents.ReLaunch,
        WxRouteEvents.RedirectTo,
        WxRouteEvents.NavigateTo,
        WxRouteEvents.NavigateBack
    ];
    methods.forEach(function (method) {
        var originMethod = wx[method];
        Object.defineProperty(wx, method, {
            writable: true,
            enumerable: true,
            configurable: true,
            value: function (options) {
                var _a;
                var toUrl;
                if (method === WxRouteEvents.NavigateBack) {
                    toUrl = getNavigateBackTargetUrl((_a = options) === null || _a === void 0 ? void 0 : _a.delta);
                }
                else {
                    toUrl = options.url;
                }
                var data = {
                    from: getCurrentRoute(),
                    to: toUrl
                };
                triggerHandlers(EVENTTYPES.MINI_ROUTE, data);
                if (variableTypeDetection.isFunction(options.complete) ||
                    variableTypeDetection.isFunction(options.success) ||
                    variableTypeDetection.isFunction(options.fail)) {
                    var _fail_1 = options.fail;
                    var failHandler = function (res) {
                        var failData = __assign(__assign({}, data), { isFail: true, message: res.errMsg });
                        triggerHandlers(EVENTTYPES.MINI_ROUTE, failData);
                        if (variableTypeDetection.isFunction(_fail_1)) {
                            return _fail_1(res);
                        }
                    };
                    options.fail = failHandler;
                }
                return originMethod.call(this, options);
            }
        });
    });
}

function setupReplace() {
    replacePage();
    replaceApp();

    addReplaceHandler({
        callback: function (data) { return HandleWxEvents.handleRoute(data); },
        type: EVENTTYPES.MINI_ROUTE
    });
    addReplaceHandler({
        callback: function (data) {
            HandleWxConsoleEvents.console(data);
        },
        type: EVENTTYPES.CONSOLE
    });
    addReplaceHandler({
        callback: function (data) {
            return HandleWxPageEvents.onAction(data);
        },
        type: EVENTTYPES.DOM
    });
}

async function init(options) {
    if (options === void 0) { options = {}; }
    if (!isWxMiniEnv)
        return;
    initOptions(options);
    setupReplace();

    Object.assign(wx, { mitoLog: log });
}

exports.init = init; // 初始化   // 不可在异步执行
exports.breadcrumb = breadcrumb; // stack对象


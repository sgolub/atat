module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable-next-line: no-empty
function noop() { }
exports.noop = noop;
exports.VALUE_NAME_OUTSIDE = 'outside';
exports.VALUE_NAME_INSIDE = 'inside';
exports.HTML_RULES = {
    '"': '&#34;',
    '&': '&#38;',
    "'": '&#39;',
    '/': '&#47;',
    '<': '&#60;',
    '>': '&#62;',
};
exports.CLEAR_TAGS = /[-[\](){}*+?.,\\^$|#\s]/g;
exports.MATCH_HTML = /&(?!#?\w+;)|<|>|"|'|\//g;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = __webpack_require__(0);
exports.helpers = {
    encode: encodeHtml,
    join: joinHelper,
    json: jsonStringify,
    lower: lowercaseHelper,
    upper: uppercaseHelper,
};
function merge(src, dest) {
    if (dest === void 0) { dest = {}; }
    for (var x in src) {
        if (!dest.hasOwnProperty(x) && src.hasOwnProperty(x)) {
            if (typeof src[x] === 'object') {
                dest[x] = merge(src[x]);
            }
            else {
                dest[x] = src[x];
            }
        }
    }
    return dest;
}
exports.merge = merge;
function getTags(tags) {
    var regexps = [];
    loop(tags, function (compiler, regexp) {
        if (regexps.indexOf(regexp) === -1) {
            regexps.push(regexp);
        }
    });
    var compilers = [];
    loop(tags, function (compiler, regexp) {
        compilers.push({
            compiler: compiler,
            regexp: new RegExp(regexp, 'g'),
        });
    });
    return {
        compilers: compilers,
        close: /}@/g,
        open: new RegExp(regexps.join('|'), 'g'),
    };
}
exports.getTags = getTags;
function getTagsInline(inlineTags) {
    var regexps = [];
    loop(inlineTags, function (compiler, regexp) {
        regexps.push(regexp);
    });
    regexps.push('(@[A-Za-z0-9$]+\\()([^]*?)(\\)@)');
    return new RegExp(regexps.join('|'), 'g');
}
exports.getTagsInline = getTagsInline;
function loop(array, fn) {
    if (Object.prototype.toString.call(array) !== '[object Array]') {
        for (var x in array) {
            if (array.hasOwnProperty(x)) {
                fn(array[x], x, array);
            }
        }
        return;
    }
    for (var i = 0, l = array.length; i < l; i += 1) {
        fn(array[i], i, array);
    }
}
exports.loop = loop;
function loopAsync(array, fn, callback) {
    var ready = 0;
    var finished = false;
    var results = [];
    var length = array.length;
    for (var i = 0; i < length; i += 1) {
        fn(array[i], i, array, cb(i));
    }
    function cb(index) {
        return function (err, res) {
            if (finished) {
                return;
            }
            if (err) {
                finished = true;
                callback(err);
                return;
            }
            results[index] = res;
            ready += 1;
            if (ready === length) {
                finished = true;
                callback(null, results);
            }
        };
    }
}
exports.loopAsync = loopAsync;
function encodeHtml(code) {
    if (code === void 0) { code = ''; }
    return code.toString().replace(common_1.MATCH_HTML, function (m) {
        return common_1.HTML_RULES[m] || m;
    });
}
exports.encodeHtml = encodeHtml;
function trimString(str) {
    var chars = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        chars[_i - 1] = arguments[_i];
    }
    if (chars.length === 0) {
        return String.prototype.trim.call(str);
    }
    var result = str;
    while (chars.indexOf(str.charAt(0)) >= 0) {
        result = str.substring(1);
    }
    while (chars.indexOf(str.charAt(str.length - 1)) >= 0) {
        result = str.substring(0, str.length - 1);
    }
    return result;
}
exports.trimString = trimString;
function escapeQuotes(str) {
    return trimString(str)
        .replace(/^"(.*)"$/g, '$1')
        .replace(/^'(.*)'$/g, '$1');
}
exports.escapeQuotes = escapeQuotes;
function jsonStringify(obj) {
    return JSON.stringify(obj);
}
exports.jsonStringify = jsonStringify;
function joinHelper(array, separator) {
    if (array === void 0) { array = []; }
    if (separator === void 0) { separator = ''; }
    return Array.prototype.join.call(array, separator);
}
exports.joinHelper = joinHelper;
function uppercaseHelper(str) {
    if (str === void 0) { str = ''; }
    return str.toString().toUpperCase();
}
exports.uppercaseHelper = uppercaseHelper;
function lowercaseHelper(str) {
    if (str === void 0) { str = ''; }
    return str.toString().toLowerCase();
}
exports.lowercaseHelper = lowercaseHelper;
function resolveUrl(base, relative) {
    var stack = base.split('/');
    var parts = relative.split('/');
    stack.pop();
    for (var _i = 0, parts_1 = parts; _i < parts_1.length; _i++) {
        var part = parts_1[_i];
        if (part === '.') {
            continue;
        }
        if (part === '..') {
            stack.pop();
        }
        else {
            stack.push(part);
        }
    }
    return stack.join('/');
}
exports.resolveUrl = resolveUrl;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = __webpack_require__(0);
var compiler_1 = __webpack_require__(8);
var context_1 = __webpack_require__(9);
var helpers_1 = __webpack_require__(1);
var options_1 = __webpack_require__(5);
exports.atat = {
    config: function (opts) {
        var options = helpers_1.merge(options_1.DEFAULT_OPTIONS, opts);
        for (var x in options) {
            if (options_1.DEFAULT_OPTIONS.hasOwnProperty(x)) {
                options_1.DEFAULT_OPTIONS[x] = options[x];
            }
        }
    },
    parse: function (input, optionsArg, callbackArg) {
        if (optionsArg === void 0) { optionsArg = {}; }
        if (callbackArg === void 0) { callbackArg = common_1.noop; }
        var options = optionsArg;
        var callback = callbackArg;
        if (typeof options === 'function') {
            callback = options;
            options = {};
        }
        if (callback === common_1.noop && typeof Promise !== 'undefined') {
            return new Promise(function (resolve, reject) {
                exports.atat.parse(input, options, function (err, result) {
                    err ? reject(err) : resolve(result);
                });
            });
        }
        var ctx = new context_1.AtatContext(options);
        var compiler = new compiler_1.AtatCompiler();
        compiler.compile(input, ctx, function (err, output) {
            if (err) {
                return callback(err);
            }
            // tslint:disable-next-line: no-function-constructor-with-string-args
            var render = new Function(ctx.arguments, output + ";return this.output;");
            ctx.template = function (model) {
                try {
                    ctx.output = '';
                    ctx.model = model || ctx.model;
                    var body = render.call(ctx, ctx.model, ctx.helpers, ctx.body);
                    if (ctx.layout) {
                        ctx.layout.context.body = body;
                        body = ctx.layout(ctx.model);
                    }
                    return body;
                }
                catch (e) {
                    return e.toString();
                }
            };
            ctx.template.context = ctx;
            callback(null, ctx.template);
        });
    },
    loadAndParse: function (path, optionsArg, callbackArg) {
        if (optionsArg === void 0) { optionsArg = {}; }
        if (callbackArg === void 0) { callbackArg = common_1.noop; }
        var options = optionsArg;
        var callback = callbackArg;
        if (typeof options === 'function') {
            callback = options;
            options = {};
        }
        if (callback === common_1.noop && typeof Promise !== 'undefined') {
            return new Promise(function (resolve, reject) {
                exports.atat.loadAndParse(path, options, function (err, result) {
                    err ? reject(err) : resolve(result);
                });
            });
        }
        var fileResolver = options.fileResolver || options_1.DEFAULT_OPTIONS.fileResolver;
        fileResolver.loadFile(path, function (err, content) {
            err ? callback(err) : exports.atat.parse(content, options, callback);
        });
    },
    render: function (input, model, optionsArg, callbackArg) {
        if (model === void 0) { model = {}; }
        if (optionsArg === void 0) { optionsArg = {}; }
        if (callbackArg === void 0) { callbackArg = common_1.noop; }
        var options = optionsArg;
        var callback = callbackArg;
        if (typeof options === 'function') {
            callback = options;
            options = {};
        }
        if (callback === common_1.noop && typeof Promise !== 'undefined') {
            return new Promise(function (resolve, reject) {
                exports.atat.render(input, model, options, function (err, result) {
                    err ? reject(err) : resolve(result);
                });
            });
        }
        exports.atat.parse(input, options, function (err, render) {
            err ? callback(err) : callback(null, render(model));
        });
    },
    loadAndRender: function (path, model, optionsArg, callbackArg) {
        if (optionsArg === void 0) { optionsArg = {}; }
        if (callbackArg === void 0) { callbackArg = common_1.noop; }
        var options = optionsArg;
        var callback = callbackArg;
        if (typeof options === 'function') {
            callback = options;
            options = {};
        }
        if (callback === common_1.noop && typeof Promise !== 'undefined') {
            return new Promise(function (resolve, reject) {
                exports.atat.loadAndRender(path, model, options, function (err, result) {
                    err ? reject(err) : resolve(result);
                });
            });
        }
        exports.atat.loadAndParse(path, options, function (err, render) {
            err ? callback(err) : callback(null, render(model));
        });
    },
    // tslint:disable-next-line: function-name
    __express: function (path, options, callback) {
        exports.atat.loadAndParse(path, function (err, template) {
            err ? callback(err.toString()) : callback(null, template(options));
        });
    },
};


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = __webpack_require__(0);
function matchRecursive(str, left, right) {
    var global = left.global;
    var sticky = left.sticky;
    var output = [];
    var openTokens = 0;
    var delimStart = 0;
    var delimEnd = 0;
    var lastOuterEnd = 0;
    var outerStart;
    var innerStart;
    var leftMatch;
    var rightMatch;
    while (true) {
        leftMatch = regexpExec(str, left, delimEnd);
        rightMatch = regexpExec(str, right, delimEnd);
        // Keep the leftmost match only
        if (leftMatch && rightMatch) {
            if (leftMatch.index <= rightMatch.index) {
                rightMatch = null;
            }
            else {
                leftMatch = null;
            }
        }
        // Paths (LM: leftMatch, RM: rightMatch, OT: openTokens):
        // LM | RM | OT | Result
        // 1  | 0  | 1  | loop
        // 1  | 0  | 0  | loop
        // 0  | 1  | 1  | loop
        // 0  | 1  | 0  | throw
        // 0  | 0  | 1  | throw
        // 0  | 0  | 0  | break
        // The paths above don't include the sticky mode special case. The loop ends after the
        // first completed match if not `global`.
        if (leftMatch || rightMatch) {
            delimStart = (leftMatch || rightMatch).index;
            delimEnd = delimStart + (leftMatch || rightMatch)[0].length;
        }
        else if (!openTokens) {
            break;
        }
        if (sticky && !openTokens && delimStart > lastOuterEnd) {
            break;
        }
        if (leftMatch) {
            if (!openTokens) {
                outerStart = delimStart;
                innerStart = delimEnd;
            }
            openTokens += 1;
        }
        else if (rightMatch && openTokens) {
            openTokens -= 1;
            if (!openTokens) {
                if (outerStart > lastOuterEnd) {
                    output.push({
                        name: common_1.VALUE_NAME_OUTSIDE,
                        value: str.slice(lastOuterEnd, outerStart),
                        start: lastOuterEnd,
                        end: outerStart,
                    });
                }
                output.push({
                    name: common_1.VALUE_NAME_INSIDE,
                    value: str.slice(innerStart, delimStart),
                    start: innerStart,
                    end: delimStart,
                    left: {
                        value: str.slice(outerStart, innerStart),
                        start: outerStart,
                        end: innerStart,
                    },
                    right: {
                        value: str.slice(delimStart, delimEnd),
                        start: delimStart,
                        end: delimEnd,
                    },
                });
                lastOuterEnd = delimEnd;
                if (!global) {
                    break;
                }
            }
        }
        else {
            throw new Error('Unbalanced delimiter found in string');
        }
        // If the delimiter matched an empty string, avoid an infinite loop
        if (delimStart === delimEnd) {
            delimEnd += 1;
        }
    }
    if (global && str.length > lastOuterEnd) {
        output.push({
            end: str.length,
            name: common_1.VALUE_NAME_OUTSIDE,
            start: lastOuterEnd,
            value: str.slice(lastOuterEnd),
        });
    }
    return output;
}
exports.matchRecursive = matchRecursive;
function regexpTest(str, regexp, pos) {
    if (pos === void 0) { pos = 0; }
    regexp.lastIndex = pos;
    var test = regexp.test(str);
    if (regexp.global) {
        regexp.lastIndex = test ? regexp.lastIndex : 0;
    }
    return test;
}
exports.regexpTest = regexpTest;
function regexpExec(str, regexp, pos) {
    if (pos === void 0) { pos = 0; }
    regexp.lastIndex = pos;
    var match = regexp.exec(str);
    if (regexp.global) {
        regexp.lastIndex = match ? regexp.lastIndex : 0;
    }
    return match;
}
exports.regexpExec = regexpExec;
function cleanArray(array) {
    for (var i = 0; i < array.length; i += 1) {
        if (typeof array[i] === 'undefined') {
            array.splice(i, 1);
            i -= 1;
        }
    }
}
exports.cleanArray = cleanArray;
function matchInline(str, regexp) {
    var global = regexp.global;
    var sticky = regexp.sticky;
    var output = [];
    var lastEnd = 0;
    var leftStart = 0;
    var innerStart;
    var innerEnd;
    while (true) {
        var match = regexpExec(str, regexp, lastEnd);
        if (match === null) {
            break;
        }
        leftStart = match.index;
        if (sticky && leftStart > lastEnd) {
            break;
        }
        cleanArray(match);
        innerStart = leftStart + match[1].length;
        innerEnd = lastEnd + innerStart + match[2].length;
        if (leftStart > lastEnd) {
            output.push({
                name: common_1.VALUE_NAME_OUTSIDE,
                value: str.slice(lastEnd, leftStart),
                start: lastEnd,
                end: leftStart,
            });
        }
        output.push({
            name: common_1.VALUE_NAME_INSIDE,
            value: match[2],
            start: innerStart,
            end: innerEnd,
            left: {
                value: match[1],
                start: leftStart,
                end: innerStart,
            },
            right: {
                value: match[3],
                start: innerEnd,
                end: innerEnd + match[3].length,
            },
        });
        lastEnd = leftStart + match[0].length;
        if (!global) {
            break;
        }
    }
    if (global && str.length > lastEnd) {
        output.push({
            name: common_1.VALUE_NAME_OUTSIDE,
            value: str.slice(lastEnd),
            start: lastEnd,
            end: str.length,
        });
    }
    return output;
}
exports.matchInline = matchInline;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var atat_1 = __webpack_require__(2);
var helpers_1 = __webpack_require__(1);
exports.inlineTags = {
    '(@!\\()([^]*?)(\\)@)': outputAsHtml,
    '(@\\()([^]*?)(\\)@)': outputAsText,
    '(@layout\\()([^]*?)(\\)@)': compileLayout,
    '(@partial\\()([^]*?)(\\)@)': compilePartial,
    '(@section\\()([^]*?)(\\)@)': outputSection,
};
function outputAsText(inside, ctx, callback) {
    try {
        var val = inside.value.trim();
        if (val === '') {
            callback();
        }
        callback(null, "this.output += this.helpers.encode(" + inside.value.trim() + ");");
    }
    catch (e) {
        callback(e);
    }
}
function outputAsHtml(inside, ctx, callback) {
    try {
        var val = inside.value.trim();
        if (val === '') {
            callback();
        }
        callback(null, "this.output += (" + inside.value.trim() + ");");
    }
    catch (e) {
        callback(e);
    }
}
function compileLayout(inside, ctx, callback) {
    try {
        if (ctx.layout) {
            return callback();
        }
        atat_1.atat.loadAndParse(helpers_1.escapeQuotes(inside.value), ctx.options, function (err, template) {
            if (err) {
                return callback(err);
            }
            ctx.layout = template;
            template.context.parent = ctx;
            callback();
        });
    }
    catch (e) {
        callback(e);
    }
}
function compilePartial(inside, ctx, callback) {
    try {
        var value = inside.value.trim();
        if (value === '') {
            return callback(new Error('Partial parsing error'));
        }
        var args_1 = value.split(/\s*,\s*/g);
        var uri = helpers_1.escapeQuotes(args_1.shift());
        atat_1.atat.loadAndParse(uri, ctx.options, function (err, template) {
            if (err) {
                return callback(err);
            }
            ctx.partials.push(template);
            template.context.parent = ctx;
            var output = "this.output += this.partials[" + (ctx.partials.length -
                1) + "](" + args_1 + ");";
            callback(null, output);
        });
    }
    catch (e) {
        callback(e);
    }
}
function outputSection(inside, ctx, callback) {
    try {
        var name_1 = helpers_1.escapeQuotes(inside.value);
        var output = "this.output += (function(){var s = this.section('" + name_1 + "'); " +
            ("return s?s(" + ctx.arguments + "):\"\";}).call(this);");
        callback(null, output);
    }
    catch (e) {
        callback(e);
    }
}
function outputCallHelper(inside, ctx, callback) {
    try {
        var name_2 = inside.left.value.substring(1, inside.left.value.length - 1);
        if (typeof ctx.helpers[name_2] !== 'function') {
            throw new Error("Helper " + name_2 + " isn't declarated");
        }
        callback(null, "this.output += this.helpers." + name_2 + "(" + inside.value.trim() + ");");
    }
    catch (e) {
        callback(e);
    }
}
exports.outputCallHelper = outputCallHelper;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var fileResolvers_1 = __webpack_require__(6);
exports.DEFAULT_OPTIONS = {
    it: 'it',
    $: '$',
    helpers: {},
    fileResolver: new fileResolvers_1.DefaultFileResolver(),
};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var DefaultFileResolver_1 = __importDefault(__webpack_require__(10));
exports.DefaultFileResolver = DefaultFileResolver_1.default;
var FetchFileResolver_1 = __importDefault(__webpack_require__(12));
exports.FetchFileResolver = FetchFileResolver_1.default;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var atat_1 = __webpack_require__(2);
var fileResolvers_1 = __webpack_require__(6);
exports.DefaultFileResolver = fileResolvers_1.DefaultFileResolver;
exports.FetchFileResolver = fileResolvers_1.FetchFileResolver;
exports.default = atat_1.atat;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = __webpack_require__(0);
var helpers_1 = __webpack_require__(1);
var inline_1 = __webpack_require__(4);
var regexp_1 = __webpack_require__(3);
var AtatCompiler = /** @class */ (function () {
    function AtatCompiler() {
    }
    AtatCompiler.prototype.compile = function (input, ctx, callback) {
        var _this = this;
        try {
            if (input.length === 0) {
                callback(null, '');
                return;
            }
            var blocks = regexp_1.matchRecursive(input, ctx.tags.open, ctx.tags.close);
            helpers_1.loopAsync(blocks, function (block, i, array, loopCallback) {
                try {
                    if (block.name === common_1.VALUE_NAME_OUTSIDE) {
                        if (block.value.trim() === '') {
                            loopCallback(null, '');
                            return;
                        }
                        _this.compileInline(block.value, ctx, loopCallback);
                        return;
                    }
                    if (block.name === common_1.VALUE_NAME_INSIDE) {
                        var left = block.left;
                        var inside = block;
                        var right = block.right;
                        var compiler = ctx.compiler(left.value);
                        if (!compiler) {
                            _this.compileInline(left.value + inside.value + right.value, ctx, loopCallback);
                            return;
                        }
                        compiler.call(_this, inside, ctx, loopCallback);
                        return;
                    }
                }
                catch (e) {
                    loopCallback(e);
                }
            }, function (err, results) {
                if (err) {
                    return callback(err);
                }
                callback(null, results.join(''));
            });
        }
        catch (e) {
            callback(e);
        }
    };
    AtatCompiler.prototype.compileInline = function (input, ctx, callback) {
        var _this = this;
        try {
            if (input.length === 0) {
                callback(null, '');
                return;
            }
            var blocks = regexp_1.matchInline(input, ctx.inline);
            helpers_1.loopAsync(blocks, function (block, i, array, loopCallback) {
                try {
                    if (block.name === common_1.VALUE_NAME_OUTSIDE) {
                        ctx.parts.push(block.value);
                        loopCallback(null, "this.output += this.parts[" + (ctx.parts.length - 1) + "];");
                        return;
                    }
                    if (block.name === common_1.VALUE_NAME_INSIDE) {
                        var left = block.left;
                        var inside = block;
                        var right = block.right;
                        if (inside.value.trim() === '') {
                            loopCallback(null, '');
                            return;
                        }
                        var compiler = ctx.compiler(left.value + inside.value + right.value);
                        if (!compiler) {
                            inline_1.outputCallHelper.call(_this, inside, ctx, loopCallback);
                            return;
                        }
                        compiler.call(_this, inside, ctx, loopCallback);
                        return;
                    }
                }
                catch (e) {
                    loopCallback(e);
                }
            }, function (err, results) {
                if (err) {
                    return callback(err);
                }
                callback(null, results.join(''));
            });
        }
        catch (e) {
            callback(e);
        }
    };
    return AtatCompiler;
}());
exports.AtatCompiler = AtatCompiler;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var helpers_1 = __webpack_require__(1);
var inline_1 = __webpack_require__(4);
var options_1 = __webpack_require__(5);
var regexp_1 = __webpack_require__(3);
var tags_1 = __webpack_require__(13);
var AtatContext = /** @class */ (function () {
    function AtatContext(opts) {
        var _this = this;
        this.options = helpers_1.merge(options_1.DEFAULT_OPTIONS, opts);
        this.helpers = helpers_1.merge(helpers_1.helpers, opts.helpers);
        this.model = null;
        this.output = '';
        this.parts = [];
        this.parent = null;
        this.arguments = [this.options.it, this.options.$, 'body'].join(',');
        this.tags = helpers_1.getTags(tags_1.tags);
        this.inline = helpers_1.getTagsInline(inline_1.inlineTags);
        helpers_1.loop(inline_1.inlineTags, function (compiler, regexp) {
            _this.tags.compilers.push({
                compiler: compiler,
                regexp: new RegExp(regexp, 'g'),
            });
        });
        this.layout = null;
        this.partials = [];
        this.sections = {};
    }
    AtatContext.prototype.section = function (name) {
        return name
            ? this.sections[name] || (this.parent && this.parent.section(name))
            : null;
    };
    AtatContext.prototype.compiler = function (str) {
        if (str === void 0) { str = ''; }
        for (var i = 0, l = this.tags.compilers.length; i < l; i += 1) {
            var item = this.tags.compilers[i];
            if (regexp_1.regexpTest(str, item.regexp)) {
                return item.compiler;
            }
        }
        return null;
    };
    return AtatContext;
}());
exports.AtatContext = AtatContext;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var DefaultFileResolver = /** @class */ (function () {
    function DefaultFileResolver() {
        this.loadFile = function (path, callback) {
            try {
                var fs = __webpack_require__(11);
                fs.readFile(path, 'utf-8', callback);
            }
            catch (err) {
                callback(err);
            }
        };
    }
    return DefaultFileResolver;
}());
exports.default = DefaultFileResolver;


/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var FetchFileResolver = /** @class */ (function () {
    function FetchFileResolver() {
        var _this = this;
        this.loadFile = function (path, callback) { return __awaiter(_this, void 0, void 0, function () {
            var res, _a, _b, err_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, fetch(path)];
                    case 1:
                        res = _c.sent();
                        _a = callback;
                        _b = [null];
                        return [4 /*yield*/, res.text()];
                    case 2:
                        _a.apply(void 0, _b.concat([_c.sent()]));
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _c.sent();
                        callback(err_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
    }
    return FetchFileResolver;
}());
exports.default = FetchFileResolver;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var atat_1 = __webpack_require__(2);
var common_1 = __webpack_require__(0);
var helpers_1 = __webpack_require__(1);
var regexp_1 = __webpack_require__(3);
exports.tags = {
    '@\\{': compileCode,
    '@for\\s*\\(': compileFor,
    '@function\\s+[$A-Za-z0-9]*\\s*\\(': compileFunction,
    '@if\\s*\\(': compileIf,
    '@section\\s+[$A-Za-z0-9]*\\s*\\{': compileSection,
    '@while\\s*\\(': compileWhile,
};
function compileCode(inside, ctx, callback) {
    callback(null, inside.value.trim());
}
function compileFor(inside, ctx, callback) {
    var code = "for(" + inside.value + "}";
    var blocks = regexp_1.matchRecursive(code, /\{/g, /\}/g);
    var out = '';
    out += blocks[0].value;
    out += '{';
    this.compile(blocks[1].value, ctx, function (err, res) {
        if (err) {
            return callback(err);
        }
        out += res;
        out += '}';
        callback(null, out);
    });
}
function compileFunction(inside, ctx, callback) {
    var left = inside.left.value.trim().substring(1);
    callback(null, "" + left + inside.value.trim() + "}");
}
function compileIf(inside, ctx, callback) {
    var _this = this;
    var code = "if(" + inside.value + "}";
    var blocks = regexp_1.matchRecursive(code, /\{/g, /\}/g);
    helpers_1.loopAsync(blocks, function (block, i, array, loopCallback) {
        if (block.name === common_1.VALUE_NAME_OUTSIDE) {
            return loopCallback(null, block.value);
        }
        _this.compile(block.value, ctx, loopCallback);
    }, function (err, results) {
        if (err) {
            return callback(err);
        }
        callback(null, results.join(''));
    });
}
function compileSection(inside, ctx, callback) {
    var block = inside.value.trim();
    var value = inside.left.value.trim();
    var regName = /^@section\s+([A-Za-z0-9]+)\s*\{/g;
    var match = regexp_1.regexpExec(value, regName);
    if (!match || match.length > 2) {
        return callback(new Error('Section parsing error'));
    }
    var name = match[1].trim();
    if (ctx.sections[name]) {
        return callback(new Error('Section already exists'));
    }
    atat_1.atat.parse(block, ctx.options, function (err, template) {
        if (err) {
            return callback(err);
        }
        template.context.parent = ctx;
        ctx.sections[name] = template;
        callback(null);
    });
}
function compileWhile(inside, ctx, callback) {
    var code = "while(" + inside.value + "}";
    var blocks = regexp_1.matchRecursive(code, /\{/g, /\}/g);
    var out = '';
    out += blocks[0].value;
    out += '{';
    this.compile(blocks[1].value, ctx, function (err, res) {
        if (err) {
            return callback(err);
        }
        out += res;
        out += '}';
        callback(null, out);
    });
}


/***/ })
/******/ ])["atat"];
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading wasm modules
/******/ 	var installedWasmModules = {};
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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
/******/ 	// object with all compiled WebAssembly.Modules
/******/ 	__webpack_require__.w = {};
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function noop() { }
exports.noop = noop;
exports.VALUE_NAME_OUTSIDE = 'outside';
exports.VALUE_NAME_INSIDE = 'inside';
exports.HTML_RULES = { '&': '&#38;', '<': '&#60;', '>': '&#62;', '"': '&#34;', "'": '&#39;', '/': '&#47;' };
exports.CLEAR_TAGS = /[-[\](){}*+?.,\\^$|#\s]/g;
exports.MATCH_HTML = /&(?!#?\w+;)|<|>|"|'|\//g;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = __webpack_require__(0);
exports.helpers = {
    encode: encode_html,
    json: json_stringify,
    join: join_helper,
    upper: uppercase_helper,
    lower: lowercase_helper
};
function merge(src, dest) {
    if (dest === void 0) { dest = {}; }
    for (var x in src) {
        if (!dest.hasOwnProperty(x) && src.hasOwnProperty(x)) {
            if (typeof src[x] == 'object') {
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
function get_tags(tags) {
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
            regexp: new RegExp(regexp, 'g')
        });
    });
    return {
        open: new RegExp(regexps.join('|'), 'g'),
        close: /}@/g,
        compilers: compilers
    };
}
exports.get_tags = get_tags;
function get_tags_inline(inline_tags) {
    var regexps = [];
    loop(inline_tags, function (compiler, regexp) {
        regexps.push(regexp);
    });
    regexps.push('(@[A-Za-z0-9$]+\\()([^]*?)(\\)@)');
    return new RegExp(regexps.join('|'), 'g');
}
exports.get_tags_inline = get_tags_inline;
function loop(array, fn) {
    if (Object.prototype.toString.call(array) !== '[object Array]') {
        array = array;
        for (var x in array) {
            if (array.hasOwnProperty(x)) {
                fn(array[x], x, array);
            }
        }
        return;
    }
    array = array;
    for (var i = 0, l = array.length; i < l; i++) {
        fn(array[i], i, array);
    }
}
exports.loop = loop;
function loop_async(array, fn, callback) {
    var ready = 0, finished = false, results = [], length = array.length;
    for (var i = 0; i < length; i++) {
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
            ready++;
            if (ready == length) {
                finished = true;
                callback(null, results);
            }
        };
    }
}
exports.loop_async = loop_async;
function encode_html(code) {
    if (code === void 0) { code = ''; }
    return code.toString().replace(common_1.MATCH_HTML, function (m) {
        return common_1.HTML_RULES[m] || m;
    });
}
exports.encode_html = encode_html;
function trim_string(str) {
    var chars = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        chars[_i - 1] = arguments[_i];
    }
    if (chars.length == 0) {
        return String.prototype.trim.call(str);
    }
    while (chars.indexOf(str.charAt(0)) >= 0) {
        str = str.substring(1);
    }
    while (chars.indexOf(str.charAt(str.length - 1)) >= 0) {
        str = str.substring(0, str.length - 1);
    }
    return str;
}
exports.trim_string = trim_string;
function escape_quotes(str) {
    return trim_string(str).replace(/^"(.*)"$/g, '$1').replace(/^'(.*)'$/g, '$1');
}
exports.escape_quotes = escape_quotes;
function json_stringify(obj) {
    return JSON.stringify(obj);
}
exports.json_stringify = json_stringify;
function join_helper(array, separator) {
    if (array === void 0) { array = []; }
    if (separator === void 0) { separator = ''; }
    return Array.prototype.join.call(array, separator);
}
exports.join_helper = join_helper;
function uppercase_helper(str) {
    if (str === void 0) { str = ''; }
    return str.toString().toUpperCase();
}
exports.uppercase_helper = uppercase_helper;
function lowercase_helper(str) {
    if (str === void 0) { str = ''; }
    return str.toString().toLowerCase();
}
exports.lowercase_helper = lowercase_helper;
function resolveUrl(base, relative) {
    var stack = base.split("/"), parts = relative.split("/");
    stack.pop();
    for (var i = 0; i < parts.length; i++) {
        if (parts[i] == ".") {
            continue;
        }
        if (parts[i] == "..") {
            stack.pop();
        }
        else {
            stack.push(parts[i]);
        }
    }
    return stack.join("/");
}
exports.resolveUrl = resolveUrl;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = __webpack_require__(0);
function match_recursive(str, left, right) {
    var global = left.global, sticky = left.sticky, output = [], openTokens = 0, delimStart = 0, delimEnd = 0, lastOuterEnd = 0, outerStart, innerStart, leftMatch, rightMatch;
    while (true) {
        leftMatch = regexp_exec(str, left, delimEnd);
        rightMatch = regexp_exec(str, right, delimEnd);
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
            ++openTokens;
        }
        else if (rightMatch && openTokens) {
            if (!--openTokens) {
                if (outerStart > lastOuterEnd) {
                    output.push({
                        name: common_1.VALUE_NAME_OUTSIDE,
                        value: str.slice(lastOuterEnd, outerStart),
                        start: lastOuterEnd,
                        end: outerStart
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
                        end: innerStart
                    },
                    right: {
                        value: str.slice(delimStart, delimEnd),
                        start: delimStart,
                        end: delimEnd
                    }
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
            ++delimEnd;
        }
    }
    if (global && str.length > lastOuterEnd) {
        output.push({
            name: common_1.VALUE_NAME_OUTSIDE,
            value: str.slice(lastOuterEnd),
            start: lastOuterEnd,
            end: str.length
        });
    }
    return output;
}
exports.match_recursive = match_recursive;
function regexp_test(str, regexp, pos) {
    if (pos === void 0) { pos = 0; }
    regexp.lastIndex = pos;
    var test = regexp.test(str);
    if (regexp.global) {
        regexp.lastIndex = test ? regexp.lastIndex : 0;
    }
    return test;
}
exports.regexp_test = regexp_test;
function regexp_exec(str, regexp, pos) {
    if (pos === void 0) { pos = 0; }
    regexp.lastIndex = pos;
    var match = regexp.exec(str);
    if (regexp.global) {
        regexp.lastIndex = match ? regexp.lastIndex : 0;
    }
    return match;
}
exports.regexp_exec = regexp_exec;
function clean_array(array) {
    for (var i = 0; i < array.length; i++) {
        if (typeof array[i] === 'undefined') {
            array.splice(i, 1);
            i--;
        }
    }
}
exports.clean_array = clean_array;
function match_inline(str, regexp) {
    var global = regexp.global, sticky = regexp.sticky, output = [], lastEnd = 0, leftStart = 0, innerStart, innerEnd;
    while (true) {
        var match = regexp_exec(str, regexp, lastEnd);
        if (match == null) {
            break;
        }
        leftStart = match.index;
        if (sticky && leftStart > lastEnd) {
            break;
        }
        clean_array(match);
        innerStart = leftStart + match[1].length;
        innerEnd = lastEnd + innerStart + match[2].length;
        if (leftStart > lastEnd) {
            output.push({
                name: common_1.VALUE_NAME_OUTSIDE,
                value: str.slice(lastEnd, leftStart),
                start: lastEnd,
                end: leftStart
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
                end: innerStart
            },
            right: {
                value: match[3],
                start: innerEnd,
                end: innerEnd + match[3].length
            }
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
            end: str.length
        });
    }
    return output;
}
exports.match_inline = match_inline;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var context_1 = __webpack_require__(10);
var compiler_1 = __webpack_require__(7);
var common_1 = __webpack_require__(0);
var load_file_1 = __webpack_require__(6);
exports.atat = {
    compileByPath: function (path, opts, callback) {
        if (opts === void 0) { opts = {}; }
        if (callback === void 0) { callback = common_1.noop; }
        if (typeof opts === 'function') {
            callback = opts;
            opts = {};
        }
        load_file_1.load_file(path, function (err, content) {
            if (err) {
                return callback(err);
            }
            exports.atat.compile(content, opts, callback);
        });
    },
    compile: function (input, opts, callback) {
        if (opts === void 0) { opts = {}; }
        if (callback === void 0) { callback = common_1.noop; }
        if (typeof opts === 'function') {
            callback = opts;
            opts = {};
        }
        var ctx = new context_1.AtatContext(opts);
        var compiler = new compiler_1.AtatCompiler();
        compiler.compile(input, ctx, function (err, output) {
            if (err) {
                return callback(err);
            }
            var render = new Function(ctx.arguments, output + ';return this.output;');
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
    __express: function (path, options, callback) {
        exports.atat.compileByPath(path, function (err, template) {
            if (err) {
                return callback(err.toString());
            }
            return callback(null, template(options));
        });
    }
};


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var helpers_1 = __webpack_require__(1);
var atat_1 = __webpack_require__(3);
exports.inline_tags = {
    '(@section\\()([^]*?)(\\)@)': output_section,
    '(@layout\\()([^]*?)(\\)@)': compile_layout,
    '(@partial\\()([^]*?)(\\)@)': compile_partial,
    '(@\\()([^]*?)(\\)@)': output_as_text,
    '(@!\\()([^]*?)(\\)@)': output_as_html
};
function output_as_text(inside, ctx, callback) {
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
function output_as_html(inside, ctx, callback) {
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
function compile_layout(inside, ctx, callback) {
    try {
        if (ctx.layout) {
            return callback();
        }
        atat_1.atat.compileByPath(helpers_1.escape_quotes(inside.value), ctx.options, function (err, template) {
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
function compile_partial(inside, ctx, callback) {
    try {
        var value = inside.value.trim();
        if (value == '') {
            return callback(new Error('Partial parsing error'));
        }
        var args_1 = value.split(/\s*,\s*/g);
        var uri = helpers_1.escape_quotes(args_1.shift());
        atat_1.atat.compileByPath(uri, ctx.options, function (err, template) {
            if (err) {
                return callback(err);
            }
            ctx.partials.push(template);
            template.context.parent = ctx;
            var output = "this.output += this.partials[" + (ctx.partials.length - 1) + "](" + args_1 + ");";
            callback(null, output);
        });
    }
    catch (e) {
        callback(e);
    }
}
function output_section(inside, ctx, callback) {
    try {
        var name_1 = helpers_1.escape_quotes(inside.value);
        var output = "this.output += (function(){var s = this.section('" + name_1 + "'); return s?s(" + ctx.arguments + "):\"\";}).call(this);";
        callback(null, output);
    }
    catch (e) {
        callback(e);
    }
}
function output_call_helper(inside, ctx, callback) {
    try {
        var name_2 = inside.left.value.substring(1, inside.left.value.length - 1);
        if (typeof ctx.helpers[name_2] !== 'function') {
            throw "Helper \"" + name_2 + "\" didn't declarated";
        }
        callback(null, "this.output += this.helpers." + name_2 + "(" + inside.value.trim() + ");");
    }
    catch (e) {
        callback(e);
    }
}
exports.output_call_helper = output_call_helper;


/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var fs = __webpack_require__(5);
function load_file(path, callback) {
    fs.readFile(path, 'utf-8', callback);
}
exports.load_file = load_file;
;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = __webpack_require__(0);
var helpers_1 = __webpack_require__(1);
var regexp_1 = __webpack_require__(2);
var inline_1 = __webpack_require__(4);
var AtatCompiler = /** @class */ (function () {
    function AtatCompiler() {
    }
    AtatCompiler.prototype.compile = function (input, ctx, callback) {
        var _this = this;
        try {
            var blocks = regexp_1.match_recursive(input, ctx.tags.open, ctx.tags.close);
            helpers_1.loop_async(blocks, function (block, i, array, callback) {
                try {
                    if (block.name == common_1.VALUE_NAME_OUTSIDE) {
                        if (block.value.trim() == '') {
                            callback(null, '');
                            return;
                        }
                        _this.compile_inline(block.value, ctx, callback);
                        return;
                    }
                    if (block.name == common_1.VALUE_NAME_INSIDE) {
                        var left = block.left, inside = block, right = block.right;
                        var compiler = ctx.compiler(left.value);
                        if (!compiler) {
                            _this.compile_inline(left.value + inside.value + right.value, ctx, callback);
                            return;
                        }
                        compiler.call(_this, inside, ctx, callback);
                        return;
                    }
                }
                catch (e) {
                    callback(e);
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
    AtatCompiler.prototype.compile_inline = function (input, ctx, callback) {
        var _this = this;
        try {
            var blocks = regexp_1.match_inline(input, ctx.inline);
            helpers_1.loop_async(blocks, function (block, i, array, callback) {
                try {
                    if (block.name == common_1.VALUE_NAME_OUTSIDE) {
                        ctx.parts.push(block.value);
                        callback(null, 'this.output += this.parts[' + (ctx.parts.length - 1) + '];');
                        return;
                    }
                    if (block.name == common_1.VALUE_NAME_INSIDE) {
                        var left = block.left, inside = block, right = block.right;
                        if (inside.value.trim() == '') {
                            callback(null, '');
                            return;
                        }
                        var compiler = ctx.compiler(left.value + inside.value + right.value);
                        if (!compiler) {
                            inline_1.output_call_helper.call(_this, inside, ctx, callback);
                            return;
                        }
                        compiler.call(_this, inside, ctx, callback);
                        return;
                    }
                }
                catch (e) {
                    callback(e);
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
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = __webpack_require__(0);
var regexp_1 = __webpack_require__(2);
var helpers_1 = __webpack_require__(1);
var atat_1 = __webpack_require__(3);
exports.tags = {
    '@\\{': compile_code,
    '@if\\s*\\(': compile_if,
    '@while\\s*\\(': compile_while,
    '@for\\s*\\(': compile_for,
    '@function\\s+[$A-Za-z0-9]*\\s*\\(': compile_function,
    '@section\\s+[$A-Za-z0-9]*\\s*\\{': compile_section
};
function compile_code(inside, ctx, callback) {
    callback(null, inside.value.trim());
}
function compile_for(inside, ctx, callback) {
    var code = 'for(' + inside.value + '}';
    var blocks = regexp_1.match_recursive(code, /\{/g, /\}/g);
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
function compile_function(inside, ctx, callback) {
    var left = inside.left.value.trim().substring(1);
    callback(null, left + inside.value.trim() + '}');
}
function compile_if(inside, ctx, callback) {
    var _this = this;
    var code = 'if(' + inside.value + '}';
    var blocks = regexp_1.match_recursive(code, /\{/g, /\}/g);
    helpers_1.loop_async(blocks, function (block, i, array, callback) {
        if (block.name == common_1.VALUE_NAME_OUTSIDE) {
            return callback(null, block.value);
        }
        _this.compile(block.value, ctx, callback);
    }, function (err, results) {
        if (err) {
            return callback(err);
        }
        callback(null, results.join(''));
    });
}
function compile_section(inside, ctx, callback) {
    var block = inside.value.trim();
    var value = inside.left.value.trim();
    var reg_name = /^@section\s+([A-Za-z0-9]+)\s*\{/g;
    var match = regexp_1.regexp_exec(value, reg_name);
    if (!match || match.length > 2) {
        return callback(new Error('Section parsing error'));
    }
    var name = match[1].trim();
    if (ctx.sections[name]) {
        return callback(new Error('Section already exists'));
    }
    atat_1.atat.compile(block, ctx.options, function (err, template) {
        if (err) {
            return callback(err);
        }
        template.context.parent = ctx;
        ctx.sections[name] = template;
        callback(null);
    });
}
function compile_while(inside, ctx, callback) {
    var code = 'while(' + inside.value + '}';
    var blocks = regexp_1.match_recursive(code, /\{/g, /\}/g);
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


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.AtatDefaultOpions = {
    modelname: "it",
    helpersname: "$",
    basePath: "",
    helpers: {}
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var options_1 = __webpack_require__(9);
var helpers_1 = __webpack_require__(1);
var regexp_1 = __webpack_require__(2);
var inline_1 = __webpack_require__(4);
var tags_1 = __webpack_require__(8);
var AtatContext = /** @class */ (function () {
    function AtatContext(opts) {
        var _this = this;
        this.options = helpers_1.merge(options_1.AtatDefaultOpions, opts);
        this.helpers = helpers_1.merge(helpers_1.helpers, opts.helpers);
        this.model = null;
        this.output = '';
        this.parts = [];
        this.parent = null;
        this.arguments = [this.options.modelname, this.options.helpersname, 'body'].join(',');
        this.tags = helpers_1.get_tags(tags_1.tags);
        this.inline = helpers_1.get_tags_inline(inline_1.inline_tags);
        helpers_1.loop(inline_1.inline_tags, function (compiler, regexp) {
            _this.tags.compilers.push({
                compiler: compiler,
                regexp: new RegExp(regexp, 'g')
            });
        });
        this.layout = null;
        this.partials = [];
        this.sections = {};
    }
    AtatContext.prototype.section = function (name) {
        return name ? this.sections[name] || (this.parent && this.parent.section(name)) : null;
    };
    AtatContext.prototype.compiler = function (str) {
        if (str === void 0) { str = ""; }
        for (var i = 0, l = this.tags.compilers.length; i < l; i++) {
            var item = this.tags.compilers[i];
            if (regexp_1.regexp_test(str, item.regexp)) {
                return item.compiler;
            }
        }
        return null;
    };
    return AtatContext;
}());
exports.AtatContext = AtatContext;


/***/ })
/******/ ])["atat"];
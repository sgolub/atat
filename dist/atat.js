(function(){
	
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AtCompiler = function () {
	function AtCompiler() {
		_classCallCheck(this, AtCompiler);
	}

	_createClass(AtCompiler, [{
		key: 'compile',
		value: function compile(input, ctx, callback) {
			var _this = this;

			var blocks = match_recursive(input, ctx.tags.open, ctx.tags.close);

			loop_async(blocks, function (block, i, array, callback) {

				if (block.name == VALUE_NAME_OUTSIDE) {

					if (block.value.trim() == '') {

						callback(null, '');

						return;
					}

					compile_inline.call(_this, block.value, ctx, callback);

					return;
				}

				if (block.name == VALUE_NAME_INSIDE) {

					var left = block.left,
					    inside = block,
					    right = block.right;

					var compiler = ctx.compiler(left.value);

					if (!compiler) {

						compile_inline.call(_this, left.value + inside.value + right.value, ctx, callback);

						return;
					}

					compiler.call(_this, inside, ctx, callback);

					return;
				}
			}, function (err, results) {

				if (err) {

					return callback(err);
				}

				callback(null, results.join(''));
			});
		}
	}]);

	return AtCompiler;
}();

function compile_inline(input, ctx, callback) {
	var _this2 = this;

	var blocks = match_inline(input, ctx.inline);

	loop_async(blocks, function (block, i, array, callback) {

		if (block.name == VALUE_NAME_OUTSIDE) {

			ctx.parts.push(block.value);
			callback(null, 'this.output += this.parts[' + (ctx.parts.length - 1) + '];');

			return;
		}

		if (block.name == VALUE_NAME_INSIDE) {

			var left = block.left,
			    inside = block,
			    right = block.right;

			if (inside.value.trim() == '') {

				callback(null, '');

				return;
			}

			var compiler = ctx.compiler(left.value + inside.value + right.value);

			if (!compiler) {
				ctx.parts.push(left.value + inside.value + right.value);
				callback('this.output += this.parts[' + (ctx.parts.length - 1) + '];');
				return;
			}

			compiler.call(_this2, inside, ctx, callback);

			return;
		}
	}, function (err, results) {

		if (err) {

			return callback(err);
		}

		callback(null, results.join(''));
	});
}

var AtContext = function () {
	function AtContext(opts) {
		var _this3 = this;

		_classCallCheck(this, AtContext);

		this.options = merge(Atat.options, opts);

		this.output = '';

		this.model = null;
		this.helpers = this.options.helpers;

		this.parts = [];

		this.arguments = [this.options.modelname, this.options.helpersname, 'body'].join(',');

		this.tags = get_tags(this.options.tags);
		this.inline = get_tags_inline(this.options.inline);

		this.tags.compilers = [];

		loop(this.options.tags, function (compiler, regexp) {
			_this3.tags.compilers.push({
				compiler: compiler,
				regexp: new RegExp(regexp, 'g')
			});
		});

		loop(this.options.inline, function (compiler, regexp) {
			_this3.tags.compilers.push({
				compiler: compiler,
				regexp: new RegExp(regexp, 'g')
			});
		});

		this.__layout = null;
		this.__partials = [];
		this.__sections = {};

		this.parent = null;
	}

	_createClass(AtContext, [{
		key: 'section',
		value: function section(name) {
			if (!name) {
				return null;
			}

			return this.__sections[name] || this.parent && this.parent.section(name);
		}
	}, {
		key: 'compiler',
		value: function compiler() {
			var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';


			for (var i = 0, l = this.tags.compilers.length; i < l; i++) {
				var item = this.tags.compilers[i];
				if (regexp_test(str, item.regexp)) {
					return item.compiler;
				}
			}

			return null;
		}
	}]);

	return AtContext;
}();

var Atat = function () {
	function Atat() {
		_classCallCheck(this, Atat);
	}

	_createClass(Atat, null, [{
		key: 'compileUri',
		value: function compileUri(uri) {
			var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
			var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};


			if (typeof opts === 'function') {
				callback = opts;
				opts = {};
			}

			loader(uri, function (err, input) {
				if (err) {
					return callback(err);
				}
				Atat.compile(input, opts, callback);
			});
		}
	}, {
		key: 'compile',
		value: function compile(input) {
			var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
			var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};


			if (typeof opts === 'function') {
				callback = opts;
				opts = {};
			}

			var ctx = new AtContext(opts);

			var compiler = new AtCompiler();

			compiler.compile(input, ctx, function (err, output) {

				if (err) {
					return callback(err);
				}

				var render = new Function(ctx.arguments, output + ';return this.output;');

				ctx.template = function (model) {

					ctx.output = '';
					ctx.model = model || ctx.model;

					var body = render.call(ctx, ctx.model, ctx.helpers, ctx.body);

					if (ctx.__layout) {
						ctx.__layout.__context.body = body;
						body = ctx.__layout(ctx.model);
					}

					return body;
				};

				ctx.template.__context = ctx;

				callback(null, ctx.template);
			});
		}
	}]);

	return Atat;
}();

Atat.options = {
	modelname: 'model',
	helpersname: '$',
	tags: {
		'@\\{': compile_code,
		'@if\\s*\\(': compile_if,
		'@while\\s*\\(': compile_while,
		'@for\\s*\\(': compile_for,
		'@function\\s+[$A-Za-z0-9]*\\s*\\(': compile_function,
		'@section\\s+[$A-Za-z0-9]*\\s*\\{': compile_section
	},
	inline: {
		'(@section\\()([^]*?)(\\)@)': output_section,
		'(@layout\\()([^]*?)(\\)@)': compile_layout,
		'(@partial\\()([^]*?)(\\)@)': compile_partial,
		'(@\\()([^]*?)(\\)@)': output_as_text,
		'(@!\\()([^]*?)(\\)@)': output_as_html
	},
	helpers: {
		encode: encode_html
	}
};

function loader(path, callback) {

	// load by http

}

var VALUE_NAME_OUTSIDE = 'outside',
    VALUE_NAME_INSIDE = 'inside',
    HTML_RULES = {
	'&': '&#38;',
	'<': '&#60;',
	'>': '&#62;',
	'"': '&#34;',
	"'": '&#39;',
	'/': '&#47;'
},
    CLEAR_TAGS = /[-[\](){}*+?.,\\^$|#\s]/g,
    MATCH_HTML = /&(?!#?\w+;)|<|>|"|'|\//g;

function get_tags(compilers) {

	var regexps = [];

	loop(compilers, function (compiler, regexp) {

		if (regexps.indexOf(regexp) === -1) {
			regexps.push(regexp);
		}
	});

	return {
		open: new RegExp(regexps.join('|'), 'g'),
		close: /}@/g
	};
}

function get_tags_inline(compilers) {

	var regexps = [];

	loop(compilers, function (compiler, regexp) {
		regexps.push(regexp);
	});

	return new RegExp(regexps.join('|'), 'g');
}

function encode_html() {
	var code = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

	return code.toString().replace(MATCH_HTML, function (m) {
		return HTML_RULES[m] || m;
	});
}

function loop(array, fn) {

	if (Object.prototype.toString.call(array) !== '[object Array]') {
		for (var x in array) {
			if (array.hasOwnProperty(x)) {
				fn(array[x], x, array);
			}
		}
		return;
	}

	for (var i = 0, l = array.length; i < l; i++) {
		fn(array[i], i, array);
	}
}

function loop_async(array, fn, callback) {

	var ready = 0,
	    finished = false,
	    results = [],
	    length = array.length;

	for (var i = 0; i < length; i++) {
		fn(array[i], i, array, cb(i));
	}

	function cb(index) {
		return function (err, res) {
			if (err && !finished) {
				finished = true;
				callback(err);
				return;
			}
			results[index] = res;
			ready++;
			if (!finished && ready == length) {
				finished = true;
				callback(null, results);
			}
		};
	}
}

function merge(src) {
	var dest = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	for (var x in src) {
		if (!dest.hasOwnProperty(x) && src.hasOwnProperty(x)) {
			if (_typeof(src[x]) == 'object') {
				dest[x] = merge(src[x]);
			} else {
				dest[x] = src[x];
			}
		}
	}

	return dest;
}

function match_recursive(str, left, right) {

	var global = left.global,
	    sticky = left.sticky,
	    output = [],
	    openTokens = 0,
	    delimStart = 0,
	    delimEnd = 0,
	    lastOuterEnd = 0,
	    outerStart = void 0,
	    innerStart = void 0,
	    leftMatch = void 0,
	    rightMatch = void 0;

	while (true) {

		leftMatch = regexp_exec(str, left, delimEnd);
		rightMatch = regexp_exec(str, right, delimEnd);

		// Keep the leftmost match only
		if (leftMatch && rightMatch) {
			if (leftMatch.index <= rightMatch.index) {
				rightMatch = null;
			} else {
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
		} else if (!openTokens) {
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
		} else if (rightMatch && openTokens) {

			if (! --openTokens) {

				if (outerStart > lastOuterEnd) {

					output.push({
						name: VALUE_NAME_OUTSIDE,
						value: str.slice(lastOuterEnd, outerStart),
						start: lastOuterEnd,
						end: outerStart
					});
				}

				output.push({
					name: VALUE_NAME_INSIDE,
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
		} else {
			throw new Error('Unbalanced delimiter found in string');
		}

		// If the delimiter matched an empty string, avoid an infinite loop
		if (delimStart === delimEnd) {
			++delimEnd;
		}
	}

	if (global && str.length > lastOuterEnd) {

		output.push({
			name: VALUE_NAME_OUTSIDE,
			value: str.slice(lastOuterEnd),
			start: lastOuterEnd,
			end: str.length
		});
	}

	return output;
}

function regexp_test(str, regexp) {
	var pos = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;


	regexp.lastIndex = pos;

	var test = regexp.test(str);

	if (regexp.global) {

		regexp.lastIndex = test ? regexp.lastIndex : 0;
	}

	return test;
}

function regexp_exec(str, regexp) {
	var pos = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;


	regexp.lastIndex = pos;

	var match = regexp.exec(str);

	if (regexp.global) {

		regexp.lastIndex = match ? regexp.lastIndex : 0;
	}

	return match;
}

function clean_array(array) {
	for (var i = 0; i < array.length; i++) {
		if (typeof array[i] === 'undefined') {
			array.splice(i, 1);
			i--;
		}
	}
}

function match_inline(str, regexp) {

	var global = regexp.global,
	    sticky = regexp.sticky,
	    output = [],
	    lastEnd = 0,
	    leftStart = 0,
	    innerStart = void 0,
	    innerEnd = void 0;

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
				name: VALUE_NAME_OUTSIDE,
				value: str.slice(lastEnd, leftStart),
				start: lastEnd,
				end: leftStart
			});
		}

		output.push({
			name: VALUE_NAME_INSIDE,
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
			name: VALUE_NAME_OUTSIDE,
			value: str.slice(lastEnd),
			start: lastEnd,
			end: str.length
		});
	}

	return output;
}

function compile_code(inside, ctx, callback) {

	callback(null, inside.value.trim());
}

function compile_for(inside, ctx, callback) {

	var code = 'for(' + inside.value + '}';

	var blocks = match_recursive(code, /\{/g, /\}/g);

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
	var _this4 = this;

	var code = 'if(' + inside.value + '}';

	var blocks = match_recursive(code, /\{/g, /\}/g);

	loop_async(blocks, function (block, i, array, callback) {

		if (block.name == VALUE_NAME_OUTSIDE) {
			return callback(null, block.value);
		}

		_this4.compile(block.value, ctx, callback);
	}, function (err, results) {
		if (err) {
			return callback(err);
		}
		callback(null, results.join(''));
	});
}

function output_as_text(inside, ctx, callback) {

	var val = inside.value.trim();

	if (val === '') {
		callback();
	}

	callback(null, 'this.output += $.encode(' + inside.value.trim() + ');');
}

function output_as_html(inside, ctx, callback) {

	var val = inside.value.trim();

	if (val === '') {
		callback();
	}

	callback(null, 'this.output += (' + inside.value.trim() + ');');
}

function compile_layout(inside, ctx, callback) {

	if (ctx.__layout) {
		return callback();
	}

	Atat.compileUri(inside.value.trim(), ctx.options, function (err, template) {

		if (err) {

			return callback(err);
		}

		ctx.__layout = template;
		template.__context.parent = ctx;

		callback();
	});
}

function compile_partial(inside, ctx, callback) {

	var value = inside.value.trim();
	var match = regexp_exec(value, /^([^\s]*)\s/g);

	if (!match && value == '') {
		return callback(new Error('Partial parsing error'));
	}

	var uri = !match ? value : match[0];
	var args = '';

	if (match && match.length == 2) {
		uri = match[1];
		args = value.slice(match[0].length).trim();
	}

	Atat.compileUri(uri, ctx.options, function (err, template) {

		if (err) {

			return callback(err);
		}

		ctx.__partials.push(template);
		template.__context.parent = ctx;

		var output = 'this.output += this.__partials[' + (ctx.__partials.length - 1) + '](' + args + ');';

		callback(null, output);
	});
}

function output_section(inside, ctx, callback) {

	var name = inside.value.trim();

	var output = 'this.output += (function(){var s = this.section(\'' + name + '\'); return s?s(' + ctx.arguments + '):"";}).call(this);';

	callback(null, output);
}

function compile_section(inside, ctx, callback) {

	var block = inside.value.trim();

	var value = inside.left.value.trim();
	var reg_name = /^@section\s+([A-Za-z0-9]+)\s*\{/g;
	var match = regexp_exec(value, reg_name);

	if (!match || match.length > 2) {
		return callback(new Error('Section parsing error'));
	}

	var name = match[1].trim();

	if (ctx.__sections[name]) {
		return callback(new Error('Section already exists'));
	}

	Atat.compile(block, ctx.options, function (err, template) {

		if (err) {

			return callback(err);
		}

		ctx.__sections[name] = template;
		template.__context.parent = ctx;

		callback(null);
	});
}

function compile_while(inside, ctx, callback) {

	var code = 'while(' + inside.value + '}';

	var blocks = match_recursive(code, /\{/g, /\}/g);

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

var root = (function() { return this || (0, eval)("this"); }());
if(typeof root !== "undefined"){var previous_atat = root.atat; Atat.noConflict = function(){ root.atat = previous_atat; return Atat; }}
if(typeof module !== "undefined" && module.exports){ module.exports = Atat; }else if(typeof define === "function" && define.amd){ define(function() { return Atat; }); }else{ root.atat = Atat; }
}());
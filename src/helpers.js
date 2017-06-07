const
	VALUE_NAME_OUTSIDE = 'outside',
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

	let regexps = [];

	loop(compilers, (compiler, regexp) => {

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

	let regexps = [];

	loop(compilers, (compiler, regexp) => {
		regexps.push(regexp);
	});

	regexps.push('(@[A-Za-z0-9$]+\\()([^]*?)(\\)@)');

	return new RegExp(regexps.join('|'), 'g');
}

function encode_html(code = '') {
	return code.toString().replace(MATCH_HTML, m => {
		return HTML_RULES[m] || m;
	});
}

function loop(array, fn) {

	if (Object.prototype.toString.call(array) !== '[object Array]') {
		for (let x in array) {
			if (array.hasOwnProperty(x)) {
				fn(array[x], x, array);
			}
		}
		return;
	}

	for (let i = 0, l = array.length; i < l; i++) {
		fn(array[i], i, array);
	}
}

function loop_async(array, fn, callback) {

	let ready = 0,
		finished = false,
		results = [],
		length = array.length;

	for (let i = 0; i < length; i++) {
		fn(array[i], i, array, cb(i));
	}

	function cb(index) {
		return (err, res) => {
			if (err && !finished) {
				finished = true
				callback(err);
				return;
			}
			results[index] = res;
			ready++;
			if (!finished && ready == length) {
				finished = true
				callback(null, results);
			}
		};
	}
}

function merge(src, dest = {}) {
	for (let x in src) {
		if (!dest.hasOwnProperty(x) && src.hasOwnProperty(x)) {
			if (typeof src[x] == 'object') {
				dest[x] = merge(src[x]);
			} else {
				dest[x] = src[x];
			}
		}
	}

	return dest;
}

function trim_string(str, ...chars) {
	if (chars.length == 0) {
		return String.prototype.trim.call(str);
	}

	while (chars.indexOf(str.charAt(0)) >= 0) {
		str = str.substring(1);
	}

	while (chars.indexOf(str.charAt(string.length - 1)) >= 0) {
		str = str.substring(0, str.length - 1);
	}

	return str;
}

function escape_quotes(str) {
	return trim_string(str).replace(/^"(.*)"$/g, '$1').replace(/^'(.*)'$/g, '$1');
}
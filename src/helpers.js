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

	let open = [],
		close = [];

	loop(compilers, (compiler, tags) => {

		tags = tags.split('...');

		tags[0] = tags[0].replace(CLEAR_TAGS, '\\$&');
		tags[1] = tags[1].replace(CLEAR_TAGS, '\\$&');

		if (open.indexOf(tags[0]) === -1) {
			open.push(tags[0]);
		}

		if (close.indexOf(tags[1]) === -1) {
			close.push(tags[1]);
		}

	});

	open.sort((a, b) => {
		return a.length < b.length;
	});
	close.sort((a, b) => {
		return a.length < b.length;
	});

	return {
		open: new RegExp(open.join('|'), 'g'),
		close: new RegExp(close.join('|'), 'g')
	};
}

function get_tags_inline(compilers) {

	let open = [],
		close = [];

	loop(compilers, (compiler, tags) => {

		tags = tags.split('...');

		tags[0] = tags[0].replace(CLEAR_TAGS, '\\$&');
		tags[1] = tags[1].replace(CLEAR_TAGS, '\\$&');

		if (open.indexOf(tags[0]) === -1) {
			open.push(tags[0]);
		}

		if (close.indexOf(tags[1]) === -1) {
			close.push(tags[1]);
		}

	});

	open.sort((a, b) => {
		return a.length < b.length;
	});
	close.sort((a, b) => {
		return a.length < b.length;
	});

	return new RegExp(`(${open.join('|')})([^]*?)(${close.join('|')})`, 'g');
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

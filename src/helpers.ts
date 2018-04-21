import { ArrayOrKeyValuePair, KeyValuePair, AtatCallback, AtatCompileFunction, MATCH_HTML, HTML_RULES, AtatHelper, AtatTag } from "./common";

export const helpers: { [key: string]: AtatHelper } = {
	encode: encode_html,
	json: json_stringify,
	join: join_helper,
	upper: uppercase_helper,
	lower: lowercase_helper
};

export function merge(src: KeyValuePair<any>, dest: KeyValuePair<any> = {}) {
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

export function get_tags(tags: { [key: string]: AtatCompileFunction }) {

	let regexps: string[] = [];

	loop(tags, (compiler: AtatCompileFunction, regexp: string) => {
		if (regexps.indexOf(regexp) === -1) {
			regexps.push(regexp);
		}
	});

	let compilers: AtatTag[] = [];

	loop(tags, (compiler, regexp: string) => {
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

export function get_tags_inline(inline_tags: { [key: string]: AtatCompileFunction }) {

	const regexps: string[] = [];

	loop(inline_tags, (compiler: AtatCompileFunction, regexp: string) => {
		regexps.push(regexp);
	});

	regexps.push('(@[A-Za-z0-9$]+\\()([^]*?)(\\)@)');

	return new RegExp(regexps.join('|'), 'g');
}

export function loop<T>(
	array: ArrayOrKeyValuePair<T>,
	fn: (item: T, index: string | number, array: ArrayOrKeyValuePair<T>) => void) {

	if (Object.prototype.toString.call(array) !== '[object Array]') {
		array = array as KeyValuePair<T>;
		for (let x in array) {
			if (array.hasOwnProperty(x)) {
				fn(array[x], x, array);
			}
		}
		return;
	}

	array = array as T[];
	for (let i = 0, l = array.length; i < l; i++) {
		fn(array[i], i, array);
	}
}

export function loop_async<T>(
	array: T[],
	fn: (item: T, i: number, array: T[], callback: AtatCallback<string>) => void,
	callback: AtatCallback<string[]>) {

	let ready = 0,
		finished = false,
		results: string[] = [],
		length = array.length;

	for (let i = 0; i < length; i++) {
		fn(array[i], i, array, cb(i));
	}

	function cb(index: number) {
		return (err: any, res: string) => {

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

export function encode_html(code = '') {
	return code.toString().replace(MATCH_HTML, m => {
		return HTML_RULES[m] || m;
	});
}

export function trim_string(str: string, ...chars: string[]) {
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

export function escape_quotes(str: string) {
	return trim_string(str).replace(/^"(.*)"$/g, '$1').replace(/^'(.*)'$/g, '$1');
}

export function json_stringify(obj: any) {
	return JSON.stringify(obj);
}

export function join_helper(array: string[] = [], separator = '') {
	return Array.prototype.join.call(array, separator);
}

export function uppercase_helper(str = '') {
	return str.toString().toUpperCase();
}

export function lowercase_helper(str = '') {
	return str.toString().toLowerCase();
}

export function resolveUrl(base: string, relative: string) {
	const stack = base.split("/"),
		parts = relative.split("/");

	stack.pop();

	for (let i = 0; i < parts.length; i++) {

		if (parts[i] == ".") {
			continue;
		}

		if (parts[i] == "..") {
			stack.pop();
		} else {
			stack.push(parts[i]);
		}
	}

	return stack.join("/");
}

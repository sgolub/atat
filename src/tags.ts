import { AtatCompileFunction, MuchResult, AtatCallback, VALUE_NAME_OUTSIDE } from "./common";
import { AtatContext } from "./context";
import { match_recursive, regexp_exec } from "./regexp";
import { loop_async } from "./helpers";
import { atat } from "./atat";

export const tags: { [key: string]: AtatCompileFunction } = {
	'@\\{': compile_code,
	'@if\\s*\\(': compile_if,
	'@while\\s*\\(': compile_while,
	'@for\\s*\\(': compile_for,
	'@function\\s+[$A-Za-z0-9]*\\s*\\(': compile_function,
	'@section\\s+[$A-Za-z0-9]*\\s*\\{': compile_section
};

function compile_code(inside: MuchResult, ctx: AtatContext, callback: AtatCallback<string>) {

	callback(null, inside.value.trim());
}

function compile_for(inside: MuchResult, ctx: AtatContext, callback: AtatCallback<string>) {

	let code = 'for(' + inside.value + '}';

	let blocks = match_recursive(code, /\{/g, /\}/g);

	let out = '';

	out += blocks[0].value;
	out += '{';

	this.compile(blocks[1].value, ctx, (err: any, res: string) => {

		if (err) {
			return callback(err);
		}

		out += res;
		out += '}';

		callback(null, out);
	});
}

function compile_function(inside: MuchResult, ctx: AtatContext, callback: AtatCallback<string>) {

	let left = inside.left.value.trim().substring(1);

	callback(null, left + inside.value.trim() + '}');
}

function compile_if(inside: MuchResult, ctx: AtatContext, callback: AtatCallback<string>) {

	let code = 'if(' + inside.value + '}';

	let blocks = match_recursive(code, /\{/g, /\}/g);

	loop_async(blocks, (block, i, array, callback) => {

		if (block.name == VALUE_NAME_OUTSIDE) {
			return callback(null, block.value);
		}

		this.compile(block.value, ctx, callback);

	}, (err, results) => {
		if (err) {
			return callback(err);
		}
		callback(null, results.join(''));
	});
}

function compile_section(inside: MuchResult, ctx: AtatContext, callback: AtatCallback<string>) {

	let block = inside.value.trim();

	let value = inside.left.value.trim();
	let reg_name = /^@section\s+([A-Za-z0-9]+)\s*\{/g;
	let match = regexp_exec(value, reg_name);

	if (!match || match.length > 2) {
		return callback(new Error('Section parsing error'));
	}

	let name = match[1].trim();

	if (ctx.sections[name]) {
		return callback(new Error('Section already exists'));
	}

	atat.parse(block, ctx.options, (err, template) => {

		if (err) {

			return callback(err);
		}

		template.context.parent = ctx;
		ctx.sections[name] = template;

		callback(null);
	});
}

function compile_while(inside: MuchResult, ctx: AtatContext, callback: AtatCallback<string>) {

	let code = 'while(' + inside.value + '}';

	const blocks = match_recursive(code, /\{/g, /\}/g);

	let out = '';

	out += blocks[0].value;
	out += '{';

	this.compile(blocks[1].value, ctx, (err: any, res: string) => {

		if (err) {
			return callback(err);
		}

		out += res;
		out += '}';

		callback(null, out);
	});
}

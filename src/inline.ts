import { AtatCallback, AtatTemplate, AtatCompileFunction } from "./common";
import { AtatContext } from "./context";
import { MuchResult } from "./common";
import { escape_quotes } from "./helpers";
import { atat } from "./atat";

export const inline_tags: { [key: string]: AtatCompileFunction } = {
	'(@section\\()([^]*?)(\\)@)': output_section,
	'(@layout\\()([^]*?)(\\)@)': compile_layout,
	'(@partial\\()([^]*?)(\\)@)': compile_partial,
	'(@\\()([^]*?)(\\)@)': output_as_text,
	'(@!\\()([^]*?)(\\)@)': output_as_html
};

function output_as_text(inside: MuchResult, ctx: AtatContext, callback: AtatCallback<string>) {

	try {
		var val = inside.value.trim();

		if (val === '') {
			callback();
		}

		callback(null, `this.output += this.helpers.encode(${inside.value.trim()});`);
	} catch (e) {
		callback(e);
	}
}

function output_as_html(inside: MuchResult, ctx: AtatContext, callback: AtatCallback<string>) {

	try {
		var val = inside.value.trim();

		if (val === '') {
			callback();
		}

		callback(null, `this.output += (${inside.value.trim()});`);
	} catch (e) {
		callback(e);
	}
}

function compile_layout(inside: MuchResult, ctx: AtatContext, callback: AtatCallback<string>) {

	try {
		if (ctx.layout) {
			return callback();
		}

		atat.loadAndParse(escape_quotes(inside.value), ctx.options, (err: any, template: AtatTemplate) => {

			if (err) {

				return callback(err);
			}

			ctx.layout = template;
			template.context.parent = ctx;

			callback();
		});
	} catch (e) {
		callback(e);
	}
}

function compile_partial(inside: MuchResult, ctx: AtatContext, callback: AtatCallback<string>) {

	try {
		let value = inside.value.trim();

		if (value == '') {
			return callback(new Error('Partial parsing error'));
		}

		let args = value.split(/\s*,\s*/g);

		let uri = escape_quotes(args.shift());

		atat.loadAndParse(uri, ctx.options, (err: any, template: AtatTemplate) => {

			if (err) {

				return callback(err);
			}

			ctx.partials.push(template);
			template.context.parent = ctx;

			let output = `this.output += this.partials[${ctx.partials.length - 1}](${args});`;

			callback(null, output);
		});
	} catch (e) {
		callback(e);
	}
}

function output_section(inside: MuchResult, ctx: AtatContext, callback: AtatCallback<string>) {

	try {
		let name = escape_quotes(inside.value);

		let output = `this.output += (function(){var s = this.section('${name}'); return s?s(${ctx.arguments}):"";}).call(this);`;

		callback(null, output);
	} catch (e) {
		callback(e);
	}
}

export function output_call_helper(inside: MuchResult, ctx: AtatContext, callback: AtatCallback<string>) {

	try {
		let name = inside.left.value.substring(1, inside.left.value.length - 1);

		if (typeof ctx.helpers[name] !== 'function') {
			throw `Helper "${name}" didn't declarated`;
		}

		callback(null, `this.output += this.helpers.${name}(${inside.value.trim()});`);
	} catch (e) {
		callback(e);
	}
}

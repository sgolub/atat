function output_as_text(inside, ctx, callback) {

	var val = inside.value.trim();

	if (val === '') {
		callback();
	}

	callback(null, `this.output += this.helpers.encode(${inside.value.trim()});`);
}

function output_as_html(inside, ctx, callback) {

	var val = inside.value.trim();

	if (val === '') {
		callback();
	}

	callback(null, `this.output += (${inside.value.trim()});`);
}

function compile_layout(inside, ctx, callback) {

	if (ctx.__layout) {
		return callback();
	}

	Atat.compileUri(escape_quotes(inside.value), ctx.options, (err, template) => {

		if (err) {

			return callback(err);
		}

		ctx.__layout = template;
		template.__context.parent = ctx;

		callback();
	});
}

function compile_partial(inside, ctx, callback) {

	let value = inside.value.trim();

	if (value == '') {
		return callback(new Error('Partial parsing error'));
	}

	let args = value.split(/\s*,\s*/g);

	let uri = escape_quotes(args.shift());

	Atat.compileUri(uri, ctx.options, (err, template) => {

		if (err) {

			return callback(err);
		}

		ctx.__partials.push(template);
		template.__context.parent = ctx;

		let output = `this.output += this.__partials[${ctx.__partials.length - 1}](${args});`;

		callback(null, output);
	});
}

function output_section(inside, ctx, callback) {

	let name = escape_quotes(inside.value);

	let output = `this.output += (function(){var s = this.section('${name}'); return s?s(${ctx.arguments}):"";}).call(this);`;

	callback(null, output);
}

function output_call_helper(inside, ctx, callback) {

	let name = inside.left.value.substring(1, inside.left.value.length - 1);

	if (typeof ctx.helpers[name] === 'function') {

		callback(null, `this.output += this.helpers.${name}(${inside.value.trim()});`);

		return;
	}

	callback(new Error(`Helper "${name}" didn't declarated`));
}

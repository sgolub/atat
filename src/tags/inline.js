function output_as_text(inside, ctx, callback) {

	var val = inside.value.trim();

	if (val === '') {
		callback();
	}

	callback(null, `this.output += $.encode(${inside.value.trim()});`);
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

	Atat.compileUri(inside.value.trim(), ctx.options, (err, template) => {

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
	let match = regexp_exec(value, /^([^\s]*)\s/g);

	if (!match && value == '') {
		return callback(new Error('Partial parsing error'));
	}

	let uri = !match ? value : match[0];
	let args = '';

	if (match && match.length == 2) {
		uri = match[1];
		args = value.slice(match[0].length).trim();
	}

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

	let name = inside.value.trim();

	let output = `this.output += (function(){var s = this.section('${name}'); return s?s(${ctx.arguments}):"";}).call(this);`;

	callback(null, output);
}

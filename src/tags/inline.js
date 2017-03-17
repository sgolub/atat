function output_as_text(inside, ctx, callback) {

	callback(null, 'this.output += $.encode((' + inside.value.trim() + ')||"");');
}

function output_as_html(inside, ctx, callback) {

	callback(null, 'this.output += ((' + inside.value.trim() + ')||"");');
}

function compile_layout(inside, ctx, callback) {

	if (ctx.__layout) {
		return callback();
	}

	Atat.compileUri(inside.value.trim(), ctx.options, (err, template) => {

		ctx.__layout = template;

		callback();
	});
}

function compile_partial(uri, ctx, callback) {

	loader(uri, (err, input) => {

		if (err) {
			
			return callback(err);
		}

		this.compile(input, ctx.options, callback);
	});
}


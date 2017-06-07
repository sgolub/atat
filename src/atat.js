class Atat {

	static compileUri(uri, opts = {}, callback = () => { }) {

		if (typeof opts === 'function') {
			callback = opts;
			opts = {};
		}

		Atat.fileLoader(uri, (err, input) => {
			if (err) {
				return callback(err);
			}
			Atat.compile(input, opts, callback);
		});
	}

	static compile(input, opts = {}, callback = () => { }) {

		if (typeof opts === 'function') {
			callback = opts;
			opts = {};
		}

		let ctx = new AtContext(opts);

		let compiler = new AtCompiler();

		compiler.compile(input, ctx, (err, output) => {

			if (err) {
				return callback(err);
			}

			let render = new Function(ctx.arguments, output + ';return this.output;');

			ctx.template = function (model) {

				ctx.output = '';
				ctx.model = model || ctx.model;

				let body = render.call(ctx, ctx.model, ctx.helpers, ctx.body);

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
}

Atat.fileLoader = fileLoader;

Atat.options = {
	modelname: 'it',
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

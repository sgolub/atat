import { AtatContext } from "./context";
import { AtatOptions } from "./options";
import { AtatCompiler } from "./compiler";
import { AtatCallback, noop, AtatTemplate } from "./common";
import { load_file } from "./load_file";

export const atat = {

	compileByPath(path: string, opts: AtatOptions | AtatCallback<AtatTemplate> = {}, callback: AtatCallback<AtatTemplate> = noop) {

		if (typeof opts === 'function') {
			callback = opts;
			opts = {};
		}

		load_file(path, (err, content) => {

			if (err) {
				return callback(err);
			}

			atat.compile(content, opts, callback);
		});
	},

	compile(input: string, opts: AtatOptions | AtatCallback<AtatTemplate> = {}, callback: AtatCallback<AtatTemplate> = noop) {

		if (typeof opts === 'function') {
			callback = opts;
			opts = {};
		}

		const ctx = new AtatContext(opts);

		const compiler = new AtatCompiler();

		compiler.compile(input, ctx, (err: any, output: string) => {

			if (err) {
				return callback(err);
			}

			let render = new Function(ctx.arguments, output + ';return this.output;');

			ctx.template = function (model: any) {

				try {
					ctx.output = '';
					ctx.model = model || ctx.model;

					let body = render.call(ctx, ctx.model, ctx.helpers, ctx.body);

					if (ctx.layout) {
						ctx.layout.context.body = body;
						body = ctx.layout(ctx.model);
					}

					return body;
				} catch (e) {
					return e.toString();
				}
			};

			ctx.template.context = ctx;

			callback(null, ctx.template);

		});
	},

	__express(path: string, options: any, callback: (err?: any, res?: string) => any) {

		atat.compileByPath(path, (err: any, template: AtatTemplate) => {

			if (err) {
				return callback(err.toString());
			}

			return callback(null, template(options));
		});
	}
};

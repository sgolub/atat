import { AtatContext } from "./context";
import { AtatOptions, AtatDefaultOpions } from "./options";
import { AtatCompiler } from "./compiler";
import { AtatCallback, noop, AtatTemplate } from "./common";
import { load_file } from "./load_file";
import { merge } from "./helpers";

export const atat = {

	config(opts: AtatOptions): void {
		opts = merge(AtatDefaultOpions, opts);
		for (let x in opts) {
			if (AtatDefaultOpions.hasOwnProperty(x)) {
				AtatDefaultOpions[x] = opts[x];
			}
		}
	},

	parse(input: string, options: AtatOptions | AtatCallback<AtatTemplate> = {}, callback: AtatCallback<AtatTemplate> = noop) {
		if (typeof options === 'function') {
			callback = options;
			options = {};
		}

		if (callback === noop && typeof (Promise) !== 'undefined') {
			return new Promise((resolve, reject) => {
				atat.parse(input, options, (err, result) => {
					err ? reject(err) : resolve(result);
				});
			});
		}

		const ctx = new AtatContext(options);

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

	loadAndParse(path: string, options: AtatOptions | AtatCallback<AtatTemplate> = {}, callback: AtatCallback<AtatTemplate> = noop): Promise<AtatTemplate> | void {
		if (typeof options === 'function') {
			callback = options;
			options = {};
		}

		if (callback === noop && typeof (Promise) !== 'undefined') {
			return new Promise<AtatTemplate>((resolve, reject) => {
				atat.loadAndParse(path, options, (err, result) => {
					err ? reject(err) : resolve(result);
				});
			});
		}

		load_file(path, (err, content) => {
			err ? callback(err) : atat.parse(content, options, callback);
		});
	},

	render(input: string, model: any = {}, options: AtatOptions | AtatCallback<string> = {}, callback: AtatCallback<string> = noop) {
		if (typeof (options) === 'function') {
			callback = options;
			options = {};
		}

		if (callback === noop && typeof (Promise) !== 'undefined') {
			return new Promise((resolve, reject) => {
				atat.render(input, model, options, (err, result) => {
					err ? reject(err) : resolve(result);
				});
			});
		}

		atat.parse(input, options, function (err, render) {
			err ? callback(err) : callback(null, render(model));
		});
	},

	loadAndRender(path: string, model: any, options: AtatOptions | AtatCallback<string> = {}, callback: AtatCallback<string> = noop) {
		if (typeof (options) === 'function') {
			callback = options;
			options = {};
		}

		if (callback === noop && typeof (Promise) !== 'undefined') {
			return new Promise((resolve, reject) => {
				atat.loadAndRender(path, model, options, (err, result) => {
					err ? reject(err) : resolve(result);
				});
			});
		}

		atat.loadAndParse(path, options, function (err, render) {
			err ? callback(err) : callback(null, render(model));
		});
	},

	__express(path: string, options: any, callback: (err?: any, res?: string) => any) {
		atat.loadAndParse(path, (err: any, template: AtatTemplate) => {
			err ? callback(err.toString()) : callback(null, template(options));
		});
	}
};

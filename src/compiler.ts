import { AtatContext } from "./context";
import { AtatCallback, VALUE_NAME_OUTSIDE, VALUE_NAME_INSIDE } from "./common";
import { loop_async } from "./helpers";
import { match_recursive, match_inline } from "./regexp";
import { output_call_helper } from "./inline";

export class AtatCompiler {

	compile(input: string, ctx: AtatContext, callback: AtatCallback<string>) {

		try {

			if (input.length == 0) {
				callback(null, '');
				return;
			}

			const blocks = match_recursive(input, ctx.tags.open, ctx.tags.close);

			loop_async(blocks, (block, i, array, callback) => {

				try {

					if (block.name == VALUE_NAME_OUTSIDE) {

						if (block.value.trim() == '') {

							callback(null, '');

							return;
						}

						this.compile_inline(block.value, ctx, callback);

						return;
					}

					if (block.name == VALUE_NAME_INSIDE) {

						let left = block.left,
							inside = block,
							right = block.right;

						let compiler = ctx.compiler(left.value);

						if (!compiler) {

							this.compile_inline(left.value + inside.value + right.value, ctx, callback);

							return;
						}

						compiler.call(this, inside, ctx, callback);

						return;
					}

				} catch (e) {

					callback(e);
				}

			}, (err, results) => {

				if (err) {

					return callback(err);
				}

				callback(null, results.join(''));
			});

		} catch (e) {
			callback(e);
		}
	}

	private compile_inline(input: string, ctx: AtatContext, callback: AtatCallback<string>) {

		try {

			if (input.length == 0) {
				callback(null, '');
				return;
			}

			const blocks = match_inline(input, ctx.inline);

			loop_async(blocks, (block, i, array, callback) => {

				try {
					if (block.name == VALUE_NAME_OUTSIDE) {

						ctx.parts.push(block.value);
						callback(null, 'this.output += this.parts[' + (ctx.parts.length - 1) + '];');

						return;
					}

					if (block.name == VALUE_NAME_INSIDE) {

						let left = block.left,
							inside = block,
							right = block.right;

						if (inside.value.trim() == '') {

							callback(null, '');

							return;
						}

						let compiler = ctx.compiler(left.value + inside.value + right.value);

						if (!compiler) {
							output_call_helper.call(this, inside, ctx, callback);
							return;
						}

						compiler.call(this, inside, ctx, callback);

						return;
					}
				} catch (e) {

					callback(e);
				}

			}, (err, results) => {

				if (err) {

					return callback(err);
				}

				callback(null, results.join(''));
			});

		} catch (e) {
			callback(e);
		}
	}
}

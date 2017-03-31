class AtCompiler {

	compile(input, ctx, callback) {

		let blocks = match_recursive(input, ctx.tags.open, ctx.tags.close);

		loop_async(blocks, (block, i, array, callback) => {

			if (block.name == VALUE_NAME_OUTSIDE) {

				if (block.value.trim() == '') {

					callback(null, '');

					return;
				}

				compile_inline.call(this, block.value, ctx, callback);

				return;
			}

			if (block.name == VALUE_NAME_INSIDE) {

				let left = block.left,
					inside = block,
					right = block.right;

				let compiler = ctx.compiler(left.value);

				if (!compiler) {

					compile_inline.call(this, left.value + inside.value + right.value, ctx, callback);

					return;
				}

				compiler.call(this, inside, ctx, callback);

				return;
			}

		}, (err, results) => {

			if (err) {

				return callback(err);
			}

			callback(null, results.join(''));
		});
	}
}

function compile_inline(input, ctx, callback) {

	const blocks = match_inline(input, ctx.inline);

	loop_async(blocks, (block, i, array, callback) => {

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

	}, (err, results) => {

		if (err) {

			return callback(err);
		}

		callback(null, results.join(''));
	});
}

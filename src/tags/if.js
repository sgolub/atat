function compile_if(inside, ctx, callback) {

	let code = 'if' + inside.value + '}';

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

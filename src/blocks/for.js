function compile_for(inside, ctx, callback) {

	let code = 'for(' + inside.value + '}';

	let blocks = match_recursive(code, /\{/g, /\}/g);

	let out = '';

	out += blocks[0].value;
	out += '{';

	this.compile(blocks[1].value, ctx, (err, res) => {

		if (err) {
			return callback(err);
		}

		out += res;
		out += '}';

		callback(null, out);
	});
}

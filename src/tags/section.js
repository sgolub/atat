function compile_section(inside, ctx, callback) {

	let value = inside.value.trim();
	let reg_name = /^\s*([A-Za-z0-9]+)\s*\{/g;

	let match = regexp_exec(value, reg_name);
	let block = value.replace(reg_name, '');

	if (!match && match.length > 1) {
		return callback(new Error('Section parsing error'));
	}

	let name = match[1].trim();

	if (ctx.__sections[name]) {
		return callback(new Error('Section already exists'));
	}

	this.compile(block, ctx, (err, output) => {

		if (err) {

			return callback(err);
		}

		ctx.__sections[name] = output;

		callback(null);
	});
}

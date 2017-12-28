function compile_section(inside, ctx, callback) {

	let block = inside.value.trim();

	let value = inside.left.value.trim();
	let reg_name = /^@section\s+([A-Za-z0-9]+)\s*\{/g;
	let match = regexp_exec(value, reg_name);

	if (!match || match.length > 2) {
		return callback(new Error('Section parsing error'));
	}

	let name = match[1].trim();

	if (ctx.__sections[name]) {
		return callback(new Error('Section already exists'));
	}

	Atat.compile(block, ctx.options, (err, template) => {

		if (err) {

			return callback(err);
		}

		template.__context.parent = ctx;
		ctx.__sections[name] = template;

		callback(null);
	});
}

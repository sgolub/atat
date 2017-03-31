function compile_function(inside, ctx, callback) {

	let left = inside.left.value.trim().substring(1);

	callback(null, left + inside.value.trim() + '}');
}

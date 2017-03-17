function compile_function(inside, ctx, callback) {

	callback(null, 'function ' + inside.value.trim() + '}');
}

Atat.__express = function(path, options, callback) {

	Atat.compileUri(path, (err, template) => {

		if (err) {
			return callback(err.toString());
		}

		return callback(null, template(options));

	});
};

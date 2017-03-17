Atat.__express = function(path, options, callback) {

	Atat.compileUri(path, (err, template) => {

		if (err) {
			return callback(err);
		}

		return callback(null, template(options));

	});
};

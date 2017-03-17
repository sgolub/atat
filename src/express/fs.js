const fs = require('fs');

function loader(path, callback) {

	fs.readFile(path, 'utf-8', (err, file) => {

		if (err) {
			return callback(err);
		}

		callback(null, file);

	});

}

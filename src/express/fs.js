const fs = require('fs');

function fileLoader(path, callback) {
	fs.readFile(path, 'utf-8', callback);
}

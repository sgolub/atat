const fs = require('fs');

function loader(path, callback) {
	fs.readFile(path, 'utf-8', callback);
}

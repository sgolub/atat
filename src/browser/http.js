function loader(path, callback) {

	var request = new XMLHttpRequest();
	request.open('GET', path, true);

	request.onreadystatechange = function() {
		if (this.readyState === 4) {
			if (this.status >= 200 && this.status < 400) {
				callback(null, this.responseText);
			} else {
				callback(new Error('Not able to load template "' + path + '"'));
			}
		}
	};

	request.send();
	request = null;
}

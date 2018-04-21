'use strict';

describe("Express only tests", function() {

	var fs;

	beforeEach(function() {
		fs = require('fs');
	});

	afterEach(function() {
		simple.restore(fs, "readFile");
	});

	it("Render template", function(done) {

		simple.mock(fs, "readFile").callback(null, "Hello @(it.name)@!");

		atat.__express("/path/", { name: 'world' }, function(err, result) {

			expect(err).to.eql(null);
			expect(result).to.eql("Hello world!");

			done();

		});
	});

});
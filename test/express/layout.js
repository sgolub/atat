'use strict';

describe("Express layout tests", function() {

	var fs;

	beforeEach(function() {
		fs = require('fs');
	});

	afterEach(function() {
		simple.restore(fs, "readFile");
	});

	it("Render template with layout", function(done) {

		simple.mock(fs, "readFile").callback(null, "<html>@!(body)@</html>");

		Atat.compile("@layout(./path/layout)@ Body <strong>content</strong>", function(err, tmpl) {

			expect(err).to.eql(null);
			expect(tmpl()).to.eql("<html> Body <strong>content</strong></html>");

			done();
		});
	});

	it("Render template with layout and model", function(done) {

		simple.mock(fs, "readFile").callback(null, "<html>@!(body)@@(it.value)@</html>");

		Atat.compile("@layout(./path/layout)@ Body @(it.value)@<strong>content</strong>", function(err, tmpl) {

			expect(err).to.eql(null);
			expect(tmpl({ value: "foo" })).to.eql("<html> Body foo<strong>content</strong>foo</html>");

			done();
		});
	});

});

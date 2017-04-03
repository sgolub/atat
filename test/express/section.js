'use strict';

describe("Express section tests", function() {

	var fs;

	beforeEach(function() {
		fs = require('fs');
	});

	afterEach(function() {
		simple.restore(fs, "readFile");
	});

	it("Render template with section", function(done) {

		simple.mock(fs, "readFile").callback(null, "<html>@!(body)@</html>@section(script)@");

		Atat.compile("@layout(./path/layout)@ Body <strong>content</strong>@section script{<script>'foo';</script>}@", function(err, tmpl) {

			expect(err).to.eql(null);
			expect(tmpl()).to.eql("<html> Body <strong>content</strong></html><script>'foo';</script>");

			done();
		});
	});

	it("Render template with section and model", function(done) {

		simple.mock(fs, "readFile").callback(null, "<html>@!(body)@@(it.value)@</html>@section(script)@");

		Atat.compile("@layout(./path/layout)@ Body <strong>content</strong>@section script{<script>'foo@(it.value)@';</script>}@", function(err, tmpl) {

			expect(err).to.eql(null);
			expect(tmpl({ value: '111' })).to.eql("<html> Body <strong>content</strong>111</html><script>'foo111';</script>");

			done();
		});
	});

});

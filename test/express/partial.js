'use strict';

describe("Express partials tests", function() {

	var fs;

	beforeEach(function() {
		fs = require('fs');
	});

	afterEach(function() {
		simple.restore(fs, "readFile");
	});

	it("Render template with partial", function(done) {

		simple.mock(fs, "readFile").callback(null, "<div>Partial view</div>");

		atat.parse("Body <strong>content</strong> @partial(./path/partial)@", function(err, tmpl) {

			expect(err).to.eql(null);
			expect(tmpl()).to.eql("Body <strong>content</strong> <div>Partial view</div>");

			done();
		});
	});

	it("Render template with partial and model", function(done) {

		simple.mock(fs, "readFile").callback(null, "<div>Partial view @(it.value)@</div>");

		atat.parse("Body @(it.value)@ <strong>content</strong> @partial(./path/partial, it)@", function(err, tmpl) {

			expect(err).to.eql(null);
			expect(tmpl({ value: "foo" })).to.eql("Body foo <strong>content</strong> <div>Partial view foo</div>");

			done();
		});
	});

});

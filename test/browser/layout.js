'use strict';

describe("Express layout tests", function() {

	var template = "";

	beforeEach(function() {
		simple.mock(XMLHttpRequest.prototype, "open");
		simple.mock(XMLHttpRequest.prototype, "send").callFn(function() {
			this.onreadystatechange.call({
				readyState: 4,
				status: 200,
				responseText: template
			});
		});
	});

	afterEach(function() {
		simple.restore(XMLHttpRequest.prototype, "open");
		simple.restore(XMLHttpRequest.prototype, "send");
	});

	it("Render template with layout", function(done) {

		template = "<html>@!(body)@</html>";

		atat.parse("@layout(./path/layout)@ Body <strong>content</strong>", function(err, tmpl) {

			expect(err).to.eql(null);
			expect(tmpl()).to.eql("<html> Body <strong>content</strong></html>");

			done();
		});
	});

	it("Render template with layout and model", function(done) {

		template = "<html>@!(body)@@(it.value)@</html>";

		atat.parse("@layout(./path/layout)@ Body @(it.value)@<strong>content</strong>", function(err, tmpl) {

			expect(err).to.eql(null);
			expect(tmpl({ value: "foo" })).to.eql("<html> Body foo<strong>content</strong>foo</html>");

			done();
		});
	});

});

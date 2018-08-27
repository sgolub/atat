'use strict';

describe("Express partials tests", function() {

	var template = "";

	beforeEach(function() {
		simple.mock(XMLHttpRequest.prototype, "open");
		simple.mock(XMLHttpRequest.prototype, "send").callFn(function() {
			this.onreadystatechange.call({
				readyState: 4,
				status: 200,
				responseText: template,
			});
		});
	});

	afterEach(function() {
		simple.restore(XMLHttpRequest.prototype, "open");
		simple.restore(XMLHttpRequest.prototype, "send");
	});

	it("Render template with partial", function(done) {

		template = "<div>Partial view</div>";

		atat.parse("Body <strong>content</strong> @partial(./path/partial)@", function(err, tmpl) {

			expect(err).to.eql(null);
			expect(tmpl()).to.eql("Body <strong>content</strong> <div>Partial view</div>");

			done();
		});
	});

	it("Render template with partial and model", function(done) {

		template = "<div>Partial view @(it.value)@</div>";

		atat.parse("Body @(it.value)@ <strong>content</strong> @partial(./path/partial, it)@", function(err, tmpl) {

			expect(err).to.eql(null);
			expect(tmpl({ value: "foo" })).to.eql("Body foo <strong>content</strong> <div>Partial view foo</div>");

			done();
		});
	});

});

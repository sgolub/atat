'use strict';

describe("Express section tests", function() {

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

	it("Render template with section", function(done) {

		template = "<html>@!(body)@</html>@section(script)@";

		Atat.compile("@layout(./path/layout)@ Body <strong>content</strong>@section script{<script>'foo';</script>}@", function(err, tmpl) {

			expect(err).to.eql(null);
			expect(tmpl()).to.eql("<html> Body <strong>content</strong></html><script>'foo';</script>");

			done();
		});
	});

	it("Render template with section and model", function(done) {

		template = "<html>@!(body)@@(it.value)@</html>@section(script)@";

		Atat.compile("@layout(./path/layout)@ Body <strong>content</strong>@section script{<script>'foo@(it.value)@';</script>}@", function(err, tmpl) {

			expect(err).to.eql(null);
			expect(tmpl({ value: '111' })).to.eql("<html> Body <strong>content</strong>111</html><script>'foo111';</script>");

			done();
		});
	});

});

'use strict';

describe("Express tests", function() {

	beforeEach(function() {
		simple.mock(XMLHttpRequest.prototype, "open");
		simple.mock(XMLHttpRequest.prototype, "send").callFn(function() {
			this.onreadystatechange.call({
				readyState: 4,
				status: 200,
				responseText: "Hello @(it.name)@!"
			});
		});
	});

	afterEach(function() {
		simple.restore(XMLHttpRequest.prototype, "open");
		simple.restore(XMLHttpRequest.prototype, "send");
	});

	it("Render template", function(done) {

		atat.compileByPath("/path/", function(err, result) {

			expect(err).to.eql(null);
			expect(result({ name: 'world' })).to.eql("Hello world!");

			done();

		});
	});

});

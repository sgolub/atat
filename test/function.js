'use strict';

describe("Function block", function() {

	var template = "";

	beforeEach(function() {
		template = "";
	});

	it("Simple function", function(done) {

		template = "@function hello(){return 'Hello';}@@(hello())@ world!";

		atat.parse(template, function(err, tmpl) {

			expect(tmpl()).to.eql("Hello world!");

			done();
		});
	});

});

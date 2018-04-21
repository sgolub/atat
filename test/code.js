'use strict';

describe("Code block", function() {

	var template = "";

	beforeEach(function() {
		template = "";
	});

	it("Empty code block", function(done) {

		template = "@{    }@Hello world!";

		atat.compile(template, function(err, tmpl) {

			expect(tmpl()).to.eql("Hello world!");

			done();
		});
	});

	it("New variable inside of code block", function(done) {

		template = "@{ var name = 'world'; }@Hello @(name)@!";

		atat.compile(template, function(err, tmpl) {

			expect(tmpl()).to.eql("Hello world!");

			done();
		});
	});

});

'use strict';

describe("Simple templates", function() {

	var template;

	beforeEach(function() {
		template = "";
	});

	it("Inline value", function(done) {

		template = "Hello @(model.name)@!";

		Atat.compile(template, function(err, tmpl) {

			expect(tmpl({ name: "world" })).to.eql("Hello world!");

			done();
		});
	});

	it("Inline raw html", function(done) {

		template = "Hello @!(model.name)@!";

		Atat.compile(template, function(err, tmpl) {

			expect(tmpl({ name: "<strong>world</strong>" })).to.eql("Hello <strong>world</strong>!");

			done();
		});
	});

	it("Inline encode html", function(done) {

		template = "Hello @(model.name)@!";

		Atat.compile(template, function(err, tmpl) {

			expect(tmpl({ name: "<strong>world</strong>" })).to.eql("Hello &#60;strong&#62;world&#60;&#47;strong&#62;!");

			done();
		});
	});

});

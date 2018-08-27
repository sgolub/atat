'use strict';

describe("Simple templates", function() {

	var template = "";

	beforeEach(function() {
		template = "";
	});

	it("Empty template", function(done) {

		template = "";

		atat.parse(template, function(err, tmpl) {

			expect(err).to.be(null);
			expect(tmpl()).to.eql("");

			done();
		});
	});

	it("Inline value", function(done) {

		template = "Hello @(it.name)@!";

		atat.parse(template, function(err, tmpl) {

			expect(err).to.be(null);
			expect(tmpl({ name: "world" })).to.eql("Hello world!");

			done();
		});
	});

	it("Inline raw html", function(done) {

		template = "Hello @!(it.name)@!";

		atat.parse(template, function(err, tmpl) {

			expect(err).to.be(null);
			expect(tmpl({ name: "<strong>world</strong>" })).to.eql("Hello <strong>world</strong>!");

			done();
		});
	});

	it("Inline encode html", function(done) {

		template = "Hello @(it.name)@!";

		atat.parse(template, function(err, tmpl) {

			expect(err).to.be(null);
			expect(tmpl({ name: "<strong>world</strong>" })).to.eql("Hello &#60;strong&#62;world&#60;&#47;strong&#62;!");

			done();
		});
	});

	it("Inline encode html with custom helpers name", function(done) {

		template = "Hello @(it.name)@!";

		atat.parse(template, function(err, tmpl) {

			expect(err).to.be(null);
			expect(tmpl({ name: "<strong>world</strong>" })).to.eql("Hello &#60;strong&#62;world&#60;&#47;strong&#62;!");

			done();
		});
	});

	it("Inline encode helper", function(done) {

		template = "Hello @encode(it.name)@!";

		atat.parse(template, function(err, tmpl) {

			expect(err).to.be(null);
			expect(tmpl({ name: "<strong>world</strong>" })).to.eql("Hello &#60;strong&#62;world&#60;&#47;strong&#62;!");

			done();
		});
	});

});

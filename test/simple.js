var assert = require('assert');
var Atat = require('../');

describe("Simple templates", function() {

	var template;

	it("Inline value", function(done) {

		template = "Hello @(model.name)@!";

		Atat.compile(template, function(err, tmpl) {

			assert.equal(tmpl({ name: 'world' }), "Hello world!");

			done();
		});
	});

	it("Inline raw html", function(done) {

		template = "Hello @!(model.name)@!";

		Atat.compile(template, function(err, tmpl) {

			assert.equal(tmpl({ name: '<strong>world</strong>' }), "Hello <strong>world</strong>!");

			done();
		});
	});

	it("Inline encode html", function(done) {

		template = "Hello @(model.name)@!";

		Atat.compile(template, function(err, tmpl) {

			assert.equal(tmpl({ name: "<strong>world</strong>" }), "Hello &#60;strong&#62;world&#60;&#47;strong&#62;!");

			done();
		});
	});

});

var assert = require('assert');
var Atat = require('../');

describe("Code block", function() {

	var template;

	it("Empty code block", function(done) {

		template = "@{    }@Hello world!";

		Atat.compile(template, function(err, tmpl) {

			assert.equal(tmpl(), "Hello world!");

			done();
		});
	});

	it("New variable inside of code block", function(done) {

		template = "@{ var name = 'world'; }@Hello @(name)@!";

		Atat.compile(template, function(err, tmpl) {

			assert.equal(tmpl(), "Hello world!");

			done();
		});
	});

});

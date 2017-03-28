var assert = require('assert');
var Atat = require('../');

describe("If block", function() {

	var template;

	it("Simple expretion TRUE", function(done) {

		template = "@if ( true ) {Hello}@ world!";

		Atat.compile(template, function(err, tmpl) {

			assert.equal(tmpl(), "Hello world!");

			done();
		});
	});

	it("Simple expretion FALSE", function(done) {

		template = "@if ( false ) {Hello}@ world!";

		Atat.compile(template, function(err, tmpl) {

			assert.equal(tmpl(), " world!");

			done();
		});
	});

	it("Model expretion TRUE", function(done) {

		template = "@if ( model.show ) {Hello}@ world!";

		Atat.compile(template, function(err, tmpl) {

			assert.equal(tmpl({ show: true }), "Hello world!");

			done();
		});
	});

	it("Model expretion TRUE", function(done) {

		template = "@if ( model.show ) {Hello}@ world!";

		Atat.compile(template, function(err, tmpl) {

			assert.equal(tmpl({ show: false }), " world!");

			done();
		});
	});

});

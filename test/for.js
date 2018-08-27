'use strict';

describe("For block", function() {

	var template = "";

	beforeEach(function() {
		template = "";
	});

	it("Simple loop", function(done) {

		template = "@for (var i = 0; i < 3; i++){Hello }@world!";

		atat.parse(template, function(err, tmpl) {

			expect(tmpl()).to.eql("Hello Hello Hello world!");

			done();
		});
	});

	it("Loop inside of loop", function(done) {

		template = "@for (var i = 0; i < 3; i++){@for(var j = 0; j < 3; j++) {Hello }@}@world!";

		atat.parse(template, function(err, tmpl) {

			expect(tmpl()).to.eql("Hello Hello Hello Hello Hello Hello Hello Hello Hello world!");

			done();
		});
	});

});

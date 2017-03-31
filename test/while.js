'use strict';

describe("While block", function() {

	var template = "";

	beforeEach(function() {
		template = "";
	});

	it("Simple loop", function(done) {

		template = "@{var i = 0;}@@while(i<3){@{i++;}@Hello }@world!";

		Atat.compile(template, function(err, tmpl) {

			expect(tmpl()).to.eql("Hello Hello Hello world!");

			done();
		});
	});

	it("Loop inside of loop", function(done) {

		template = "@{var i = 0, j = 0;}@@while(i<3){@{i++;j=0;}@@while(j<2){@{j++;}@Hello }@}@world!";

		Atat.compile(template, function(err, tmpl) {

			expect(tmpl()).to.eql("Hello Hello Hello Hello Hello Hello world!");

			done();
		});
	});

});

module.exports = function(config) {
	config.set({
		singleRun: true,
		frameworks: ["mocha"],
		files: [
			"dist/atat.js",
			"test/browser/*.js",
			"test/!(setup).js"
		],
		exclude: [
			'client/express/**/*.js'
		],
		browsers: ["Chrome", "IE", "IE9"],
		customLaunchers: {
			IE9: {
				base: 'IE',
				'x-ua-compatible': 'IE=EmulateIE9'
			}
		},
		client: {
			mocha: {
				reporter: "html",
				require: [require.resolve("expect.js")]
			}
		},
		plugins: [
			"karma-ie-launcher",
			"karma-chrome-launcher",
			"karma-mocha"
		]
	});
};

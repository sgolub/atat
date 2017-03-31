module.exports = function(config) {
	config.set({
		singleRun: true,
		frameworks: ["mocha"],
		files: [
			'dist/atat.js',
			'test/browser/*.js',
			'test/!(setup).js'
		],
		browsers: ['Chrome', 'Firefox', 'IE', 'IE9'],
		customLaunchers: {
			IE9: {
				base: 'IE',
				'x-ua-compatible': 'IE=EmulateIE9'
			}
		},
		client: {
			mocha: {
				reporter: 'html',
				require: [
					require.resolve('expect.js'),
					require.resolve('simple-mock')
				]
			}
		},
		plugins: [
			'karma-ie-launcher',
			'karma-chrome-launcher',
			'karma-firefox-launcher',
			'karma-mocha'
		]
	});
};

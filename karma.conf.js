module.exports = function(config) {
  config.set({
    singleRun: true,
    frameworks: ['mocha'],
    files: ['dist/atat.js', 'test/browser/*.js', 'test/!(setup).js'],
    browsers: ['Chrome'],
    client: {
      mocha: {
        reporter: 'html',
        require: [require.resolve('expect.js'), require.resolve('simple-mock')],
      },
    },
    plugins: [
      'karma-ie-launcher',
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-mocha',
    ],
  });
};

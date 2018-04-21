const
	{ NormalModuleReplacementPlugin } = require('webpack'),
	UglifyJsPlugin = require('uglifyjs-webpack-plugin'),
	path = require("path");

module.exports = [{
	mode: "production",
	entry: "./src/atat.ts",
	resolve: {
		extensions: [".ts"]
	},
	module: {
		rules: [
			{ test: /\.ts$/, loader: "ts-loader" }
		]
	},
	optimization: {
		minimize: false
	},
	target: "node",
	output: {
		filename: "index.js",
		path: path.resolve(__dirname, "./"),
		library: "atat",
		libraryExport: "atat",
		libraryTarget: "commonjs2"
	}
}, {
	mode: "production",
	devtool: "source-map",
	entry: {
		"atat": "./src/atat.ts",
		"atat.min": "./src/atat.ts"
	},
	resolve: {
		extensions: [".ts"]
	},
	optimization: {
		minimizer: [new UglifyJsPlugin({
			include: /\.min.js/,
			sourceMap: true
		})]
	},
	module: {
		rules: [
			{ test: /\.ts$/, loader: "ts-loader" }
		]
	},
	plugins: [
		new NormalModuleReplacementPlugin(/load_file\.ts/, "load_file.browser.ts")
	],
	target: "web",
	output: {
		filename: "[name].js",
		path: path.resolve(__dirname, "./dist"),
		library: "atat",
		libraryExport: "atat",
		libraryTarget: "umd"
	}
}];

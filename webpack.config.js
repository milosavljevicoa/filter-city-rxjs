const path = require("path"); //slicno kao import

module.exports = {
	entry: "./index.js", //gde se nalazi "glavni" js fajl
	devtool: "inline-source-map", //za debagiranje
	output: {
		path: path.resolve(__dirname, "dist"), //trenutnu folder name i dodaj mu dist
		filename: "bundle.js", //bundle-ovan fajl
		publicPath: "/dist", //sta znaci ovo???
	},
	devServer: {
		contentBase: ".", //ovo trazi index.html?
		// watchContentBase: true,
	},
};

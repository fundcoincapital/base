// The base directory that we want to use
const baseDirectory = "src";

module.exports = {
  // The current mode, defaults to production
  mode: "production",

  // The entry points ("location to store": "location to find")
  entry: {
    "public/js/scripts": [`./${baseDirectory}/public/ts/scripts`],
    "public/js/blockchain": [`./${baseDirectory}/controller/blockchain`],
    "public/js/modules": [`./${baseDirectory}/modules/apps`],
     // "other output points" : ["other entry point"] 
  },
  // Using the ts-loader module
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  // Used for generating source maps (used for debugging)
  devtool: "eval-source-map",

  // The location where bundle are stored
  output: {
    filename: "[name].js",
  },
};
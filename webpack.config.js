
var path = require("path");

var BUILD_DIR = path.resolve(__dirname, "public/assets");
var APP_DIR = path.resolve(__dirname, "src/app");

var config = {
  devtool: "source-map",
  context: APP_DIR,
  entry: APP_DIR + "/index.jsx",
  output: {
    path: BUILD_DIR,
    publicPath: "/assets/",
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        include: APP_DIR,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      },
      {
        test: /\.(jpg|png)$/,
        loader: "file-loader",
        options: {
          name: "[path][name].[hash].[ext]"
        }
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: "file-loader",
        options: {
          name: "public/fonts/[name].[ext]"
        }
      }
    ]
  }
};

module.exports = config;

var path = require("path");

var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: "./app/app.jsx",
  output: {
    path: path.resolve(__dirname, "./public"),
    publicPath: "/public/",
    filename: "bundle.js"
  },
  devServer: { historyApiFallback: true },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["env", "react"]
          }
        }
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader",
              options: {
                minimize: false
              }
            },
            { loader: "postcss-loader" },
            { loader: "less-loader" }
          ]
        })
      }
    ]
  },
  plugins: [new ExtractTextPlugin("./styles.css")]
};

const path = require("path");
const nodeExternals = require("webpack-node-externals");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const target = 'node';
/**@type {import('webpack').Configuration} */
module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, "./app.js"),
  devtool: "source-map",
  output: {
    filename: "server.js",
    path: path.resolve(__dirname, "./server"),
    clean: true,
  },
  target,
  externals: [nodeExternals()],
  plugins: [
    new MiniCssExtractPlugin({
      filename: `assets/css/[name].css`,
      chunkFilename: `assets/css/[name].css`,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          caller: { target },
        },
      },
      {
        test: /\.module.scss$/,
        use: [
          "isomorphic-style-loader",
          {
            loader: "css-loader",
            options: {
              esModule: false,
              modules: {
                localIdentName: "[name]_[local]_[hash:base64:5]",
              },
            },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                ident: "postcss",
                plugins: [["autoprefixer"]],
              },
            },
          },
          "sass-loader",
        ],
      },
    ],
  },
  optimization: {
    minimize: false,
    moduleIds: "deterministic",
  },
  cache: {
    type: "filesystem",
    buildDependencies: {
      config: [__filename],
    },
    name: "server",
  },
};

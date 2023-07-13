const path = require("path");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack');

const target = 'web';
/**@type {import('webpack').Configuration} */
module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, "./src/client-entry.js"),
  devtool: "source-map",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./dist"),
  },
  target,
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        options: {
          caller: { target },
        },
        exclude: /node_modules/,
      },
      {
        test: /\module.scss$/,
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
  plugins: [
    new MiniCssExtractPlugin({
      filename: `assets/css/[name].css`,
      chunkFilename: `assets/css/[name].css`,
    }),
    new webpack.ProvidePlugin({
      react: "react",
      "react-dom": "react-dom"
    })
  ],
  optimization: {
    minimize: true,
    moduleIds: "deterministic",
    minimizer: [
      new TerserWebpackPlugin({
        exclude: [],
        terserOptions: {
          format: {
            comments: false,
          },
        },
        extractComments: false,
      }),
    ],
  },
  cache: {
    type: "filesystem",
    buildDependencies: {
      config: [__filename],
    },
    name: "client",
  },
};

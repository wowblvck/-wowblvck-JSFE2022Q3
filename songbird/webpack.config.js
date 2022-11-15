const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ghpages = require('gh-pages');

const isProduction = process.env.NODE_ENV == "production";

const stylesHandler = isProduction ? MiniCssExtractPlugin.loader : 'style-loader';

const config = {
  entry: ["@babel/polyfill", path.resolve(__dirname, 'src', 'js', 'index.js')],
  output: {
    path: path.resolve(__dirname, "dist"),
    clean: true,
    filename: '[name].[contenthash].js',
    assetModuleFilename: pathData => {
      const filepath = path.dirname(pathData.filename).split('/').slice(1).join('/');
      return `${filepath}/[name][ext]`;
    }
  },
  devServer: {
    open: true,
    host: "localhost",
    hot: true,
    port: 8080,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'index.html'),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.m?js$/i,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(c|sa|sc)ss$/i,
        use: [stylesHandler, "css-loader", "postcss-loader", "sass-loader"],
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(png|jpe?g|gif|webp|svg)$/i,
        use: [
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
              },
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.90],
                speed: 4
              },
              gifsicle: {
                interlaced: false,
              },
              webp: {
                quality: 75
              }
            }
          }
        ],
        type: 'asset/resource',
      },
      {
        test: /\.(mp3|wav|aac)$/i,
        type: 'asset/resource',
      },
    ],
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";

    config.plugins.push(new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    }));

    // ghpages.publish('dist', {
    //   dest: 'songbird',
    //   message: 'build: songbird production'
    // });
  } else {
    config.mode = "development";
    config.target = 'web';
    config.devtool = 'source-map';
  }
  return config;
};

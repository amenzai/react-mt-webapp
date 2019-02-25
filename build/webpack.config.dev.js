const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const WriteFilePlugin = require("write-file-webpack-plugin");
const fs = require('fs');

function resolve(dir) {
  return path.resolve(__dirname, '..', dir)
}

const srcRoot = resolve('client');
const devPath = resolve('dev-output');
const pageDir = resolve('client/page');
const mainFile = 'index.jsx';

function getHtmlArray(entryMap) {
  let htmlArray = [];
  Object.keys(entryMap).forEach((key) => {
    let fullPathName = path.resolve(pageDir, key);
    let fileName = path.resolve(fullPathName, key + '.html');

    if (fs.existsSync(fileName)) {
      htmlArray.push(new HtmlWebpackPlugin({
        filename: key + '.html',
        template: fileName,
        chunks: ['common', key]
      }));
    }


  });
  return htmlArray;
}

function getEntry() {
  let entryMap = {};

  fs.readdirSync(pageDir).forEach((pathname) => {
    let fullPathName = path.resolve(pageDir, pathname);
    let stat = fs.statSync(fullPathName);
    let fileName = path.resolve(fullPathName, mainFile);

    if (stat.isDirectory() && fs.existsSync(fileName)) {
      entryMap[pathname] = fileName;
    }
  });

  return entryMap;

}

const entryMap = getEntry();
const htmlArray = getHtmlArray(entryMap);

module.exports = {
  mode: 'development',
  devServer: {
    port: 2019,
    host: '::',
    contentBase: devPath,
    hot: true
  },
  entry: entryMap,
  resolve: {
    alias: {
      component: resolve('client/component')
    },
    extensions: ['.js', '.jsx']
  },
  output: {
    path: devPath,
    filename: '[name].min.js'
  },
  module: {
    rules: [{
        test: /\.(js|jsx)$/,
        use: [{
          loader: 'babel-loader'
        }, {
          loader: 'eslint-loader'
        }],
        include: srcRoot
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'
        ],
        include: srcRoot
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader', {
          loader: 'sass-resources-loader',
          options: {
            resources: resolve('client/assets/scss/rem_function.scss')
          }
        }],
        include: srcRoot
      },
      {
        test: /\.(png|jpg|jpeg)$/,
        use: 'url-loader?limit=8192',
        include: srcRoot
      }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        common: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          name: 'common'
        }
      }
    }
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    // new WriteFilePlugin()
  ].concat(htmlArray)
};

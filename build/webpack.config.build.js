const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const fs = require('fs');

function resolve(dir) {
  return path.resolve(__dirname, '..', dir)
}

const srcRoot = resolve('client');
const pageDir = resolve('client/page');
const distPath = resolve('server/public');
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
  mode: 'production',
  entry: entryMap,
  resolve: {
    alias: {
      component: resolve('client/component')
    },
    extensions: ['.js', '.jsx']
  },
  output: {
    path: distPath,
    filename: 'js/[name].[hash].min.js',
    publicPath: '/' // 可根据自己实际情况修改
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
        use: 'url-loader?limit=8192&name=./images/[name].[hash].[ext]',
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
    new CleanWebpackPlugin([distPath], {
      allowExternal: true
    }),
    new CopyWebpackPlugin([{
        from: resolve('client/json'),
        to: path.resolve(distPath, 'json'),
        force: true
      },
      {
        from: resolve('client/static'),
        to: path.resolve(distPath, 'static'),
        force: true
      }
    ]),
    new MiniCssExtractPlugin({
      filename: "css/[name].[hash].css",
    })
  ].concat(htmlArray)
};

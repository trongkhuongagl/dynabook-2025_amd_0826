const webpack = require('webpack');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  // モード値を production に設定すると最適化された状態で、
  // development に設定するとソースマップ有効でJSファイルが出力される
  mode: "production",
  // mode: "development",

  // メインのJS
  entry: {
    '../dist/js/assets_2025/personal/main_2025': './src/_js/sites/default/files/dynabook-b2c/assets_2025/main_2025.js',
    '../dist/js/assets_2025/personal/header_2025': './src/_js/sites/default/files/dynabook-b2c/assets_2025/header_2025.js',
    '../dist/js/assets_2025/personal/footer_2025': './src/_js/sites/default/files/dynabook-b2c/assets_2025/footer_2025.js',
    '../dist/js/assets_2025/individual/main_2025': './src/_js/sites/default/files/dynabook-b2c/assets_2025/main_2025.js',
    '../dist/js/assets_2025/individual/header_2025': './src/_js/sites/default/files/dynabook-b2c/assets_2025/header_2025.js',
    '../dist/js/assets_2025/individual/footer_2025': './src/_js/sites/default/files/dynabook-b2c/assets_2025/footer_2025.js'
  },
  // 出力ファイル
  // output: {
  //   // path: path.resolve(__dirname, 'dist'),
  //   filename: '../dist/js/assets_2025/individual/[name].js',
  //   filename: '../dist/js/assets_2025/personal/[name].js',
  // },
  output: {
    path: __dirname,
    filename: '[name].js',
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({
      extractComments: false,//LICENSE.txtを出力させない。
    })],
    splitChunks: {
      cacheGroups: {
        lib: {
          test: /node_modules/,// node_modules配下のモジュールをバンドル対象とする
          // test: /\.js/, //JSファイル(ライブラリ)をバンドル対象とする
          name: 'lib',
          chunks: 'initial',
          enforce: true,
        }
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                // プリセットを指定することで、ES2018 を ES5 に変換
                '@babel/preset-env',
              ]
            }
          }
        ]
      }
    ]
  },
  // ES5(IE11等)向けの指定
  target: ["web", "es5"],
  //ビルド対象に含めたい（require している）ファイルの拡張子
  resolve: { extensions: ['.ts', '.js'] },
  //ファイル容量の上限を解除
  performance: { hints: false },
  externals: [{
    jquery: 'jQuery'
  }],
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
  ],
}

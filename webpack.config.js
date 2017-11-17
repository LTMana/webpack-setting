const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin') // 不使用的函数不打入包中
const webpack = require('webpack')
const extractLess = new ExtractTextPlugin({
  filename: '../style/[name].css',
  disable: process.env.NODE_ENV === 'development'
})


module.exports = {
  entry: {
    index: './src/script/index.js',
    vendor: ['react', 'react-dom']
  },
  output: {
    path: path.resolve(__dirname, 'build/script'),
    filename: '[name].js'
  },
  module: {
    rules: [
      // 模块规则（配置 loader、解析器等选项）
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, 'src/script')
        ],
        loader: 'babel-loader'
      },
      {
        test: /\.less$/,
        use: extractLess.extract({
          use: [{
            loader: 'css-loader'
          }, {
            loader: 'less-loader'
          }],
          // use style-loader in development
          fallback: 'style-loader'
        })
      }
    ]
  },
  plugins: [
    extractLess,
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor', 'runtime']
    }),
    new UglifyJSPlugin()
  ]
  // externals: {
  //   'react': 'React',
  //   'react-dom': 'ReactDOM'
  // }
}
const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    app: './src/mm-theme.js',
  },
  output: {
    filename: 'mm-theme.js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/dist/',
  },
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '@': path.join(__dirname, '..', 'src'),
    },
    extensions: ['.js', '.vue', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            postcss: ['vue-style-loader'].concat([
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true,
                },
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true,
                },
              },
            ]),
          },
        },
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [path.join(__dirname, '..', 'src')],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: path.posix.join('assets', 'img/[name].[hash:7].[ext]'),
        },
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
  ],
};

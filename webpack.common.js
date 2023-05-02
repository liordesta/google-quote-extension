const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    contentScript: path.resolve('./src/contentScript/index.tsx'),
  },
  module: {
    rules: [
      {
        use: 'ts-loader',
        test: /\.tsx$/,
        exclude: /node_modules/,
      },
      {
        use: ['style-loader', 'css-loader', 'postcss-loader'],
        test: /\.css$/i,
      },
      {
        use: 'assets/resource',
        type: 'assets/resource',
        test: /\.(png|jpg|jpeg|gif|woff|woff2|ttf|eot|svg)$/,
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve('src/static/manifest.json'),
          to: path.resolve('dist'),
        },
        {
          from: path.resolve('src/assets/icon.png'),
          to: path.resolve('dist/src/assets'),
        },
        {
          from: path.resolve('src/assets/loader.svg'),
          to: path.resolve('dist/src/assets'),
        },
      ],
    }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: '[name].js',
  },
  optimization: {
    splitChunks: {
      chunks(chunk) {
        return chunk.name !== 'contentScript';
      },
    },
  },
};

const path = require('path');

const env = process.env.NODE_ENV || 'development';

module.exports = {
  mode: env,
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'main.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/typescript',
              '@babel/react',
              '@babel/env',
            ],
            plugins: [
              ['@babel/plugin-transform-react-jsx', { pragma: 'h' }],
            ],
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    alias: {
      react: 'preact/compat',
      'react-dom': 'preact/compat',
    },
  },
  devtool: 'source-map',
  devServer: {
    contentBase: path.resolve(__dirname, 'build'),
    historyApiFallback: true,
  },
};

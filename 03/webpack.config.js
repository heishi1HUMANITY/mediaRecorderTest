const path = require('path');

module.exports = {
  mode: 'development',
  entry: path.join(__dirname, 'src', 'main.ts'),
  output: {
    path: path.join(__dirname, 'public', 'js'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: 'ts-loader',
          options: {
            configFile: 'tsconfig.json'
          }
        }
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  devtool: 'source-map',
};

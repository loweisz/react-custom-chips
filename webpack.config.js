const path = require('path');

module.exports = {
  mode: 'development',
  entry: path.join(__dirname, 'src/CustomChips.tsx'),
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'build'),
    libraryTarget: 'commonjs2'
  },
  devtool: 'inline-source-map',
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          compilerOptions: {
            declaration: false,
            sourceMap: true,
            rootDir: '',
          },
        },
      }
    ],
  },
  externals: {
    'react': 'commonjs react'
  }
};

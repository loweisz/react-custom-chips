var path = require('path');
module.exports = {
  entry: path.resolve(__dirname, 'src/SampleChip.tsx'),
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /(node_modules|bower_components|build)/,
        options: {
          compilerOptions: {
            declaration: false,
            sourceMap: true,
            rootDir: '',
          },
        },
      }
    ]
  },
  externals: {
    'react': 'commonjs react'
  }
}

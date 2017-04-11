const path = require('path');
const webpack = require('webpack');

const cfg = {
  entry: {
    app: './src/main.ts',
    signup: './src/signup.ts',
    signin: './src/signin.ts',
    vendors: [
      '@angular/core',
      '@angular/common',
      '@angular/compiler',
      '@angular/platform-browser',
      '@angular/platform-browser-dynamic',
      '@angular/forms',
      '@angular/http',
      'zone.js',
      'reflect-metadata',
      'rxjs'
    ]
  },

  output: {
    path: path.resolve('public/assets/scripts'),
    filename: '[name].bundle.js'
  },

  resolve: {
    extensions: ['.js', '.ts'],
    modules: [path.resolve('src'), path.resolve('node_modules')]
  },

  module: {
    rules: [{
      test: /\.ts$/,
      exclude: /node_modules/,
      loader: 'ts-loader'
    }]
  },

  plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendors', 'manifest'],
            minChuncks(module, count) {
                return count < 2;
            }
        }),
    ]
};

module.exports = cfg;
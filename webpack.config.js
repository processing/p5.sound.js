const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = [
  {
    entry: './src/app.js',
    output: {
      filename: 'p5.sound.js',
      path: path.resolve(__dirname, 'dist'),
    },
    mode: 'production',
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                ['@babel/preset-env', { modules: false }]
              ]
            }
          }
        }
      ]
    },
    optimization: {
      minimize: false,
      usedExports: true,
      sideEffects: true
    }
  },
  {
    entry: './src/app.js',
    output: {
      filename: 'p5.sound.min.js',
      path: path.resolve(__dirname, 'dist'),
    },
    mode: 'production',
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                ['@babel/preset-env', { modules: false }]
              ]
            }
          }
        }
      ]
    },
    optimization: {
      usedExports: true,
      sideEffects: true,
      minimize: true,
      minimizer: [new TerserPlugin({
        terserOptions: {
          compress: {
            dead_code: true,
            drop_debugger: true,
            conditionals: true,
            evaluate: true,
            booleans: true,
            loops: true,
            unused: true,
            hoist_funs: true,
            keep_fargs: false,
            hoist_vars: true,
            if_return: true,
            join_vars: true,
            collapse_vars: true,
            side_effects: true,
            warnings: false,
          },
        },
      })],
    }
  }
];
import path from 'path';
import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import json from '@rollup/plugin-json';
import { visualizer } from "rollup-plugin-visualizer";


export default [
  // Unminified version
  {
    input: 'src/app.js', // Entry point of your library
    output: {
      file: path.resolve('dist', 'p5.sound.js'),
      format: 'esm', // ES Module format
    },
    plugins: [
      resolve(), // Resolves node_modules
      commonjs(), // Converts CommonJS modules to ES6
      json(),
      babel({
        babelHelpers: 'bundled',
        exclude: 'node_modules/**',
        presets: [
          ['@babel/preset-env', { modules: false, targets: '> 0.25%, not dead' }]
        ]
      }),
      
      //visualizer() // Generates a treemap of your bundle
    ],
  },
  // Minified version
  {
    input: 'src/app.js', // Entry point of your library
    output: {
      file: path.resolve('dist', 'p5.sound.min.js'),
      format: 'esm', // ES Module format
    },
    plugins: [
      resolve(), // Resolves node_modules
      commonjs(), // Converts CommonJS modules to ES6
      babel({
        babelHelpers: 'bundled',
        exclude: 'node_modules/**',
        presets: ['@babel/preset-env']
      }),
      terser(), // Minify the output
      visualizer()
    ],
    treeshake: true
  }
];



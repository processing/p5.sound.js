import path from 'path';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

const toneGlobalShim = path.resolve('src', 'vendor', 'toneGlobal.js');

function aliasToneGlobal() {
  return {
    name: 'alias-tone-global',
    resolveId(source, importer) {
      if (source === 'tone/build/esm/core/Global.js') {
        return toneGlobalShim;
      }

      if (
        source === '../Global.js' &&
        importer &&
        importer.includes(`${path.sep}node_modules${path.sep}tone${path.sep}build${path.sep}esm${path.sep}core${path.sep}`)
      ) {
        return toneGlobalShim;
      }

      return null;
    }
  };
}

export default [
  // Unminified version
  {
    input: 'src/app.js', // Entry point of your library
    output: {
      file: path.resolve('dist', 'p5.sound.js'),
      format: 'iife', // Change to IIFE format
    },
    plugins: [
      aliasToneGlobal(),
      resolve(),
      terser({
        compress: {
          dead_code: true,
          drop_debugger: true,
          conditionals: true,
          evaluate: true,
          booleans: true,
          loops: true,
          unused: true,
          hoist_funs: true,
          keep_fargs: true,
          hoist_vars: false,
          if_return: true,
          join_vars: false,
          side_effects: true,
          warnings: false
        },
        mangle: false,
        format: {
          beautify: true,
          comments: true,
          indent_level: 2,
          wrap_iife: true
        }
      }),
    ],
    treeshake: {
      preset: 'recommended',
    }
  },
  // Minified version
  {
    input: 'src/app.js', // Entry point of your library
    output: {
      file: path.resolve('dist', 'p5.sound.min.js'),
      format: 'iife', // Change to IIFE format
    },
    plugins: [
      aliasToneGlobal(),
      resolve(), // Resolves node_modules
      terser(), // Minify the output
    ],
  }
];

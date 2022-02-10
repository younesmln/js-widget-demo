import postcss from 'rollup-plugin-postcss'
import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import { terser } from 'rollup-plugin-terser';

const devMode = process.env.NODE_ENV || 'development'
const isDevMode = devMode === 'development'

const plugins = [
  postcss({
    extract: true,
    plugins: [],
    writeDefinitions: true,
    modules: true,
  }),
  replace({
    'process.env.NODE_ENV': JSON.stringify(devMode),
    preventAssignment: true
  }),
  typescript(),
  commonjs(),
  resolve({
    browser: true,
    preferBuiltins: true,
    mainFields: ['browser'],
  }),
  RawCssInjector(),
  !isDevMode && terser()
].filter((_) => _)

export default {
  input: './src/index.ts',
  output: {
    file: isDevMode ? 'dist-dev/index.js' : 'dist/index.js',
    format: 'iife',
    name: 'myWidget',
  },
  plugins,
};



function RawCssInjector() {
  const jsOutputFilename = 'index.js'
  const cssOutputFilename = 'index.css'

  return {
    name: 'myPlugin',
    generateBundle(_opts, bundle) {
      console.log();
      const jsBundle = bundle[jsOutputFilename];
      const styleSource = bundle[cssOutputFilename].source.toString()
      jsBundle.code = `const $injected_styleContent = ${JSON.stringify(styleSource)};\n${jsBundle.code}`
      delete bundle[cssOutputFilename]
    }
  }
}
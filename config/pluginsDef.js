import postcss from 'rollup-plugin-postcss';
import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import { terser } from 'rollup-plugin-terser'
import { devMode, isDevMode } from './constants';
import { rawCssInjector } from './rawCssInjector';

export function pluginsDef({ widgetName }) {
    return [
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
      rawCssInjector({ widgetName }),
      !isDevMode && terser()
    ].filter((_) => _) 
  }
  
import typescript from 'typescript';
import typescriptPlugin from 'rollup-plugin-typescript';
import commonjs from 'rollup-plugin-commonjs';

export default {
  input: './src/CustomChips.tsx',
  output: {
    file: './build/index.js',
    format: 'cjs',
  },
  external: [
    'react',
    'react-proptypes',
  ],
  plugins: [
    commonjs(),
    typescriptPlugin({
      // The current rollup-plugin-typescript includes an old version of typescript, so we import and pass our own version
      typescript,
      // rollup-plugin-typescript will inject some typescript helpers to your files (normally tsc will
      // do this). They however have some ES6 keywords like const so they break older browsers.
      // This instructs rollup-plugin-typescript to import tslib instead, which includes the same helpers
      // in proper format.
      importHelpers: true,
    }),
  ]
}

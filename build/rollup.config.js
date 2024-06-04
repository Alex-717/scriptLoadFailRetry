
import { defineConfig } from 'rollup'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import terser from '@rollup/plugin-terser'
// import { babel } from '@rollup/plugin-babel'
import { srcRoot, projectRoot } from './utils.js'
import path from 'path'

const resolve = path.resolve

export default defineConfig({
  input: resolve(srcRoot, './index.js'),
  output: {
    format: 'iife',
    // file: resolve(projectRoot, './dist/bundle.js')
    file: resolve(projectRoot, './test/public/js/bundle.js')
  },
  plugins: [
    nodeResolve(),
    commonjs(),
    // babel()
  ]
})


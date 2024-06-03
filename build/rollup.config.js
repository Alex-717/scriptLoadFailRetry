
import { defineConfig } from 'rollup'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import terser from '@rollup/plugin-terser'
import { babel } from '@rollup/plugin-babel'

export default defineConfig({
  input: '',
  output: [],
  plugins: [
    nodeResolve(),
    commonjs(),
    // babel()
  ]
})


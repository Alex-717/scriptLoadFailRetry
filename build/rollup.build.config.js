
import { defineConfig } from 'rollup'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import terser from '@rollup/plugin-terser'
import { babel } from '@rollup/plugin-babel'
import { srcRoot, projectRoot } from '../utils/path.js'
import path, { resolve } from 'path'

const formatMap = {
  esm: 'esm',
  es: 'esm',
  cjs: 'common',
  umd: 'umd'
}
const input = resolve(srcRoot, './index.js')

const buildConfig = function (options) {
  const { browser = true, minify = false, ...config } = options
  return [{
    input,
    output: {
      format: config.format,
      name: config.name,
      file: resolve(projectRoot, `./dist/bundle.${formatMap[config.format]}.js`)
    },
    plugins: [
      nodeResolve({ browser }),
      commonjs(),

      ...config.plugins
    ]
  }]
}

export default [
  ...buildConfig({
    format: 'esm',
    plugins: [

    ]
  })
]

// export default defineConfig({
//   input: resolve(srcRoot, './index.js'),
//   output: {
//     format: 'iife',
//     name: 'scriptFailedReloadLib',
//     // file: resolve(projectRoot, './dist/bundle.js')
//     file: resolve(projectRoot, './test/public/js/bundle.js')
//   },
//   plugins: [
//     nodeResolve(),
//     commonjs(),
//     // babel()
//   ]
// })


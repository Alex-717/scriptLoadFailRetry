
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import terser from '@rollup/plugin-terser'
import { babel } from '@rollup/plugin-babel'
import { srcRoot, projectRoot } from '../utils/path.js'
import { resolve } from 'path'
import bundleSize from 'rollup-plugin-bundle-size'

const formatMap = {
  esm: 'esm',
  es: 'esm',
  cjs: 'common',
  umd: 'umd'
}
const input = resolve(srcRoot, './index.js')

const buildConfig = function (options) {
  const { browser = true, minify = false, ...config } = options
  const rollupConfig = {
    input,
    ...(config.external ? [] : []),
    output: {
      format: config.format,
      name: config.name,
      file: resolve(projectRoot, `./dist/bundle.${formatMap[config.format]}.js`)
    },
    plugins: [
      nodeResolve({ browser }),
      commonjs(),
      minify && terser(),
      minify && bundleSize(),
      ...(config.plugins || [])
    ]
  }

  if (config.external) {
    rollupConfig.external = config.external
  }

  return rollupConfig
}


const moduleBabelSet = [
  babel({
    babelHelpers: 'runtime',
    presets: ['@babel/preset-env'],
    plugins: [
      ['@babel/plugin-transform-runtime', {
        absoluteRuntime: false,
        corejs: 3,
        helpers: true,
        regenerator: true
      }]
    ]
  })
]

export default [
  buildConfig({
    format: 'esm',
    external: [/@babel\/runtime/],
    plugins: [
      ...moduleBabelSet
    ]
  }),
  buildConfig({
    format: 'cjs',
    external: [/@babel\/runtime/],
    plugins: [
      ...moduleBabelSet
    ]
  }),
  buildConfig({
    format: 'umd',
    plugins: [
      babel({
        babelHelpers: 'bundled',
        presets: [
          ['@babel/preset-env', {
            useBuiltIns: 'usage',
            corejs: 3
          }]
        ],
        plugins: [
          ["@babel/plugin-transform-runtime"]
        ]
      })
    ]
  })
]


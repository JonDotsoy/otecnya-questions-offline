const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const InlineEnvironmentVariablesPlugin = require('inline-environment-variables-webpack-plugin')
const webpack = require('webpack')

const moduleBabel = {
  rules: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      options: {
        presets: [
          ['env', {
            exclude: ['transform-regenerator']
          }],
          'stage-0',
          'react'
        ]
      }
    }
  ]
}

const bs = new BrowserSyncPlugin({
  host: 'localhost',
  port: '3000',
  server: {
    baseDir: 'www'
  }
})

const plugins = [
  bs,
  new InlineEnvironmentVariablesPlugin()
]

module.exports.config = [
  // app.js
  {
    entry: './src/app.js',
    module: moduleBabel,
    plugins,
    output: {
      filename: 'app.js'
    }
  },
  // sw.js
  {
    entry: './src/sw.js',
    module: moduleBabel,
    plugins,
    output: {
      filename: 'sw.js'
    }
  }
]

module.exports.browserSync = bs.browserSync

require('dotenv').config({path: `${__dirname}/../.env`})

const mapKeys = require('lodash/mapKeys')
const snakeCase = require('lodash/snakeCase')
const flow = require('lodash/flow')
const rearg = require('lodash/rearg')
const toUpper = require('lodash/toUpper')

const environment = process.env.NODE_ENV || 'development'

module.exports = {
  environment,
  env: environment,
  nodeEnv: environment,
  startPath: process.env.START_PATH || 'otecnya-questions-offline',
}

Object.assign(
  module.exports,
  mapKeys(module.exports, rearg(flow([snakeCase, toUpper]), [1])),
)

Object.assign(
  process.env,
  module.exports,
)

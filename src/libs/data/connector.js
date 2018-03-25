const url = require('url')
const querystring = require('querystring')
const mapValues = require('lodash/mapValues')

const configs = module.exports.configs = {
  host: 'jon.soy',
  port: undefined,
  secure: true,
  pathname: '/services/question/api/',
  get link () {
    // return https://jon.soy/services/question/api/responses?find={}
    return url.format({
      protocol: this.secure ? 'https' : 'http',
      slashes: true,
      port: this.port,
      hostname: this.host,
      pathname: this.pathname
    })
  }
}

module.exports.resourceLink = function resourceLink (resourceName, query) {
  query = mapValues(query, data => JSON.stringify(data))

  return url.resolve(
    configs.link,
    url.format({
      pathname: `./${resourceName}`,
      query
    })
  )
}

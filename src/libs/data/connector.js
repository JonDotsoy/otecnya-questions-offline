const url = require('url')
const querystring = require('querystring')

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
      pathname: this.pathname,
    })
  }
}


const resourceLink = module.exports.resourceLink = 
function resourceLink (resourceName, query) {
  return url.resolve(
    configs.link,
    url.format({
      pathname: `./${resourceName}`,
      query,
    })
  )
}


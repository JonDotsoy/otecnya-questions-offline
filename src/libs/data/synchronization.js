const {resourceLink} = require('./connector')
const fetch = require('isomorphic-fetch')

const responses = module.exports.responses = {
  async get (query) {

    try {

      return await fetch(resourceLink('responses', {
        find: query
      }))

    } catch (ex) {
      console.log(ex.message)
    }

  }
}

const {resourceLink} = require('./connector')
const fetch = require('isomorphic-fetch')

const responses = module.exports.responses = {
  async put ( response ) {
    return await fetch(
      resourceLink('responses'),
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(response),
      }
    )
    .then(r=>r.json())
  },

  async get (query = {}) {

    return await fetch(
      resourceLink('responses', {
        find: JSON.stringify(query)
      })
    )
    .then(r => r.json())

  },
}

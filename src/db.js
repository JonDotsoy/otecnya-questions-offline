const Dexie = require('dexie')

const db = new Dexie('responses')

module.exports.ready = db.version('1').stores({
  responses: `++id,rut,date,responses`
})

module.exports.db = db

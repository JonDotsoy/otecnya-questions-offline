const Dexie = require('dexie')

const db = new Dexie('responses')

const dbReadyV1 = db.version('1').stores({
  responses: `++id,rut,date,responses`
})

const dbReadyV2 = db.version('2').stores({
  responses: `++id,rut,date,responses,location,business`
})
.upgrade(function (trans) {
  trans.responses.toCollection().modify(function (response) {
    console.log('migrate it db')
    console.log(response)
  })
})

module.exports.ready = Promise.all([dbReadyV1, dbReadyV2])

module.exports.db = db

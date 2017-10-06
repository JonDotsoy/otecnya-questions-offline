const Dexie = require('dexie')

const db = new Dexie('responses')

const dbReadyV1 = db.version(1)
.stores({
  responses: `++id,rut,date,responses`
})

const dbReadyV2 = db.version(2)
.stores({
  responses: `++id,rut,date,responses,location,business`
})
.upgrade(function (trans) {
  trans.responses.toCollection().modify(function (response) {
    console.log('migrate it db')
    console.log(response)
  })
})

const dbReadyV3 = db.version(3)
.stores({
  responses: `++id,rut,date,responses,location,business`
})
.upgrade(function (trans) {
  trans.responses.toCollection().modify(function (response) {
    response.location = null
    response.business = null
    console.log('migrate it db')
    console.log(response)
  })
})

const dbReadyV4 = db.version(4)
.stores({
  responses: `++id,rut,date,responses,location,business,_sync`
})
.upgrade(function (trans) {
  trans.responses.toCollection().modify(function (response) {
    response._sync = false
    console.log(response)
  })
})

const dbReadyV5 = db.version(5)
.stores({
  responses: `++id,rut,date,responses,location,business,_sync,_cloud_id`
})
.upgrade(function (trans) {
  trans.responses.toCollection().modify(function (response) {
    response._cloud_id = null
  })
})

module.exports.ready = Promise.all([dbReadyV1, dbReadyV2, dbReadyV3, dbReadyV4, dbReadyV5])

module.exports.db = db

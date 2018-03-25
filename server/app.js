const util = require('util')
const mongoose = require('mongoose')
const express = require('express')
const {Response} = require('./models/Response')
const bodyParser = require('body-parser')
const cors = require('cors')
const url = require('url')

const mongoOption = {
  connect: {
    hostname: process.env.DB_HOST || '192.168.99.100',
    port: process.env.DB_PORT || '27017',
    dbName: process.env.DB_NAME || 'otecnya'
  }
}

mongoOption.connect.uri = url.format({
  protocol: 'mongodb',
  slashes: true,
  hostname: mongoOption.connect.hostname,
  port: mongoOption.connect.port,
  pathname: mongoOption.connect.dbName
})

mongoose.Promise = global.Promise

async function App () {
  const {db} = await mongoose.connect(mongoOption.connect.uri, { useMongoClient: true })
  const {server, appserver} = await Server()

  await configeApi(appserver)

  console.log(util.format('Server connected to %s:%s', server.address().address, server.address().port))
}

async function Server () {
  const appserver = express()

  const server = await new Promise((resolve, reject) => {
    const server = appserver.listen(3000, '0.0.0.0', (...a) => {
      resolve(server)
    })
  })

  return {server, appserver}
}

async function configeApi (app) {
  const router = new express.Router()

  router.use(cors())
  router.use(bodyParser.json())

  router.get('/responses', (req, res, next) => {
    (async () => {
      res.json(
        await Response.find(JSON.parse(req.query.find))
      )
    })().catch(next)
  })

  router.post('/responses', (req, res, next) => {
    (async () => {
      const responseDoc = new Response(req.body)

      res.json(
        await responseDoc.save()
      )
    })().catch(next)
  })

  router.use(function handleError (error, req, res, next) {
    console.log(error)

    res.status(404)
    res.json({
      ok: false,
      error: {
        name: error.name,
        message: error.message
      }
    })
  })

  app.use('/api', router)
}

App()
  .catch(console.log)

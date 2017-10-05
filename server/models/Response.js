const mongoose = require('mongoose')

const ResponseShema = module.exports.ResponseShema = new mongoose.Schema({
  rut: String,
  date: Date,
  responses: Array,
  location: String,
  business: String
})

module.exports.Response = mongoose.model('Response', ResponseShema)

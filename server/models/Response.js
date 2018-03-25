const mongoose = require('mongoose')

const ResponseShema = module.exports.ResponseShema = new mongoose.Schema({
  id: String,
  idCourse: String,
  name: String,
  date: Date,
  rut: String,
  responses: Array,
  location: String,
  business: String,
})

module.exports.Response = mongoose.model('Response', ResponseShema)

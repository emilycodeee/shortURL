const mongoose = require('mongoose')
const Schema = mongoose.Schema
const shortenSchema = new Schema({

  origurl: {
    type: String,
    required: true
  },
  shorten: {
    type: String,
    required: true
  }

})

module.exports = mongoose.model('ShortURL', shortenSchema)
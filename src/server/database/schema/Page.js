const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Setting Schema
const name = require('path').basename(__filename, '.js')
const schema = new Schema({
  name: { type: String, required: '{PATH} is required!' },
  url: { type: String, required: '{PATH} is required!' },
  useProxy: { type: Boolean, default: false },
  interval: { type: Number, default: 60, required: '{PATH} is required!' },
  ordinal: { type: Number, required: '{PATH} is required!' },
  isActive: { type: Boolean, default: true, required: '{PATH} is required!' },
}, { _id: false, collection: name })

module.exports = {
  schema,
  name
}

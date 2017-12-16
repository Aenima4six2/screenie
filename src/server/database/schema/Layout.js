const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Setting Schema
const name = require('path').basename(__filename, '.js')
const schema = new Schema({
  panes: { type: Number, default: 1, required: '{PATH} is required!' },
}, { _id: false, collection: name })

module.exports = {
  schema,
  name
}


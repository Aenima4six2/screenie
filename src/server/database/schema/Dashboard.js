const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Page = require('./Page').schema
const Layout = require('./Layout').schema

// Setting Schema
const name = require('path').basename(__filename, '.js')
const schema = new Schema({
  name: { type: String, unique: true, trim: true, required: '{PATH} is required!' },
  pages: { type: [Page], required: '{PATH} is required!' },
  layout: { type: Layout },
  isFullScreen: { type: Boolean },
  isActive: { type: Boolean, default: true, required: '{PATH} is required!' },
  webhookTokens: { type: [String] }
}, { timestamps: true, collection: name })

module.exports = {
  schema,
  name
}

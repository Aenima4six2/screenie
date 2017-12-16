const mongooseService = require('./mongooseService')
module.exports.connect = async () => {
  await mongooseService.connect()
}
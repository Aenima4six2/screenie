const mongooseService = require('../mongooseService')

module.exports = {
  getDashboard: () => mongooseService.getModel('Dashboard'),
}



const path = require('path')

module.exports.name = path.basename(__filename)

module.exports.handle = (status) => {
  const result = {
    triggered: true,
    createAlert() {
      return {
        type: 'Shoutout',
        name: 'Shoutout Received',
        reason: status.message,
        level: 'info'
      }
    }
  }

  return result
}


module.exports.reset = () => { }
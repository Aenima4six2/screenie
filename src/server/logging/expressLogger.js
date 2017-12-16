const isProd = process.env.NODE_ENV === 'production'
const expressWinston = require('express-winston')
const winston = require('winston')

module.exports.createRouteLogger = () =>
  expressWinston.logger({
    transports: [
      new winston.transports.Console({
        prettyPrint: isProd,
        json: isProd,
        colorize: true,
        timestamp: true,
        humanReadableUnhandledException: true
      })
    ]
  })

module.exports.createErrorLogger = () =>
  expressWinston.errorLogger({
    transports: [
      new winston.transports.Console({
        json: true,
        prettyPrint: true,
        colorize: true,
        timestamp: true,
        humanReadableUnhandledException: true
      })
    ]
  })

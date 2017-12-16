const isProd = process.env.NODE_ENV === 'production'
const winston = require('winston')
const createTransportConfig = (label) => ({
  transports: [
    new winston.transports.Console({
      name: 'out',
      level: isProd ? 'info' : 'debug',
      json: isProd,
      prettyPrint: isProd,
      timestamp: true,
      colorize: true,
      exitOnError: false,
      label
    })]
})


module.exports = {
  default: new winston.Logger(createTransportConfig('screenie:default')),
  create: (name, config) => new winston.Logger(config || createTransportConfig(`screenie:${name}`))
}

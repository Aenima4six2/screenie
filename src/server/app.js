module.exports.create = (initMiddleware) => {
  const express = require('express')
  const path = require('path')
  const logger = require('./logging/expressLogger')
  const cookieParser = require('cookie-parser')
  const bodyParser = require('body-parser')
  const proxy = require('./routes/proxy')
  const notifications = require('./routes/notifications')
  const dashboards = require('./routes/dashboards')
  const handlers = require('./middleware/handlers')
  const app = express()

  // Init middleware
  initMiddleware.forEach(middleware => app.use(middleware))

  // view engine setup
  app.set('views', path.join(__dirname, 'views'))
  app.set('view engine', 'pug')

  // request handlers
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(cookieParser())

  // Route Logging - MUST REGISTER BEFORE all routers.
  app.use(logger.createRouteLogger())

  // Routing
  app.use('/proxy', proxy)
  app.use('/api/dashboards', dashboards)
  app.use('/api/notifications', notifications)
  app.use('/beeps', express.static(path.join(__dirname, 'beeps')))
  app.use(express.static(path.join(__dirname, 'public')))
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
  })

  // Error Logging - MUST REGISTER BEFORE all routers.
  app.use(logger.createErrorLogger())

  // response handlers
  app.use(handlers.notFound)
  app.use(handlers.error)

  return app
}

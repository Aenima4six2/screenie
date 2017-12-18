const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const logger = require('./logging/expressLogger')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const index = require('./routes/index')
const proxy = require('./routes/proxy')
const dashboards = require('./routes/dashboards')
const handlers = require('./middleware/handlers')
const app = express()

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
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')))
app.use(express.static(path.join(__dirname, 'public')))
app.use('/proxy', proxy)
app.use('/api/dashboards', handlers.cors, handlers.hal, dashboards)
app.use('/', index)

// Error Logging - MUST REGISTER BEFORE all routers.
app.use(logger.createErrorLogger())

// response handlers
app.use(handlers.notFound)
app.use(handlers.error)

module.exports = app

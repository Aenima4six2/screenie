const express = require('express')
const router = express.Router()
const handlers = require('../middleware/handlers')
const handleRejections = handlers.requestRejectionHandler
const statusCode = require('http-status-codes')
const Dashboard = require('../database/models').getDashboard()
const viewUtils = require('../utilities/viewUtils')

/**
 * GET - Gets dashboard by name
 */
router.get('/:dashboardName', handleRejections(async (req, res) => {
  // Fetch the dashboard
  const dashboardName = req.params.dashboardName
  if (!dashboardName) return req.statusCode(statusCode.NOT_FOUND)

  const models = await Dashboard.find({ name: dashboardName.toLowerCase() })
  if (!(models && models.length)) {
    return res.statusCode(statusCode.NOT_FOUND)
  }

  res.render('index', {
    dashboard: models[0],
    ...viewUtils
  })
}))

/**
 * GET - Gets dashboard by name
 */
router.get('/:id', handleRejections(async (req, res) => {
  // Fetch the dashboard
  const id = req.params.id
  const models = await Dashboard.find({ _id: id })
  if (!(models && models.length)) {
    return res.statusCode(statusCode.NOT_FOUND)
  }

  res.render('index', {
    dashboard: models[0],
    ...viewUtils
  })
}))

module.exports = router

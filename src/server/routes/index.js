const express = require('express')
const router = express.Router()
const handlers = require('../middleware/handlers')
const handleRejections = handlers.requestRejectionHandler
const statusCode = require('http-status-codes')
const Dashboard = require('../database/models').getDashboard()

/**
 * GET - Gets dashboard by name
 */
router.get('/:dashboardName', handleRejections(async (req, res) => {
  // Fetch the dashboard
  const dashboardName = req.params.dashboardName
  const models = await Dashboard.find({ name: dashboardName })
  if (!(models && models.length)) {
    return res.statusCode(statusCode.NOT_FOUND)
  }

  res.render('index', { dashboard: models[0] })
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

  res.render('index', { dashboard: models[0] })
}))

module.exports = router

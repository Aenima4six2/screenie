const express = require('express')
const router = express.Router()
const handlers = require('../middleware/handlers')
const handleRejections = handlers.requestRejectionHandler
const statusCode = require('http-status-codes')
const Dashboard = require('../database').getModel('Dashboard')

/**
 * CREATE - Creates a dashboard specific notification
 */
router.post('/:dashboardId', handleRejections(async (req, res) => {
  const dashboardId = req.params.dashboardId
  if (!dashboardId) return res.sendStatus(statusCode.BAD_REQUEST)

  const message = req.body
  if (!message) return res.sendStatus(statusCode.BAD_REQUEST)

  const dashboard = await Dashboard.findById(dashboardId)
  if (!dashboard) return res.sendStatus(statusCode.NOT_FOUND)
  res.sendStatus(statusCode.ACCEPTED)

  const dsm = req.dashboardSocketManager
  dsm.sendDashboardNotification(message, dashboardId)
}))

/**
 * CREATE - Creates a dashboard notification from slack
 */
router.post('/slack', handleRejections(async (req, res) => {
  const token = req.body.token
  if (!token) return res.sendStatus(statusCode.BAD_REQUEST)

  const message = req.body.message
  if (!message) return res.sendStatus(statusCode.BAD_REQUEST)
  res.sendStatus(statusCode.ACCEPTED)

  const dsm = req.dashboardSocketManager
  const dashboards = await Dashboard.find({ webhookTokens: [token] })
  dashboards.forEach(dashboard => {
    dsm.sendDashboardNotification(message, dashboard.id)
  })
}))

module.exports = router
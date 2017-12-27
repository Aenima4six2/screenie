const express = require('express')
const router = express.Router()
const handlers = require('../middleware/handlers')
const handleRejections = handlers.requestRejectionHandler
const halson = require('halson')
const statusCode = require('http-status-codes')
const Dashboard = require('../database').getModel('Dashboard')

/**
 * GET - Gets all dashboards
 */
router.get('/', handleRejections(async (req, res) => {
  // Fetch the dashboard
  const models = await Dashboard.find({})
  const resource = models.map((model) => halson(model.toObject())
    .addLink('self', `${req.baseUrl}/${model.id}`))

  res.status(statusCode.OK).json(resource)
}))

/**
 * GET - Gets a dashboard
 */
router.get('/:id', handleRejections(async (req, res) => {
  // Fetch the dashboard
  const id = req.params.id
  const model = await Dashboard.findById(id)
  const resource = halson(model.toObject())
    .addLink('self', `${req.baseUrl}/${model.id}`)

  res.status(statusCode.OK).json(resource)
}))

/**
 * POST - Creates a new dashboard
 */
router.post('/', handleRejections(async (req, res) => {
  // Fetch the dashboard
  const data = req.body
  const model = new Dashboard(data)
  await model.save()
  const dsm = req.dashboardSocketManager
  dsm.createDashboardNamespace(model._id)
  dsm.reloadDashboard()

  const resource = halson(model.toObject()).addLink('self', `${req.baseUrl}/${model.id}`)
  res.location(resource.getLink('self').href)
  res.status(statusCode.CREATED).json(resource)

}))


/**
 * PUT - Updates a dashboard
 */
router.put('/:id', handleRejections(async (req, res) => {
  // Create domain model
  const id = req.params.id // id is required from request
  if (!id) throw new Error('Invalid Id', { status: statusCode.BAD_REQUEST })

  const dashboard = req.body
  const model = await Dashboard.findOneAndUpdate({ _id: id }, dashboard, {
    new: true, runValidators: true
  })

  const dsm = req.dashboardSocketManager
  dsm.reloadDashboard()

  // Send resource
  const resource = halson(model.toObject()).addLink('self', `${req.baseUrl}/${model.id}`)
  res.status(statusCode.OK).json(resource)
}))

/**
 * DELETE - Removes a dashboard
 */
router.delete('/:id', handleRejections(async (req, res) => {
  // Remove the dashboard
  const id = req.params.id
  if (!id) throw new Error('Invalid Id', { status: statusCode.BAD_REQUEST })

  const dsm = req.dashboardSocketManager
  dsm.reloadDashboard()
  
  await Dashboard.remove({ _id: id })
  res.sendStatus(statusCode.OK)
}))

module.exports = router

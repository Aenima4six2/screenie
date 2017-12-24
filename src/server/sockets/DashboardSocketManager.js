const ioFactory = require('socket.io')

class DashboardSocketManager {
  constructor({ server, logger, dashboardIds }) {
    this._server = server
    this._logger = logger
    this._io = ioFactory(server)
    this._namespaces = {}

    if (dashboardIds && dashboardIds.length) {
      dashboardIds.forEach(db => this.createDashboardNamespace(db))
    }
  }

  createDashboardNamespace(dashboardId) {
    if (!Object.keys(this._namespaces).includes(dashboardId)) {
      const nsp = ioFactory(this._server).of(`/${dashboardId}`)
      nsp.on('connection', () => {
        this._logger.info(`Dashboard client connected to ${dashboardId}`)
      })
      nsp.on('disconnect', () => {
        this._logger.info(`Dashboard client disconnected from ${dashboardId}`)
      })
      this._namespaces[dashboardId] = nsp
    }
  }

  sendDashboardNotification(dashboardId, message) {
    const nsp = this._namespaces[dashboardId]
    if(!nsp) throw new Error(`${dashboardId} Namespace not created!`)
    
    nsp.emit('notification', message)
    this.logger.info(`Sent ${dashboardId} notification ${JSON.stringify(message)}`)
  }
}

module.exports = DashboardSocketManager
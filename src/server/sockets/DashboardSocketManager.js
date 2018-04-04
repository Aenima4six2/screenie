const ioFactory = require('socket.io')
const config = require('config')
const conversions = require('../utilities/conversions')

class DashboardSocketManager {
  constructor({ server, logger, dashboardIds }) {
    this._server = server
    this._logger = logger
    this._io = ioFactory(server, createSocketOptions())
    this._namespaces = {}

    if (dashboardIds && dashboardIds.length) {
      dashboardIds.forEach(db => this.createDashboardNamespace(db))
    }
  }

  createDashboardNamespace(dashboardId) {
    if (!Object.keys(this._namespaces).includes(dashboardId)) {
      const nsp = this._io.of(`/${dashboardId}`)
      nsp.on('connection', (socket) => {
        this._logger.info(`Dashboard client connected to ${dashboardId}`)
        socket.on('disconnect', () => {
          this._logger.info(`Dashboard client disconnected from ${dashboardId}`)
        })
      })
      this._namespaces[dashboardId] = nsp
    }
  }

  sendDashboardNotification(message, ...dashboardIds) {
    const namespaces = dashboardIds.length
      ? [...dashboardIds]
      : Object.keys(this._namespaces)

    namespaces.forEach(namespace => {
      const nsp = this._namespaces[namespace]
      if (!nsp) throw new Error(`${namespace} Namespace not created!`)

      nsp.emit('notification', message)
      this._logger.info(`Sent ${namespace} notification ${JSON.stringify(message)}`)
    })
  }

  reloadDashboard(...dashboardIds) {
    const namespaces = dashboardIds.length
      ? [...dashboardIds]
      : Object.keys(this._namespaces)

    namespaces.forEach(namespace => {
      const nsp = this._namespaces[namespace]
      if (!nsp) throw new Error(`${namespace} Namespace not created!`)

      nsp.emit('reload')
      this._logger.info(`Sent ${namespace} reload command`)
    })
  }
}

function createSocketOptions() {
  const socketConfig = config.get('socketio')
  if (!socketConfig) return

  const socketOptions = { transports: [] }
  const usePolling = conversions.getBoolean(socketConfig.usePolling)
  const useWebSockets = conversions.getBoolean(socketConfig.useWebSockets)
  
  if (usePolling) socketOptions.transports.push('polling')
  if (useWebSockets) socketOptions.transports.push('websocket')

  return socketOptions
}

module.exports = DashboardSocketManager

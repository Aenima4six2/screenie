import * as actions from '../actions'
import io from 'socket.io-client'
import Alert from 'react-s-alert'
import { getServerAddress } from '../utilities'
let socket

// Handle Socket.io communication
export const notificationSocket = store => next => action => {
  // Send message
  if (action.type === actions.SET_CURRENT) {
    if (!action.current) {
      next(action)
      return
    }

    const activeDashboardId = action.current._id
    const nspUri = `${getServerAddress()}/${activeDashboardId}`
    if (socket && nspUri.endsWith(socket.nsp)) {
      next(action)
      return
    }
    
    // Re-Connect
    if (socket) {
      socket.removeAllListeners('notification')
      socket.removeAllListeners('reload')
      socket.close()
    }

    // Connect
    socket = io(nspUri)
    socket.on('notification', (message) => {
      const alert = getAlert(message.type)
      alert(createHtml(message), {
        position: message.position || 'top-right',
        effect: 'bouncyflip',
        beep: message.beep || false,
        timeout: message.timeout || 5000,
        offset: message.offset || 100,
        html: true
      })
    })

    socket.on('reload', () => {
      store.dispatch(actions.loadAvailableDashboards(activeDashboardId))
    })
  }

  // Next middleware
  next(action)
}

const getAlert = (type = '') => {
  type = (typeof type === 'string') ? type : ''
  type = type.toLowerCase()
  switch (type) {
    case 'warning': {
      return Alert.warning
    }
    case 'error': {
      return Alert.error
    }
    case 'success': {
      return Alert.success
    }
    default: {
      return Alert.info
    }
  }
}
const createHtml = (message) => `
  <div>
    <h1>${message.title || 'Notification'}</h1>
    <h2>${message.from
    ? `<span>${message.from}</span>: `
    : ''}
      ${message.text}
    </h2>
  </div>
`

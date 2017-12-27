import * as actions from '../actions'
import io from 'socket.io-client'
import Alert from 'react-s-alert'
import { getServerAddress } from '../utilities'
let socket

// Handle Socket.io communication
export const notificationSocket = store => next => action => {
  // Send message
  if (action.type === actions.SET_CURRENT) {
    //Connect
    const dashboard = action.current
    const nspUri = `${getServerAddress()}/${dashboard._id}`
    if (socket && nspUri.endsWith(socket.nsp)) return
    else if (socket) {
      socket.removeAllListeners('notification')
      socket.close()
    }

    socket = io(nspUri)
    socket.on('notification', sendAlert)
  }

  // Next middleware
  next(action)
}

const sendAlert = (message) => {
  const alert = getAlert(message.type)
  alert(createHtml(message), {
    position: message.position || 'top-right',
    effect: 'bouncyflip',
    beep: message.beep || false,
    timeout: message.timeout || 5000,
    offset: message.offset || 100,
    html: true
  })
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

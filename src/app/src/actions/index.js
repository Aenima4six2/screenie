import 'whatwg-fetch'
import { getServerAddress } from '../utilities'

export const ADD_PANE = 'ADD_PANE'
export const REMOVE_PANE = 'REMOVE_PANE'
export const LOAD_AVAILABLE = 'LOAD_AVAILABLE'
export const SET_CURRENT = 'SET_CURRENT'

export const addPane = () => {
  return {
    type: 'ADD_PANE'
  }
}

export const removePane = () => {
  return {
    type: 'REMOVE_PANE'
  }
}

export const loadDashboardsAndSetCurrent = (nameOrId) => async (dispatch) => {
  const uri = `${getServerAddress()}/api/dashboards`
  const response = await fetch(uri)
  const available = await response.json()

  if (nameOrId) {
    const current = available.find(x => x._id === nameOrId || x.name === nameOrId)
    dispatch(setCurrent(current))
  }

  dispatch({ type: 'LOAD_AVAILABLE', available })
}

export const setCurrent = (current) => {
  return {
    type: 'SET_CURRENT',
    current
  }
}

export const addDashboard = (dashboard) => async (dispatch) => {
  const uri = `${getServerAddress()}/api/dashboards`
  const response = await fetch(uri, {
    method: 'POST',
    body: JSON.stringify(dashboard),
    headers: { 'Content-Type': 'application/json' }
  })

  if (response.status >= 200 && response.status < 300) {
    dispatch(loadDashboardsAndSetCurrent())
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

export const updateDashboard = (dashboard) => async (dispatch) => {
  const uri = `${getServerAddress()}/api/dashboards/${dashboard._id}`
  const response = await fetch(uri, {
    method: 'PUT',
    body: JSON.stringify(dashboard),
    headers: { 'Content-Type': 'application/json' }
  })

  if (response.status >= 200 && response.status < 300) {
    dispatch(loadDashboardsAndSetCurrent())
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}
import 'whatwg-fetch'

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

export const loadDashboards = () => async (dispatch) => {
  const origin = window.location.origin
  const baseAddress = origin.endsWith('/') ? origin : `${origin}/`
  const response = await fetch(`${baseAddress}api/dashboards`)
  const available = await response.json()
  dispatch({
    type: 'LOAD_AVAILABLE',
    available
  })
}

export const setCurrent = (current) => {
  return {
    type: 'SET_CURRENT',
    current
  }
}
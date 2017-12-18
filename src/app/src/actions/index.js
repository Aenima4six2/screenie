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
  const response = await fetch('http://localhost:3000/api/dashboards')
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
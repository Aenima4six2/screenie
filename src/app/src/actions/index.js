import 'whatwg-fetch'
import { getServerAddress } from '../utilities'

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
  const uri = `${getServerAddress()}/api/dashboards`
  const response = await fetch(uri)
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

export const addDashboard = async (values, dispatch) => {

}
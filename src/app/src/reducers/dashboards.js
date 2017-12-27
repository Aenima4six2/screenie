import * as actions from '../actions'

const maxPanes = 4
const minPanes = 1
const defaultState = {
  available: []
}

const available = (state = defaultState, action) => {
  switch (action.type) {
    case actions.LOAD_AVAILABLE: {
      return {
        ...state,
        available: [...action.available]
      }
    }
    case actions.SET_CURRENT: {
      return {
        ...state,
        current: { ...action.current }
      }
    }
    case actions.ADD_PANE:
      const panes = state.layout.panes < maxPanes
        ? state.layout.panes + 1
        : maxPanes
      return { ...state, current: { layout: { panes } } }
    case actions.REMOVE_PANE: {
      const panes = state.layout.panes > minPanes
        ? state.layout.panes - 1
        : minPanes
      return { ...state, current: { layout: { panes } } }
    }
    default:
      return state
  }
}

export default available
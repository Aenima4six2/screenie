const maxPanes = 4
const minPanes = 1
const defaultState = {
  loaded: false,
  available: []
}

const available = (state = defaultState, action) => {
  switch (action.type) {
    case 'LOAD_AVAILABLE': {
      return {
        ...state,
        loaded: true,
        available: [...action.available]
      }
    }
    case 'SET_CURRENT': {
      return {
        ...state,
        current: { ...action.current }
      }
    }
    case 'ADD_PANE':
      const panes = state.layout.panes < maxPanes
        ? state.layout.panes + 1
        : maxPanes
      return { ...state, current: { layout: { panes } } }
    case 'REMOVE_PANE': {
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
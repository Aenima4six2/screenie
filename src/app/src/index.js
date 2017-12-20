import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './components/App'
import Store from './store'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import theme from './theme'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import 'typeface-roboto'

render(
  <Provider store={Store}>
    <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
      <Router>
        <div>
          <Route exact path="/" component={() => <App />} />
          <Route exact path="/:nameOrId" component={() => <App />} />
        </div>
      </Router>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
)

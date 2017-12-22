import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './components/App'
import Store from './store'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import theme from './theme'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import Setup from './components/Setup'
import 'typeface-roboto'

const redirection = {
  pathname: '/setup',
  state: { from: '/' }
}

render(
  <Provider store={Store}>
    <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
      <Router>
        <div>
          <Route exact path="/" component={() => <Redirect to={redirection} />} />
          <Route exact path="/setup" component={() => <Setup />} />
          <Route path="/dashboards/:nameOrId" component={() => <App />} />
        </div>
      </Router>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
)

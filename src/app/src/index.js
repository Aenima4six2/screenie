import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './components/App'
import Store from './store'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import theme from './theme'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import ModalDashboardSelector from './components/ModalDashboardSelector'
import 'typeface-roboto'
import 'react-s-alert/dist/s-alert-default.css'
import 'react-s-alert/dist/s-alert-css-effects/bouncyflip.css'
import Alert from 'react-s-alert'

const redirection = {
  pathname: '/setup',
  state: { from: '/' }
}

render(
  <Provider store={Store}>
    <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
      <Router>
        <div id="app-root">
          <Route exact path="/" component={() =>
            <Redirect to={redirection} />}
          />
          <Route exact path="/setup" component={() =>
            <ModalDashboardSelector open={true} />}
          />
          <Route path="/dashboards/:nameOrId" component={() =>
            <App />}
          />
          <Alert stack={{ limit: 3 }} />
        </div>
      </Router>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
)
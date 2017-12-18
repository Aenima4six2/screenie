import React, { Component } from 'react'
import DashboardLayout from './DashboardLayout'
import ModalDashboardSelector from './ModalDashboardSelector'
import Loading from './Loading'
import { connect } from 'react-redux'
import * as actions from '../actions'
import PropTypes from 'prop-types'

class App extends Component {
  componentDidMount() {
    if (!this.props.loaded) {
      this.props.dispatch(actions.loadDashboards())
    }
  }

  setCurrent = (current) => {
    this.props.dispatch(actions.setCurrent(current))
  }

  render() {
    if (this.props.loaded) {
      var showDashboard = !!this.props.current
      if (showDashboard) {
        return (
          <DashboardLayout
            onCurrentSelected={this.setCurrent}
            {...this.props}
          />
        )
      }

      return (
        <ModalDashboardSelector
          onCurrentSelected={this.setCurrent}
          current={this.props.current}
          available={this.props.available} />
      )
    }

    return <Loading/>
  }
}

App.props = {
  loaded: PropTypes.bool.isRequired,
  current: PropTypes.object,
  available: PropTypes.arrayOf(PropTypes.object).isRequired
}

function mapStateToProps(state) {
  return {
    loaded: state.dashboards.loaded,
    available: state.dashboards.available,
    current: state.dashboards.current
  }
}

export default connect(mapStateToProps)(App)

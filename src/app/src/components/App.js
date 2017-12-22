import React, { Component } from 'react'
import DashboardLayout from './DashboardLayout'
import ModalDashboardSelector from './ModalDashboardSelector'
import { connect } from 'react-redux'
import * as actions from '../actions'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'

const fiveMin = 900000

class App extends Component {
  static propTypes = {
    current: PropTypes.object,
    available: PropTypes.arrayOf(PropTypes.object).isRequired,
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }

  componentDidMount() {
    if (!this.props.available.length) {
      const nameOrId = this.props.match.params.nameOrId
      this.props.dispatch(actions.loadDashboardsAndSetCurrent(nameOrId))
      this.schedule = setInterval(() => {
        const dashboard = this.props && this.props.current
        if (dashboard) {
          const id = dashboard._id
          this.props.dispatch(actions.loadDashboardsAndSetCurrent(id))
        }
      }, fiveMin)
    }
  }

  componentWillUnmount() {
    if (this.schedule) clearInterval(this.schedule)
  }

  setCurrent = (current) => {
    this.props.dispatch(actions.setCurrent(current))
  }

  render() {
    if (this.props.current) {
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
        available={this.props.available}
        {...this.props}
      />
    )
  }
}

function mapStateToProps(state) {
  return {
    available: state.dashboards.available,
    current: state.dashboards.current
  }
}

export default withRouter(connect(mapStateToProps)(App))

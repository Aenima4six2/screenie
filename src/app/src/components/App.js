import React, { Component } from 'react'
import DashboardLayout from './DashboardLayout'
import ModalDashboardSelector from './ModalDashboardSelector'
import Loading from './Loading'
import { connect } from 'react-redux'
import * as actions from '../actions'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'

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
    }
  }

  setCurrent = (current) => {
    this.props.dispatch(actions.setCurrent(current))
  }

  render() {
    if (this.props.available.length) {
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

    return <Loading />
  }
}

function mapStateToProps(state) {
  return {
    available: state.dashboards.available,
    current: state.dashboards.current
  }
}

export default withRouter(connect(mapStateToProps)(App))

import React, { Component } from 'react'
import ModalDashboardSelector from './ModalDashboardSelector'
import { connect } from 'react-redux'
import * as actions from '../actions'
import PropTypes from 'prop-types'

class Setup extends Component {
  static propTypes = {
    available: PropTypes.arrayOf(PropTypes.object).isRequired
  }

  componentDidMount() {
    if (!this.props.available.length) {
      this.props.dispatch(actions.loadAvailableDashboards())
    }
  }

  handleOpenDashboard = (current) => {
    this.props.dispatch(actions.setCurrent(current))
  }

  handleRemoveDashboard = (current) => {
    this.props.dispatch(actions.removeDashboard(current))
  }

  render() {
    return (
      <ModalDashboardSelector
        onDashboardOpened={this.handleOpenDashboard}
        onDashboardRemoved={this.handleRemoveDashboard}
        available={this.props.available}
      />
    )
  }
}

const mapStateToProps = (state) => ({
  available: state.dashboards.available
})

export default connect(mapStateToProps)(Setup)

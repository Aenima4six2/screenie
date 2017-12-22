import React, { Component } from 'react'
import ModalDashboardSelector from './ModalDashboardSelector'
import { connect } from 'react-redux'
import * as actions from '../actions'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'

class Setup extends Component {
  static propTypes = {
    current: PropTypes.object,
    available: PropTypes.arrayOf(PropTypes.object).isRequired,
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }

  componentDidMount() {
    if (!this.props.available.length) {
      this.props.dispatch(actions.loadDashboardsAndSetCurrent())
    }
  }

  setCurrent = (current) => {
    this.props.dispatch(actions.setCurrent(current))
  }

  render() {
    return (
      <ModalDashboardSelector
        onCurrentSelected={this.setCurrent}
        current={this.props.current}
        available={this.props.available}
      />
    )
  }
}

const mapStateToProps = (state) => ({
  available: state.dashboards.available,
  current: state.dashboards.current,
})

export default withRouter(connect(mapStateToProps)(Setup))

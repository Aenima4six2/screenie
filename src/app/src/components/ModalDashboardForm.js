import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import PropTypes from 'prop-types'
import DashboardEditor from './DashboardEditor'
import { connect } from 'react-redux'
import * as actions from '../actions'
import '../../node_modules/font-awesome/css/font-awesome.css'

class ModalDashboardForm extends React.Component {
  static propTypes = {
    onClosed: PropTypes.func,
    open: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
    dashboard: PropTypes.object,
  }

  state = {
    canSave: true,
    dashboard: this.props.dashboard
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.dashboard) {
      this.setState({
        canSave: true,
        dashboard: nextProps.dashboard
      })
    }
  }

  handleSave = () => {
    const existingDashboard = this.props.dashboard
    const mergedDashboard = { ...existingDashboard, ...this.state.dashboard }
    if (existingDashboard) {
      this.props.dispatch(actions.updateDashboard(mergedDashboard))
    }
    else {
      this.props.dispatch(actions.addDashboard(mergedDashboard))
    }

    this.setState({ open: false, dashboard: undefined }, () => {
      if (this.props.onClosed) this.props.onClosed()
    })
  }

  handleCancel = () => {
    this.setState({ open: false })
    if (this.props.onClosed) this.props.onClosed()
  }

  handleAddNewClicked = () => {
    this.setState({ open: false })
  }

  handleDashboardChanged = (dashboard, hasErrors) => {
    this.setState({ dashboard, canSave: dashboard && !hasErrors })
  }

  render() {
    return (
      <form>
        <Dialog
          title={this.props.dashboard ? 'Edit Dashboard' : 'Add Dashboard'}
          actions={[
            <FlatButton
              label="Cancel"
              primary={false}
              keyboardFocused={false}
              onClick={this.handleCancel}
            />,
            <FlatButton
              label="Save"
              primary={true}
              keyboardFocused={true}
              disabled={!this.state.canSave}
              onClick={this.handleSave}
            />
          ]}
          open={this.props.open}
          modal={true}
          autoScrollBodyContent={true}>
          <DashboardEditor
            ref={node => { this.editor = node }}
            dashboard={this.state.dashboard}
            onDashboardChanged={this.handleDashboardChanged}
          />
        </Dialog>
      </form>
    )
  }
}

export default connect()(ModalDashboardForm)
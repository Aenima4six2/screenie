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

  handleSave = () => {
    const dashboard = { ...this.props.dashboard, ...this.editor.getDashboard() }
    const isUpdate = this.props.dashboard
    if (isUpdate) {
      this.props.dispatch(actions.updateDashboard(dashboard))
    }
    else {
      this.props.dispatch(actions.addDashboard(dashboard))
    }

    this.setState({ open: false }, () => {
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
              disabled={!!this.editor}
              onClick={this.handleSave}
            />
          ]}
          open={this.props.open}
          modal={true}
          autoScrollBodyContent={true}>
          <DashboardEditor
            ref={node => { this.editor = node }}
            dashboard={this.props.dashboard}
          />
        </Dialog>
      </form>
    )
  }
}

export default connect()(ModalDashboardForm)
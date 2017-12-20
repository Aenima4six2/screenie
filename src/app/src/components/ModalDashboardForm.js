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
    dispatch: PropTypes.func.isRequired
  }

  handleSave = () => {
    const dashboard = this.editor.getDashboard()
    this.props.dispatch(actions.addNewDashboard(dashboard))

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
          title="Add New Dashboard"
          actions={[
            <FlatButton
              label="Save"
              primary={true}
              keyboardFocused={true}
              disabled={!!this.editor}
              onClick={this.handleSave}
            />,
            <FlatButton
              label="Cancel"
              primary={false}
              keyboardFocused={false}
              onClick={this.handleCancel}
            />
          ]}
          open={this.props.open}
          modal={true}
          autoScrollBodyContent={true}>

          <DashboardEditor ref={node => {
            this.editor = node
          }} />
        </Dialog>
      </form>
    )
  }
}


export default connect()(ModalDashboardForm)
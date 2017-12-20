import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import PropTypes from 'prop-types'
import { titleCase } from '../utilities'
import FontIcon from 'material-ui/FontIcon'
import DashboardForm from './DashboardForm'
import '../../node_modules/font-awesome/css/font-awesome.css'

export default class ModalDashboardForm extends React.Component {
  static propTypes = {
    onClosed: PropTypes.func,
    open: PropTypes.bool.isRequired
  }

  state = { canSave: false }

  handleSave = () => {
    this.setState({ open: false })
    if (this.props.onClosed) this.props.onClosed()
  }

  handleCancel = () => {
    this.setState({ open: false })
    if (this.props.onClosed) this.props.onClosed()
  }

  handleAddNewClicked = () => {
    this.setState({ open: false, open: true })
  }

  render() {
    return (
      <Dialog
        title="Add New Dashboard"
        actions={[
          <FlatButton
            label="Save"
            primary={true}
            keyboardFocused={true}
            disabled={!this.state.canSave}
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

        <DashboardForm />
      </Dialog>
    )
  }
}

import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import PropTypes from 'prop-types'
import { titleCase } from '../utilities'
import FontIcon from 'material-ui/FontIcon'
import ModalDashboardForm from './ModalDashboardForm'
import { withRouter } from 'react-router-dom'
import '../../node_modules/font-awesome/css/font-awesome.css'


class ModalDashboardSelector extends React.Component {
  static propTypes = {
    onDashboardOpened: PropTypes.func.isRequired,
    onDashboardRemoved: PropTypes.func.isRequired,
    available: PropTypes.arrayOf(PropTypes.object).isRequired,
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }

  state = {
    open: true,
    addNewDashboardOpen: false,
    editDashboardOpen: false,
    removeDashboardDialogOpen: false
  }

  componentWillReceiveProps(newProps) {
    this.setState({ current: undefined })
  }

  handleOpenDashboard = () => {
    const dashboard = this.state.current
    this.props.history.push(`/dashboards/${dashboard.name}`)
    this.props.onDashboardOpened(dashboard)
    this.setState({ open: false })
  }

  handleRemoveDashboard = () => {
    const dashboard = this.state.current
    this.props.onDashboardRemoved(dashboard)
    this.setState({ open: true, removeDashboardDialogOpen: false })
  }

  handleDashboardSelected = (e, value) => {
    this.setState({ current: value })
  }

  handleAddDashboardOpened = () => {
    this.setState({ addNewDashboardOpen: true })
  }

  handleAddDashboardClosed = () => {
    this.setState({ addNewDashboardOpen: false })
  }


  handleEditDashboardOpened = () => {
    this.setState({ editDashboardOpen: true })
  }

  handleEditDashboardClosed = () => {
    this.setState({ editDashboardOpen: false })
  }

  handleRemoveDashboardDialogOpened = () => {
    this.setState({ removeDashboardDialogOpen: true })
  }

  handleRemoveDashboardDialogClosed = () => {
    this.setState({ removeDashboardDialogOpen: false })
  }


  render() {
    return (
      <div>
        <Dialog
          title="Dashboards"
          actions={[
            <FlatButton
              label="Add"
              primary={false}
              keyboardFocused={false}
              onClick={() => this.handleAddDashboardOpened()}
              style={{ float: 'left' }}
            />,
            <FlatButton
              label="Delete"
              primary={false}
              keyboardFocused={false}
              onClick={() => this.handleRemoveDashboardDialogOpened()}
              disabled={!this.state.current}
            />,
            <FlatButton
              label="Edit"
              primary={false}
              keyboardFocused={false}
              onClick={() => this.handleEditDashboardOpened()}
              disabled={!this.state.current}
            />,
            <FlatButton
              label="Open"
              primary={true}
              keyboardFocused={true}
              onClick={() => this.handleOpenDashboard()}
              disabled={!this.state.current}
            />
          ]}
          open={this.state.open}
          modal={true}
          autoScrollBodyContent={true}>
          <RadioButtonGroup name="dashboards"
            onChange={(e, value) => this.handleDashboardSelected(e, value)}>
            {this.props.available.map(dashboard =>
              <RadioButton
                key={dashboard._id}
                value={dashboard}
                label={titleCase(dashboard.name)}
                style={{ marginTop: 16 }}
                checkedIcon={
                  <FontIcon
                    className="fa fa-tachometer"
                    style={{ marginRight: 24 }}
                  />}
              />
            )}
          </RadioButtonGroup>
        </Dialog>

        <ModalDashboardForm
          open={this.state.addNewDashboardOpen}
          onClosed={() => this.handleAddDashboardClosed()}
        />

        <ModalDashboardForm
          open={this.state.editDashboardOpen}
          onClosed={() => this.handleEditDashboardClosed()}
          dashboard={this.state.current}
        />

        <Dialog
          title="Really Delete?"
          open={this.state.removeDashboardDialogOpen}
          modal={true}
          actions={[<FlatButton
            label="Cancel"
            primary={false}
            keyboardFocused={false}
            onClick={() => this.handleRemoveDashboardDialogClosed()}
            disabled={!this.state.current}
          />,
          <FlatButton
            label="Yup"
            primary={true}
            keyboardFocused={true}
            onClick={() => this.handleRemoveDashboard()}
            disabled={!this.state.current}
          />]}
        ></Dialog>

      </div >
    )
  }
}

export default withRouter(ModalDashboardSelector)
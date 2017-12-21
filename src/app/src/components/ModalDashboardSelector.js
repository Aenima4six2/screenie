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
    onCurrentSelected: PropTypes.func.isRequired,
    current: PropTypes.object,
    available: PropTypes.arrayOf(PropTypes.object).isRequired,
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }

  state = {
    open: true,
    addNewDashboardOpen: false,
    editDashboardOpen: false,
    current: this.props.current
  }

  handleOpenDashboard = () => {
    const dashboard = this.state.current
    this.props.history.push(`/${dashboard.name}`)
    this.props.onCurrentSelected(dashboard)
    this.setState({ open: false })
  }

  handleDashboardSelected = (e, value) => {
    this.setState({ current: value })
  }

  handleAddDashboardOpened = () => {
    this.setState({ open: false, addNewDashboardOpen: true })
  }

  handleAddDashboardClosed = () => {
    this.setState({ open: true, addNewDashboardOpen: false })
  }


  handleEditDashboardOpened = () => {
    this.setState({ drawerOpen: false, editDashboardOpen: true })
  }

  handleEditDashboardClosed = () => {
    this.setState({ drawerOpen: true, editDashboardOpen: false })
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
              onClick={this.handleAddDashboardOpened}
              style={{ float: 'left' }}
            />,
            <FlatButton
              label="Edit"
              primary={false}
              keyboardFocused={false}
              onClick={this.handleEditDashboardOpened}
              disabled={!this.state.current}
            />,
            <FlatButton
              label="Open"
              primary={true}
              keyboardFocused={true}
              onClick={this.handleOpenDashboard}
              disabled={!this.state.current}
            />
          ]}
          open={this.state.open}
          modal={true}
          autoScrollBodyContent={true}>
          <RadioButtonGroup name="dashboards" onChange={this.handleDashboardSelected}>
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
          onClosed={this.handleAddDashboardClosed}
        />

        <ModalDashboardForm
          open={this.state.editDashboardOpen}
          onClosed={this.handleEditDashboardClosed}
          dashboard={this.state.current}
        />
      </div>
    )
  }
}

export default withRouter(ModalDashboardSelector)
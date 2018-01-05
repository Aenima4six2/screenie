import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import PropTypes from 'prop-types'
import { titleCase } from '../utilities'
import FontIcon from 'material-ui/FontIcon'
import ModalDashboardForm from './ModalDashboardForm'
import * as actions from '../actions'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import '../../node_modules/font-awesome/css/font-awesome.css'


class ModalDashboardSelector extends React.Component {
  static propTypes = {
    available: PropTypes.arrayOf(PropTypes.object).isRequired,
    history: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    showCancelButton: PropTypes.bool
  }

  state = {
    open: this.props.open,
    addNewDashboardOpen: false,
    editDashboardOpen: false,
    removeDashboardDialogOpen: false,
    cloneDashboardDialogOpen: false
  }

  // Overrides
  componentDidMount() {
    if (!this.props.available.length) {
      this.props.dispatch(actions.loadAvailableDashboards())
    }
  }

  componentWillReceiveProps(newProps) {
    this.setState({ current: undefined, open: newProps.open })
  }

  // Select Handler
  handleDashboardSelected = (e, value) => {
    this.setState({ current: value })
  }


  // Open Handler
  handleOpenDashboard = () => {
    const dashboard = this.state.current
    this.props.history.push(`/dashboards/${encodeURIComponent(dashboard.name)}`)
    this.props.dispatch(actions.setCurrent(dashboard))
    this.setState({ open: false })
  }


  // Add Handlers
  handleAddDashboardOpened = () => {
    this.setState({ addNewDashboardOpen: true })
  }

  handleAddDashboardClosed = () => {
    this.setState({ addNewDashboardOpen: false })
  }


  // Edit Handlers
  handleEditDashboardOpened = () => {
    this.setState({ editDashboardOpen: true })
  }

  handleEditDashboardClosed = () => {
    this.setState({ editDashboardOpen: false })
  }


  // Remove Handlers
  handleRemoveDashboardDialogOpened = () => {
    this.setState({ removeDashboardDialogOpen: true })
  }

  handleRemoveDashboardDialogClosed = () => {
    this.setState({ removeDashboardDialogOpen: false })
  }

  handleRemoveDashboard = () => {
    const dashboard = this.state.current
    this.props.dispatch(actions.removeDashboard(dashboard))
    this.setState({ open: true, removeDashboardDialogOpen: false })
  }


  // Clone Handlers
  handleCloneDashboardDialogOpened = () => {
    this.setState({ cloneDashboardDialogOpen: true })
  }

  handleCloneDashboardDialogClosed = () => {
    this.setState({ cloneDashboardDialogOpen: false })
  }

  handleCloneDashboard = () => {
    const dashboard = this.state.current
    this.props.dispatch(actions.cloneDashboard(dashboard))
    this.setState({ open: true, cloneDashboardDialogOpen: false })
  }


  // Cancel Handlers
  handleCancelClicked = () => {
    this.setState({ open: false })
  }


  render() {
    return (
      <div>
        <Dialog
          title="Dashboards"
          actions={[
            this.props.showCancelButton &&
            <FlatButton
              label="Cancel"
              primary={false}
              keyboardFocused={false}
              onClick={() => this.handleCancelClicked()}
            />,
            <FlatButton
              label="Add"
              primary={false}
              keyboardFocused={false}
              onClick={() => this.handleAddDashboardOpened()}
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
              label="Clone"
              primary={false}
              keyboardFocused={false}
              onClick={() => this.handleCloneDashboardDialogOpened()}
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

        {/* Add Form */}
        <ModalDashboardForm
          open={this.state.addNewDashboardOpen}
          onClosed={() => this.handleAddDashboardClosed()}
        />

        {/* Edit Form */}
        <ModalDashboardForm
          open={this.state.editDashboardOpen}
          onClosed={() => this.handleEditDashboardClosed()}
          dashboard={this.state.current}
        />

        {/* Delete Dialog */}
        <Dialog
          title="Delete?"
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
            contentStyle={{ width: '100%', maxWidth: 'none', }}
            onClick={() => this.handleRemoveDashboard()}
            disabled={!this.state.current}
          />]}
        >
          Are you really sure you want to delete the selected dashboard?
        </Dialog>

        {/* Clone Dialog */}
        <Dialog
          title="Clone?"
          open={this.state.cloneDashboardDialogOpen}
          modal={true}
          actions={[<FlatButton
            label="Cancel"
            primary={false}
            keyboardFocused={false}
            onClick={() => this.handleCloneDashboardDialogClosed()}
            disabled={!this.state.current}
          />,
          <FlatButton
            label="Yup"
            primary={true}
            keyboardFocused={true}
            contentStyle={{ width: '100%', maxWidth: 'none', }}
            onClick={() => this.handleCloneDashboard()}
            disabled={!this.state.current}
          />]}
        >
          Are you really sure you want to clone the selected dashboard?
        </Dialog>

      </div >
    )
  }
}

const mapStateToProps = (state) => ({
  available: state.dashboards.available
})

export default withRouter(connect(mapStateToProps)(ModalDashboardSelector))
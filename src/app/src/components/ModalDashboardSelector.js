import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import PropTypes from 'prop-types'
import { titleCase } from '../utilities'
import FontIcon from 'material-ui/FontIcon'
import ModalDashboardForm from './ModalDashboardForm'
import '../../node_modules/font-awesome/css/font-awesome.css'


export default class ModalDashboardSelector extends React.Component {
  static propTypes = {
    onCurrentSelected: PropTypes.func.isRequired,
    current: PropTypes.object,
    available: PropTypes.arrayOf(PropTypes.object).isRequired
  }

  state = {
    open: true,
    addNewOpen: false,
    current: this.props.current
  }

  handleSubmit = () => {
    this.props.onCurrentSelected(this.state.current)
    this.setState({ open: false })
  }

  handleOnChanged = (e, value) => {
    this.setState({ current: value })
  }

  handleAddNewClicked = () => {
    this.setState({ open: false, addNewOpen: true })
  }

  handleAddNewClosed = () => {
    this.setState({ open: true, addNewOpen: false })
  }

  renderSelector() {
    return (
      <div>
        <Dialog
          title="Select a Dashboard"
          actions={[
            <FlatButton
              label="Select"
              primary={true}
              keyboardFocused={true}
              onClick={this.handleSubmit}
              disabled={!this.state.current}
            />
          ]}
          open={this.state.open}
          modal={true}
          autoScrollBodyContent={true}>

          <RadioButtonGroup name="dashboards" onChange={this.handleOnChanged}>
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
              />)}
          </RadioButtonGroup>

          <div style={{ marginTop: '3rem' }}>
            <FlatButton label="Add New" onClick={this.handleAddNewClicked} />
          </div>
        </Dialog>

        <ModalDashboardForm
          open={this.state.addNewOpen}
          onClosed={this.handleAddNewClosed}
        />
      </div>
    )
  }

  renderNoDashboards() {
    return (
      <div>
        <Dialog
          modal={true}
          open={this.state.open}
        >
          No Dashboards found. Please create one and reload the page!
        </Dialog>
      </div>
    )
  }

  render() {
    return this.props.available.length
      ? this.renderSelector()
      : this.renderNoDashboards()
  }
}
import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import PropTypes from 'prop-types'
import { titleCase } from '../utilities'
import FontIcon from 'material-ui/FontIcon'
import '../../node_modules/font-awesome/css/font-awesome.css'

const styles = {
  radioButton: {
    marginTop: 16,
  }
}

const iconStyles = {
  marginRight: 24,
}


export default class ModalDashboardSelector extends React.Component {
  state = {
    open: true,
    current: this.props.current
  }

  handleSubmit = () => {
    this.props.onCurrentSelected(this.state.current)
    this.setState({ open: false })
  }

  handleOnChanged = (e, value) => {
    this.setState({ current: value })
  }

  renderSelector() {
    const actions = [
      <FlatButton
        label="Select"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleSubmit}
        disabled={!this.state.current}
      />,
    ]

    const radios = []
    for (let dashboard of this.props.available) {
      radios.push(
        <RadioButton
          key={dashboard._id}
          value={dashboard}
          label={titleCase(dashboard.name)}
          style={styles.radioButton}
          checkedIcon={
            <FontIcon
              className="fa fa-tachometer"
              style={iconStyles}
            />}
        />
      )
    }

    return (
      <div>
        <Dialog
          title="Select a Dashboard"
          actions={actions}
          open={this.state.open}
          modal={true}
          autoScrollBodyContent={true}>
          <RadioButtonGroup name="dashboards" onChange={this.handleOnChanged}>
            {radios}
          </RadioButtonGroup>
        </Dialog>
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

ModalDashboardSelector.props = {
  onCurrentSelected: PropTypes.func.isRequired,
  current: PropTypes.object,
  available: PropTypes.arrayOf(PropTypes.object).isRequired
}
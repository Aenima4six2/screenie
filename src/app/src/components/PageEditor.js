import React from 'react'
import TextField from 'material-ui/TextField'
import Toggle from 'material-ui/Toggle'
import RaisedButton from 'material-ui/RaisedButton'
import PropTypes from 'prop-types'
import '../../node_modules/font-awesome/css/font-awesome.css'

class DashboardForm extends React.Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    page: PropTypes.object.isRequired
  }

  state = { page: this.props.page }

  handleNameChange = (event) => {
    const page = this.state.page
    page.name = event.target.value
    this.setState({ page })
  }

  handleUrlChange = (event) => {
    const page = this.state.page
    page.url = event.target.value
    this.setState({ page })
  }

  handleForceProxyToggle = (event, isInputChecked) => {
    const page = this.state.page
    page.forceProxy = isInputChecked
    this.setState({ page })
  }

  handleDurationMsChange = (event) => {
    const page = this.state.page
    page.durationMs = event.target.value
    this.setState({ page })
  }

  handleOrdinalChange = (event) => {
    const page = this.state.page
    page.ordinal = event.target.value
    this.setState({ page })
  }

  render() {
    return (
      <div style={{ marginLeft: '2rem' }}>
        <TextField
          floatingLabelText="Page Name"
          hintText="Google"
          value={this.state.page.name}
          onChange={this.handleNameChange}
        />
        <br />
        <TextField
          floatingLabelText="Page Url"
          hintText="https://www.google.com"
          value={this.state.page.url}
          onChange={this.handleUrlChange}
        />
        <br />
        <TextField
          floatingLabelText="Page Duration"
          hintText="60"
          value={this.state.page.durationMs}
          onChange={this.handleDurationMsChange}
        />
        <br />
        <TextField
          floatingLabelText="Page Display Order"
          hintText="1"
          value={this.state.page.ordinal}
          onChange={this.handleOrdinalChange}
        />
        <p />
        <Toggle
          label="Force Proxy"
          disabled={!this.state.page.forceProxy}
          labelPosition="right"
          onToggle={this.handleForceProxyToggle}
          style={{ marginBottom: 16 }}
        />
      </div>
    )
  }
}

export default DashboardForm
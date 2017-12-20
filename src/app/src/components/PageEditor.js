import React from 'react'
import TextField from 'material-ui/TextField'
import Toggle from 'material-ui/Toggle'
import RaisedButton from 'material-ui/RaisedButton'
import PropTypes from 'prop-types'
import '../../node_modules/font-awesome/css/font-awesome.css'

class DashboardForm extends React.Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string,
    url: PropTypes.string,
    forceProxy: PropTypes.bool,
    durationMs: PropTypes.number,
    ordinal: PropTypes.number,
    onPageChanged: PropTypes.func.isRequired
  }

  state = {
    name: this.props.name,
    url: this.props.url,
    forceProxy: this.props.forceProxy,
    durationMs: this.props.durationMs,
    ordinal: this.props.ordinal
  }

  handleNameChange = (event) => {
    this.setState({ name: event.target.value })
  }

  handleUrlChange = (event) => {
    this.setState({ url: event.target.value })
  }

  handleForceProxyChange = (event) => {
    this.setState({ forceProxy: event.target.value })
  }

  handleDurationMsChange = (event) => {
    this.setState({ durationMs: event.target.value })
  }

  handleOrdinalChange = (event) => {
    this.setState({ ordinal: event.target.value })
  }

  render() {
    return (
      <div style={{ marginLeft: '2rem' }}>
        <TextField
          floatingLabelText="Page Name"
          hintText="Google"
          value={this.state.name}
          onChange={this.handleNameChange}
        />
        <br />
        <TextField
          floatingLabelText="Page Url"
          hintText="https://www.google.com"
          value={this.state.url}
          onChange={this.handleUrlChange}
        />
        <br />
        <TextField
          floatingLabelText="Page Duration"
          hintText="60"
          value={this.state.durationMs}
          onChange={this.handleDurationMsChange}
        />
        <br />
        <TextField
          floatingLabelText="Page Display Order"
          hintText="1"
          value={this.state.ordinal}
          onChange={this.handleOrdinalChange}
        />
        <p />
        <Toggle
          label="Force Proxy"
          disabled={this.state.handleForceProxyChange}
          labelPosition="right"
          style={{ marginBottom: 16 }}
        />
      </div>
    )
  }
}

export default DashboardForm
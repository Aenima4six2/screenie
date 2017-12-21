import React from 'react'
import TextField from 'material-ui/TextField'
import Toggle from 'material-ui/Toggle'
import PropTypes from 'prop-types'
import '../../node_modules/font-awesome/css/font-awesome.css'

class PageEditor extends React.Component {
  static defaultProps = {
    name: '',
    url: '',
    forceProxy: false,
    durationMs: '',
    ordinal: ''
  }

  static propTypes = {
    name: PropTypes.any,
    url: PropTypes.any,
    forceProxy: PropTypes.bool.isRequired,
    durationMs: PropTypes.any,
    ordinal: PropTypes.any,
    onPageChanged: PropTypes.func
  }

  state = {
    name: this.props.name,
    url: this.props.url,
    forceProxy: !!this.props.forceProxy,
    durationMs: this.props.durationMs,
    ordinal: this.props.ordinal
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      name: nextProps.name,
      url: nextProps.url,
      forceProxy: nextProps.forceProxy,
      durationMs: nextProps.durationMs,
      ordinal: nextProps.ordinal
    })
  }

  getPage = () => ({ ...this.state })

  handleNameChange = (event) => {
    const name = event.target.value
    this.setState({ name }, this.handlePageChanged)
  }

  handleUrlChange = (event) => {
    const url = event.target.value
    this.setState({ url }, this.handlePageChanged)
  }

  handleForceProxyToggle = (event, isInputChecked) => {
    const forceProxy = isInputChecked
    this.setState({ forceProxy }, this.handlePageChanged)
  }

  handleDurationMsChange = (event) => {
    const durationMs = event.target.value
    this.setState({ durationMs }, this.handlePageChanged)
  }

  handleOrdinalChange = (event) => {
    const ordinal = event.target.value
    this.setState({ ordinal }, this.handlePageChanged)
  }

  handlePageChanged = () => {
    if (this.props.onPageChanged) {
      const page = this.getPage()
      this.props.onPageChanged(page)
    }
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
          floatingLabelText="Page Duration (in seconds)"
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
          toggled={this.state.forceProxy}
          labelPosition="right"
          onToggle={this.handleForceProxyToggle}
          style={{ marginBottom: 16 }}
        />
      </div>
    )
  }
}

export default PageEditor
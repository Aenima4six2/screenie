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

  getPage = () => ({
    name: this.state.name,
    url: this.state.url,
    forceProxy: !!this.state.forceProxy,
    durationMs: this.state.durationMs,
    ordinal: this.state.ordinal
  })

  handleNameChange = (event) => {
    const name = event.target.value
    let nameError = ''
    if (!name) nameError = 'Name is required!'
    else if (name && name.length > 200) nameError = 'Name must be 200 characters or less'
    this.setState({ name, nameError }, this.handlePageChanged)
  }

  handleUrlChange = (event) => {
    const url = event.target.value
    let urlError = ''
    if (!url) urlError = 'URL is required!'
    else if (!/^(http|https):\/\/[^ "]+$/.test(url)) urlError = 'URL is invalid!'
    this.setState({ url, urlError }, this.handlePageChanged)
  }

  handleForceProxyToggle = (event, isInputChecked) => {
    const forceProxy = isInputChecked
    this.setState({ forceProxy }, this.handlePageChanged)
  }

  handleDurationMsChange = (event) => {
    const durationMs = event.target.value
    let durationMsError = ''
    if (!durationMs) durationMsError = 'Duration is required!'
    else if (!Number.isInteger(parseInt(durationMs, 10)) || parseInt(durationMs, 10) < 0)
      durationMsError = 'Duration must be a whole number greater than zero!'
    this.setState({ durationMs, durationMsError }, this.handlePageChanged)
  }

  handleOrdinalChange = (event) => {
    const ordinal = event.target.value
    let ordinalError = ''
    if (!ordinal) ordinalError = 'Ordinal is required!'
    else if (Number.isNaN(parseFloat(ordinal)) || parseFloat(ordinal) < 0)
      ordinalError = 'Duration must be a number greater than zero!'
    this.setState({ ordinal, ordinalError }, this.handlePageChanged)
  }

  handlePageChanged = () => {
    if (this.props.onPageChanged) {
      const page = this.getPage()
      const hasErrors =
        this.state.ordinalError ||
        this.state.durationMsError ||
        this.state.nameError ||
        this.state.urlError

      this.props.onPageChanged(page, !!hasErrors)
    }
  }

  render() {
    return (
      <div style={{ marginLeft: '2rem' }}>
        <TextField
          floatingLabelText="Page Name"
          hintText="Google"
          value={this.state.name}
          errorText={this.state.nameError}
          onChange={this.handleNameChange}
        />
        <br />
        <TextField
          floatingLabelText="Page Url"
          hintText="https://www.google.com"
          value={this.state.url}
          errorText={this.state.urlError}
          onChange={this.handleUrlChange}
        />
        <br />
        <TextField
          floatingLabelText="Page Duration (in seconds)"
          hintText="60"
          value={this.state.durationMs}
          errorText={this.state.durationMsError}
          onChange={this.handleDurationMsChange}
        />
        <br />
        <TextField
          floatingLabelText="Page Display Order"
          hintText="1"
          value={this.state.ordinal}
          errorText={this.state.ordinalError}
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
import React from 'react'
import TextField from 'material-ui/TextField'
import PropTypes from 'prop-types'
import PageEditor from './PageEditor'
import FlatButton from 'material-ui/FlatButton'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import Toggle from 'material-ui/Toggle'
import '../../node_modules/font-awesome/css/font-awesome.css'

const createNewPage = () => ({
  name: '',
  url: '',
  forceProxy: false,
  durationMs: '',
  ordinal: ''
})

class DashboardEditor extends React.Component {
  static defaultProps = {
    dashboard: {
      name: '',
      pages: [createNewPage()],
      isFullScreen: false
    }
  }

  static propTypes = {
    dashboard: PropTypes.object,
    onDashboardChanged: PropTypes.func
  }

  state = {
    name: this.props.dashboard.name,
    pages: this.props.dashboard.pages,
    isFullScreen: this.props.dashboard.isFullScreen
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.dashboard) {
      this.setState({
        name: nextProps.dashboard.name,
        pages: nextProps.dashboard.pages,
        isFullScreen: nextProps.dashboard.isFullScreen
      })
    }
  }

  getDashboard = () => ({
    name: this.state.name,
    pages: [...this.state.pages],
    isFullScreen: this.state.isFullScreen
  })

  handleNameChange = (event) => {
    const name = event.target.value
    let nameError = ''
    if (!name) nameError = 'Dashboard Name is required!'
    else if (name && name.length > 200) nameError = 'Dashboard Name must be 200 characters or less'
    else if (name && name.includes('/')) nameError = 'Dashboard Name cannot contain /'
    else if (name && name.includes('\\')) nameError = 'Dashboard Name cannot contain \\'
    this.setState({ name, nameError }, this.handleDashboardChanged)
  }

  handleAddPageClicked = () => {
    this.setState({
      pages: [...this.state.pages, createNewPage()]
    }, this.handleDashboardChanged)
  }

  handleRemovePageClicked = (index) => {
    const pages = [...this.state.pages]
    pages.splice(index, 1)
    this.setState({ pages }, this.handleDashboardChanged)
  }

  handleOnPageChanged = (index, page, pagesError) => {
    const pages = [...this.state.pages]
    pages.splice(index, 1, page)
    this.setState({ pages, pagesError }, this.handleDashboardChanged)
  }

  handleIsFullScreenToggle = (event, isInputChecked) => {
    const isFullScreen = isInputChecked
    this.setState({ isFullScreen }, this.handleDashboardChanged)
  }

  handleDashboardChanged = () => {
    if (this.props.onDashboardChanged) {
      const dashboard = this.getDashboard()
      const hasErrors = this.state.nameError || this.state.pagesError
      this.props.onDashboardChanged(dashboard, hasErrors)
    }
  }

  render() {
    return (
      <div style={{ marginLeft: '2rem' }}>
        <div>
          <TextField
            floatingLabelText="Dashboard Name"
            hintText="Sample Dashboard"
            value={this.state.name}
            errorText={this.state.nameError}
            onChange={this.handleNameChange}
          />
          <p />
          <Toggle
            label="Is Fullscreen"
            labelPosition="right"
            toggled={this.state.isFullScreen}
            onToggle={this.handleIsFullScreenToggle}
            style={{ marginBottom: 16 }}
          />
        </div>
        <h4>Pages</h4>
        <ol>
          {this.state.pages.map((page, idx) =>
            <li key={idx}>
              <PageEditor
                name={page.name}
                url={page.url}
                forceProxy={page.forceProxy}
                durationMs={page.durationMs}
                ordinal={page.ordinal}
                onPageChanged={(page, hasErrors) =>
                  this.handleOnPageChanged(idx, page, hasErrors)}
              />
              {this.state.pages.length > 1 &&
                <FlatButton
                  label="Remove"
                  onClick={() => this.handleRemovePageClicked(idx)}
                />}
            </li>
          )}
        </ol>
        <FloatingActionButton
          onClick={this.handleAddPageClicked}
          mini={true}
          style={{ marginRight: 20, float: 'right' }}>
          <ContentAdd />
        </FloatingActionButton>
      </div>
    )
  }
}

export default DashboardEditor
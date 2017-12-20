import React from 'react'
import TextField from 'material-ui/TextField'
import Toggle from 'material-ui/Toggle'
import RaisedButton from 'material-ui/RaisedButton'
import PropTypes from 'prop-types'
import PageEditor from './PageEditor'
import FlatButton from 'material-ui/FlatButton'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import '../../node_modules/font-awesome/css/font-awesome.css'

class DashboardForm extends React.Component {
  static defaultProps = {
    name: '',
    pages: [{ id: 1 }]
  }

  static propTypes = {
    name: PropTypes.string,
    pages: PropTypes.arrayOf(PropTypes.object),
    onDashboardAdded: PropTypes.func.isRequired
  }

  state = {
    name: this.props.name,
    pages: this.props.pages
  }

  handleNameChange = (event) => {
    this.setState({ name: event.target.value })
  }

  handleAddPageClicked = () => {
    const id = this.state.pages.length + 1
    this.setState({ pages: [...this.state.pages, { id }] })
  }

  handleRemovePageClicked = (page) => {
    const pages = this.state.pages.filter(p => p.id !== page.id)
    this.setState({ pages })
  }

  render() {
    return (
      <form style={{ marginLeft: '2rem' }}>
        <TextField
          floatingLabelText="Dashboard Name"
          hintText="Sample Dashboard"
          value={this.state.name}
          onChange={this.handleNameChange}
        />
        <br />
        <ol>
          {this.state.pages.map((page, idx) =>
            <li>
              <PageEditor key={idx} id={page.id} page={page} />
              {this.state.pages.length > 1 &&
                <FlatButton
                  label="Remove"
                  onClick={() => this.handleRemovePageClicked(page)} />}
            </li>
          )}
        </ol>
        <FloatingActionButton
          onClick={this.handleAddPageClicked}
          mini={true}
          style={{ marginRight: 20, float: 'right' }}>
          <ContentAdd />
        </FloatingActionButton>
      </form>
    )
  }
}

export default DashboardForm
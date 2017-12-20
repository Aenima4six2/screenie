import React from 'react'
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import Screen from './Screen'
import PropTypes from 'prop-types'
import { titleCase } from '../utilities'
import Fullscreen from "react-full-screen"
import FontIcon from 'material-ui/FontIcon'
import IconButton from 'material-ui/IconButton'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import { withRouter } from 'react-router-dom'
import ModalDashboardForm from './ModalDashboardForm'
import './DashboardLayout.css'
import '../../node_modules/font-awesome/css/font-awesome.css'

class DashboardLayout extends React.Component {
  static propTypes = {
    onCurrentSelected: PropTypes.func.isRequired,
    current: PropTypes.object,
    available: PropTypes.arrayOf(PropTypes.object).isRequired,
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }

  state = {
    drawerOpen: false,
    addNewDashboardOpen: false,
    isFull: false
  }

  onToggleDrawer = () => {
    this.setState({ drawerOpen: true })
  }

  handleSubmit = (dashboard) => {
    this.props.history.push(`/${dashboard.name}`)
    this.props.onCurrentSelected(dashboard)
    this.setState({ drawerOpen: false })
  }

  handleAddDashboardClicked = () => {
    this.setState({ drawerOpen: false, addNewDashboardOpen: true })
  }

  handleModalDashboardFormClosed = () => {
    this.setState({ drawerOpen: true, addNewDashboardOpen: false })
  }

  createDrawerItems = () =>
    <div>
      {this.props.available.map((dashboard, idx) =>
        <MenuItem key={idx}
          leftIcon={
            <FontIcon
              className="fa fa-tachometer"
              style={{ marginRight: 24 }}
            />}
          onClick={() => this.handleSubmit(dashboard)}>
          {titleCase(dashboard.name)}
        </MenuItem>)}
      <FloatingActionButton
        onClick={this.handleAddDashboardClicked}
        mini={true}
        style={{ marginRight: 20, float: 'right' }}>
        <ContentAdd />
      </FloatingActionButton>
    </div>

  goFull = () => {
    this.setState({ isFull: true });
  }

  render() {
    const screenWrapperClass = this.state.isFull
      ? "fullscreen-dashboard"
      : "dashboard"

    return (
      <div>
        <AppBar
          title={titleCase(this.props.current.name)}
          onLeftIconButtonClick={this.onToggleDrawer}
          iconElementRight={
            <IconButton tooltip="Fullscreen">
              <FontIcon
                className="fa fa-desktop"
                onClick={this.goFull}
                style={{
                  marginRight: '1rem',
                  marginTop: '.5rem',
                  color: 'black',
                  cursor: 'pointer'
                }}
              />
            </IconButton>}
        />
        <Drawer
          docked={false}
          width={300}
          open={this.state.drawerOpen}
          onRequestChange={(drawerOpen) => this.setState({ drawerOpen })}
        >
          <AppBar showMenuIconButton={false} title="Dashboards" />
          {this.createDrawerItems()}
        </Drawer>
        <Fullscreen
          enabled={this.state.isFull}
          onChange={isFull => {
            this.setState({ isFull })
          }}>
          <div className={screenWrapperClass}>
            <Screen {...this.props} />
          </div>
        </Fullscreen>

        <ModalDashboardForm
          open={this.state.addNewDashboardOpen}
          onClosed={this.handleModalDashboardFormClosed}
        />
      </div>
    )
  }
}

export default withRouter(DashboardLayout)
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
import './DashboardLayout.css'
import '../../node_modules/font-awesome/css/font-awesome.css'

export default class DashboardLayout extends React.Component {
  state = {
    open: false,
    isFull: false
  }

  onToggleDrawer = () => {
    this.setState({ open: true })
  }

  handleSubmit = (dashboard) => {
    this.props.onCurrentSelected(dashboard)
    this.setState({ open: false })
  }

  createMenuItems = () => {
    return this.props.available.map((dashboard, idx) =>
      <MenuItem key={idx}
        leftIcon={
          <FontIcon
            className="fa fa-tachometer"
            style={{ marginRight: 24 }}
          />}
        onClick={() => this.handleSubmit(dashboard)}>
        {titleCase(dashboard.name)}
      </MenuItem>
    )
  }

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
          iconClassNameRight="muidocs-icon-navigation-expand-more"
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
          open={this.state.open}
          onRequestChange={(open) => this.setState({ open })}
        >
          <AppBar showMenuIconButton={false} title="Dashboards" />
          {this.createMenuItems()}
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
      </div>
    )
  }
}

DashboardLayout.props = {
  onCurrentSelected: PropTypes.func.isRequired,
  current: PropTypes.object,
  available: PropTypes.arrayOf(PropTypes.object).isRequired
}
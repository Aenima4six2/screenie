import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import Screen from './Screen'
import PropTypes from 'prop-types'
import { titleCase } from '../utilities'
import FontIcon from 'material-ui/FontIcon'
import './DashboardLayout.css'
import '../../node_modules/font-awesome/css/font-awesome.css'

const iconStyles = {
  marginRight: 24,
}

export default class DashboardLayout extends React.Component {
  state = {
    open: false
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
            style={iconStyles}
          />}
        onClick={() => this.handleSubmit(dashboard)}>
        {titleCase(dashboard.name)}
      </MenuItem>
    )
  }

  render() {
    return (
      <div className="dashboard">
        <AppBar
          title={titleCase(this.props.current.name)}
          iconClassNameRight="muidocs-icon-navigation-expand-more"
          onLeftIconButtonClick={this.onToggleDrawer}
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
        <Screen {...this.props} />
      </div>
    )
  }
}

DashboardLayout.props = {
  onCurrentSelected: PropTypes.func.isRequired,
  current: PropTypes.object,
  available: PropTypes.arrayOf(PropTypes.object).isRequired
}
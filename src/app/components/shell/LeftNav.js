'use strict';

import React from 'react';
import {connect} from 'react-redux';
import * as leftNav from './redux';

import {AppBar, LeftNav, MenuItem} from 'material-ui';

class AppLeftNav extends React.Component {
  constructor(props) {
    super(props);

    this.menuItems = [
      {route: '/', text: 'Home'},
      {route: '/management/users', text: 'Users'},
      {route: '/management/roles', text: 'Roles'},
      {route: '/login', text: 'Login'}
    ]
  }

  navigateTo(url) {
    this.props.navigateTo(url);
    this.props.setOpen(false);
  }

  render() {
    return (
      <LeftNav
        docked={false}
        open={this.props.open}
        onRequestChange={open => this.props.setOpen(open)}>
        <AppBar onLeftIconButtonTouchTap={this.props.toggle} title="DriveSense"/>
        {this.menuItems.map(item => (
          <MenuItem key={item.route} onTouchTap={() => this.navigateTo(item.route)}>{item.text}</MenuItem>
        ))}
      </LeftNav>
    );
  }
}

export default connect(state => state.leftNav, leftNav)(AppLeftNav);
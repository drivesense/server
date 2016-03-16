'use strict';

import React from 'react';
import {AppBar, LeftNav, MenuItem} from 'material-ui';

export default class AppLeftNav extends React.Component {
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
    this.props.redirect(url);
    this.props.toggle(false);
  }

  render() {
    return (
      <LeftNav
        docked={false}
        open={this.props.open}
        onRequestChange={open => this.props.toggle(open)}>
        <AppBar onLeftIconButtonTouchTap={() => this.props.toggle()} title="DriveSense"/>
        {this.menuItems.map(item => (
          <MenuItem key={item.route} onTouchTap={() => this.navigateTo(item.route)}>{item.text}</MenuItem>
        ))}
      </LeftNav>
    );
  }
}

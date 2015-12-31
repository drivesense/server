'use strict';

import React from 'react';
import {connect} from 'react-redux';
import * as leftNav from 'redux/left-nav';

import {AppBar, LeftNav, MenuItem} from 'material-ui';

class MyLeftNav extends React.Component {
  constructor(props) {
    super(props);

    this.menuItems = [
      {route: '/', text: 'Home'},
      {route: '/management', text: 'Management'},
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

export default connect(state => state.leftNav, leftNav)(MyLeftNav);
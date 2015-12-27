import React from 'react';
import {connect} from 'react-redux';
import AppBar from 'material-ui/lib/app-bar';
import LeftNav from 'material-ui/lib/left-nav';
import MenuItem from 'material-ui/lib/menus/menu-item';
import * as leftNav from 'redux/left-nav';

class MyLeftNav extends React.Component {
  constructor() {
    super();

    this.navigateTo = this.navigateTo.bind(this);
    this.menuItems = [
      {route: '/', text: 'Home'},
      {route: '/about', text: 'About'},
      {route: '/users', text: 'Users'},
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
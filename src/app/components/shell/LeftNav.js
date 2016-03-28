'use strict';

import React from 'react';
import {AppBar, LeftNav, MenuItem, Divider} from 'material-ui';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column'
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    flex: '1'
  },
  bottom: {
    display: 'flex',
    flexDirection: 'column'
  }
};

export default class AppLeftNav extends React.Component {
  constructor(props) {
    super(props);

    this.menuItems = [
      {route: '/', text: 'Home'},
      {route: '/management/users', text: 'Users'},
      {route: '/management/roles', text: 'Roles'}
    ]
  }

  navigateTo(url) {
    this.props.redirect(url);
    this.props.toggle(false);
  }

  render() {
    return (
      <LeftNav
        style={styles.container}
        docked={false}
        open={this.props.open}
        onRequestChange={open => this.props.toggle(open)}>
        <AppBar onLeftIconButtonTouchTap={() => this.props.toggle()} title="DriveSense"/>
        <div style={styles.content}>
          {this.menuItems.map(item => (
            <MenuItem key={item.route} onTouchTap={() => this.navigateTo(item.route)}>{item.text}</MenuItem>
          ))}
        </div>
        <Divider />
        <div style={styles.bottom}>
          <MenuItem xs key="Logout" onTouchTap={() => this.props.logout()}>Logout</MenuItem>
        </div>
      </LeftNav>
    );
  }
}

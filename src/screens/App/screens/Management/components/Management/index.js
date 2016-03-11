'use strict';

import React from 'react';
import {connect} from 'react-redux';
import {Menu, MenuItem} from 'material-ui';

import * as leftNav from '../../../../shared/redux/left-nav';

const content = {
  margin: '16px',
  flexDirection: 'row',
  display: 'flex'
};

class Management extends React.Component {
  constructor(props) {
    super(props);
    this.navigateTo = this.navigateTo.bind(this);
  }

  navigateTo(url) {
    this.props.navigateTo('/management/' + url);
  }

  render() {
    return (
      <div style={content}>
        <Menu>
          <MenuItem onTouchTap={() => this.navigateTo('users')} primaryText="Users"/>
          <MenuItem onTouchTap={() => this.navigateTo('roles')} primaryText="Roles"/>
        </Menu>
        <div style={{flex: 1, marginLeft: '16px'}}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default connect(state => state.leftNav, leftNav)(Management);
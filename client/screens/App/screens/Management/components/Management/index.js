import React from 'react';
import {connect} from 'react-redux';
import Menu from 'material-ui/lib/menus/menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import * as leftNav from 'redux/left-nav';

const content = {
  margin: '0 200px'
};

class Management extends React.Component {
  constructor() {
    super();
    this.navigateTo = this.navigateTo.bind(this);
  }

  navigateTo(url) {
    this.props.navigateTo('/management/' + url);
  }

  render() {
    return (
      <div style={content}>
        <Menu style={{float: 'left'}}>
          <MenuItem onTouchTap={() => this.navigateTo('users')} primaryText="Users"/>
          <MenuItem onTouchTap={() => this.navigateTo('roles')} primaryText="Roles"/>
        </Menu>
        <div style={content}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default connect(state => state.leftNav, leftNav)(Management);
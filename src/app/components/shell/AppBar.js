'use strict';

import React from 'react';
import {connect} from 'react-redux';
import {AppBar} from 'material-ui';
import * as leftNav from './redux';

class MyAppBar extends React.Component {
  render() {
    return (
      <AppBar onLeftIconButtonTouchTap={this.props.toggle} title="DriveSense"/>
    );
  }
}

export default connect(state => state.leftNav, leftNav)(MyAppBar);
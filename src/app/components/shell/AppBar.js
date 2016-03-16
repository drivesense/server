'use strict';

import React from 'react';
import {AppBar} from 'material-ui';

export default class MyAppBar extends React.Component {
  render() {
    return (
      <AppBar onLeftIconButtonTouchTap={() => this.props.toggle()} title="DriveSense"/>
    );
  }
}

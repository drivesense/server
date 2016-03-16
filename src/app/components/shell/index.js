'use strict';

import React from 'react';
import AppBar from './AppBar';
import LeftNav from './LeftNav';
import {connect} from 'react-redux';
import * as leftNav from './redux';

const flex = {
  flex: 1,
  display: 'flex',
  boxSizing: 'border-box',
  flexDirection: 'column'
};

const content = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column'
};

@connect(state => state.leftNav, leftNav)
export default class Shell extends React.Component {
  render() {
    return (
      <div style={flex}>
        <AppBar toggle={this.props.toggle} />
        <LeftNav open={this.props.open} toggle={this.props.toggle} redirect={this.props.redirect} />
        <div style={content}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
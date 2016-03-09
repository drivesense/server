'use strict';

import React from 'react';
import AppBar from '../AppBar';
import LeftNav from '../LeftNav';

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

export default class Shell extends React.Component {
  render() {
    return (
      <div style={flex}>
        <AppBar />
        <LeftNav />
        <div style={content}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
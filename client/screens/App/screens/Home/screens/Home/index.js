'use strict';

import React from 'react';

const style = {
  flex: 1,
  alignItems: 'center',
  alignSelf: 'center',
  display: 'flex'
};

export default class Home extends React.Component {
  render() {
    return (
      <div style={style}>
        <h2>Welcome to DriveSense</h2>
      </div>
    );
  }
}
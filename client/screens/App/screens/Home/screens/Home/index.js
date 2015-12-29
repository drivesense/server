'use strict';

import React from 'react';
import { Paper, Card } from 'material-ui';

const styles = {
  textAlign: 'center',
  height: '100%'
};

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <h2 style={styles}>Welcome to DriveSense</h2>
      </div>
    );
  }
}
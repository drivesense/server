import React from 'react';
import Paper from 'material-ui/lib/paper';
import Card from 'material-ui/lib/card/card';

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
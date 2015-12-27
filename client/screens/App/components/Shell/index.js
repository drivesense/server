import React from 'react';
import AppBar from '../AppBar';
import LeftNav from '../LeftNav';

const content = {
  margin: '50px'
};

export default class Shell extends React.Component {
  render() {
    return (
      <div>
        <AppBar />
        <LeftNav />
        <div style={content}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
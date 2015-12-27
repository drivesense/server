import React from 'react';
import AppBar from '../AppBar';
import LeftNav from '../LeftNav';

export default class Shell extends React.Component {
  render() {
    return (
      <div>
        <AppBar />
        <LeftNav />
        {this.props.children}
      </div>
    );
  }
}
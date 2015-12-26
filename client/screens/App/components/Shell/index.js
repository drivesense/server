import React from 'react';

export default class Shell extends React.Component {
  render() {
    return (
      <div>
        <span>Shell</span>
        {this.props.children}
      </div>
    );
  }
}
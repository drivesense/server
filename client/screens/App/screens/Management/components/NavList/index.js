import React from 'react';

export default class NavList extends React.Component {
  render() {
    return (
      <div>
        <span>NavList</span>
        {this.props.children}
      </div>
    );
  }
}
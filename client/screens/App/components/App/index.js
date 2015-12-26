import React from 'react';
import styles from './App.less';
import {Link, IndexLink} from 'react-router';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <IndexLink to="/" activeClassName="active">Home</IndexLink>
        <Link to="/about" activeClassName="active">About</Link>
        <Link to="/users" activeClassName="active">Users</Link>
        <Link to="/roles" activeClassName="active">Roles</Link>
        <Link to="/register" activeClassName="active">Register</Link>
        <Link to="/login" activeClassName="active">Login</Link>
        {this.props.children}
      </div>
    );
  }
}
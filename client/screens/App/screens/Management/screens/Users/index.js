'use strict';

import React from 'react';
import {connect} from 'react-redux';
import * as users from 'redux/management/users';
import Users from './Users'

class UsersContainer extends React.Component {
  componentWillMount() {
    this.props.loadUsers();
  }

  render() {
    return (
      <div>
        {this.props.loading && <div>Loading</div>}
        {this.props.loaded && <Users users={this.props.users} />}
      </div>
    );
  }
}

export default connect(state => state.management.users, users)(UsersContainer);
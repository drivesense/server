'use strict';

import React from 'react';
import {connect} from 'react-redux';
import * as users from 'redux/management/users';
import Users from './Users'
import {Card} from 'material-ui';

const card = {
  backgroundColor: 'white'
};

class UsersContainer extends React.Component {
  componentWillMount() {
    this.props.loadUsers();
  }

  render() {
    return (
      <Card style={card}>
        {this.props.loading && <div>Loading</div>}
        {this.props.loaded && <Users users={this.props.users} />}
      </Card>
    );
  }
}

export default connect(state => state.management.users, users)(UsersContainer);
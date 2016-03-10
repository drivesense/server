'use strict';

import React from 'react';
import {asyncConnect} from 'redux-async-connect';
import * as users from 'redux/management/users';
import Users from './Users'
import {Card} from 'material-ui';

const card = {
  backgroundColor: 'white'
};

class UsersContainer extends React.Component {
  /*componentWillMount() {
    this.props.loadUsers();
  }*/

  render() {
    return (
      <Card style={card}>
        {this.props.loading && <div>Loading</div>}
        {this.props.loaded && <Users users={this.props.users} />}
      </Card>
    );
  }
}

export default asyncConnect(state => state.management.users, users)(UsersContainer);
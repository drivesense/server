import React from 'react';
import {connect} from 'react-redux';
import {asyncConnect} from 'redux-async-connect';
import * as profile from './redux';
import Profile from './Profile';
import {Card} from 'material-ui';

const card = {
  backgroundColor: 'white'
};


@asyncConnect([
  ({}, {store: {dispatch, getState}}) => dispatch(loadUser())
])
@connect(state => state.auth.user, profile)
export default class ProfileContainer extends React.Component {
  render() {
    return (
      <Card style={card}>
        {this.props.error && <div>{this.props.error.message}</div>}
        {this.props.loading && <div>Loading</div>}
        {this.props.loaded && <Profile user={this.props.managers} />}
      </Card>
    );
  }
}

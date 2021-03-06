import React from 'react';
import {connect} from 'react-redux';
import {asyncConnect} from 'redux-async-connect';
import * as managers from './redux';
import Managers from './Managers';
import {Card} from 'material-ui';

const card = {
  backgroundColor: 'white'
};

@asyncConnect([
  ({}, {store: {dispatch, getState}}) => dispatch(managers.load())
])
@connect(state => state.management.managers, managers)
export default class ManagersContainer extends React.Component {
  render() {
    return (
      <Card style={card}>
        {this.props.error && <div>{this.props.error.message}</div>}
        {this.props.loading && <div>Loading</div>}
        {this.props.loaded && <Managers managers={this.props.managers} />}
      </Card>
    );
  }
}

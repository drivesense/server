import React from 'react';
import {connect} from 'react-redux';
import {asyncConnect} from 'redux-async-connect';
import * as schools from './redux';
import Schools from './Schools';
import {Card} from 'material-ui';

const card = {
  backgroundColor: 'white'
};

@asyncConnect([
  ({}, {store: {dispatch, getState}}) => dispatch(schools.load())
])
@connect(state => state.management.schools, schools)
export default class SchoolsContainer extends React.Component {
  render() {
    return (
      <Card style={card}>
        {this.props.error && <div>{this.props.error.message}</div>}
        {this.props.loading && <div>Loading</div>}
        {this.props.loaded && <Schools schools={this.props.schools} />}
      </Card>
    );
  }
}

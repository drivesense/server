import React from 'react';
import {connect} from 'react-redux';
import {asyncConnect} from 'redux-async-connect';
import * as agenda from '../redux';
import {Card} from 'material-ui';

const card = {
  backgroundColor: 'white'
};

@asyncConnect([
  ({}, {store: {dispatch, getState}}) => dispatch(agenda.loadLessons())
])
@connect(state => state.agenda, agenda)
export default class AgendaContainer extends React.Component {
  render() {
    return (
      <Card style={card}>
        {this.props.error && <div>{this.props.error.message}</div>}
        {this.props.loading && <div>Loading</div>}
        {this.props.loaded && console.log(this.props.lessons)}
      </Card>
    );
  }
}

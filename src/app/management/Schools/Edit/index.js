import React from 'react';
import {connect} from 'react-redux';
import {asyncConnect} from 'redux-async-connect';
import * as schools from '../redux';
import Edit from './Edit';

const card = {
  backgroundColor: 'white'
};

@asyncConnect([
  ({}, {store: {dispatch, getState}}) => dispatch(schools.load())
])
@connect(state => state.management.schools.edit, schools)
export default class EditSchoolsContainer extends React.Component {
  render() {
    return (
      <Edit isOpen={this.props.isOpen} dismiss={this.props.dismissEdit}
            save={() => this.props.saveEdit(this.props.school)}/>
    );
  }
}

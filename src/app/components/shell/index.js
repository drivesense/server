'use strict';

import React from 'react';
import {asyncConnect} from 'redux-async-connect';
import {connect} from 'react-redux';
import AppBar from './AppBar';
import LeftNav from './LeftNav';
import * as leftNav from './redux';
import {loadUser, logout} from '../../auth/redux';

const flex = {
  flex: 1,
  display: 'flex',
  boxSizing: 'border-box',
  flexDirection: 'column'
};

const content = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column'
};

@asyncConnect([
  ({}, {store: {dispatch, getState}}) => dispatch(loadUser())
])
@connect(state => state.leftNav, Object.assign({}, leftNav, {logout}))
export default class Shell extends React.Component {
  render() {
    return (
      <div style={flex}>
        <AppBar toggle={this.props.toggle}/>
        <LeftNav open={this.props.open} toggle={this.props.toggle} logout={this.props.logout} redirect={this.props.redirect}/>
        <div style={content}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
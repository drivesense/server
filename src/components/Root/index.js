'use strict';

import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { ReduxAsyncConnect } from 'redux-async-connect';
import DevTools from '../DevTools';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './root.less';

const style = {
  flex: 1,
  flexDirection: 'column',
  boxSizing: 'border-box',
  display: 'flex',
  margin: 0,
  width: '100%',
  minHeight: '100%',
  height: '100%'
};

class Root extends React.Component {
  render() {
    return (
      <Provider store={this.props.store} key="provider">
        <div style={style}>
          {this.props.children}
          {this.props.renderDevTools && <DevTools />}
        </div>
      </Provider>
    );
  }
}

Root.propTypes = {
  store: React.PropTypes.object.isRequired
};

export default withStyles(Root, styles)

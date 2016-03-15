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

const decoratorWithStyles = styles => Component => withStyles(Component, styles);

@decoratorWithStyles(styles)
class StyledRoot extends React.Component {
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

export default class Root extends React.Component {
  getChildContext() {
    return this.props.context;
  }

  render() {
    return (
      <StyledRoot store={this.props.store} renderDevTools={this.props.renderDevTools}>
        {this.props.children}
      </StyledRoot>
    );
  }
}

Root.childContextTypes = {
  insertCss: React.PropTypes.func.isRequired
};

Root.propTypes = {
  store: React.PropTypes.object.isRequired,
  context: React.PropTypes.object.isRequired
};


'use strict';

import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { ReduxAsyncConnect } from 'redux-async-connect';
import DevTools from '../DevTools';

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

export default class Root extends React.Component {
  devTools() {
    if (process.env.NODE_ENV !== 'production') {
      return <DevTools />;
    }
  }

  render() {
    return (
      <Provider store={this.props.store} key="provider">
        <div style={style}>
          <Router history={this.props.history} render={(props) => <ReduxAsyncConnect {...props}/>}>
            {this.props.routes}
          </Router>
          {this.devTools()}
        </div>
      </Provider>
    );
  }
}

Root.propTypes = {
  history: React.PropTypes.object.isRequired,
  routes: React.PropTypes.element.isRequired,
  store: React.PropTypes.object.isRequired
};

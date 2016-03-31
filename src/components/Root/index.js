import React from 'react';
import {Provider} from 'react-redux';

export default class Root extends React.Component {
  static childContextTypes = {
    insertCss: React.PropTypes.func.isRequired
  };

  getChildContext() {
    return this.props.context;
  }

  render() {
    return (
      <Provider store={this.props.store} key="provider">
        {this.props.children}
      </Provider>
    );
  }
}

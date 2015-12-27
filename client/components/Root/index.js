import React from 'react'
import { Provider } from 'react-redux'
import { Router } from 'react-router'
import DevTools from '../DevTools';

export default class Root extends React.Component {
  constructor() {
    super();

    // React no longer binds non-component methods to `this`
    this.content = this.content.bind(this);
    this.devTools = this.devTools.bind(this);
  }

  content() {
    return (
      <Router history={this.props.history}>
        {this.props.routes}
      </Router>
    )
  }

  devTools() {
    if (process.env.NODE_ENV !== 'production') {
      return <DevTools />
    }
  }

  render() {
    return (
      <Provider store={this.props.store}>
        <div>
          {this.content()}
          {this.devTools()}
        </div>
      </Provider>
    )
  }
}

Root.propTypes = {
  history: React.PropTypes.object.isRequired,
  routes: React.PropTypes.element.isRequired,
  store: React.PropTypes.object.isRequired
};
import React from 'react';

import ThemeManager from 'material-ui/lib/styles/theme-manager';
import {Paper} from 'material-ui';
import theme from './theme.js';

const style = {
  flex: 1,
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column'
};

export default class App extends React.Component {
  getChildContext() {
    return {
      muiTheme: ThemeManager.getMuiTheme(theme)
    };
  }

  render() {
    return (
      <Paper style={style}>
        {this.props.children}
      </Paper>
    );
  }
}

App.childContextTypes = {muiTheme: React.PropTypes.object};
import React from 'react';
import Colors from 'material-ui/lib/styles/colors';

import {Card} from 'material-ui';

import logo from '../../../static/logo.svg';

const styles = {
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box',
    display: 'flex',

    width: '100%',
    height: '100%',
    minHeight: '100%',

    backgroundColor: Colors.indigo500
  },
  logo: {
    display: 'flex',
    alignSelf: 'center',
    width: '630px',
    marginBottom: '32px'
  }
};

export default class Auth extends React.Component {
  render() {
    return (
      <div style={styles.container}>
        <img src={logo} style={styles.logo}/>
        <Card>
          {this.props.children}
        </Card>
      </div>
    );
  }
}
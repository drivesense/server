import React from 'react';
import Colors from 'material-ui/lib/styles/colors';

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
  }
};

export default class Auth extends React.Component {
  render() {
    return (
      <div style={styles.container}>
        {this.props.children}
      </div>
    );
  }
}
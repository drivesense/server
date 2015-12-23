import React from 'react';
import styles from './style.less';
import {RaisedButton} from 'material-ui'

export default class HelloWorld extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        <span>{this.props.children}</span>
        <RaisedButton label="oki"></RaisedButton>
      </div>
    );
  }
}
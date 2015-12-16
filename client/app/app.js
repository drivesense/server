import React from 'react';
import ReactDOM from 'react-dom';
import styles from './style.less';

class HelloWorld extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className={styles.container}>
        {this.props.children}
      </div>
    );
  }
}

ReactDOM.render(
  <HelloWorld>Hello, world!</HelloWorld>,
  document.getElementById('container')
);
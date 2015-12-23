import React from 'react';
import {render} from 'react-dom';
import HelloWorld from './hello-world'

render(
  <HelloWorld>Hello, world!</HelloWorld>,
  document.getElementById('container')
);
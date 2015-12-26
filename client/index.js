import React from 'react';
import {render} from 'react-dom';
import {Router} from 'react-router';
import App from './screens/App';

render(
  <Router>
    {App}
  </Router>,
  document.getElementById('container')
);
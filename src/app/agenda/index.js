'use strict';

import React from 'react';
import {Route} from 'react-router';
import Agenda from './Agenda';

export default function () {
  return (
    <Route path='agenda' component={Agenda} />
  )
}
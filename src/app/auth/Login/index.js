import React from 'react';
import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import * as auth from '../redux';
import Login from './Login';

@reduxForm({form: 'login', fields: ['email', 'password']})
@connect(state => state.auth, auth)
export default class LoginContainer extends React.Component {
  render() {
    const {
      fields,
      handleSubmit,
      values,
      login,
      goToSignup
    } = this.props;

    return (
      <Login fields={fields}
             handleSubmit={() => handleSubmit(() => login(values))}
             goToSignup={goToSignup}/>
    );
  }
}
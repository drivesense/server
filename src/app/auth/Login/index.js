import React from 'react';
import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import * as auth from '../redux';
import Login from './Login';

@reduxForm({form: 'login', fields: ['email', 'password']})
@connect(state => state.auth, auth)
export default class LoginContainer extends React.Component {
  componentWillMount() {
    const {initializeForm} = this.props;

    // initializeForm({email: 'nacho@gmail.com', password: 'nacho'});
  }

  render() {
    const {
      fields,
      handleSubmit,
      values
    } = this.props;

    return (
      <Login fields={fields} handleSubmit={() => handleSubmit(() => this.props.login(values))}/>
    );
  }
}
import React from 'react';
import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import * as auth from '../redux';
import Colors from '../../../../node_modules/material-ui/lib/styles/colors';

import { Card,
  CardTitle,
  CardText,
  CardActions,
  FlatButton,
  TextField } from 'material-ui';

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
  card: {
    actions: {
      display: 'flex',
      justifyContent: 'flex-end'
    },
    text: {
      display: 'flex',
      flexDirection: 'column'
    }
  }
};

@reduxForm({form: 'login', fields: ['email', 'password']})
@connect(state => state.auth, auth)
export default class Login extends React.Component {
  render() {
    const {
      fields: {email, password},
      handleSubmit,
      values
      } = this.props;

    return (
      <div style={styles.container}>
        <Card>
          <CardTitle title="Login"></CardTitle>
          <CardText style={styles.card.text}>
            <TextField floatingLabelText="Email" {...email}></TextField>
            <TextField floatingLabelText="Password" type="password" {...password}></TextField>
          </CardText>
          <CardActions style={styles.card.actions}>
            <FlatButton label="Not a user?"></FlatButton>
            <FlatButton label="Let's go!" secondary={true}
                        onClick={handleSubmit(() => this.props.login(values))}></FlatButton>
          </CardActions>
        </Card>
      </div>
    );
  }
}
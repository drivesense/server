import React from 'react';

import {
  CardTitle,
  CardText,
  CardActions,
  FlatButton,
  TextField
} from 'material-ui';

const styles = {
  actions: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  text: {
    display: 'flex',
    flexDirection: 'column'
  }
};

export default class Login extends React.Component {
  render() {
    const {
      fields: {email, password},
      handleSubmit,
      goToSignup
    } = this.props;

    return (
      <form onSubmit={handleSubmit()}>
        <CardTitle title="Login"></CardTitle>
        <CardText style={styles.text}>
          <TextField floatingLabelText="Email" {...email}></TextField>
          <TextField floatingLabelText="Password" type="password" {...password}></TextField>
        </CardText>
        <CardActions style={styles.actions}>
          <FlatButton onClick={goToSignup} label="Not a user?"></FlatButton>
          <FlatButton type="submit" label="Let's go!" secondary={true}></FlatButton>
        </CardActions>
      </form>
    );
  }
}
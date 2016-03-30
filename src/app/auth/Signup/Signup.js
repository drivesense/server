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
  },
  nameContainer: {
    display: 'flex',
    flexDirection: 'row'
  },
  field: {
    width: '100%'
  }
};

export default class Signup extends React.Component {
  render() {
    const {
      fields: {email, password},
      handleSubmit,
      goToLogin
    } = this.props;

    return (
      <form onSubmit={handleSubmit()}>
        <CardTitle title="Login"></CardTitle>
        <CardText style={styles.text}>
          <div style={styles.nameContainer}>
            <TextField floatingLabelText="First name" {...name.first}></TextField>
            <TextField floatingLabelText="Last name" {...name.last}></TextField>
          </div>
          <TextField style={styles.field} floatingLabelText="Email" {...email}></TextField>
          <TextField style={styles.field} floatingLabelText="Password" type="password" {...password}></TextField>
        </CardText>
        <CardActions style={styles.actions}>
          <FlatButton onClick={goToLogin} label="Already a user?"></FlatButton>
          <FlatButton type="submit" label="Let's go!" secondary={true}></FlatButton>
        </CardActions>
      </form>
    );
  }
}
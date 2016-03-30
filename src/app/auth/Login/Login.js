import React from 'react';

import {
  Card,
  CardTitle,
  CardText,
  CardActions,
  FlatButton,
  TextField
} from 'material-ui';

const styles = {
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

export default class Login extends React.Component {
  render() {
    const {
      fields: {email, password},
      handleSubmit
    } = this.props;

    return (
      <Card>
        <CardTitle title="Login"></CardTitle>
        <CardText style={styles.card.text}>
          <TextField floatingLabelText="Email" {...email}></TextField>
          <TextField floatingLabelText="Password" type="password" {...password}></TextField>
        </CardText>
        <CardActions style={styles.card.actions}>
          <FlatButton label="Not a user?"></FlatButton>
          <FlatButton label="Let's go!" secondary={true}
                      onClick={handleSubmit()}></FlatButton>
        </CardActions>
      </Card>
    );
  }
}
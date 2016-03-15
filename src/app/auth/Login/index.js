import React from 'react';
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

export default class Login extends React.Component {
  render() {
    return (
      <div style={styles.container}>
        <Card>
          <CardTitle title="Login"></CardTitle>
          <CardText style={styles.card.text}>
            <TextField floatingLabelText="Email"></TextField>
            <TextField floatingLabelText="Password" type="password"></TextField>
          </CardText>
          <CardActions style={styles.card.actions}>
            <FlatButton label="Not a user?"></FlatButton>
            <FlatButton label="Let's go!" secondary={true}></FlatButton>
          </CardActions>
        </Card>
      </div>
    );
  }
}
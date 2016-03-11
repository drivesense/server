import React from 'react';
import Colors from 'material-ui/lib/styles/colors';

import { Card,
         CardTitle,
         CardText,
         CardActions,
         FlatButton,
         TextField } from 'material-ui';

const container = {
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
};

const cardActions = {
  display: 'flex',
  justifyContent: 'flex-end'
};

const cardText = {
  display: 'flex',
  flexDirection: 'column'
};

export default class Login extends React.Component {
  render() {
    return (
      <div style={container}>
        <Card>
          <CardTitle title="Login"></CardTitle>
          <CardText style={cardText}>
            <TextField floatingLabelText="Email"></TextField>
            <TextField floatingLabelText="Password" type="password"></TextField>
          </CardText>
          <CardActions style={cardActions}>
            <FlatButton label="Not a user?"></FlatButton>
            <FlatButton label="Let's go!" secondary={true}></FlatButton>
          </CardActions>
        </Card>
      </div>
    );
  }
}
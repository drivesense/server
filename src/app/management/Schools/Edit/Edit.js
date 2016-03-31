import React from 'react';
import {
  Dialog,
  FlatButton
} from 'material-ui';

export default class Edit extends React.Component {
  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        secondary={true}
        onTouchTap={this.props.dismiss}/>,
      <FlatButton
        label="Save"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.props.save}/>
    ];

    return (
      <Dialog
        title="Edit School"
        actions={actions}
        modal={false}
        open={this.props.isOpen}
        onRequestClose={this.props.dismiss}>
        Hello, It's me
      </Dialog>
    );
  }
}
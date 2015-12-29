'use strict';

import React from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui';

export default class Users extends React.Component {
  render() {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderColumn>First Name</TableHeaderColumn>
            <TableHeaderColumn>Last Name</TableHeaderColumn>
            <TableHeaderColumn>Gender</TableHeaderColumn>
            <TableHeaderColumn>Role</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
        {this.props.users.map(user => (
          <TableRow key={user.gender}>
            <TableRowColumn>John</TableRowColumn>
            <TableRowColumn>Smith</TableRowColumn>
            <TableRowColumn>{user.gender}</TableRowColumn>
            <TableRowColumn>Super</TableRowColumn>
          </TableRow>
        ))};
        </TableBody>
      </Table>
    );
  }
}
import React from 'react';
import Table from 'material-ui/lib/table/table';
import TableBody from 'material-ui/lib/table/table-body';
import TableHeader from 'material-ui/lib/table/table-header';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableRowColumn from 'material-ui/lib/table/table-row-column';

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
          <TableRow>
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
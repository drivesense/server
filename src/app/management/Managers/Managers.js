import React from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui';

const table = {
  backgroundColor: 'inherit'
};

export default class Managers extends React.Component {
  render() {
    return (
      <Table style={table}>
        <TableHeader>
          <TableRow>
            <TableHeaderColumn>Email</TableHeaderColumn>
            <TableHeaderColumn>First Name</TableHeaderColumn>
            <TableHeaderColumn>Last Name</TableHeaderColumn>
            <TableHeaderColumn>Gender</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          {this.props.managers.map(manager => (
            <TableRow key={manager._id}>
              <TableRowColumn>{manager.email}</TableRowColumn>
              <TableRowColumn>{manager.name.first}</TableRowColumn>
              <TableRowColumn>{manager.name.last}</TableRowColumn>
              <TableRowColumn>{manager.gender}</TableRowColumn>
            </TableRow>
          ))};
        </TableBody>
      </Table>
    );
  }
}
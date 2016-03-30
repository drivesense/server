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

export default class Schools extends React.Component {
  render() {
    return (
      <Table style={table}>
        <TableHeader>
          <TableRow>
            <TableHeaderColumn></TableHeaderColumn>
            <TableHeaderColumn>Name</TableHeaderColumn>
            <TableHeaderColumn>Location</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          {this.props.schools.map(school => (
            <TableRow key={school._id}>
              <TableRowColumn>{school.logo}</TableRowColumn>
              <TableRowColumn>{school.name}</TableRowColumn>
              <TableRowColumn>{school.location}</TableRowColumn>
            </TableRow>
          ))};
        </TableBody>
      </Table>
    );
  }
}
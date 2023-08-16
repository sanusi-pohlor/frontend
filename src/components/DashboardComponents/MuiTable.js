import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material';

const data = [
  { id: 1, name: 'John Doe', age: 30, email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', age: 25, email: 'jane@example.com' },
  { id: 3, name: 'Bob Johnson', age: 40, email: 'bob@example.com' },
  { id: 4, name: 'Alice Williams', age: 35, email: 'alice@example.com' },
];

const MuiTable = () => {
  return (
    <TableContainer style={{ width: 500 ,height:350, margin: 'auto' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Age</TableCell>
            <TableCell>Email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.age}</TableCell>
              <TableCell>{row.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MuiTable;

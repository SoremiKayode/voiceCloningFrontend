import React from 'react';
import { Table, TableRow, TableCell, ButtonTable, TableBox } from './AdminStyles';

const UserTable = ({ users, onDeleteUser, theme }) => {

  return (
    <TableBox>
      <h2>Users</h2>
      <Table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users && users.map(user => (
            <TableRow key={user._id}>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phoneNumber}</TableCell>
              <TableCell>
                <ButtonTable onClick={() => onDeleteUser(user.id)} theme={theme}>Delete</ButtonTable>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </TableBox>
  );
};

export default UserTable;

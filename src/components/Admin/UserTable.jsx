import React from 'react';
import { Table, TableRow, TableCell, Button, ButtonTable } from './AdminStyles';

const UserTable = ({ users, onDeleteUser, onEditUser }) => {

  return (
    <div>
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
                <ButtonTable onClick={() => onEditUser(user)}>Edit</ButtonTable>
                <ButtonTable onClick={() => onDeleteUser(user._id)}>Delete</ButtonTable>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
      <Button>Add User</Button>
    </div>
  );
};

export default UserTable;

import React from 'react';
import { Table, TableRow, TableCell, Button, ButtonTable } from './AdminStyles';

const UserTable = () => {
  // Sample users data
  const users = [
    { id: 1, email: 'user1@example.com', phone: '123456789' },
    { id: 2, email: 'user2@example.com', phone: '987654321' },
    // Add more users
  ];

  const handleDelete = (id) => {
    // Delete user logic here
  };

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
          {users.map(user => (
            <TableRow key={user.id}>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>
                <ButtonTable>Edit</ButtonTable>
                <ButtonTable onClick={() => handleDelete(user.id)}>Delete</ButtonTable>
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

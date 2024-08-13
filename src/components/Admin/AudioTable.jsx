import React from 'react';
import { Table, TableRow, TableCell, Button } from './AdminStyles';

const AudioTable = () => {
  // Sample audio files metadata
  const audioFiles = [
    { id: 1, name: 'audio1.mp3', date: '2024-08-13' },
    { id: 2, name: 'audio2.mp3', date: '2024-08-12' },
    // Add more audio files
  ];

  const handleDelete = (id) => {
    // Delete audio file logic here
  };

  return (
    <div>
      <h2>Audio Files</h2>
      <Table>
        <thead>
          <tr>
            <th>File Name</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {audioFiles.map(file => (
            <TableRow key={file.id}>
              <TableCell>{file.name}</TableCell>
              <TableCell>{file.date}</TableCell>
              <TableCell>
                <Button onClick={() => handleDelete(file.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AudioTable;

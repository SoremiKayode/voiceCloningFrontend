import React from 'react';
import { Table, TableRow, TableCell, Button } from './AdminStyles';

const AudioTable = ({ audios, onDeleteAudio }) => {
  
  const handleOpenAudio = (url) => {
    window.open(url, '_blank');
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
          {audios && audios.forEach(audio => (
            <TableRow key={audio._id}>
              <TableCell>
                <Button onClick={() => handleOpenAudio(audio.url)}>{audio.name}</Button>
              </TableCell>
              <TableCell>{new Date(audio.datetime).toLocaleDateString()}</TableCell>
              <TableCell>
                <Button onClick={() => onDeleteAudio(audio._id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AudioTable;

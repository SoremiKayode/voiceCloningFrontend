import React from 'react';
import { Table, TableRow, TableCell, ButtonTable } from './AdminStyles';

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
            <th>Owner Name</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {audios && audios.map(audio => (
            <TableRow key={audio.id}>
              <TableCell>
                <ButtonTable onClick={() => handleOpenAudio(audio.location)}>{audio.location}</ButtonTable>
              </TableCell>
              <TableCell>{audio.name}</TableCell>
              <TableCell>{new Date(audio.datetime).toLocaleDateString()}</TableCell>
              <TableCell>
                <ButtonTable onClick={() => onDeleteAudio(audio.id)}>Delete</ButtonTable>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AudioTable;

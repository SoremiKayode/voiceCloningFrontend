import React, { useState } from 'react';
import { Container, FormWrapper, Input, Button } from '../../AppStyles';
import { Select, TextArea, AudioPlayer } from './HomeStyles';

const HomePage = () => {
  const [text, setText] = useState('');
  const [voice, setVoice] = useState('');
  const [audioSrc, setAudioSrc] = useState(null);

  const handleGenerateAudio = () => {
    // Integrate with API to generate audio
    // Set audioSrc with the response audio file URL
  };

  return (
    <Container>
      <FormWrapper>
        <h2>Text to Speech</h2>
        <TextArea 
          placeholder="Enter text here..." 
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Select 
          value={voice} 
          onChange={(e) => setVoice(e.target.value)}
        >
          <option value="">Select Voice</option>
          <option value="voice1">Voice 1</option>
          <option value="voice2">Voice 2</option>
          {/* Add more voice options */}
        </Select>
        <Button onClick={handleGenerateAudio}>Generate Audio</Button>
        {audioSrc && <AudioPlayer controls src={audioSrc} />}
      </FormWrapper>
    </Container>
  );
};

export default HomePage;

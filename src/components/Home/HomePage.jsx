import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { 
  Container, 
  Column, 
  TypewriterContainer, 
  TypewriterText, 
  TabContainer, 
  Tab, 
  Accordion, 
  AccordionContent, 
  ReactQuillWrapper, 
  AudioInput, 
  Button, 
  Slider, 
  AudioPlayer, 
  DownloadButton, 
  Select 
} from './HomeStyles';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import { ThemeContext } from '../../contexts/ThemeContext';

const HomePage = () => {
  const [text, setText] = useState('');
  const [voice, setVoice] = useState('');
  const [audioSrc, setAudioSrc] = useState(null);
  const [activeTab, setActiveTab] = useState('textToSpeech');
  const [selectedFile, setSelectedFile] = useState(null);
  const [sliderValue, setSliderValue] = useState(0);
  const [isAudioLoaded, setIsAudioLoaded] = useState(false);
  const { theme } = useContext(ThemeContext);

  const typewriterTexts = [
    'Upload your audio and our AI will generate a real human voice for you.',
    'Type your text and generate a real human voice reading out your text.'
  ];

  const [currentText, setCurrentText] = useState('');

  useEffect(() => {
    let textIndex = 0;
    let charIndex = 0;
    let timeout;

    const type = () => {
      if (charIndex < typewriterTexts[textIndex].length) {
        setCurrentText(prev => prev + typewriterTexts[textIndex].charAt(charIndex));
        charIndex++;
        timeout = setTimeout(type, 100);
      } else {
        charIndex = 0;
        textIndex = (textIndex + 1) % typewriterTexts.length;
        setTimeout(() => {
          setCurrentText('');
          setTimeout(type, 500);
        }, 2000);
      }
    };

    type();

    return () => clearTimeout(timeout);
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setAudioSrc(URL.createObjectURL(file));
      setIsAudioLoaded(true);
    }
  };

  const handleGenerateAudio = async () => {
    const formData = new FormData();
    formData.append('text', text);
    formData.append('voice', voice);
    if (selectedFile) formData.append('file', selectedFile);

    try {
      const response = await axios.post('/convert', formData, {
        responseType: 'blob',
      });
      const audioUrl = URL.createObjectURL(response.data);
      setAudioSrc(audioUrl);
      setIsAudioLoaded(true);
    } catch (error) {
      console.error('Error generating audio:', error);
    }
  };

  const handleDownload = () => {
    if (audioSrc) {
      const link = document.createElement('a');
      link.href = audioSrc;
      link.setAttribute('download', 'generated_audio.mp3');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <Container theme={theme}>
      <Column>
        <TypewriterContainer>
          <TypewriterText>{currentText}</TypewriterText>
        </TypewriterContainer>
        <TabContainer>
          <Tab 
            active={activeTab === 'textToSpeech'} 
            onClick={() => setActiveTab('textToSpeech')}
          >
            Text to Speech
          </Tab>
          <Tab 
            active={activeTab === 'voiceToVoice'} 
            onClick={() => setActiveTab('voiceToVoice')}
          >
            Voice to Voice
          </Tab>
        </TabContainer>

        {activeTab === 'textToSpeech' ? (
          <ReactQuillWrapper>
            <ReactQuill 
              theme="snow" 
              value={text} 
              onChange={setText} 
              modules={{ toolbar: [['bold', 'italic'], [{ 'list': 'ordered' }, { 'list': 'bullet' }]] }}
            />
          </ReactQuillWrapper>
        ) : (
          <AudioInput type="file" accept="audio/*" onChange={handleFileChange} />
        )}

        <Button onClick={handleGenerateAudio}>Generate Audio</Button>

        <Accordion>
          <AccordionContent isAudioLoaded={isAudioLoaded}>
            <Slider 
              type="range" 
              min="0" 
              max="100" 
              value={sliderValue} 
              onChange={(e) => setSliderValue(e.target.value)} 
              disabled={!isAudioLoaded}
            />
            <AudioPlayer controls src={audioSrc} loop disabled={!isAudioLoaded} />
            <DownloadButton onClick={handleDownload}>
              Download
            </DownloadButton>
          </AccordionContent>
        </Accordion>
      </Column>

      <Column>
        <h3>Select Voice</h3>
        <Select 
          value={voice} 
          onChange={(e) => setVoice(e.target.value)}
        >
          <option value="">Select Voice</option>
          <option value="voice1">Voice 1</option>
          <option value="voice2">Voice 2</option>
          {/* Add more voice options */}
        </Select>
      </Column>
    </Container>
  );
};

export default HomePage;

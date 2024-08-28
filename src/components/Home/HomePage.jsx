import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Column,
  Column1,
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
  Select,
  AudioOutput,
} from './HomeStyles';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import { useTheme } from '../../contexts/ThemeContext';
import { showErrorNotification, showSuccessNotification } from '../../utils/Notification';
import CenterLoader from '../Shared/CenterLoader'; // Importing the loader component

const HomePage = () => {
  const [text, setText] = useState('');
  const [voice, setVoice] = useState('');
  const [audioSrc, setAudioSrc] = useState(null);
  const [generatedAudioSrc, setGeneratedAudioSrc] = useState(null);
  const [activeTab, setActiveTab] = useState('textToSpeech');
  const [selectedFile, setSelectedFile] = useState(null);
  const [isAudioLoaded, setIsAudioLoaded] = useState(false);
  const [isGeneratedAudioLoaded, setIsGeneratedAudioLoaded] = useState(false);
  const [generatedText, setGeneratedText] = useState('');
  const { theme } = useTheme();
  const [userInfo, setUserInfo] = useState(localStorage.getItem('userinfo')) || 'false';
  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('userdata')));
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const navigate = useNavigate();
  const [currentText, setCurrentText] = useState('');

  useEffect(() => {
    const userinfo = localStorage.getItem('userinfo')
    if (userInfo !== "true" || userinfo !== "true") {
      navigate('/login');
    }
  }, [userInfo, navigate]);

  useEffect(() => {
    let useData = JSON.parse(localStorage.getItem('userdata'));
    setUserData(useData)
  }, [setUserData]);

  useEffect(() => {
    if (userData.verified) {
      setIsLoading(false);
    } else {
      const interval = setInterval(async () => {
        try {
        const token = await localStorage.getItem('authToken');
        const userData = await JSON.parse(localStorage.getItem('userdata'));
        await axios.get('https://api.naynobo.site/api/profile', {
          headers: { 'Authorization': `Token ${token}` },
          params : userData,
        }).then(response => {
          showSuccessNotification("successfuly retrieve your profile waiting for confrimation");
          if (response.data.user.verified) {
            setUserData((prevInfo) => ({ ...prevInfo, verified: true }));
            localStorage.setItem('userdata', JSON.stringify({ ...userData, verified: true }));
            setIsLoading(false);
          }
        })

        } catch (error) {
          console.error('Error checking verification status:', error);
        }
      }, 40000);

      return () => clearInterval(interval);
    }
  }, [userInfo, userData]);

  useEffect(() => {
    let textIndex = 0;
    let charIndex = 0;
    let timeout;

    const type = () => {
      if (charIndex < typewriterTexts[textIndex].length) {
        setCurrentText((prev) => prev + typewriterTexts[textIndex].charAt(charIndex));
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

    setCurrentText('');
    timeout = setTimeout(type, 500);

    return () => clearTimeout(timeout);
  }, []);

  const typewriterTexts = [
    ' Upload your audio and our AI will generate a real human voice for you.',
    ' Type your text and generate a real human voice reading out your text.',
  ];

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setAudioSrc(URL.createObjectURL(file));
      setIsAudioLoaded(true);
    }
  };

  const handleGenerateAudio = async () => {
    setIsGenerating(true); // Show loader while generating
    const userData = JSON.parse(localStorage.getItem('userdata'));
    const formData = new FormData();
    formData.append('model_id', voice);
    formData.append('userid', userData.id);
    formData.append('email', userData.email);

    if (activeTab === 'textToSpeech') {
      formData.append('tts', 'true');
      const parser = new DOMParser();
      const doc = parser.parseFromString(text, 'text/html');
      const texts = doc.body.textContent;
      formData.append('text', texts);

      if (selectedFile) {
        formData.append('reference_wav', selectedFile);
      }

      try {
        const response = await axios.post('https://api.naynobo.site/api/convert', formData, {
          responseType: 'blob',
        });
        const audioUrl = URL.createObjectURL(response.data);
        setGeneratedAudioSrc(audioUrl);
        setIsGeneratedAudioLoaded(true);
        showSuccessNotification('Audio successfully generated');
      } catch (error) {
        showErrorNotification(`Error generating audio: ${error}`);
      } finally {
        setIsGenerating(false); // Hide loader after generating
      }
    } else {
      formData.append('tts', 'false');

      if (selectedFile) {
        formData.append('reference_wav', selectedFile);
      }

      try {
        const response = await axios.post('https://api.naynobo.site/api/convert', formData);
        setGeneratedText(response.data.text);
        showSuccessNotification('Text successfully generated');
      } catch (error) {
        showErrorNotification(`Error generating text: ${error}`);
      } finally {
        setIsGenerating(false); // Hide loader after generating
      }
    }
  };

  const handleDownload = () => {
    if (generatedAudioSrc) {
      const link = document.createElement('a');
      link.href = generatedAudioSrc;
      link.setAttribute('download', 'generated_audio.wav');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(generatedText).then(
      () => console.log('Text copied to clipboard'),
      (err) => console.error('Failed to copy text: ', err)
    );
  };

  if (isLoading) {
    return <CenterLoader text="Waiting for confirmation..." />;
  }

  return (
    <> 
      {isGenerating ?
        <CenterLoader text="Generating..." /> :
    <Container theme={theme}>
          <Column1>
            <TypewriterContainer>
              <TypewriterText>{currentText}</TypewriterText>
            </TypewriterContainer>

            <TabContainer>
              <Tab active={activeTab === 'textToSpeech'} onClick={() => setActiveTab('textToSpeech')}>
                Text to Speech
              </Tab>
              <Tab active={activeTab === 'voiceToVoice'} onClick={() => setActiveTab('voiceToVoice')}>
                Voice to Voice
              </Tab>
            </TabContainer>

            {activeTab === 'textToSpeech' ? (
              <>
                <ReactQuillWrapper>
                  <ReactQuill
                    theme="snow"
                    value={text}
                    onChange={setText}
                    modules={{
                      toolbar: [['bold', 'italic'], [{ list: 'ordered' }, { list: 'bullet' }]],
                    }}
                  />
                </ReactQuillWrapper>
                <AudioInput type="file" accept=".wav, .mp3" onChange={handleFileChange} />
              </>
            ) : (
              <AudioInput type="file" accept=".wav, .mp3" onChange={handleFileChange} />
            )}

            {isAudioLoaded && (
              <AudioOutput>
                <AudioPlayer controls src={audioSrc} loop disabled={!isAudioLoaded} />
              </AudioOutput>
            )}

            <Button onClick={handleGenerateAudio}>Generate</Button>

            {activeTab === 'textToSpeech' && isGeneratedAudioLoaded && (
              <Accordion>
                <AccordionContent isAudioLoaded={isGeneratedAudioLoaded}>
                  <AudioPlayer controls src={generatedAudioSrc} loop disabled={!isGeneratedAudioLoaded} />
                  <DownloadButton onClick={handleDownload}>Download</DownloadButton>
                </AccordionContent>
              </Accordion>
            )}

            {activeTab !== 'textToSpeech' && generatedText && (
              <>
                <ReactQuillWrapper>
                  <ReactQuill theme="snow" value={generatedText} readOnly={true} />
                </ReactQuillWrapper>
                <Button onClick={handleCopyToClipboard}>Copy to Clipboard</Button>
              </>
            )}
          </Column1>

          <Column>
            <h3>Select Voice</h3>
            <Select value={voice} onChange={(e) => setVoice(e.target.value)}>
              <option value="">Select Voice</option>
              <option value="tts_models/multilingual/multi-dataset/xtts_v2">Voice 1</option>
              <option value="tts_models/multilingual/multi-dataset/xtts_v1.1">Voice 2</option>
              <option value="tts_models/multilingual/multi-dataset/your_tts">Voice 3</option>
              <option value="tts_models/en/ek1/tacotron2">Voice 4</option>
              <option value="tts_models/en/ljspeech/tacotron2-DDC">Voice 5</option>
            </Select>

            <Slider type="range" min="0" max="100" />
          </Column>
    </Container>
      }
  </>
  );
}
export default HomePage;

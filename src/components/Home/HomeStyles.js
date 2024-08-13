import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 2rem;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.color};
  height: 100vh;
  margin-bottom : 8rem;
`;

export const Column = styled.div`
  flex: 1;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;  /* Added margin bottom */
`;

export const TypewriterContainer = styled.div`
  margin-bottom: 2rem;
  width: 100%;
`;

export const TypewriterText = styled.p`
  font-size: 1.2rem;
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  margin-bottom: 2rem;
  text-align: left;
  height: auto;
  white-space: wrap; /* Allow text to wrap */
  border-right: 0.15em solid ${({ theme }) => theme.color};
  animation: blink-caret 0.75s infinite;
  
  @keyframes blink-caret {
    from, to { border-color: transparent; }
    50% { border-color: ${({ theme }) => theme.color}; }
  }
`;

export const TabContainer = styled.div`
  display: flex;
  margin-bottom: 1rem;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);  /* Added shadow */
`;

export const Tab = styled.div`
  flex: 1;
  padding: 1rem;
  text-align: center;
  cursor: pointer;
  font-weight: ${({ active }) => (active ? 'bold' : 'normal')};
  box-shadow: ${({ active }) => (active ? '0px 4px 8px rgba(0, 0, 0, 0.2)' : 'none')};
  border-bottom: ${({ active, theme }) => (active ? `2px solid ${theme.color}` : 'none')};
`;
export const Accordion = styled.div`
  margin-top: 1rem;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);  /* Added shadow */
`;

export const AccordionContent = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  opacity: ${({ isAudioLoaded }) => (isAudioLoaded ? 1 : 0.5)};
`;

export const ReactQuillWrapper = styled.div`
  margin-bottom: 1rem;
  
  .ql-container {
    min-height: 160px; /* At least 8 rows */
  }
`;

export const AudioInput = styled.input`
  margin-bottom: 1rem;
`;

export const Button = styled.button`
  padding: 1rem 2rem;
  margin-top: 1rem;
  background-color: #007bff;
  color: white;
  font-size: 1.2rem;
  font-family: 'Roboto', sans-serif;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

export const Slider = styled.input`
  width: 80%;
  margin-bottom: 1rem;
  cursor: pointer;
`;

export const AudioPlayer = styled.audio`
  width: 100%;
  margin-top: 1rem;
`;

export const DownloadButton = styled.button`
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;

  &:hover {
    background-color: #218838;
  }

  &::before {
    content: '⬇';
    margin-right: 0.5rem;
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  font-family: 'Roboto', sans-serif;
`;

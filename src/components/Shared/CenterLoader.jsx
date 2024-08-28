import React from 'react';
import styled from 'styled-components';
import { Oval } from 'react-loader-spinner';

const LoaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
`;

const LoaderText = styled.p`
  margin-top: 20px;
  font-size: 18px;
  color: ${({ theme }) => theme.text};
`;

const CenterLoader = ({ text }) => {
  return (
    <LoaderContainer>
      <Oval
        height={80}
        width={80}
        color="#4fa94d"
        secondaryColor="#4fa94d"
        strokeWidth={2}
        strokeWidthSecondary={2}
        ariaLabel="loading"
        visible={true}
      />
      <LoaderText>{text}</LoaderText>
    </LoaderContainer>
  );
};

export default CenterLoader;

import React from 'react';
import Header from './Shared/Navbar';
import Footer from './Shared/Footer';
import { useTheme } from '../contexts/ThemeContext';
import styled from 'styled-components';

const Layout = ({ children }) => {
const {theme} = useTheme();
  return (
    <BodyDiv theme={theme}>
      <Header />
      <main>{children}</main>
      <Footer />
    </BodyDiv>
  );
};

const BodyDiv = styled.div`
background-color: ${({ theme }) => (theme === 'light' ? '#f0f0f0' : '#333')};

`
export default Layout;

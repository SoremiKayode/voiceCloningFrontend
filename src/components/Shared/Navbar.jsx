import React, { useContext } from 'react';
import { HeaderContainer, Logo, Nav, NavItem, Button, ProfilePic, ThemeToggle } from './HeaderStyles';
import { useTheme } from '../../contexts/ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa';
import myprofile from '../../assets/20231001_200910.jpg'
const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const isLightTheme = theme === 'light';
  

  return (
    <HeaderContainer theme={theme}>
      <Logo theme={theme}>VoiceCloneAI</Logo>
      <Nav theme={theme}>
        <NavItem href="/" theme={theme}>Home</NavItem>
        <Button href="/signup">Get Started</Button>
        <Button href="/login">Login</Button>
        <ThemeToggle onClick={toggleTheme} theme={theme}>
          {isLightTheme ? <FaMoon /> : <FaSun />}
        </ThemeToggle>
        <ProfilePic src={myprofile} alt="User Profile" />
      </Nav>
    </HeaderContainer>
  );
};

export default Header;

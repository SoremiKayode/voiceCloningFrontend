import React, { useContext } from 'react';
import { HeaderContainer, Logo, Nav, NavItem, Button, ProfilePic, ThemeToggle } from './HeaderStyles';
import { ThemeContext } from '../../contexts/ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa';
import myprofile from '../../assets/20231001_200910.jpg'
const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const isLightTheme = theme === 'light';
  

  return (
    <HeaderContainer>
      <Logo>VoiceCloneAI</Logo>
      <Nav>
        <NavItem href="/">Home</NavItem>
        <Button href="/signup">Get Started</Button>
        <Button href="/login">Login</Button>
        <ThemeToggle onClick={toggleTheme}>
          {isLightTheme ? <FaMoon /> : <FaSun />}
        </ThemeToggle>
        <ProfilePic src={myprofile} alt="User Profile" />
      </Nav>
    </HeaderContainer>
  );
};

export default Header;

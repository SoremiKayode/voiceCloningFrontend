import React, { useContext, useEffect, useState } from 'react';
import { HeaderContainer, Logo, Nav, NavItem, Button, ThemeToggle } from './HeaderStyles';
import { useTheme } from '../../contexts/ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa';
import myprofile from '../../assets/20231001_200910.jpg'
import { UserContext } from '../../contexts/UserContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const isLightTheme = theme === 'light';
  const [userInfo, setUserInfo] = useState(false);
  const navigate = useNavigate();

  useEffect(()=>{
const item = localStorage.getItem('userinfo')
setUserInfo(item);
  }, [setUserInfo]);

const logout = () => {
    localStorage.setItem("userinfo", 'false');
    localStorage.removeItem("userdata")
    setUserInfo('false');
    navigate("/login");
  };

  return (
    <HeaderContainer theme={theme}>
      <Logo theme={theme}>VoiceCloneAI</Logo>
      <Nav theme={theme}>
        <NavItem href="/" theme={theme}>Home</NavItem>
        {userInfo === 'false' ?
        <>
                <Button href="/signup">Get Started</Button>
                <Button href="/login">Login</Button>
        </> : 

        <>
      <Button onClick={logout}>Logout</Button>
        </>
        }

        <ThemeToggle onClick={toggleTheme} theme={theme}>
          {isLightTheme ? <FaMoon /> : <FaSun />}
        </ThemeToggle>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;

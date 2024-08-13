import styled from 'styled-components';

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: ${({ theme }) => (theme === 'light' ? '#f8f9fa' : '#1a1a2e')};
  color: ${({ theme }) => (theme === 'light' ? '#000000' : '#ffffff')};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
`;

export const Logo = styled.h1`
  font-size: 1.5rem;
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  color: ${({ theme }) => (theme === 'light' ? '#00aaff' : '#00aaff')};
  margin: 0;
`;

export const Nav = styled.nav`
  display: flex;
  align-items: center;
`;

export const NavItem = styled.a`
  color: ${({ theme }) => (theme === 'light' ? '#000000' : '#ffffff')};
  margin-left: 1.5rem;
  font-size: 1rem;
  font-family: 'Roboto', sans-serif;
  text-decoration: none;
  transition: color 0.3s;

  &:hover {
    color: #00aaff;
  }
`;

export const Button = styled.a`
  background-color: #00aaff;
  color: #ffffff;
  padding: 0.5rem 1rem;
  margin-left: 1.5rem;
  font-size: 1rem;
  font-family: 'Roboto', sans-serif;
  border-radius: 4px;
  text-decoration: none;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0077cc;
  }
`;

export const ProfilePic = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-left: 1.5rem;
`;

export const ThemeToggle = styled.button`
  background: none;
  border: none;
  color: inherit;
  font-size: 1.5rem;
  margin-left: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: color 0.3s;

  &:hover {
    color: #00aaff;
  }
`;

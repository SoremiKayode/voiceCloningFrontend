import styled from 'styled-components';

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: ${({ theme }) => (theme === 'light' ? '#f0f0f0' : '#333')};
  color: ${({ theme }) => (theme === 'light' ? '#000' : '#fff')};
  box-shadow : 2px 4px 8px rgba(0, 0, 0, 0.2), 4px 8px 16px rgba(0, 0, 0,0.2);
  position: sticky;
  top: 0;
  z-index: 1000;
`;

export const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${({ theme }) => (theme === 'light' ? '#000' : '#fff')};
`;

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  color: ${({ theme }) => (theme === 'light' ? '#000' : '#fff')};
`;

export const NavItem = styled.a`
  margin: 0 1rem;
  text-decoration: none;
  color: ${({ theme }) => (theme === 'light' ? '#000' : '#fff')};
  font-weight: bold;

  &:hover {
    color: ${({ theme }) => (theme === 'light' ? '#007bff' : '#4da8da')};
  }
`;

export const Button = styled.a`
  margin: 0 1rem;
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border-radius: 4px;
  text-decoration: none;
  font-weight: bold;

  &:hover {
    background-color: #0056b3;
  }
`;

export const ProfilePic = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-left: 1rem;
`;

export const ThemeToggle = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin-left: 1rem;
  color: ${({ theme }) => (theme === 'light' ? '#333' : '#fff')};
  font-size: 1.5rem;
`;

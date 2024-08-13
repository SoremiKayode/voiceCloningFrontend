import styled from 'styled-components';

export const FooterContainer = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background-color: #1a1a2e;
  color: #ffffff;
  text-align: center;
`;

export const FooterLogo = styled.h2`
  font-size: 1.5rem;
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  color: #00aaff;
  margin-bottom: 1rem;
`;

export const FooterNav = styled.nav`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
`;

export const FooterNavItem = styled.a`
  color: #ffffff;
  margin: 0 1.5rem;
  font-size: 1rem;
  font-family: 'Roboto', sans-serif;
  text-decoration: none;
  transition: color 0.3s;

  &:hover {
    color: #00aaff;
  }
`;

export const SocialIcons = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
`;

export const SocialIcon = styled.a`
  background-color: #00aaff;
  color: #ffffff;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  margin: 0 0.5rem;
  text-decoration: none;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0077cc;
  }
`;

export const FooterText = styled.p`
  font-size: 0.875rem;
  font-family: 'Roboto', sans-serif;
  color: #cccccc;
`;

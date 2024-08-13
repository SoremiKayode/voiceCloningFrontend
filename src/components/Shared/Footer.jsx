import React from 'react';
import { FooterContainer, FooterNav, FooterNavItem, FooterLogo, FooterText, SocialIcons, SocialIcon } from './FooterStyles';

const Footer = () => {
  return (
    <FooterContainer>
      <FooterLogo>VoiceCloneAI</FooterLogo>
      <FooterNav>
        <FooterNavItem href="/privacy">Privacy Policy</FooterNavItem>
        <FooterNavItem href="/terms">Terms of Service</FooterNavItem>
        <FooterNavItem href="/contact">Contact Us</FooterNavItem>
      </FooterNav>
      <SocialIcons>
        <SocialIcon href="https://facebook.com" target="_blank">FB</SocialIcon>
        <SocialIcon href="https://twitter.com" target="_blank">TW</SocialIcon>
        <SocialIcon href="https://linkedin.com" target="_blank">LN</SocialIcon>
      </SocialIcons>
      <FooterText>&copy; 2024 VoiceCloneAI. All rights reserved.</FooterText>
    </FooterContainer>
  );
};

export default Footer;

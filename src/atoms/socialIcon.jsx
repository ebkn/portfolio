import { h } from 'preact';
import styled from 'styled-components';

/** @jsx h */
const SocialIcon = ({ url, name, iconUrl }) => (
  <IconWrapper>
    <StyledLink href={url} target="_blank">
      <StyledImg src={iconUrl} alt={name} />
    </StyledLink>
  </IconWrapper>
);
const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 10px;
`;
const StyledLink = styled.a`
  text-decoration: none;
  cursor: pointer;
`;
const StyledImg = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 15px;
`;
export default SocialIcon;

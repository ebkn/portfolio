import { h } from 'preact';
import styled from 'styled-components';

/** @jsx h */
export default ({ url, name, icon}) => (
  <IconWrapper>
    <StyledLink href={url} target="_blank">
      <StyledImg src={`/images/${icon}`} alt={name} />
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

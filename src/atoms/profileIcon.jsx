import { h } from 'preact';
import styled from 'styled-components';
import info from '../info';

/** @jsx h */
export default () => (
  <StyledWrapper>
    <StyledImg src={`/images/${info.icon}`} alt="avatar" />
  </StyledWrapper>
);
const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 50px 0;
`;
const StyledImg = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 40px;
`;

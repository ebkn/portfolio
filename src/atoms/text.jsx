import { h } from 'preact';
import styled from 'styled-components';

/** @jsx h */
const Text = ({ text }) => (
  <StyledP>{text}</StyledP>
);
const StyledP = styled.p`
  font-size: 16px;
  line-height: 24px;
  word-break: break-word;
  color: #212121;
`;
export default Text;

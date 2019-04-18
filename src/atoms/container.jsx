import { h } from 'preact';
import styled from 'styled-components';

/** @jsx h */
const Container = ({ children }) => <StyledDiv>{children}</StyledDiv>;
const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  box-sizing: border-box;
`;
export default Container;

import { h } from 'preact';
import styled from 'styled-components';
import Text from '../atoms/text';

/** @jsx h */
const Copyright = () => (
  <StyledWrapper>
    <Text text="&copy; 2018 Ebinuma Kenichi" />
  </StyledWrapper>
);
const StyledWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  padding: 50px 0;
`;
export default Copyright;

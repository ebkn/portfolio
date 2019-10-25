import * as preact from 'preact';
import styled from 'styled-components';

/** @jsx preact.h */
const Badges: preact.FunctionComponent<{}> = () => (
  <Wrapper>
    <img src="https://img.shields.io/badge/status-good-green.svg" alt="my status" />
  </Wrapper>
);
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
`;
export default Badges;

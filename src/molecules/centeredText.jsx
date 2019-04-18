import { h } from 'preact';
import styled from 'styled-components';
import Text from '../atoms/text';

/** @jsx h */
export default ({ text }) => (
  <TextWrapper>
    <Text text={text} />
  </TextWrapper>
);
const TextWrapper = styled.div`
  display: flex;
  justify-content: center;
  max-width: 400px;
  margin: 0 auto;
  text-align: center;
`;

import * as React from 'react';
import styled from 'styled-components';

interface Props {
  text: string;
}

const SmallText: React.FC<Props> = ({ text }: Props) => (
  <P>{text}</P>
);
export default SmallText;

const P = styled.p`
  margin: 0;
  font-size: var(--small-size);
  line-height: 24px;
  color: var(--sub-text-color);
  word-break: break-word;
`;

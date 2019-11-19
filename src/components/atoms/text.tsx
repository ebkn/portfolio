import * as React from 'react';
import styled from 'styled-components';

interface Props {
  text: string;
  alignCenter?: boolean;
}

const Text: React.FC<Props> = ({ text, alignCenter = false }) => (
  <P alignCenter={alignCenter}>{text}</P>
);
export default Text;

type PProps = { alignCenter: boolean };
const P = styled.p`
  box-sizing: border-box;
  margin: 0;
  padding: 5px 0;
  font-size: var(--normal-size);
  line-height: 24px;
  word-break: break-word;
  color: var(--text-color);
  text-align: ${({ alignCenter }: PProps) => (alignCenter ? 'center' : 'left')};
`;

import * as React from 'react';
import styled from 'styled-components';

interface Props {
  text: string;
  alignCenter?: boolean;
}

export const SmallText: React.FC<Props> = ({ text, alignCenter = false }) => (
  <P alignCenter={alignCenter}>{text}</P>
);

type PProps = { alignCenter: boolean };
const P = styled.p`
  margin: 0;
  font-size: var(--small-size);
  line-height: 24px;
  color: var(--sub-text-color);
  word-break: break-word;
  text-align: ${({ alignCenter }: PProps) => (alignCenter ? 'center' : 'left')};
`;

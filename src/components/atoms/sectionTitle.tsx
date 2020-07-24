import * as React from 'react';
import styled from 'styled-components';

interface Props {
  content: string;
  alignCenter: boolean;
}

export const SectionTitle: React.FC<Props> = ({ content, alignCenter = false }: Props) => (
  <H2 alignCenter={alignCenter}>{content}</H2>
);

type H2Props = { alignCenter: boolean };
const H2: any = styled.h2`
  margin: 0;
  padding: 0 0 8px 0;
  font-size: var(--section-title-size);
  color: var(--title-color);
  text-align: ${({ alignCenter }: H2Props) => (alignCenter ? 'center' : 'left')};
`;

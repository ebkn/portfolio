import * as React from 'react';
import styled from 'styled-components';

interface Props {
  title: string;
  alignCenter?: boolean;
}
const SectionTitle: React.FC<Props> = ({ title, alignCenter = false }: Props) => (
  <H2 alignCenter={alignCenter}>{title}</H2>
);
export default SectionTitle;

type H2Props = { alignCenter: boolean };
const H2: any = styled.h2`
  margin: 0;
  padding: 15px 0 10px 0;
  font-size: var(--section-title-size);
  color: var(--title-color);
  text-align: ${({ alignCenter }: H2Props) => alignCenter ? 'center': 'left'};
`;

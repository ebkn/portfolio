import * as React from 'react';
import styled from 'styled-components';

interface Props {
  title: string;
}

export const HeaderTitle: React.FC<Props> = ({ title }) => (
  <H1>{title}</H1>
);

const H1 = styled.h1`
  font-size: var(--title-size);
  color: var(--logo-color);
`;

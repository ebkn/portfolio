import * as React from 'react';
import styled from 'styled-components';

interface Props {
  title: string;
}

const HeaderTitle: React.FC<Props> = ({ title }) => (
  <H1>{title}</H1>
);
export default HeaderTitle;

const H1 = styled.h1`
  font-size: 22px;
  color: #757575;
`;

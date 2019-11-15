import * as React from 'react';
import styled from 'styled-components';

interface Props {
  title: string;
}

const HeaderTitle: React.FC<Props> = ({ title }) => (
  <StyledH1>{title}</StyledH1>
);
export default HeaderTitle;

const StyledH1 = styled.h1`
  font-size: 22px;
  color: #757575;
`;

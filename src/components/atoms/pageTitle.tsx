import * as React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

interface Props {
  title: string;
  to: string;
}

export const PageTitle: React.FC<Props> = ({ title, to }) => (
  <StyledLink to={to}>
    <H2>{title}</H2>
  </StyledLink>
);

const StyledLink = styled(Link)`
  display: flex;
  padding: 0 16px;
  justify-content: center;
  box-sizing: border-box;
  text-decoration: none;
`;
const H2 = styled.h2`
  font-size: var(--page-title-size);
  color: var(--logo-color);
`;

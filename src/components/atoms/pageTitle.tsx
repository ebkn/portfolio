import * as React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

interface Props {
  title: string;
  to: string;
}

const PageTitle: React.FC<Props> = ({ title, to }) => (
  <StyledLink to={to}>
    <H2>{title}</H2>
  </StyledLink>
);
export default PageTitle;

const StyledLink = styled(Link)`
  width: 100%;
  padding: 40px 0;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  text-decoration: none;
`;
const H2 = styled.h2`
  font-size: var(--page-title-size);
  color: var(--title-color);
`;

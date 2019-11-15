import * as React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import HeaderTitle from '../atoms/headerTitle';

interface Props {
  title: string;
}

const Header: React.FC<Props> = ({ title }) => (
  <StyledHeaderContainer>
    <StyledLink to="/">
      <HeaderTitle title={title} />
    </StyledLink>
  </StyledHeaderContainer>
);
export default Header;

const StyledHeaderContainer = styled.header`
  display: flex;
  width: 100vw;
  box-sizing: border-box;
  padding: 20px 25px 0 25px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

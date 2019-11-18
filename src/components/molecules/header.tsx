import * as React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import HeaderTitle from '../atoms/headerTitle';
import DarkModeToggle from '../atoms/darkModeToggle';

interface Props {
  title: string;
}

const Header: React.FC<Props> = ({ title }) => (
  <HeaderContainer>
    <StyledLink to="/">
      <HeaderTitle title={title} />
    </StyledLink>
    <DarkModeToggle />
  </HeaderContainer>
);
export default Header;

const HeaderContainer = styled.header`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 30px 25px 10px 25px;
`;
const StyledLink = styled(Link)`
  text-decoration: none;
`;

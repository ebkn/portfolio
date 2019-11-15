import * as React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import HeaderTitle from '../atoms/headerTitle';

interface Props {
  title: string;
}

const Header: React.FC<Props> = ({ title }) => (
  <HeaderContainer>
    <StyledLink to="/">
      <HeaderTitle title={title} />
    </StyledLink>
  </HeaderContainer>
);
export default Header;

const HeaderContainer = styled.header`
  display: flex;
  width: 100%;
  box-sizing: border-box;
  padding: 30px 25px 10px 25px;
`;
const StyledLink = styled(Link)`
  text-decoration: none;
`;

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
  width: 100%;
  box-sizing: border-box;
  padding: 30px 25px 10px 25px;
`;
const StyledLink = styled(Link)`
  text-decoration: none;
`;

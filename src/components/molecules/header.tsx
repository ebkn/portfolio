import * as React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { HeaderTitle } from '../atoms/headerTitle';
import { DarkModeToggle } from '../atoms/darkModeToggle';
import { PageTitle } from '../atoms/pageTitle';

interface Props {
  title: string;
}

export const Header: React.FC<Props> = ({ title }) => (
  <HeaderContainer>
    <StyledLink to="/">
      <HeaderTitle title={title} />
    </StyledLink>
    <HeaderRightContainer>
      <PageTitle title="blog" to="/blog" />
      <PageTitle title="job" to="/jobs" />
      <DarkModeToggle />
    </HeaderRightContainer>
  </HeaderContainer>
);

const StyledLink = styled(Link)`
  text-decoration: none;
`;
const HeaderContainer = styled.header`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 30px 25px 10px 25px;
`;
const HeaderRightContainer = styled.div`
  max-width: 60%;
  display: flex;
  justify-content: space-between;
`;

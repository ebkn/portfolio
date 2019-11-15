import * as React from 'react';
import styled from 'styled-components';
import Header from './components/molecules/header';
import Copyright from './components/molecules/copyright';
import 'normalize.css';
import './layout.css';

interface Props {
  children: any;
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <StyledContainer>
      <Header title="ebiken" />
      <StyledMain>
        {children}
        <Copyright />
      </StyledMain>
    </StyledContainer>
  );
};
export default Layout;

const StyledContainer: any = styled.div`
  width: 100vw;
`;
const StyledMain: any = styled.main`
  width: 100%;
  box-sizing: border-box;
  padding: 20px;
`;

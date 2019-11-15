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
    <StyledWrapper>
      <StyledContainer>
        <Header title="ebiken" />
        <StyledMain>
          {children}
          <Copyright />
        </StyledMain>
      </StyledContainer>
    </StyledWrapper>
  );
};
export default Layout;

const StyledWrapper = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
`;
const StyledContainer = styled.div`
  width: 100%;
  max-width: 680px;
`;
const StyledMain = styled.main`
  width: 100%;
  box-sizing: border-box;
  padding: 20px;
`;

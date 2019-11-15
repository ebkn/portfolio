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
    <Wrapper>
      <Container>
        <Header title="ebiken" />
        <Main>
          {children}
          <Copyright />
        </Main>
      </Container>
    </Wrapper>
  );
};
export default Layout;

const Wrapper = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
`;
const Container = styled.div`
  width: 100%;
  max-width: 680px;
`;
const Main = styled.main`
  width: 100%;
  box-sizing: border-box;
  padding: 20px;
`;

import { h, FunctionComponent } from 'preact';
import { useState } from 'preact/hooks';
import Router from 'preact-router';
import styled from 'styled-components';
import Home from './pages/home';
import Skills from './pages/skills';
import Works from './pages/works';
import Jobs from './pages/jobs';
import NotFound from './pages/notFound';
import MobileSideBar from './molecules/mobileSideBar';
import PcSideBar from './molecules/pcSideBar';
import Copyright from './molecules/copyright';
import { isMobile } from './utils';

interface State {
  sideBarOpen: boolean;
}

/** @jsx h */
const App: FunctionComponent<State> = () => {
  const [sideBarOpen, updateSideBarOpen] = useState<boolean>(false);

  const toggleSideBarOpen = (e: MouseEvent): void => {
    e.preventDefault();
    updateSideBarOpen(!sideBarOpen);
  };

  return (
    <StyledContainer>
      {isMobile() ? (
        <MobileSideBar open={sideBarOpen} toggleOpen={toggleSideBarOpen} />
      ) : (
        <PcSideBar />
      )}
      <StyledMain sideBarOpen={sideBarOpen}>
        <Router>
          <Home path="/" />
          <Skills path="/skills" />
          <Works path="/works" />
          <Jobs path="/jobs" />
          <NotFound default />
        </Router>
        <Copyright />
      </StyledMain>
    </StyledContainer>
  );
};
const StyledContainer = styled.div`
  display: flex;
  width: 100vw;
`;
const StyledMain = styled.main.attrs({
  style: props => (isMobile() && !props.sideBarOpen ? { marginLeft: '0' } : { marginLeft: '30%' }),
})`
  width: 100%;
  box-sizing: border-box;
  padding: 30px 10px 20px 10px;
`;

export default App;

import { h, Component } from 'preact';
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

/** @jsx h */
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { sideBarOpen: false };
  }

  toggleSideBarOpen(e) {
    e.preventDefault();
    this.setState(prevState => ({ sideBarOpen: !prevState.sideBarOpen }));
  }

  render() {
    const { sideBarOpen } = this.state;
    return (
      <StyledContainer>
        {isMobile() ? (
          <MobileSideBar open={sideBarOpen} toggleOpen={e => this.toggleSideBarOpen(e)} />
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
  }
}
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

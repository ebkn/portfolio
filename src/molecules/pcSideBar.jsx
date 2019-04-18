import { h } from 'preact';
import { Link } from 'preact-router/match';
import styled from 'styled-components';

/** @jsx h */
const PcSideBar = () => (
  <StyledPcMenu>
    <div>
      <PcStyledLink href="/">Home</PcStyledLink>
      <PcStyledLink href="/skills">Skills</PcStyledLink>
      <PcStyledLink href="/works">Works</PcStyledLink>
      <PcStyledLink href="/jobs">Jobs</PcStyledLink>
    </div>
  </StyledPcMenu>
);
const StyledPcMenu = styled.div`
  position: fixed;
  width: 30%;
  height: 100vh;
  box-sizing: border-box;
  padding: 2.5em 1.5em 0;
  border-right: 2px dashed #9E9E9E;
`;
const PcStyledLink = styled(Link)`
  display: block;
  padding: 10px 0;
  color: #424242;
  text-decoration: none;
`;
export default PcSideBar;

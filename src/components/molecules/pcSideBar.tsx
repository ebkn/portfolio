import * as React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

const PCSideBar: React.FC<{}> = () => (
  <StyledPcMenu>
    <div>
      <PcStyledLink to="/">Home</PcStyledLink>
      <PcStyledLink to="/jobs">Jobs</PcStyledLink>
      <PcStyledLink to="/blog">Blog</PcStyledLink>
    </div>
  </StyledPcMenu>
);
const StyledPcMenu: any = styled.div`
  position: fixed;
  width: 30%;
  height: 100vh;
  box-sizing: border-box;
  padding: 2.5em 1.5em 0;
  border-right: 2px dashed #9E9E9E;
`;
const PcStyledLink: any = styled(Link as any)`
  display: block;
  padding: 10px 0;
  color: #424242;
  text-decoration: none;
`;
export default PCSideBar;

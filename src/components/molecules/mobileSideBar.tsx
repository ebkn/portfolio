import * as React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

interface Props {
  open: boolean;
  toggleOpen: (e: MouseEvent) => void;
}

const MobileSideBar: React.FC<Props> = ({ open, toggleOpen }: Props) => (
  <React.Fragment>
    <StyledPcMenu open={open}>
      <div>
        <PcStyledLink to="/">Home</PcStyledLink>
        <PcStyledLink to="/jobs">Jobs</PcStyledLink>
        <PcStyledLink to="/blog">Blog</PcStyledLink>
      </div>
    </StyledPcMenu>
    <IconWrapper onClick={toggleOpen} open={open}>
      <ToggleIcon type="button">{open ? '<' : '>'}</ToggleIcon>
    </IconWrapper>
  </React.Fragment>
);

type MenuProps = { open: boolean };

const StyledPcMenu: any = styled.div`
  display: ${({ open }: MenuProps) => open ? 'block' : 'none'};
  position: fixed;
  width: 25%;
  height: 100vh;
  box-sizing: border-box;
  padding: 50px 10px 10px 10px;
  border-right: ${({ open }: MenuProps) => open ? '2px dashed #9E9E9E' : 'none'};
`;
const IconWrapper: any = styled.div`
  position: ${({ open }: MenuProps) => open ? 'fixed' : 'absolute'};
  box-sizing: border-box;
  height: 20px;
  padding: 25px 10px;
  display: flex;
  align-items: center;
`;
const ToggleIcon: any = styled.button`
  font-size: 26px;
  line-height: 40px;
  background-color: transparent;
  border: 0;
  border-style: none;
  outline: 0;
`;
const PcStyledLink: any = styled(Link as any)`
  display: block;
  padding: 15px 0;
  color: #424242;
  text-decoration: none;
`;
export default MobileSideBar;

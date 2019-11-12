import * as React from 'react';
import styled from 'styled-components';
import { isMobile } from './utils';
import MobileSideBar from './components/molecules/mobileSideBar';
import PcSideBar from './components/molecules/pcSideBar';
import Copyright from './components/molecules/copyright';

interface Props {
  children: any;
}

const Layout: React.FC<Props> = ({ children }) => {
  const [sideBarOpen, updateSideBarOpen] = React.useState<boolean>(false);

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
        {children}
        <Copyright />
      </StyledMain>
    </StyledContainer>
  );
};
export default Layout;

const StyledContainer: any = styled.div`
  display: flex;
  width: 100vw;
`;
type MainType = { sideBarOpen: boolean };
const StyledMain: any = styled.main.attrs<MainType>({
  style: ({ sideBarOpen }: MainType) => (isMobile() && !sideBarOpen ? { marginLeft: '0' } : { marginLeft: '30%' }),
})`
  width: 100%;
  box-sizing: border-box;
  padding: 30px 10px 20px 10px;
`;

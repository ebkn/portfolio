import * as React from 'react';
import styled from 'styled-components';
import { ModeToggleContext, ModeToggleContextType } from '../../context/mode';

const imageURL = '/images/dark-mode-toggle.svg';

const DarkModeToggle: React.FC<{}> = () => {
  const toggleMode = React.useContext<ModeToggleContextType>(ModeToggleContext);

  return (
    <Wrapper onClick={toggleMode}>
      <Image src={imageURL} />
    </Wrapper>
  );
};
export default DarkModeToggle;

const Wrapper = styled.div`
  width: 40px;
  height: 60px;
  position: relative;
`;
const Image = styled.img`
  width: 60px;
  position: absolute;
  top: 50%;
  left: 80%;
  transform: translate(-50%, -50%);
`;

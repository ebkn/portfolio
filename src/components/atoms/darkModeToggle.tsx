import * as React from 'react';
import styled from 'styled-components';
import { ModeToggleContext, ModeToggleContextType } from '../../context/mode';

const imageURL = '/images/dark-mode-toggle.svg';

export const DarkModeToggle: React.FC<{}> = () => {
  const toggleMode = React.useContext<ModeToggleContextType>(ModeToggleContext);

  return (
    <Wrapper onClick={toggleMode}>
      <Image src={imageURL} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 40px;
  height: calc(64px + 4px); /* minor adjustment */
  position: relative;
`;
const Image = styled.img`
  width: 64px;
  position: absolute;
  top: 50%;
  left: 80%;
  transform: translate(-50%, -50%);
`;

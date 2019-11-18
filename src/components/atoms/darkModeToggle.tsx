import * as React from 'react';
import styled from 'styled-components';
import { ModeContext, ModeContextType } from '../../context/mode';

const imageURL = '/images/light.svg';

const DarkModeToggle: React.FC<{}> = () => {
  const toggleMode = React.useContext<ModeContextType>(ModeContext);

  return (
    <Wrapper onClick={toggleMode}>
      <Image src={imageURL} />
    </Wrapper>
  );
};
export default DarkModeToggle;

const Wrapper = styled.div`
  width: 60px;
  height: 60px;
  position: relative;
`;
const Image = styled.img`
  width: 100%;
  position: absolute;
  position: absolute;
  top: 50%;
  left: 90%;
  transform: translate(-50%, -50%);
`;

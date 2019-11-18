import * as React from 'react';
import styled from 'styled-components';

interface Props {
  fileName: string;
}

const ProfileIcon: React.FC<Props> = ({ fileName }) => (
  <Wrapper>
    <Img src={`/images/${fileName}`} alt="avatar" />
  </Wrapper>
);
const Wrapper: any = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 30px 0;
`;
const Img: any = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 35px;
`;
export default ProfileIcon;

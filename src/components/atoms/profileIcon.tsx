import * as React from 'react';
import styled from 'styled-components';

interface Props {
  fileName: string;
}

export const ProfileIcon: React.FC<Props> = ({ fileName }) => (
  <Container>
    <Img src={`/images/${fileName}`} alt="avatar" />
  </Container>
);

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 30px 0;
`;
const Img = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 35px;
`;

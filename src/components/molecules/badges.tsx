import { FC } from 'react';
import styled from 'styled-components';

const Badges: FC<{}> = () => (
  <Wrapper>
    <img src="https://img.shields.io/badge/status-good-green.svg" alt="my status" />
  </Wrapper>
);
const Wrapper: any = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
`;
export default Badges;

import * as React from 'react';
import styled from 'styled-components';

interface Props {
  children: any;
}

export const Container: React.FC<Props> = ({ children }) => (
  <Div>{children}</Div>
);

const Div = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  padding: 24px 0;
  box-sizing: border-box;
`;

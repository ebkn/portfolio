import * as React from 'react';
import styled from 'styled-components';

interface Props {
  children: react.ComponentChildren;
}
const Container: React.FC<Props> = ({ children }: Props) => (
  <StyledDiv>{children}</StyledDiv>
);
const StyledDiv: any = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  box-sizing: border-box;
`;
export default Container;

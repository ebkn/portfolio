import * as preact from 'preact';
import styled from 'styled-components';
import Title from '../atoms/title';

/** @jsx preact.h */
const NotFoundPage: preact.FunctionComponent<{}> = () => (
  <StyledWrapper>
    <Title title="404 NOT FOUND" />
  </StyledWrapper>
);
const StyledWrapper: any = styled.div`
  padding: 100px 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export default NotFoundPage;

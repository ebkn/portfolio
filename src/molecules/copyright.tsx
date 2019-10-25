import * as preact from 'preact';
import styled from 'styled-components';
import Text from '../atoms/text';

/** @jsx preact.h */
const CopyRight: preact.FunctionComponent<{}> = () => (
  <Wrapper>
    <Text text="&copy; 2018 Ebinuma Kenichi" />
  </Wrapper>
);
const Wrapper: any = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  padding: 50px 0;
`;
export default CopyRight;

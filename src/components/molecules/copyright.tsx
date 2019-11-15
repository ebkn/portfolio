import * as React from 'react';
import styled from 'styled-components';
import Text from '../atoms/text';

const CopyRight: React.FC<{}> = () => (
  <Footer>
    <Text text="&copy; 2018 Ebinuma Kenichi" />
  </Footer>
);
const Footer = styled.footer`
  display: flex;
  width: 100%;
  justify-content: center;
  padding: 50px 0;
`;
export default CopyRight;

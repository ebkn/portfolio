import * as React from 'react';
import styled from 'styled-components';
import { Text } from '../atoms/text';

export const CopyRight: React.FC<{}> = () => (
  <Footer>
    <Text text="&copy; 2018-2020 Ebinuma Kenichi" />
  </Footer>
);

const Footer = styled.footer`
  display: flex;
  width: 100%;
  justify-content: center;
  padding: 48px 0;
`;

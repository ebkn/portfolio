import * as React from 'react';
import styled from 'styled-components';
import Text from '../atoms/text';

interface Props {
  text: string;
}
const CenteredText: React.FC<Props> = ({ text }: Props) => (
  <Wrapper>
    <Text text={text} />
  </Wrapper>
);
const Wrapper: any = styled.div`
  display: flex;
  justify-content: center;
  max-width: 400px;
  margin: 0 auto;
  text-align: center;
`;
export default CenteredText;

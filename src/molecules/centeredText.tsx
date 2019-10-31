import { h, FunctionComponent } from 'preact';
import styled from 'styled-components';
import Text from '../atoms/text';

interface Props {
  text: string;
}
/** @jsx h */
const CenteredText: FunctionComponent<Props> = ({ text }: Props) => (
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

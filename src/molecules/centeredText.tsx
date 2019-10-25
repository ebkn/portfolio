import * as preact from 'preact';
import styled from 'styled-components';
import Text from '../atoms/text';

interface Props {
  text: string;
}
/** @jsx preact.h */
const CenteredText: preact.FunctionComponent<Props> = ({ text }: Props) => (
  <Wrapper>
    <Text text={text} />
  </Wrapper>
);
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  max-width: 400px;
  margin: 0 auto;
  text-align: center;
`;
export default CenteredText;

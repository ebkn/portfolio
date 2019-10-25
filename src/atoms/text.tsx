import * as preact from 'preact';
import styled from 'styled-components';

interface Props {
  text: string;
}
/** @jsx preact.h */
const Text: preact.FunctionComponent<Props> = ({ text }: Props) => (
  <StyledP>{text}</StyledP>
);
const StyledP = styled.p`
  font-size: 16px;
  line-height: 24px;
  word-break: break-word;
  color: #212121;
`;
export default Text;

import { h, FunctionComponent } from 'preact';
import styled from 'styled-components';

interface Props {
  text: string;
}
/** @jsx h */
const Text: FunctionComponent<Props> = ({ text }: Props) => (
  <StyledP>{text}</StyledP>
);
const StyledP: any = styled.p`
  font-size: 16px;
  line-height: 24px;
  word-break: break-word;
  color: #212121;
`;
export default Text;

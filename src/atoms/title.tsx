import { h, FunctionComponent } from 'preact';
import styled from 'styled-components';

interface Props {
  title: string;
}
/** @jsx h */
const Title: FunctionComponent<Props> = ({ title }: Props) => <StyledH1>{title}</StyledH1>;
const StyledH1: any = styled.h1`
  margin: 0;
  padding: 25px 0;
  font-size: 26px;
  color: #212121;
  text-align: center;
`;
export default Title;

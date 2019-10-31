import { h, FunctionComponent } from 'preact';
import styled from 'styled-components';

interface Props {
  title: string;
}
/** @jsx h */
const SubTitle: FunctionComponent<Props> = ({ title }: Props) => (
  <StyledH2>{title}</StyledH2>
);
const StyledH2: any = styled.h2`
  margin: 0;
  padding: 15px 0;
  font-size: 22px;
  color: #212121;
  text-align: center;
`;
export default SubTitle;

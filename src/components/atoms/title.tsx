import * as React from 'react';
import styled from 'styled-components';

interface Props {
  title: string;
}
const Title: React.FC<Props> = ({ title }: Props) => (
  <H1>{title}</H1>
);
export default Title;

const H1: any = styled.h1`
  margin: 0;
  padding: 25px 0;
  font-size: var(--title-size);
  color: var(--title-color);
  text-align: center;
`;

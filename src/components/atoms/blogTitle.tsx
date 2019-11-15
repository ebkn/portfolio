import * as React from 'react';
import styled from 'styled-components';

interface Props {
  title: string;
}
const BlogTitle: React.FC<Props> = ({ title }: Props) => (
  <StyledH1>{title}</StyledH1>
);

const StyledH1: any = styled.h1`
  margin: 0;
  padding: 10px 0;
  font-size: 28px;
  color: #212121;
`;
export default BlogTitle;

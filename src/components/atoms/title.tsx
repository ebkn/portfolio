import * as React from 'react';
import styled from 'styled-components';

interface Props {
  title: string;
  alignLeft?: boolean;
}
const Title: React.FC<Props> = ({ title, alignLeft = false }: Props) => (
  <StyledH1 alignLeft={alignLeft}>{title}</StyledH1>
);

type H1Props = { alignLeft: boolean };
const StyledH1: any = styled.h1.attrs<H1Props>({
  style: ({ alignLeft }: H1Props) => (alignLeft ? {
    textAlign: 'left',
  } : {
    textAlign: 'center',
  }),
})`
  margin: 0;
  padding: 25px 0;
  font-size: 26px;
  color: #212121;
`;
export default Title;

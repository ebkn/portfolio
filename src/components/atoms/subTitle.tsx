import * as React from 'react';
import styled from 'styled-components';

interface Props {
  title: string;
  alignCenter?: boolean;
}
const SubTitle: React.FC<Props> = ({ title, alignCenter = false }: Props) => (
  <StyledH2 alignCenter={alignCenter}>{title}</StyledH2>
);
export default SubTitle;

type H2Props = { alignCenter: boolean };
const StyledH2: any = styled.h2`
  margin: 0;
  padding: 15px 0;
  font-size: 22px;
  color: #212121;
  text-align: ${({ alignCenter }: H2Props) => alignCenter ? 'center': 'left'};
`;

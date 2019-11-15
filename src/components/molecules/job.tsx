import * as React from 'react';
import styled from 'styled-components';
import SubTitle from '../atoms/subTitle';

interface Props {
  name: string;
  position: string;
  term: string;
  description: string;
}
const Job: React.FC<Props> = ({ name, position, term, description }: Props) => (
  <Section>
    <SubTitle title={name} />
    <Term>{term}</Term>
    <Position>{position}</Position>
    <P>{description}</P>
  </Section>
);
const Section = styled.section`
  padding: 25px 0;
`;
const Term = styled.small`
  margin: 0;
  font-size: 12px;
  color: #424242;
`;
const Position = styled.p`
  font-size: 13px;
  color: #424242;
`;
const P = styled.p`
  font-size: 15px;
  color: #424242;
`;
export default Job;

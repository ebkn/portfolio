import * as React from 'react';
import styled from 'styled-components';
import SectionTitle from '../atoms/sectionTitle';
import Text from '../atoms/text';
import SmallText from '../atoms/smallText';

interface Props {
  name: string;
  position: string;
  term: string;
  description: string;
}

const Job: React.FC<Props> = ({ name, position, term, description }: Props) => (
  <Section>
    <SectionTitle content={name} />
    <SubInfoWrapper>
      <Text text={position} />
      <SubInfoSpace />
      <SmallText text={term} />
    </SubInfoWrapper>
    <Text text={description} />
  </Section>
);
export default Job;

const Section = styled.section`
  padding: 25px 0;
`;
const SubInfoWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  align-items: center;
  padding-bottom: 15px;
`;
const SubInfoSpace = styled.div`
  width: 10px;
`;

import * as preact from 'preact';
import styled from 'styled-components';
import SubTitle from '../atoms/subTitle';
import Text from '../atoms/text';

interface Props {
  name: string;
  position: string;
  term: string;
  description: string;
}
/** @jsx preact.h */
const Job: preact.FunctionComponent<Props> = ({
  name,
  position,
  term,
  description,
}: Props) => (
  <StyledWrapper>
    <SubTitle title={name} />
    <SubInfoWrapper>
      <LeftTextWrapper>
        <Text text={position} />
      </LeftTextWrapper>
      <StyledP>|</StyledP>
      <RightTextWrapper>
        <Text text={term} />
      </RightTextWrapper>
    </SubInfoWrapper>
    <DescriptionWrapper>
      <Text text={description} />
    </DescriptionWrapper>
  </StyledWrapper>
);
const StyledWrapper = styled.div`
  padding: 20px 0;
`;
const SubInfoWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
const LeftTextWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 40%;
  text-align: right;
  word-wrap: break-word;
`;
const RightTextWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 40%;
  text-align: left;
  word-wrap: break-word;
`;
const StyledP = styled.p`
  padding: 0 15px;
`;
const DescriptionWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 30px;
`;
export default Job;

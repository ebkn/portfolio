import { h } from 'preact';
import styled from 'styled-components';
import SubTitle from '../atoms/subTitle';
import Text from '../atoms/text';

/** @jsx h */
const Job = ({
  name,
  position,
  term,
  description,
}) => (
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
    <Text text={description} />
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
`;
const RightTextWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 40%;
`;
const StyledP = styled.p`
  padding: 0 15px;
`;
export default Job;

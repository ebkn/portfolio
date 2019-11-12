import { h, FunctionComponent } from 'preact';
import styled from 'styled-components';

interface Props {
  fileName: string;
}

/** @jsx h */
const ProfileIcon: FunctionComponent<Props> = ({ fileName }) => (
  <Wrapper>
    <Img src={`/images/${fileName}`} alt="avatar" />
  </Wrapper>
);
const Wrapper: any = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 50px 0;
`;
const Img: any = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 40px;
`;
export default ProfileIcon;

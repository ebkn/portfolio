import { h, FunctionComponent } from 'preact';
import styled from 'styled-components';
import Layout from '../layout';
import Title from '../components/atoms/title';

/** @jsx h */
const NotFoundPage: FunctionComponent<{}> = () => (
  <Layout>
    <StyledWrapper>
      <Title title="404 NOT FOUND" />
    </StyledWrapper>
  </Layout>
);
export default NotFoundPage;

const StyledWrapper: any = styled.div`
  padding: 100px 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

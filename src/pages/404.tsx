import * as React from 'react';
import styled from 'styled-components';
import Layout from '../layout';
import Head from '../head';
import Title from '../components/atoms/title';

const NotFoundPage: React.FC<{}> = () => (
  <Layout>
    <Head lang="ja" title="not found" />
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

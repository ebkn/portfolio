import * as React from 'react';
import styled from 'styled-components';
import Layout from '../layout';
import Head from '../head';
import Title from '../components/atoms/title';

const NotFoundPage: React.FC<{}> = () => (
  <Layout>
    <Head lang="ja" siteTitle="NOT FOUND" />
    <TextWrapper>
      <Title title="404 NOT FOUND" />
    </TextWrapper>
  </Layout>
);
export default NotFoundPage;

const TextWrapper: any = styled.div`
  padding: 100px 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

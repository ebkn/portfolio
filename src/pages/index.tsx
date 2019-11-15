import * as React from 'react';
import Layout from '../layout';
import Head from '../head';
import Container from '../components/atoms/container';
import PageTitle from '../components/atoms/pageTitle';

const IndexPage: React.FC<{}> = () => (
  <Layout>
    <Head lang="ja" />
    <Container>
      <PageTitle title="BLOG" to="/blog" />
      <PageTitle title="JOBS" to="/jobs" />
      <PageTitle title="ABOUT ME" to="/aboutme" />
    </Container>
  </Layout>
);
export default IndexPage;

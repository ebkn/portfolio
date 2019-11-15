import * as React from 'react';
import Layout from '../layout';
import Head from '../head';
import Container from '../components/atoms/container';
import PageLink from '../components/atoms/pageLink';

const IndexPage: React.FC<{}> = () => (
  <Layout>
    <Head lang="ja" />
    <Container>
      <PageLink title="BLOG" to="/blog" />
      <PageLink title="JOBS" to="/jobs" />
      <PageLink title="ABOUT ME" to="/aboutme" />
    </Container>
  </Layout>
);
export default IndexPage;

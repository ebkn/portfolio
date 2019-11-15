import * as React from 'react';
import Layout from '../layout';
import Head from '../head';
import Container from '../components/atoms/container';
import Job from '../components/molecules/job';
import info from '../info';

const JobsPage: React.FC<{}> = () => (
  <Layout>
    <Head lang="ja" title="jobs" />
    <Container>
      {info.jobs.map(({
        name,
        position,
        term,
        description,
      }) => (
        <Job
          name={name}
          position={position}
          term={term}
          description={description}
          key={name}
        />
      ))}
    </Container>
  </Layout>
);
export default JobsPage;

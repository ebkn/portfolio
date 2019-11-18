import * as React from 'react';
import Head from '../head';
import Container from '../components/atoms/container';
import Job from '../components/molecules/job';
import info from '../info';

const JobsPage: React.FC<{}> = () => (
  <React.Fragment>
    <Head lang="ja" siteTitle="JOBS" />
    <Container>
      {info.jobs.map(({
        name, position, term, description,
      }) => (
        <Job name={name} position={position} term={term} description={description} key={name} />
      ))}
    </Container>
  </React.Fragment>
);
export default JobsPage;

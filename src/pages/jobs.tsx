import { h, FunctionComponent } from 'preact';
import Container from '../atoms/container';
import Title from '../atoms/title';
import Job from '../molecules/job';
import info from '../info';

/** @jsx h */
const JobsPage: FunctionComponent<{}> = () => (
  <Container>
    <Title title="JOBS" />
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
);
export default JobsPage;

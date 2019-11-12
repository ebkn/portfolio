import { FC } from 'react';
import Container from '../components/atoms/container';
import Title from '../components/atoms/title';
import Job from '../components/molecules/job';
import info from '../info';

const JobsPage: FC<{}> = () => (
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

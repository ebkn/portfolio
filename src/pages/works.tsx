import { FC } from 'react';
import Container from '../components/atoms/container';
import Title from '../components/atoms/title';
import CenteredText from '../components/molecules/centeredText';

const WorksPage: FC<{}> = () => (
  <Container>
    <Title title="WORKS" />
    <CenteredText text="WIP" />
  </Container>
);
export default WorksPage;

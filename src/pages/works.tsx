import { h, FunctionComponent } from 'preact';
import Container from '../components/atoms/container';
import Title from '../components/atoms/title';
import CenteredText from '../components/molecules/centeredText';

/** @jsx h */
const WorksPage: FunctionComponent<{}> = () => (
  <Container>
    <Title title="WORKS" />
    <CenteredText text="WIP" />
  </Container>
);
export default WorksPage;

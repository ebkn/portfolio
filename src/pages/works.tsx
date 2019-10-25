import { h, FunctionComponent } from 'preact';
import Container from '../atoms/container';
import Title from '../atoms/title';
import CenteredText from '../molecules/centeredText';

/** @jsx h */
const WorksPage: FunctionComponent<{}> = () => (
  <Container>
    <Title title="WORKS" />
    <CenteredText text="WIP" />
  </Container>
);
export default WorksPage;

import { h, FunctionComponent } from 'preact';
import Container from '../components/atoms/container';
import Title from '../components/atoms/title';
import CenteredText from '../components/molecules/centeredText';

/** @jsx h */
const SkillsPage: FunctionComponent<{}> = () => (
  <Container>
    <Title title="SKILLS" />
    <CenteredText text="WIP" />
  </Container>
);
export default SkillsPage;

import { h, FunctionComponent } from 'preact';
import Container from '../atoms/container';
import Title from '../atoms/title';
import CenteredText from '../molecules/centeredText';

/** @jsx h */
const SkillsPage: FunctionComponent<{}> = () => (
  <Container>
    <Title title="SKILLS" />
    <CenteredText text="WIP" />
  </Container>
);
export default SkillsPage;

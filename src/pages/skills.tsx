import * as preact from 'preact';
import Container from '../atoms/container';
import Title from '../atoms/title';
import CenteredText from '../molecules/centeredText';

/** @jsx preact.h */
const SkillsPage: preact.FunctionComponent<{}> = () => (
  <Container>
    <Title title="SKILLS" />
    <CenteredText text="WIP" />
  </Container>
);
export default SkillsPage;

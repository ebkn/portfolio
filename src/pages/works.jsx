import { h } from 'preact';
import Container from '../atoms/container';
import Title from '../atoms/title';
import CenteredText from '../molecules/centeredText';

/** @jsx h */
const Works = () => (
  <Container>
    <Title title="WORKS" />
    <CenteredText text="WIP" />
  </Container>
);

export default Works;

import { h } from 'preact';
import Container from '../atoms/container';
import Title from '../atoms/title';
import CenteredText from '../molecules/centeredText';

/** @jsx h */
export default () => (
  <Container>
    <Title title="WORKS" />
    <CenteredText text="WIP" />
  </Container>
);

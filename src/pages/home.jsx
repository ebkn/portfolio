import { h } from 'preact';
import Container from '../atoms/container';
import ProfileIcon from '../atoms/profileIcon';
import Title from '../atoms/title';
import SocialIcons from '../molecules/socialIcons';
import Badges from '../molecules/badges';
import CenteredText from '../molecules/centeredText';
import info from '../info';

/** @jsx h */
export default () => (
  <Container>
    <ProfileIcon />
    <Title title={info.name} />
    <SocialIcons />
    <Badges />
    <CenteredText text={info.shortProfile} />
  </Container>
);

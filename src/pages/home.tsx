import * as preact from 'preact';
import Container from '../atoms/container';
import ProfileIcon from '../atoms/profileIcon';
import Title from '../atoms/title';
import SocialIcons from '../molecules/socialIcons';
import Badges from '../molecules/badges';
import CenteredText from '../molecules/centeredText';
import info from '../info';

/** @jsx preact.h */
const HomePage: preact.FunctionComponent<{}> = () => (
  <Container>
    <ProfileIcon />
    <Title title={info.name} />
    <SocialIcons />
    <Badges />
    <CenteredText text={info.shortProfile} />
  </Container>
);
export default HomePage;

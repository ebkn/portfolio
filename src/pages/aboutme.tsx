import * as React from 'react';
import Head from '../head';
import Container from '../components/atoms/container';
import ProfileIcon from '../components/atoms/profileIcon';
import SectionTitle from '../components/atoms/sectionTitle';
import SocialIcons from '../components/molecules/socialIcons';
import Badges from '../components/molecules/badges';
import CenteredText from '../components/molecules/centeredText';
import info from '../info';

const AboutMePage: React.FC<{}> = () => (
  <React.Fragment>
    <Head lang="ja" siteTitle="ABOUT ME" />
    <Container>
      <ProfileIcon fileName={info.icon} />
      <SectionTitle content={info.name} alignCenter />
      <SocialIcons links={info.links} />
      <Badges />
      <CenteredText text={info.shortProfile} />
    </Container>
  </React.Fragment>
);
export default AboutMePage;

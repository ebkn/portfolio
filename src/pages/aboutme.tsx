import * as React from 'react';
import Head from '../head';
import Container from '../components/atoms/container';
import ProfileIcon from '../components/atoms/profileIcon';
import SectionTitle from '../components/atoms/sectionTitle';
import SocialIcons from '../components/molecules/socialIcons';
import Text from '../components/atoms/text';
import info from '../info';

const AboutMePage: React.FC<{}> = () => (
  <React.Fragment>
    <Head lang="ja" siteTitle="ABOUT ME" />
    <Container>
      <ProfileIcon fileName={info.icon} />
      <SectionTitle content={info.name} alignCenter />
      <SocialIcons links={info.links} />
      <Text text={info.shortProfile} alignCenter />
    </Container>
  </React.Fragment>
);
export default AboutMePage;

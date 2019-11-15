import * as React from 'react';
import Layout from '../layout';
import Head from '../head';
import Container from '../components/atoms/container';
import ProfileIcon from '../components/atoms/profileIcon';
import SectionTitle from '../components/atoms/sectionTitle';
import SocialIcons from '../components/molecules/socialIcons';
import Badges from '../components/molecules/badges';
import CenteredText from '../components/molecules/centeredText';
import info from '../info';

const AboutMePage: React.FC<{}> = () => (
  <Layout>
    <Head lang="ja" />
    <Container>
      <ProfileIcon fileName={info.icon} />
      <SectionTitle title={info.name} alignCenter={true} />
      <SocialIcons links={info.links} />
      <Badges />
      <CenteredText text={info.shortProfile} />
    </Container>
  </Layout>
);
export default AboutMePage;

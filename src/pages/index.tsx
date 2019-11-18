import * as React from 'react';
import Head from '../head';
import Container from '../components/atoms/container';
import ProfileIcon from '../components/atoms/profileIcon';
import SocialIcons from '../components/molecules/socialIcons';
import SectionTitle from '../components/atoms/sectionTitle';
import Text from '../components/atoms/text';
import info from '../info';

const IndexPage: React.FC<{}> = () => (
  <React.Fragment>
    <Head lang="ja" />
    <Container>
      <ProfileIcon fileName={info.icon} />
      <SectionTitle content={info.name} alignCenter />
      <Text text={info.shortProfile} alignCenter />
      <SocialIcons links={info.links} />
    </Container>
  </React.Fragment>
);
export default IndexPage;

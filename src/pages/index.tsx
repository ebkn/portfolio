import { h, FunctionComponent } from 'preact';
import Layout from '../layout';
import Container from '../components/atoms/container';
import ProfileIcon from '../components/atoms/profileIcon';
import Title from '../components/atoms/title';
import SocialIcons from '../components/molecules/socialIcons';
import Badges from '../components/molecules/badges';
import CenteredText from '../components/molecules/centeredText';
import info from '../info';

/** @jsx h */
const IndexPage: FunctionComponent<{}> = () => (
  <Layout>
    <Container>
      <ProfileIcon />
      <Title title={info.name} />
      <SocialIcons />
      <Badges />
      <CenteredText text={info.shortProfile} />
    </Container>
  </Layout>
);
export default IndexPage;

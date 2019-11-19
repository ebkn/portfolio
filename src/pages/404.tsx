import * as React from 'react';
import styled from 'styled-components';
import Head from '../head';
import Title from '../components/atoms/title';

const NotFoundPage: React.FC<{}> = () => (
  <>
    <Head lang="ja" siteTitle="NOT FOUND" />
    <TextWrapper>
      <Title title="404 NOT FOUND" />
    </TextWrapper>
  </>
);
export default NotFoundPage;

const TextWrapper: any = styled.div`
  padding: 100px 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

import { FC } from 'react';
import styled from 'styled-components';
import Layout from '../layout';
import Title from '../components/atoms/title';

const NotFoundPage: FC<{}> = () => (
  <Layout>
    <StyledWrapper>
      <Title title="404 NOT FOUND" />
    </StyledWrapper>
  </Layout>
);
export default NotFoundPage;

const StyledWrapper: any = styled.div`
  padding: 100px 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

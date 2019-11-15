import * as React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import Layout from '../layout';
import Head from '../head';
import Container from '../components/atoms/container';
import SectionTitle from '../components/atoms/sectionTitle';
import SmallText from '../components/atoms/smallText';
import BlogContent from '../components/molecules/blogContent';
import { BlogPostBySlugQuery } from '../../types/graphql-types'; // eslint-disable-line import/no-unresolved

interface Props {
  data: BlogPostBySlugQuery;
}

const BlogPostTemplate: React.FC<Props> = ({ data }) => {
  const post = data.markdownRemark;

  return (
    <Layout>
      <Head lang="ja" title={post.frontmatter.title} />
      <Container>
        <Header>
          <SectionTitle title={post.frontmatter.title} />
          <SmallText text={post.frontmatter.date} />
        </Header>
        <section>
          <BlogContent html={post.html} />
        </section>
      </Container>
    </Layout>
  );
};
export default BlogPostTemplate;

const Header = styled.header`
  padding: 10px 0;
`;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`;

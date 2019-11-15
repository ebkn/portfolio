import * as React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import Layout from '../layout';
import Head from '../head';
import Container from '../components/atoms/container';
import BlogTitle from '../components/atoms/blogTitle';
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
        <StyledHeader>
          <BlogTitle title={post.frontmatter.title} />
          <StyledDate>
            {post.frontmatter.date}
          </StyledDate>
        </StyledHeader>
        <section
          dangerouslySetInnerHTML={{ __html: post.html }} // eslint-disable-line react/no-danger
        />
      </Container>
    </Layout>
  );
};
export default BlogPostTemplate;

const StyledHeader = styled.header`
  padding: 10px 0;
`;
const StyledDate = styled.small`
  margin: 0;
  font-size: 13px;
  color: #424242;
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

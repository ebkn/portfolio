import * as React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import { Head } from '../head';
import { Container } from '../components/atoms/container';
import { SectionTitle } from '../components/atoms/sectionTitle';
import { SmallText } from '../components/atoms/smallText';
import { BlogContent } from '../components/molecules/blogContent';
import { formatDate } from '../util';
import { BlogPostBySlugQuery } from '../../types/graphql-types.d'; // eslint-disable-line import/no-unresolved

interface Props {
  data: BlogPostBySlugQuery;
}

const BlogPostTemplate: React.FC<Props> = ({ data }) => {
  const post = data.markdownRemark;
  if (!post) {
    return <Head lang="ja" />;
  }

  return (
    <>
      <Head
        lang="ja"
        siteTitle={post.frontmatter?.title || ''}
        description={post.frontmatter?.description || ''}
      />
      <Container>
        <Header>
          <SectionTitle content={post.frontmatter?.title || ''} />
          <SmallText text={formatDate(post.frontmatter?.date)} />
        </Header>
        <section>
          <BlogContent html={post.html || ''} />
        </section>
      </Container>
    </>
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
        date
        description
      }
    }
  }
`;

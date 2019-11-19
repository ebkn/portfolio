import * as React from 'react';
import { graphql, Link } from 'gatsby';
import styled from 'styled-components';
import Head from '../head';
import Container from '../components/atoms/container';
import SectionTitle from '../components/atoms/sectionTitle';
import SmallText from '../components/atoms/smallText';
import BlogContent from '../components/molecules/blogContent';
import { formatDate } from '../util';
import { PageQuery } from '../../types/graphql-types'; // eslint-disable-line import/no-unresolved

interface Props {
  data: PageQuery;
}

const BlogIndex: React.FC<Props> = ({ data }) => {
  const posts = data.allMarkdownRemark.edges;

  return (
    <>
      <Head lang="ja" siteTitle="BLOG" />
      <Container>
        {posts.map(({ node }, i) => {
          const title = node.frontmatter?.title || node.fields?.slug || '';
          return (
            <Article key={node.fields?.slug || i}>
              <header>
                <StyledLink to={node.fields?.slug || ''}>
                  <SectionTitle content={title} />
                </StyledLink>
                <SmallText text={formatDate(node.frontmatter?.date)} />
              </header>
              <section>
                <BlogContent
                  html={node.frontmatter?.description || node.excerpt || ''}
                />
              </section>
            </Article>
          );
        })}
      </Container>
    </>
  );
};
export default BlogIndex;

const Article = styled.article`
  width: 100%;
  box-sizing: border-box;
  padding: 10px 0;
`;
const StyledLink = styled(Link)`
  text-decoration: none;
`;

export const pageQuery = graphql`
  query Page {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date
            title
            description
          }
        }
      }
    }
  }
`;

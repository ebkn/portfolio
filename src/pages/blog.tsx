import * as React from 'react';
import { graphql, Link } from 'gatsby';
import styled from 'styled-components';
import Layout from '../layout';
import Head from '../head';
import Container from '../components/atoms/container';
import SectionTitle from '../components/atoms/sectionTitle';
import SmallText from '../components/atoms/smallText';
import { PageQuery } from '../../types/graphql-types'; // eslint-disable-line import/no-unresolved

interface Props {
  data: PageQuery;
}

const BlogIndex: React.FC<Props> = ({ data }) => {
  const posts = data.allMarkdownRemark.edges

  return (
    <Layout>
      <Head lang="ja" title="All posts" />
      <Container>
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          return (
            <Article key={node.fields.slug}>
              <header>
                <StyledLink to={node.fields.slug}>
                  <SectionTitle title={title} />
                </StyledLink>
                <SmallText text={node.frontmatter.date} />
              </header>
              <section>
                <p
                  dangerouslySetInnerHTML={{
                    __html: node.frontmatter.description || node.excerpt,
                  }}
                />
              </section>
            </Article>
          )
        })}
      </Container>
    </Layout>
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
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
  }
`;

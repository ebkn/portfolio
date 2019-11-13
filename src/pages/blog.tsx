import * as React from 'react';
import { graphql, Link } from 'gatsby';
import styled from 'styled-components';
import Layout from '../layout';
import Head from '../head';
import Container from '../components/atoms/container';
import Title from '../components/atoms/title';
import BlogSubTitle from '../components/atoms/blogSubTitle';
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
        <Title title="BLOG" />
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          return (
            <StyledArticle key={node.fields.slug}>
              <StyledHeader>
                <StyledLink to={node.fields.slug}>
                  <BlogSubTitle title={title} />
                </StyledLink>
                <StyledDate>{node.frontmatter.date}</StyledDate>
              </StyledHeader>
              <section>
                <p
                  dangerouslySetInnerHTML={{
                    __html: node.frontmatter.description || node.excerpt,
                  }}
                />
              </section>
            </StyledArticle>
          )
        })}
      </Container>
    </Layout>
  );
};
export default BlogIndex;

const StyledArticle = styled.article`
  padding: 10px 0;
`
const StyledHeader = styled.header`
  padding: 3px 0;
`;
const StyledDate = styled.small`
  margin: 0;
  font-size: 11px;
  color: #424242;
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

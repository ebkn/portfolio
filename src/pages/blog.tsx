import * as React from 'react';
import { graphql, Link } from 'gatsby';
import Layout from '../layout';
import Head from '../head';
import Container from '../components/atoms/container';
import Title from '../components/atoms/title';
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
            <article key={node.fields.slug}>
              <header>
                <h3>
                  <Link to={node.fields.slug}>
                    {title}
                  </Link>
                </h3>
                <small>{node.frontmatter.date}</small>
              </header>
              <section>
                <p
                  dangerouslySetInnerHTML={{
                    __html: node.frontmatter.description || node.excerpt,
                  }}
                />
              </section>
            </article>
          )
        })}
      </Container>
    </Layout>
  );
};
export default BlogIndex;

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

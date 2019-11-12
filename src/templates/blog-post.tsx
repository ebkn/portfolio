import * as React from 'react';
import { graphql, Link } from 'gatsby';

interface Props {
  data: any;
}

const BlogPostTemplate: React.FC<Props> = ({ data }) => {
  const post = data.markdownRemark;

  return (
    <div>
      <main>
        <article>
          <header>
            <h1>
              {post.frontmatter.title}
            </h1>
            <p>
              {post.frontmatter.date}
            </p>
          </header>
          <section dangerouslySetInnerHTML={{ __html: post.html }} />
        </article>
      </main>
    </div>
  );
};
export default BlogPostTemplate;

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

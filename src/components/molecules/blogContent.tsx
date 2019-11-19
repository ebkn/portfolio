import * as React from 'react';
import styled from 'styled-components';

interface Props {
  html: string;
}

const BlogContent: React.FC<Props> = ({ html }) => (
  <Content dangerouslySetInnerHTML={{ __html: html }} /> // eslint-disable-line react/no-danger
);
export default BlogContent;

const Content = styled.div`
  padding: 20px 0;

  h1,h2,h3,h4,h5,h6 {
      margin: 0;
      padding: 30px 0 10px 0;
      line-height: 30px;
      word-break: break-word;
      color: var(--title-color);
  }
  h1 { font-size: var(--blog-h1-size); }
  h2 { font-size: var(--blog-h2-size); }
  h3 { font-size: var(--blog-h3-size); }
  h4 { font-size: var(--blog-h4-size); }
  h5 { font-size: var(--blog-h5-size); }
  h6 { font-size: var(--blog-h6-size); }

  p {
    margin: 10px 0;
    font-size: var(--normal-size);
    line-height: 30px;
    word-break: break-word;
    color: var(--text-color);
  }

  a {
    text-decoration: none;
    border-bottom: 1px solid var(--sub-text-color);
    color: var(--text-color);
  }
  a.anchor {
    border: none;
  }

  ul,ol {
    li {
      padding: 5px 0;
      color: var(--text-color);

      p {
        margin: 0;
        padding: 5px 0;
      }
    }
  }

  strong {
    color: var(--title-color);
  }

  blockquote {
    width: 100%;
    box-sizing: border-box;
    margin: 0;
    padding: 0 10px;

    p {
      margin: 10px;
      font-size: var(--normal-size);
      line-height: 28px;
      word-break: break-word;
      color: var(--sub-text-color);
    }
  }

  img {
    width: 100%;
  }

  table {
    color: var(--text-color);
  }

  .gatsby-highlight {
    width: 100%;
    padding: 10px 0;
    overflow: scroll;

    pre {
      font-family: 'Source Code Pro', monospace;

      code {
        font-family: 'Source Code Pro', monospace;
      }
    }
  }
`;

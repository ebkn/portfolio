import * as React from 'react';
import styled from 'styled-components';

interface Props {
  html: string;
}

export const BlogContent: React.FC<Props> = ({ html }) => (
  <Content dangerouslySetInnerHTML={{ __html: html }} /> // eslint-disable-line react/no-danger
);

const Content = styled.div`
  padding: 8px 0;
  color: var(--text-color);

  h1,h2,h3,h4,h5,h6 {
    margin: 0;
    padding-bottom: 16px;
    line-height: 32px 0 0 0;
    word-break: break-word;
    color: var(--title-color);
  }
  h1 {
    font-size: var(--blog-h1-size);
    padding: 40px 0 0 0;
  }
  h2 {
    font-size: var(--blog-h2-size);
    padding: 40px 0 0 0;
  }
  h3 {
    font-size: var(--blog-h3-size);
    padding: 40px 0 0 0;
  }
  h4 {
    font-size: var(--blog-h4-size);
    padding: 40px 0 0 0;
  }
  h5 {
    font-size: var(--blog-h5-size);
    padding: 32px 0 0 0;
  }

  p, details {
    margin: 0;
    padding: 24px 0 0 0;
    font-size: var(--normal-size);
    line-height: 32px;
    word-break: break-word;
    color: var(--text-color);
  }

  a {
    text-decoration: none;
    border-bottom: 1px solid var(--sub-text-color);
    color: var(--text-color);
    font-size: var(--text-size);
    line-height: 32px;
  }
  a.anchor {
    border: none;
  }

  ul,ol {
    margin: 0;
    padding: 8px 0 0 24px;

    li {
      padding: 0;
      font-size: var(--text-size);
      line-height: 32px;
      color: var(--text-color);

      p {
        padding: 0;
      }
    }
  }

  li > ul {
    padding: 0 0 0 24px;
  }
  li > ol {
    padding: 0 0 0 24px;
  }

  strong {
    color: var(--title-color);
  }

  blockquote {
    width: 100%;
    box-sizing: border-box;
    margin: 0;
    padding: 0 8px;

    p {
      padding: 8px;
      line-height: 32px;
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

  hr {
    margin: 24px 0;
    color: var(--sub-text-color);
  }

  .gatsby-highlight {
    width: 100%;
    padding: 0;
    overflow: scroll;

    pre {
      font-family: 'Source Code Pro', monospace;

      code {
        font-family: 'Source Code Pro', monospace;
      }
    }
  }
`;

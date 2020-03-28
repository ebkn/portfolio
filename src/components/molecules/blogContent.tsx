import * as React from 'react';
import styled from 'styled-components';

interface Props {
  html: string;
}

export const BlogContent: React.FC<Props> = ({ html }) => (
  <Content dangerouslySetInnerHTML={{ __html: html }} /> // eslint-disable-line react/no-danger
);

const Content = styled.div`
  padding: 20px 0;
  color: var(--text-color);

  h1,h2,h3,h4,h5,h6 {
    margin: 0;
    padding-bottom: 12.5px;
    line-height: 30px;
    word-break: break-word;
    color: var(--title-color);
  }
  h1 {
    font-size: var(--blog-h1-size);
    padding-top: 37.5px;
  }
  h2 {
    font-size: var(--blog-h2-size);
    padding-top: 35px;
  }
  h3 {
    font-size: var(--blog-h3-size);
    padding-top: 32.5px;
  }
  h4 {
    font-size: var(--blog-h4-size);
    padding-top: 30px;
  }
  h5 {
    font-size: var(--blog-h5-size);
    padding-top: 27.5px;

  }
  h6 {
    font-size: var(--blog-h6-size);
    padding-top: 25px;
  }

  p {
    margin: 0;
    padding: 12.5px 0;
    font-size: var(--normal-size);
    line-height: 30px;
    word-break: break-word;
    color: var(--text-color);
  }

  a {
    text-decoration: none;
    border-bottom: 1px solid var(--sub-text-color);
    color: var(--text-color);
    font-size: var(--text-size);
    line-height: 30px;
  }
  a.anchor {
    border: none;
  }

  ul,ol {
    margin: 0;
    padding: 10px 0 10px 20px;

    li {
      padding: 10px 0;
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

  hr {
    margin: 30px 0;
    color: var(--sub-text-color);
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

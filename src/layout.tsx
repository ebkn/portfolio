import * as React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Header from './components/molecules/header';
import Copyright from './components/molecules/copyright';
import 'normalize.css';

interface Props {
  children: any;
}

const Layout: React.FC<Props> = ({ children }) => (
  <Wrapper>
    <GlobalStyle />
    <Container>
      <Header title="ebiken" />
      <Main>
        {children}
        <Copyright />
      </Main>
    </Container>
  </Wrapper>
);
export default Layout;

const Wrapper = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
`;
const Container = styled.div`
  width: 100%;
  max-width: 680px;
`;
const Main = styled.main`
  width: 100%;
  box-sizing: border-box;
  padding: 20px;
`;

const GlobalStyle = createGlobalStyle`
body {
  background-color: var(--bg-color);

  /* main font size */
  --title-size: 24px;
  --page-title-size: 26px;
  --section-title-size: 26px;
  --normal-size: 16px;
  --small-size: 12px;
  /* blog font size */
  --blog-h1-size: 24px;
  --blog-h2-size: 22px;
  --blog-h3-size: 20px;
  --blog-h4-size: 18px;
  --blog-h5-size: 16px;
  --blog-h6-size: 14px;
}

body.light {
  --bg-color: #FAFAFA;
  --logo-color: #616161;
  --title-color: #424242;
  --text-color: #616161;
  --sub-text-color: #757575;
}

body.dark {
  --bg-color: #212121;
  --logo-color: #BDBDBD;
  --title-color: #F5F5F5;
  --text-color: #BDBDBD;
  --sub-text-color: #9E9E9E;
}

/* syntax highlight */
body.light {
  /*
   Solarized Color Schemes originally by Ethan Schoonover
   http://ethanschoonover.com/solarized

   Ported for PrismJS by Hector Matos
   Website: https://krakendev.io
   Twitter Handle: https://twitter.com/allonsykraken)
  */

  /*
  SOLARIZED HEX
  --------- -------
  base03    #002b36
  base02    #073642
  base01    #586e75
  base00    #657b83
  base0     #839496
  base1     #93a1a1
  base2     #eee8d5
  base3     #fdf6e3
  yellow    #b58900
  orange    #cb4b16
  red       #dc322f
  magenta   #d33682
  violet    #6c71c4
  blue      #268bd2
  cyan      #2aa198
  green     #859900
  */

  code[class*="language-"],
  pre[class*="language-"] {
    color: #657b83; /* base00 */
    /* font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace; */
    font-size: 1em;
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;

    line-height: 1.5;

    -moz-tab-size: 4;
    -o-tab-size: 4;
    tab-size: 4;

    -webkit-hyphens: none;
    -moz-hyphens: none;
    -ms-hyphens: none;
    hyphens: none;
  }

  pre[class*="language-"]::-moz-selection, pre[class*="language-"] ::-moz-selection,
  code[class*="language-"]::-moz-selection, code[class*="language-"] ::-moz-selection {
    background: #073642; /* base02 */
  }

  pre[class*="language-"]::selection, pre[class*="language-"] ::selection,
  code[class*="language-"]::selection, code[class*="language-"] ::selection {
    background: #073642; /* base02 */
  }

  /* Code blocks */
  pre[class*="language-"] {
    padding: 1em;
    margin: .5em 0;
    overflow: auto;
    border-radius: 0.3em;
  }

  :not(pre) > code[class*="language-"],
  pre[class*="language-"] {
    background-color: #fdf6e3; /* base3 */
  }

  /* Inline code */
  :not(pre) > code[class*="language-"] {
    padding: .1em;
    border-radius: .3em;
  }

  .token.comment,
  .token.prolog,
  .token.doctype,
  .token.cdata {
    color: #93a1a1; /* base1 */
  }

  .token.punctuation {
    color: #586e75; /* base01 */
  }

  .namespace {
    opacity: .7;
  }

  .token.property,
  .token.tag,
  .token.boolean,
  .token.number,
  .token.constant,
  .token.symbol,
  .token.deleted {
    color: #268bd2; /* blue */
  }

  .token.selector,
  .token.attr-name,
  .token.string,
  .token.char,
  .token.builtin,
  .token.url,
  .token.inserted {
    color: #2aa198; /* cyan */
  }

  .token.entity {
    color: #657b83; /* base00 */
    background: #eee8d5; /* base2 */
  }

  .token.atrule,
  .token.attr-value,
  .token.keyword {
    color: #859900; /* green */
  }

  .token.function,
  .token.class-name {
    color: #b58900; /* yellow */
  }

  .token.regex,
  .token.important,
  .token.variable {
    color: #cb4b16; /* orange */
  }

  .token.important,
  .token.bold {
    font-weight: bold;
  }
  .token.italic {
    font-style: italic;
  }

  .token.entity {
    cursor: help;
  }
}

body.dark {
  /**
   * prism.js default theme for JavaScript, CSS and HTML
   * Based on dabblet (http://dabblet.com)
   * @author Lea Verou
   */
  code[class*="language-"],
  pre[class*="language-"] {
    color: #ABB2BF;
    background: none;
    /* font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace; */
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;
    line-height: 1.5;
    -moz-tab-size: 4;
    -o-tab-size: 4;
    tab-size: 4;
    -webkit-hyphens: none;
    -moz-hyphens: none;
    -ms-hyphens: none;
    hyphens: none;
  }

  pre[class*="language-"]::-moz-selection, pre[class*="language-"] ::-moz-selection,
  code[class*="language-"]::-moz-selection, code[class*="language-"] ::-moz-selection {
    text-shadow: none;
    background: #383e49;
  }

  pre[class*="language-"]::selection, pre[class*="language-"] ::selection,
  code[class*="language-"]::selection, code[class*="language-"] ::selection {
    text-shadow: none;
    background: #9aa2b1;
  }

  @media print {
    code[class*="language-"],
    pre[class*="language-"] {
      text-shadow: none;
    }
  }
  /* Code blocks */
  pre[class*="language-"] {
    padding: 1em;
    margin: .5em 0;
    overflow: auto;
  }

  :not(pre) > code[class*="language-"],
  pre[class*="language-"] {
    background: #282c34;
  }

  /* Inline code */
  :not(pre) > code[class*="language-"] {
    padding: .1em;
    border-radius: .3em;
    white-space: normal;
  }

  .token.comment,
  .token.prolog,
  .token.doctype,
  .token.cdata {
    color: #5C6370;
  }

  .token.punctuation {
    color: #abb2bf;
  }

  .token.selector,
  .token.tag {
    color: #e06c75;
  }

  .token.property,
  .token.boolean,
  .token.number,
  .token.constant,
  .token.symbol,
  .token.attr-name,
  .token.deleted {
    color: #d19a66;
  }

  .token.string,
  .token.char,
  .token.attr-value,
  .token.builtin,
  .token.inserted {
    color: #98c379;
  }

  .token.operator,
  .token.entity,
  .token.url,
  .language-css .token.string,
  .style .token.string {
    color: #56b6c2;
  }

  .token.atrule,
  .token.keyword {
    color: #c678dd;
  }

  .token.function {
    color: #61afef;
  }

  .token.regex,
  .token.important,
  .token.variable {
    color: #c678dd;
  }

  .token.important,
  .token.bold {
    font-weight: bold;
  }

  .token.italic {
    font-style: italic;
  }

  .token.entity {
    cursor: help;
  }

  pre.line-numbers {
    position: relative;
    padding-left: 3.8em;
    counter-reset: linenumber;
  }

  pre.line-numbers > code {
    position: relative;
  }

  .line-numbers .line-numbers-rows {
    position: absolute;
    pointer-events: none;
    top: 0;
    font-size: 100%;
    left: -3.8em;
    width: 3em; /* works for line-numbers below 1000 lines */
    letter-spacing: -1px;
    border-right: 0;

    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

  }

  .line-numbers-rows > span {
    pointer-events: none;
    display: block;
    counter-increment: linenumber;
  }

  .line-numbers-rows > span:before {
    content: counter(linenumber);
    color: #5C6370;
    display: block;
    padding-right: 0.8em;
    text-align: right;
  }
} 
`;

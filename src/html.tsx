/* eslint-disable react/destructuring-assignment */

import * as React from 'react';

interface Props {
  htmlAttributes: object;
  headComponents: any;
  bodyAttributes: object;
  preBodyComponents: any[];
  body: string;
  postBodyComponents: any[];
}

const HTML = (props: Props) => (
  <html
    lang="ja"
    {...props.htmlAttributes} // eslint-disable-line react/jsx-props-no-spreading
  >
    <head>
      <meta charSet="utf-8" />
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      {props.headComponents}
    </head>
    <body
      {...props.bodyAttributes} // eslint-disable-line react/jsx-props-no-spreading
      className="light"
    >
      {props.preBodyComponents}
      <noscript key="noscript" id="gatsby-noscript">
        This app works best with JavaScript enabled.
      </noscript>
      <div
        key="body"
        id="___gatsby"
        dangerouslySetInnerHTML={{ __html: props.body }} // eslint-disable-line react/no-danger
      />
      {props.postBodyComponents}
    </body>
  </html>
);
export default HTML;

/* eslint-enable react/destructuring-assignment */

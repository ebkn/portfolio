import * as React from 'react';
import Helmet from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

interface Props {
  lang: 'en' | 'ja';
  meta: object;
  title: string;
  description: string;
}

const Head: React.FC<Props> = ({ lang, meta, title, description }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  );
  const metaDescription = description || site.siteMetadata.description;

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={[
        { name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no' },
        { name: 'description', content: metaDescription },
        { name: 'author', content: 'Kenichi Ebinuma' },
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:site', content: '@ebikentennis' },
        { property: 'og:url', content: 'https://portfolio.ebiken.dev' },
        { property: 'og:title', content: title },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: title },
        { property: 'og:description', content: metaDescription },
      ].concat(meta)}
    />
  );
};
export default Head;

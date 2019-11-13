import * as React from 'react';
import Helmet from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

interface Props {
  lang: 'en' | 'ja';
  meta?: object;
  title?: string;
  description?: string;
}

const Head: React.FC<Props> = ({ lang, meta, title, description }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            author
            description
            siteUrl
            social {
              twitter
            }
          }
        }
      }
    `
  );
  const metaTitle = title || site.siteMetaData.title;
  const metaDescription = description || site.siteMetadata.description;
  const { author, siteUrl, social } = site.siteMetaData;

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={metaTitle}
      titleTemplate={`%s | ${metaTitle}`}
      meta={[
        { name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no' },
        { name: 'description', content: metaDescription },
        { name: 'author', content: author },
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:site', content: social.twitter },
        { property: 'og:url', content: siteUrl },
        { property: 'og:title', content: metaTitle },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: metaTitle },
        { property: 'og:description', content: metaDescription },
      ].concat(meta)}
    />
  );
};
export default Head;

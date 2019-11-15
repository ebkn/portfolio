import * as React from 'react';
import Helmet from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';
import { SiteQuery } from '../types/graphql-types'; // eslint-disable-line import/no-unresolved

interface Props {
  lang: 'en' | 'ja';
  meta?: object;
  title?: string;
  description?: string;
}

const query = graphql`
  query Site {
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
`;

const Head: React.FC<Props> = ({ lang, meta = {}, title = '', description = '' }) => {
  const { site } = useStaticQuery<SiteQuery>(query);
  if (!site) return null;

  const metaTitle = title || site?.siteMetadata?.title || '';
  const metaDescription = description || site?.siteMetadata?.description || '';
  const { author, siteUrl, social } = site?.siteMetadata;

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={metaTitle}
      titleTemplate={`%s${!metaTitle ? ` | ${metaTitle}` : ''}`}
      meta={[
        { name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no' },
        { name: 'description', content: metaDescription || '' },
        { name: 'author', content: author || '' },
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:site', content: social?.twitter || '' },
        { property: 'og:url', content: siteUrl || '' },
        { property: 'og:title', content: metaTitle },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: metaTitle },
        { property: 'og:description', content: metaDescription },
      ].concat(meta)}
    />
  );
};
export default Head;

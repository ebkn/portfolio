import * as React from 'react';
import Helmet, { HelmetProps } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';
import { SiteQuery } from '../types/graphql-types.d'; // eslint-disable-line import/no-unresolved

interface Props {
  lang: 'en' | 'ja';
  meta?: object;
  siteTitle?: string;
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
        image
        social {
          twitter
        }
      }
    }
  }
`;

export const Head: React.FC<Props> = ({
  lang,
  meta = {},
  siteTitle = '',
  description = '',
}) => {
  const { site } = useStaticQuery<SiteQuery>(query);
  if (!site) return <Helmet />;

  const metaTitle = siteTitle || site?.siteMetadata?.title || '';
  const metaDescription = description || site?.siteMetadata?.description || '';

  const tags: HelmetProps['meta'] = [
    { name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no' },
    { name: 'Description', content: metaDescription || '' },
    { name: 'author', content: site?.siteMetadata?.author || '' },
    { name: 'twitter:card', content: 'summary' },
    { name: 'twitter:site', content: site?.siteMetadata?.social?.twitter || '' },
    { name: 'twitter:image', content: site?.siteMetadata?.image || '' },
    { property: 'og:url', content: site?.siteMetadata?.siteUrl || '' },
    { property: 'og:title', content: metaTitle },
    { property: 'og:image', content: site?.siteMetadata?.image || '' },
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: metaTitle },
    { property: 'og:description', content: metaDescription },
  ];
  const metaTags = !meta ? tags.concat(meta) : tags;

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={metaTitle}
      titleTemplate={`%s${!metaTitle ? ` | ${metaTitle}` : ''}`}
      meta={metaTags}
    />
  );
};

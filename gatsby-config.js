module.exports = {
  siteMetadata: {
    title: 'ebiken portfolio',
    author: 'ebiken',
    description: '',
    siteUrl: 'https://portfolio.ebiken.dev',
    social: {
      twitter: '@ebikentennis',
    },
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/blog`,
        name: 'blog',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/assets`,
        name: 'assets',
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 600,
            },
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
          'gatsby-remark-autolink-headers',
          'gatsby-remark-responsive-iframe',
        ],
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-plugin-typescript',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-graphql-codegen',
      options: {
        fileName: 'types/graphql-types.d.ts',
      },
    },
    {
      resolve: 'gatsby-plugin-prefetch-google-fonts',
      options: {
        fonts: [
          { family: 'Source Code Pro' },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-offline',
      options: {
        precachePages: ['/blog/*'],
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'ebiken portfolio',
        short_name: 'ebiken',
        start_url: '/',
        background_color: '#FAFAFA',
        theme_color: '#616161',
        display: 'standalone',
        icon: 'src/icon.jpg',
        icons: [
          {
            'src': 'icons/icon-72x72.jpg',
            'sizes': '72x72',
            'type': 'image/jpg'
          },
          {
            'src': 'icons/icon-96x96.jpg',
            'sizes': '96x96',
            'type': 'image/jpg'
          },
          {
            'src': 'icons/icon-128x128.jpg',
            'sizes': '128x128',
            'type': 'image/jpg'
          },
          {
            'src': 'icons/icon-144x144.jpg',
            'sizes': '144x144',
            'type': 'image/jpg'
          },
          {
            'src': 'icons/icon-152x152.jpg',
            'sizes': '152x152',
            'type': 'image/jpg'
          },
          {
            'src': 'icons/icon-192x192.jpg',
            'sizes': '192x192',
            'type': 'image/jpg'
          },
          {
            'src': 'icons/icon-384x384.jpg',
            'sizes': '384x384',
            'type': 'image/jpg'
          },
          {
            'src': 'icons/icon-512x512.jpg',
            'sizes': '512x512',
            'type': 'image/jpg'
          },
        ],
      },
    },
    'gatsby-plugin-styled-components',
  ],
};

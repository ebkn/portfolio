export const info: {
  name: string,
  icon: string,
  shortProfile: string,
  links: {
    type: string,
    url: string,
    name: string,
    icon: string | { light: string, dark: string },
  }[],
  jobs: {
    name: string,
    position: string,
    term: string,
    description: string,
  }[],
} = {
  name: 'Ebinuma Kenichi',
  icon: 'avatar.jpg',
  shortProfile: 'Software engineer / I love tennis, movies, and programming.',
  links: [
    {
      type: 'GitHub',
      url: 'https://github.com/ebkn',
      name: 'ebkn',
      icon: {
        light: 'github_logo-light.png',
        dark: 'github_logo-dark.png',
      },
    },
    {
      type: 'Twitter',
      url: 'https://twitter.com/ebkn12',
      name: '@ebkn12',
      icon: 'twitter_logo.png',
    },
    {
      type: 'Scrapbox',
      url: 'https://scrapbox.io/ebiken',
      name: 'ebiken',
      icon: 'scrapbox_logo.png',
    },
  ],
  jobs: [
    {
      name: 'DeNA Co, Ltd.',
      position: 'Software Engineer',
      term: '2020/4~',
      description: 'Game server, framework development and operation. Go, GCP(GKE, Spanner, ..)',
    },
    {
      name: 'DeNA Co, Ltd.',
      position: 'Engineer intern',
      term: '2019/8~2020/3',
      description: 'Application development(Flutter) for ',
    },
    {
      name: 'STELLA Inc.',
      position: 'Lead Engineer (Backend/Infrastructure)',
      term: '2018/8~2019/12',
      description: 'Backend application development for mobile(iOS natvie) social media service. Go, TypeScript, AWS(ECS,Fargate,SNS, etc.), GraphQL, MySQL, Redis',
    },
    {
      name: 'playground Co,. Ltd.',
      position: 'Software Engineer intern',
      term: '2017/7~2018/11',
      description: 'Web backend, frontend development for electronic ticket service. Rails, Angular, MySQL, Redis',
    },
    {
      name: 'div Inc.',
      position: 'TECH::CAMP mentor',
      term: '2017/4~2019/4',
      description: 'web application mentor (Rails, JavaScript)',
    },
  ],
};

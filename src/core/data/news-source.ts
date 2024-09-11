export type NewsSource = {
  id: string;
  name: string;
  description?: string;
  baseUrl: string;
  logoUrl?: string;
};

export const newsSources: NewsSource[] = [
  {
    id: 'medium',
    name: 'Medium',
    description:
      'Medium is an American online publishing platform developed by Evan Williams and launched in August 2012.',
    baseUrl: 'https://medium.com/',
    logoUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Medium_logo_Monogram.svg/1200px-Medium_logo_Monogram.svg.png',
  },
  {
    id: 'hacker-news',
    name: 'Hacker News',
    description:
      'Hacker News is a social news website focusing on computer science and entrepreneurship.',
    baseUrl: 'https://news.ycombinator.com/',
    logoUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Hacker_News.svg/1200px-Hacker_News.svg.png',
  },
  {
    id: 'substack',
    name: 'Substack',
    description:
      'Substack is an online platform that provides publishing, payment, analytics, and design infrastructure to support subscription newsletters.',
    baseUrl: 'https://substack.com/',
    logoUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Substack_logo.svg/1200px-Substack_logo.svg.png',
  },
  {
    id: 'dev-to',
    name: 'Dev.to',
    description:
      'DEV Community is a community of software developers getting together to help one another.',
    baseUrl: 'https://dev.to/',
    logoUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/DEV_Logo.svg/1200px-DEV_Logo.svg.png',
  },
  {
    id: 'techcrunch',
    name: 'TechCrunch',
    description:
      'TechCrunch is an American online publisher focusing on the tech industry.',
    baseUrl: 'https://techcrunch.com/',
    logoUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/TechCrunch_logo.svg/1200px-TechCrunch_logo.svg.png',
  },
  {
    id: 'the-verge',
    name: 'The Verge',
    description:
      'The Verge is an American technology news website operated by Vox Media.',
    baseUrl: 'https://www.theverge.com/',
    logoUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/The_Verge_2016_logo.svg/1200px-The_Verge_2016_logo.svg.png',
  },
  {
    id: 'reuters',
    name: 'Reuters',
    description:
      'Reuters is an international news organization owned by the Thomson Reuters Corporation.',
    baseUrl: 'https://www.reuters.com/',
    logoUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Reuters_2008.svg/1200px-Reuters_2008.svg',
  },
  {
    id: 'bbc',
    name: 'BBC',
    description:
      'BBC News is an operational business division of the British Broadcasting Corporation (BBC) responsible for the gathering and broadcasting of news and current affairs.',
    baseUrl: 'https://www.bbc.co.uk/news',
    logoUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/BBC_News_2019.svg/1200px-BBC_News_2019.svg.png',
  },
  {
    id: 'cnn',
    name: 'CNN',
    description:
      "Cable News Network (CNN) is an American news-based pay television channel owned by AT&T's WarnerMedia.",
    baseUrl: 'https://edition.cnn.com/',
    logoUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/CNN.svg/1200px-CNN.svg.png',
  },
  {
    id: 'al-jazeera',
    name: 'Al Jazeera',
    description:
      'Al Jazeera is a Qatari state-funded broadcaster in Doha, Qatar, owned by the Al Jazeera Media Network.',
    baseUrl: 'https://www.aljazeera.com/',
    logoUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Al_Jazeera_Logo.svg/1200px-Al_Jazeera_Logo.svg.png',
  },
  {
    id: 'the-guardian',
    name: 'The Guardian',
    description:
      'The Guardian is a British news and media website owned by the Guardian Media Group.',
    baseUrl: 'https://www.theguardian.com/international',
    logoUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/The_Guardian.svg/1200px-The_Guardian.svg.png',
  },
  {
    id: 'the-new-york-times',
    name: 'The New York Times',
    description:
      'The New York Times is an American newspaper based in New York City with worldwide influence and readership.',
    baseUrl: 'https://www.nytimes.com/',
    logoUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/The_New_York_Times_logo.png/800px-The_New_York_Times_logo.png',
  },
  {
    id: 'the-washington-post',
    name: 'The Washington Post',
    description:
      'The Washington Post is an American daily newspaper published in Washington, D.C. It is the most widely circulated newspaper within the Washington metropolitan area.',
    baseUrl: 'https://www.washingtonpost.com/',
    logoUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/The_Washington_Post_%282013%29.svg/1200px-The_Washington_Post_%282013%29.svg.png',
  },
];

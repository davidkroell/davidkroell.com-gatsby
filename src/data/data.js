module.exports = {
  SiteTitle: 'David Kröll',
  Sitelogo: '#',
  SiteAuthor: 'David Kröll',
  SiteDescription: 'Software Engineer',
  githubApiQuery: `query ($numOfRepos: Int!) {
    viewer {
      name
      avatarUrl
      isHireable
      resourcePath
      repositories(last: $numOfRepos, privacy: PUBLIC, orderBy: { field: STARGAZERS, direction:ASC } ) {
        nodes {
          name
          description
          homepageUrl
          forkCount
          createdAt
          updatedAt
          resourcePath
          languages(last: 1, orderBy: { field: SIZE, direction:ASC } ) {
            edges {
              node {
                name
                color
              }
            }
          }
          licenseInfo {
            name
          }
          stargazers {
            totalCount
          }
        }
      }
    }
  }`,
  githubApiVariables: {
    numOfRepos: 12,
  },
  BlogEditRoot: 'https://github.com/davidkroell/gatsby-portfolio/tree/master/content/blogposts',

  SiteContact: {
    email: 'david.kroell@outlook.com',
  },

  QuoteLines: [
    {
      Quote: "Without the possibility of death, adventure is not possible.",
      Author: "Reinhold Messner"
    },
    {
      Quote: "In some ways, programming is like painting.",
      Author: "Andrew Hunt",
      Source: "The Pragmatic Programmer"
    }
  ],

  SocialMediaLinks: [
    {
      "name": "github",
      "url": "https://github.com/davidkroell"
    },
    {
      "name": "linkedin",
      "url": "https://www.linkedin.com/in/david-kr%C3%B6ll-b29865171/"
    },
    {
      "name": "dev",
      "url": "https://dev.to/davidkroell"
    },
    {
      "name": "instagram",
      "url": "https://www.instagram.com/david1kroell"
    }
  ],

  SiteCopyright: new Date().getFullYear(),
};

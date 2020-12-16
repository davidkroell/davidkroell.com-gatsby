module.exports = {
  SiteTitle: 'David Kröll',
  Sitelogo: '#',
  SiteLogoText: 'Abdelali',
  SiteAuthor: 'David Kröll',
  SiteDescription: 'Software Engineer',
  defaultDescription: 'Tech enthusiast', 
  githubApiQuery: `query ($number_of_repos: Int!) {
    viewer {
      name
      avatarUrl
      isHireable
      resourcePath
      repositories(last: $number_of_repos, privacy: PUBLIC, orderBy: { field: STARGAZERS, direction:ASC } ) {
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
    number_of_repos: 12,
  }, 
  SiteSocialLinks: {
    instagram: 'https://github.com/davidkroell',
    linkedin: 'https://www.linkedin.com/in/david-kr%C3%B6ll-b29865171/',
    dev: 'https://dev.to/davidkroell'
  },
  SiteAddress: {
    city: 'Casablanca',
    region: 'CurvaSud',
    country: 'Morocco',
    zipCode: 'ZipCode',
  },
  SiteContact: {
    email: 'abdali.dahir@gmail.com',
  },
  SiteCopyright: new Date().getFullYear(),
};

import React from "react"
import { graphql } from "gatsby"
import BlogOverview from "../templates/blogs/overview"

const BlogIndex = ({ data }) => {
  const posts = data.allMarkdownRemark.nodes

  return <BlogOverview title="Blog" posts={posts}></BlogOverview>
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/(blogposts)/" } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      nodes {
        excerpt
        fields {
          slug
        }
        timeToRead
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          image {
            childImageSharp {
              fluid(maxWidth: 600, quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          categories
          imageCredit
          description
        }
      }
    }
  }
`

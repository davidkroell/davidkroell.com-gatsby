import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import BlogOverview from "./overview"

const Categories = ({ data }) => {
  const posts  = data.allMarkdownRemark.nodes

  return (
    <BlogOverview posts={posts}></BlogOverview>
  )
}

export default Categories

export const pageQuery = graphql`
  query($category: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { categories: { in: [$category] } } }
    ) {
      totalCount
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          time
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

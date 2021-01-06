import React from "react"
import { graphql } from "gatsby"
import BookOverview from "./overview"

const Categories = ({ data, pageContext }) => {
  const books = data.allBooksJson.nodes

  console.log(data)

  return (
    <BookOverview
      books={books}
      title={`Books about #${pageContext.category}`}
    />
  )
}

export default Categories

export const pageQuery = graphql`
  query($category: String) {
    allBooksJson(
      limit: 2000
      sort: { order: DESC, fields: [readDate] }
      filter: { categories: { in: [$category] } }
    ) {
      nodes {
        author
        categories
        description
        imagePath
        link
        readDate
        recommendetFor
        title
      }
    }
  }
`

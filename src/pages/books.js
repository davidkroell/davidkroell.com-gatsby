import React from "react"
import BookOverview from "../templates/books/overview"

const BookIndex = ({ data }) => {
  const books = data.allBooksJson.nodes

  return <BookOverview books={books} title="Books" />
}

export default BookIndex

export const pageQuery = graphql`
  query {
    allBooksJson(limit: 2000, sort: { order: DESC, fields: [readDate] }) {
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

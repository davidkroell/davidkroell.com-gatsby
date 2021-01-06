import React from "react"
import { useStaticQuery, Link, graphql } from "gatsby"
import kebabCase from "lodash/kebabCase"
import { Tag } from "../common"

export const CategoryTags = ({ type }) => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(limit: 2000) {
        group(field: frontmatter___categories) {
          fieldValue
          totalCount
        }
      }
      allBooksJson(limit: 2000) {
        group(field: categories) {
          fieldValue
          totalCount
        }
      }
    }
  `)

  let base = {}

  if (type === "blog") {
    base = data.allMarkdownRemark
  } else if (type === "books") {
    base = data.allBooksJson
  } else return <></>

  return (
    <div>
      {base.group.map(tag => (
        <Tag
          as={Link}
          key={tag.fieldValue}
          to={`/${type}/categories/${kebabCase(tag.fieldValue)}/`}
          activeClassName="active"
        >
          <span>
            {tag.fieldValue} {tag.totalCount}{" "}
          </span>
        </Tag>
      ))}
    </div>
  )
}

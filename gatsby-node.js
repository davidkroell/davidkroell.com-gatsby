const path = require(`path`)
const _ = require("lodash")
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const blogPost = path.resolve(`./src/templates/blogs/post.js`)
  const categoriesTemplate = path.resolve("src/templates/blogs/categories.js")
  const blogResult = await graphql(
    `
      {
        blogGroup: allMarkdownRemark(
          filter: {fileAbsolutePath: {regex: "/(blog)/"}}
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
                categories
              }
            }
          }
        }
        categoriesGroup: allMarkdownRemark(limit: 2000) {
          group(field: frontmatter___categories) {
            fieldValue
          }
        }
      }
    `
  )

  if (blogResult.errors) {
    throw blogResult.errors
  }

  // Create blog posts pages.
  const posts = blogResult.data.blogGroup.edges

  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node

    createPage({
      path: post.node.fields.slug,
      component: blogPost,
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
      },
    })

    // Extract tag data from query
    const categories = blogResult.data.categoriesGroup.group
    // Make tag pages
    categories.forEach(category => {
      createPage({
        path: `/blog/categories/${_.kebabCase(category.fieldValue)}/`,
        component: categoriesTemplate,
        context: {
          category: category.fieldValue,
        },
      })
    })
  })
}

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`
    && node.fileAbsolutePath.includes("blogposts")) {

    const slug = createFilePath({ node, getNode, basePath: `content/blogposts` })
    createNodeField({
      node,
      name: `slug`,
      value: `/blog${slug}`,
    })
  }
}

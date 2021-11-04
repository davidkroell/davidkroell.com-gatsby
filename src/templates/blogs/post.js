import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../../components/layout"
import SEO from "../../components/seo"
import { Calendar, Clock } from "react-feather"
import baseData from "../../data/data"
import Img from "gatsby-image"

import {
  Intro,
  Title,
  ArticlePost,
  SmallText,
  ArticleBody,
  NaviagtionList,
  NaviagtionLi,
  BlogFooter,
} from "../../components/styled/posts"
import { ContainerLayout } from "../../components/common"

const BlogPost = ({ data, pageContext, location }) => {
  const post = data.markdownRemark

  console.log(post)

  const siteTitle = data.site.siteMetadata.title
  const { previous, next } = pageContext

  post.editLink = baseData.BlogEditRoot + post.fields.slug.substring(5)

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <Intro>
        <ContainerLayout>
          <div>
            <ArticlePost>
              <header>
                <Img
                  fluid={post.frontmatter.image.childImageSharp.fluid}
                  title={post.frontmatter.title}
                  alt={post.frontmatter.title + " - Title Image"}
                />

                <Title>{post.frontmatter.title}</Title>
                <SmallText>
                  <Calendar
                    className="align-left text-primary"
                    width="18"
                    height="18"
                  />
                  <span className="align-middle">
                    {" "}
                    {post.frontmatter.date}{" "}
                  </span>
                </SmallText>
                <SmallText>
                  <Clock
                    className="align-middle text-primary"
                    width="18"
                    height="18"
                  />
                  <span className="align-middle">
                    {" "}
                    {post.timeToRead} min read{" "}
                  </span>
                </SmallText>
              </header>

              <ArticleBody dangerouslySetInnerHTML={{ __html: post.html }} />

              <BlogFooter>
                <SmallText>
                  <span className="align-middle">
                    {" "}
                    Submit any improvements for this post{" "}
                    <a href={post.editLink}>on GitHub</a>{" "}
                  </span>
                </SmallText>

                <NaviagtionList>
                  <NaviagtionLi>
                    {previous && (
                      <Link to={previous.fields.slug} rel="prev">
                        ← {previous.frontmatter.title}
                      </Link>
                    )}
                  </NaviagtionLi>
                  <NaviagtionLi>
                    {next && (
                      <Link to={next.fields.slug} rel="next">
                        {next.frontmatter.title} →
                      </Link>
                    )}
                  </NaviagtionLi>
                </NaviagtionList>
              </BlogFooter>
            </ArticlePost>
          </div>
        </ContainerLayout>
      </Intro>
    </Layout>
  )
}

export default BlogPost

export const data = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt
      rawMarkdownBody
      html
      timeToRead

      fields {
        slug
      }

      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        image {
          childImageSharp {
            fluid(maxWidth: 800, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`

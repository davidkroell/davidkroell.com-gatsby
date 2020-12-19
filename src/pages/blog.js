import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Link, graphql } from "gatsby"
import { Calendar, Clock } from 'react-feather'
import Img from "gatsby-image"
import { ContainerLayout, WorkPost, Intro, SubTitle,Title, PostTitle, Text, HeaderIntro, SubText, SmallText, UnderLink, ReadMore } from "../components/common"
import CategoriesTags from '../components/CategoriesTags/categoriesTags';
import kebabCase from "lodash/kebabCase"

const BlogIndex = ({ data }) => {
  const posts = data.allMarkdownRemark.nodes

  return (
    <>
      <Layout>
        <SEO title="Blog Home Page" />
        <Intro>
          <ContainerLayout>

            <Title>
              Articles
            </Title>
            <HeaderIntro>
              <SubText>
                Blog posts based on various engineering, development and IT topics. Most of the time focused on software engineering - with background information and practical tips from real projects.
                All of them are published on my <a href="https://dev.to/davidkroell">dev.to</a> page, too.
              </SubText>
              <CategoriesTags />
            </HeaderIntro>

            <ContainerLayout className="wrapper">
              {posts.map(post => {

                const title = post.frontmatter.title || post.fields.slug
                return (
                  <WorkPost key={post.fields.slug}>
                    <div className="media">
                      <div className="image-wrapper">
                        <Link to={post.fields.slug}>
                          <Img fluid={post.frontmatter.image.childImageSharp.fluid} title="work title" />
                        </Link>
                      </div>
                      <SmallText>
                        Image credits:
                        <UnderLink href={post.frontmatter.imageCredit} target="_blank" title="image credit">
                          {post.frontmatter.imageCredit}
                        </UnderLink>
                      </SmallText>
                    </div>

                    <div className="content">
                      <header>
                        <SmallText>
                          <span className="align-middle">{post.frontmatter.categories.map((item, index) => (
                            <Link to={`/${kebabCase(item)}`} key={index}>
                              <span className="align-middle text-primary text-underline">#{item} </span>
                            </Link>
                          ))} </span>
                        </SmallText>
                        <PostTitle>
                          <Link className="text-primary" style={{ boxShadow: `none` }} to={post.fields.slug}>
                            {title}
                          </Link>
                        </PostTitle>
                        <SmallText>
                          <Calendar className="align-middle text-primary" width="18" height="18" />
                          <span className="align-middle">{post.frontmatter.date}</span>
                        </SmallText>
                        <SmallText>
                          <Clock className="align-middle text-primary" width="18" height="18" />
                          <span className="align-middle">{post.frontmatter.time} min read</span>
                        </SmallText>
                      </header>
                      <Text
                        dangerouslySetInnerHTML={{
                          __html: post.frontmatter.description || post.excerpt,
                        }}
                      />
                      <Link to={post.fields.slug}>
                        <ReadMore className="lined-link"> read more &#8594; </ReadMore>
                      </Link>
                    </div>
                  </WorkPost>
                )
              })}
            </ContainerLayout>
          </ContainerLayout>
        </Intro>
      </Layout>
    </>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/(blogposts)/"}}, sort: { fields: [frontmatter___date], order: DESC }) {
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

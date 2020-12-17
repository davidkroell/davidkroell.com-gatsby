import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../../components/layout"
import SEO from "../../components/seo"
import { Calendar, Clock } from 'react-feather'
import baseData from "../../data/data"

import {Intro, Title, ArticlePost, SmallText, ArticleBody, NaviagtionList, NaviagtionLi } from '../../components/styled/posts'
import {ContainerLayout} from '../../components/common'


const BlogPost = ({data, pageContext, location}) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata.title
  const { previous, next } = pageContext

  post.editLink = baseData.BlogEditRoot + post.fields.slug

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <Intro >
        <ContainerLayout> 
            <div>
              <ArticlePost>
                <header>
                  <Title>
                      {post.frontmatter.title}
                  </Title>
                  <SmallText> 
                    <Calendar className="align-left text-primary" width="18" height="18" /> 
                    <span className="align-middle"> published: {post.frontmatter.date} </span>
                  </SmallText>
                  <SmallText> 
                    <Clock className="align-middle text-primary" width="18" height="18" /> 
                    <span className="align-middle"> read time: {post.frontmatter.time}m </span>
                  </SmallText>
                </header>
                
                <ArticleBody dangerouslySetInnerHTML={{ __html: post.html }} />
              </ArticlePost>

              <div>Suggest edits? <a href={post.editLink}>edit post on github</a> </div>

              <nav>
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
              </nav>
            </div>
          
        </ContainerLayout>
      </Intro>
    </Layout>
  )
}

export default BlogPost;

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

      fields {
        slug
      }

      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description,
        time
      }
    }
  }
`
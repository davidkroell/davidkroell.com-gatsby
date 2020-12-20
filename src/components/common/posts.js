import styled from 'styled-components';
import variables from '../../data/variables';
import React from 'react'

import { Link } from "gatsby"
import { Calendar, Clock } from 'react-feather'
import Img from "gatsby-image"
import { UnderLink, ReadMore } from "./index"
import kebabCase from "lodash/kebabCase"


export const Intro = styled.div`
  padding: 8rem 0 4rem 0;
`;

export const HeaderIntro = styled.header`
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  grid-gap: 34px;
  justify-content: space-between;
  margin-bottom: 6rem;
`

export const PostTitle = styled.h2`
  font-size: 2rem;
  text-transform: capitalize;
`

export const SubTitle = styled.h3`
  font-size: 1.25rem;
  margin-top: 0;
  margin-bottom: 1.25rem;
  font-weight: 400;
`

export const Text = styled.p`
  font-size: .98rem;
  line-height: 2;
  color: #000000;
  margin-top: 2rem;
  text-align: justify;
  @media(max-width: ${variables.breakpointPhone}) {
    margin-top: 1rem;
    font-size: .8rem;
  }
`
export const SubText = styled.p`
  font-size: 1rem;
  line-height: 2;
  color: #232323;
`

export const SmallText = styled.small`
  font-size: .89rem;
  padding-right: 10px;
  > span {
    padding-left: 5px;
  }
  @media(max-width: ${variables.breakpointPhone}) {
    font-size: .6rem;
  }
`

export const WorkPost = styled.article`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  margin-bottom: 5rem;
  @media(max-width: ${variables.breakpointPhone}) {
    grid-template-columns: 1fr;
    border: 10px solid #fff;
    border-radius: .9rem;
    box-shadow: 0 17px 56px rgba(125,127,129,.17);
	}
  > div.content {
    padding: 2rem 3rem;
    @media(max-width: ${variables.breakpointPhone}) {
      padding: 1rem 1rem;
    }
  }
  > div.media {
    text-align: center;
    > .image-wrapper {
      margin-bottom: .5rem;
      max-height: 400px;
      overflow: hidden;
      @media(min-width: ${variables.breakpointPhone}) {
        border: 10px solid #fff;
        border-radius: .9rem;
        box-shadow: 0 17px 56px rgba(125,127,129,.17);
      }
      > a > div {
        overflow:hidden;
        transition: all 250ms ease-in-out;
      }
    }
  }
  &:hover {
    cursor: pointer;
    > div.media > .image-wrapper > a > div {
      transform: scale(1.05)
    }
  }
`
export const Category = styled.span`
  color: ${variables.primary};
  text-transform: uppercase;
  letter-spacing: .05em;
  font-size: .8em;
  border-radius: .25rem;
  padding: .5rem 1rem;
  margin-right: 1rem;
  border: 3px solid ${variables.primary};
`


export const PostOutline = ({ post }) => {
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
}

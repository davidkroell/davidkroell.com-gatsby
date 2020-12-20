import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { ContainerLayout, WorkPost, Intro, PostTitle, SubTitle, Title, Text, HeaderIntro, SubText, SmallText, UnderLink, ReadMore } from "../components/common"
import kebabCase from "lodash/kebabCase"
import { Calendar, ThumbsUp } from 'react-feather'
import { Link, graphql } from "gatsby"


const BookIndex = ({ data }) => {

  const books = [
    {
      readDate: "2020",
      title: "The Intelligent Investor",
      author: "Benjamin Graham",
      imagePath: "https://images-eu.ssl-images-amazon.com/images/I/91yj3mbz4JL.jpg",
      link: "https://www.amazon.de/Intelligent-Investieren-gro%C3%9Fartiger-Investment-Ratgeber-Investing%C2%AB/dp/3959723415/ref=sr_1_3?__mk_de_DE=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=1AFN677FBULMV&dchild=1&keywords=intelligent+investieren&qid=1608394785&sprefix=intelligent+inve%2Caps%2C206&sr=8-3",
      description: "The most successful book on value investing written by Benjamin Graham, who's student Warren Buffet was. Published the first time in 1949 but nevertheless a standard reference for long-term private investors.",
      recommendetFor: "Everyone who is looking forward to take care of his financials and is willing to invest at the Wall Street.",
      categories: ["finance"]
    }
  ]

  return (
    <>
      <Layout>
        <SEO title="Books" />
        <Intro>
          <ContainerLayout>


            <Title>
              Books
                </Title>

            <HeaderIntro>
              <SubText>
                Listed below are all the books I remember reading and which are worth mentioning here.
                I tried to quickly outline them and give recommendations for people who might be interested in reading them.
                </SubText>
            </HeaderIntro>
            <ContainerLayout className="wrapper">

              {books.map(book => {

                console.log(book)

                return (
                  <WorkPost>
                    <div className="media">
                      <img src={book.imagePath} height={300} alt={book.title + ' image'} />
                    </div>

                    <div className="content">
                      <header>
                        <SmallText>
                          <span className="align-middle">{book.categories.map((item, index) => (
                            <Link to={`/books/categories/${kebabCase(item)}`} key={index}>
                              <span className="align-middle text-primary text-underline">#{item}</span>
                              {book.categories.length !== index + 1 ? <span className="align-middle text-primary"> , </span> : ""}
                            </Link>
                          ))} </span>
                        </SmallText>

                        <PostTitle>{book.title}</PostTitle>
                        <SubTitle>{book.author}</SubTitle>

                        <SmallText>
                          <Calendar className="align-middle text-primary" width="18" height="18" />
                          <span className="align-middle">{book.readDate}</span>
                        </SmallText>
                      </header>

                      <Text
                        dangerouslySetInnerHTML={{
                          __html: book.description
                        }} />


                      <SmallText>
                        <ThumbsUp className="align-middle text-primary" width="18" height="18" />
                        <span className="align-middle">Recommendet for</span>
                      </SmallText>

                      <Text
                        dangerouslySetInnerHTML={{
                          __html: book.recommendetFor
                        }} />

                      <a href={book.link} target="_blank" rel="noreferrer" >
                        <ReadMore className="lined-link"> get the book &#8594; </ReadMore>
                      </a>

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

export default BookIndex


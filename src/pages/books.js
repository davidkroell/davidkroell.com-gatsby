import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { ContainerLayout, WorkPost, Intro, PostTitle, SubTitle, Title, Text, HeaderIntro, SubText, SmallText, ReadMore } from "../components/common"
import kebabCase from "lodash/kebabCase"
import { Calendar, ThumbsUp } from 'react-feather'
import { Link } from "gatsby"


const BookIndex = ({ data }) => {

  const books = [
    {
      readDate: "2020",
      title: "The Intelligent Investor",
      author: "Benjamin Graham",
      imagePath: "https://images-eu.ssl-images-amazon.com/images/I/91yj3mbz4JL.jpg",
      link: "https://www.amazon.de/Intelligent-Investieren-gro%C3%9Fartiger-Investment-Ratgeber-Investing%C2%AB/dp/3959723415/",
      description: "The most successful book on value investing written by Benjamin Graham, who's student Warren Buffet was. Published the first time in 1949 but nevertheless a standard reference for long-term private investors.",
      recommendetFor: "Everyone who is looking forward to take care of his financials and is willing to invest at the Wall Street.",
      categories: ["finance"]
    },
    {
      title: "A Brief History of Humankind",
      author: "Yuval Noah Harari",
      imagePath: "https://m.media-amazon.com/images/I/51Sn8PEXwcL.jpg",
      readDate: "2020",
      link: "https://www.amazon.de/Sapiens-Humankind-Yuval-Noah-Harari/dp/0099590085/",
      categories: ["science", "history"],
      description: "In his book, Harari talks about how humankind developed into what it is today - and above all why. The author clarifies things that most people think they already know. He talks about how religions, societies and capitalism evolved (just to name a few).",
      recommendetFor: "The book opened my eyes in many ways and showed one thing above all: life is never fair and it doesn't always get easier. I recommend it for everyone who believes one can learn from history."
    }
  ]

  return (
    <>
      <Layout>
        <SEO title="Books" />
        <Intro>
          <ContainerLayout>

            <Title>Books</Title>

            <HeaderIntro>
              <SubText>
                Listed below are all the books I remember reading and which are worth mentioning here.
                I tried to quickly outline them and give recommendations for people who might be interested in reading them.
                </SubText>
            </HeaderIntro>
            <ContainerLayout className="wrapper">

              {books.map(book => {

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
                              <span className="align-middle text-primary text-underline">#{item} </span>
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


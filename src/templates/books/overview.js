import React from "react"
import Layout from "../../components/layout"
import SEO from "../../components/seo"
import { Link } from "gatsby"
import { Calendar, ThumbsUp } from "react-feather"
import {
  ContainerLayout,
  WorkPost,
  Intro,
  Title,
  PostTitle,
  Text,
  HeaderIntro,
  SubText,
  SmallText,
  SubTitle,
  ReadMore,
} from "../../components/common"
import { CategoryTags } from "../../components/CategoriesTags"
import kebabCase from "lodash/kebabCase"

const BookOverview = ({ title, books, categoryBasePath, categoryGroups }) => {
  return (
    <>
      <Layout>
        <SEO
          title={title}
          description="Some books I've read which in some way inspired me or I found very interesting."
        />
        <Intro>
          <ContainerLayout>
            <Title>Books</Title>

            <HeaderIntro>
              <SubText>
                Listed below are all the books I remember reading and which are
                worth mentioning here. I tried to quickly outline them and give
                recommendations for people who might be interested in reading
                them. This list is by far not complete neither will it ever be.
                The links to the books are affiliate links.
              </SubText>

              <CategoryTags type="books" />
            </HeaderIntro>
            <ContainerLayout className="wrapper">
              {books.map(book => {
                return (
                  <WorkPost>
                    <div className="media">
                      <img
                        src={book.imagePath}
                        height={300}
                        alt={book.title + " image"}
                      />
                    </div>

                    <div className="content">
                      <header>
                        <SmallText>
                          <span className="align-middle">
                            {book.categories.map((item, index) => (
                              <Link
                                to={`/books/categories/${kebabCase(item)}`}
                                key={index}
                              >
                                <span className="align-middle text-primary text-underline">
                                  #{item}{" "}
                                </span>
                              </Link>
                            ))}{" "}
                          </span>
                        </SmallText>

                        <PostTitle>{book.title}</PostTitle>
                        <SubTitle>{book.author}</SubTitle>

                        <SmallText>
                          <Calendar
                            className="align-middle text-primary"
                            width="18"
                            height="18"
                          />
                          <span className="align-middle">{book.readDate}</span>
                        </SmallText>
                      </header>

                      <Text
                        dangerouslySetInnerHTML={{
                          __html: book.description,
                        }}
                      />

                      <SmallText>
                        <ThumbsUp
                          className="align-middle text-primary"
                          width="18"
                          height="18"
                        />
                        <span className="align-middle">Recommendet for</span>
                      </SmallText>

                      <Text
                        dangerouslySetInnerHTML={{
                          __html: book.recommendetFor,
                        }}
                      />

                      <a href={book.link} target="_blank" rel="noreferrer">
                        <ReadMore className="lined-link">
                          {" "}
                          get the book &#8594;{" "}
                        </ReadMore>
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

export default BookOverview

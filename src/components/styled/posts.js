import styled from "styled-components"
import variables from "../../data/variables"

export const Intro = styled.div`
  padding: 8rem 0 4rem 0;
  text-align: left;
`

export const Title = styled.h1`
  font-size: 2rem;
  text-transform: capitalize;
`

export const ArticlePost = styled.article`
  margin-bottom: 5rem;
  padding-bottom: 1rem;
  max-width: 50rem;
  margin: auto;
  text-align: center;
  img[src$="imgresponsive"] {
    max-width: 80%;
  }
`
export const SmallText = styled.small`
  font-size: 0.89rem;
  padding-right: 10px;
  > span {
    padding-left: 5px;
  }
`

export const ArticleBody = styled.div`
  margin-top: 5rem;    
  text-align: justify;

  p {
    font-size: 1.25rem;
  }

  h1 {
    font-size 2.4rem;
    text-align: left;
  }
  h2 {
    font-size 1.7rem;
    text-align: left;
  }  
  h3 {
    font-size 1.4rem;
    text-align: left;
  }
  h4 {
    font-size 1.2rem;
    text-align: left;

  }
  blockquote {
    border-left: 4px solid #7d8a97;
    padding-left: 1.2rem;
    color: ${variables.lightGrey}
  }

  hr {
    margin: 1rem 20rem;
    background-color: ${variables.lightGrey};
    height: 4px;
    border: none;
    border-radius 1.5px;
  }

  table {
    font-size: 1rem;
    margin: 1rem 0;
    table-layout: auto;
    width: 100%;
    border-collapse: collapse;
  }

  table td, th {
    padding: 0.5rem 1rem;
  }

  table th {
    text-align: center;
    font-size: 1.05rem;
  }

  table td {
    border: 1px solid ${variables.lightGrey};
  }
`

export const NaviagtionList = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 5rem;
  grid-row-gap: 5rem;
  list-style: none;
  padding: 0;
`

export const NaviagtionLi = styled.li`
  padding: 2rem 0;
  &:last-child {
    text-align: right;
  }
  a {
    font-size: 1.3rem;
  }
`

export const BlogFooter = styled.nav`
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 4px solid ${variables.inverse};
`

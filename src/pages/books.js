import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import {SectionIntro, ContainerLayout} from "../components/common";

const BookIndex = ({data}) => { 

  return (
    <Layout> 
      <SEO title="Books" />
      <ContainerLayout>
        <SectionIntro>
            <div>Hey there! some books I've read including</div>
        </SectionIntro>
      </ContainerLayout>
    </Layout>
  )
}

export default BookIndex


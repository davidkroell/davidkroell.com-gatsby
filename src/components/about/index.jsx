import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { AboutSection, Avatar, Title, Text, SubTitle } from './style';
import { SectionIntro, ContainerLayout, ButtonDefault } from "../common";

const About = () => {
  const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "profile.webp" }) {
        childImageSharp {
          fluid(maxWidth: 550) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)
  return (
    <>
      <SectionIntro>
        <ContainerLayout>
          <AboutSection>
            <div>
              <Avatar fluid={data.placeholderImage.childImageSharp.fluid} alt="user photo" />
              <SubTitle>Software Engineering</SubTitle>
            </div>
            <div>
              <Title>Hello,</Title>
              <Text>my name is <b>David</b> and I'm a software engineer based in Tyrol, Austria. Currently,
                I'm working at Liebherr Appliances as .NET Developer.</Text>

              <Text>I love working with modern technologies, architecting and designing high quality products with code.
                I always strive for the best results by utilizing cutting-edge technologies.
                Obviously, this requires much passion and involves a lot of willingness for self-paced learning.</Text>
              
              <Text>
                Besides my tech background I enjoy beeing in the mountains - with skies in the winter and on my bike in the summer.
                In addition I am curious about all kind of sciences (especially astrophysics).
                I do in fact read a lot of books, but when I'm in a bar with friends I'll order Gin &amp; Tonic.
              </Text> 
            </div>
          </AboutSection>
        </ContainerLayout>
      </SectionIntro>
    </>
  )
}

export default About

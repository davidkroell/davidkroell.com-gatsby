import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { AboutSection, Avatar, Text, SubTitle } from "./style"
import { SectionIntro, ContainerLayout, Title } from "../common"

const About = () => {
  const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "profile.webp" }) {
        childImageSharp {
          fluid(maxWidth: 600) {
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
              <Avatar
                fluid={data.placeholderImage.childImageSharp.fluid}
                alt="Picture of me summiting a mountain in winter"
              />
              <SubTitle>
                Software Engineering <br /> &amp; Mountains
              </SubTitle>
            </div>
            <div>
              <Title>Hello,</Title>
              <Text>
                my name is <b>David</b> and I'm a software engineer based in
                Tyrol, Austria. Currently, I'm working at Liebherr Group as .NET
                Developer.
              </Text>

              <Text>
                I love designing and creating high quality products with code. I
                always strive for the best results by utilizing cutting-edge
                technologies. Obviously, this requires much passion and involves
                a lot of willingness for self-paced learning.
              </Text>

              <Text>
                Besides my tech background I enjoy beeing in the mountains -
                with skies in the winter and on my bike in the summer. In
                addition, I am curious about all kind of science (especially
                astrophysics). To keep up learning I read a lot of books on all
                possible subjects. Of course, I also like to go out with friends
                and when I do, I prefer Gin &amp; Tonic.
              </Text>
            </div>
          </AboutSection>
        </ContainerLayout>
      </SectionIntro>
    </>
  )
}

export default About

import React from 'react';
import data from "./../../../data/data";
import { FooterStyle, FooterBody, QuoteLine, QuoteLineSmall, CopyRight, MediaLink, FooterSocialMedia } from './style'
import { ContainerLayout, ButtonDefault } from '../../common'

const Footer = () => {
	let displayedQuote = data.QuoteLines[Math.floor(Math.random() * data.QuoteLines.length)]

	let openMail = () => {
		window.location = `mailto:${data.SiteContact.email}`
	}

	return (
		<>
			<FooterStyle>
				<ContainerLayout>
					<FooterBody>
						<FooterSocialMedia>
							{data.SocialMediaLinks.map(({ id, name, url }) => (
								<li key={id} >
									<MediaLink className="lined-link" href={url} target="_blank" rel="noopener noreferrer" aria-label={`follow us on ${name}`}>
										{name}
									</MediaLink>
								</li>
							))}
						</FooterSocialMedia>
						<div>
							<p className="text-primary quote">Do you want to get in touch? Drop me a note.</p>
							<ButtonDefault onClick={openMail} >Contact me</ButtonDefault>
						</div>
					</FooterBody>
					<div className="box">
						<QuoteLine>{displayedQuote.Quote}</QuoteLine>
						<QuoteLineSmall>- {displayedQuote.Author} {displayedQuote.Source != null ? ' in ' + displayedQuote.Source : ''}</QuoteLineSmall>

						<CopyRight className="text-dark">
							<span>Built with {` `}
								<a href="https://www.gatsbyjs.org">Gatsby</a>{" "}
							</span>
							(c) {new Date().getFullYear()} {data.SiteAuthor} - <a href={data.ViewSourceUrl}> view source</a> </CopyRight>
					</div>
				</ContainerLayout>
			</FooterStyle>
		</>
	)
}

export default Footer;
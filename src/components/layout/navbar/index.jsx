import React from "react"
import { Link } from "gatsby"
import PropTypes from "prop-types"
import { User, Briefcase, Feather, Smile, GitHub, Book } from 'react-feather'

import {NavbarElement, NavbarList, NavbarLogo} from './style'

const Navbar = ({ siteTitle }) => (
  <nav>
    <div className="container">
      <NavbarElement>
          <NavbarLogo>
            <h3>
              <Link to="/">
                <Smile className="align-middle"/> <span className="align-middle"> {siteTitle} </span>
              </Link>
            </h3>
          </NavbarLogo> 
          <div className="main-navigation">
            <NavbarList>
              <li><Link to="/" className="lined-link" activeClassName="active"> <User /> <span> about </span> </Link></li> 
              {/* <li><Link to="/repositories" className="lined-link" activeClassName="active"> <GitHub /> <span> github </span> </Link></li>   */}
              {/* <li><Link to="/works" className="lined-link" activeClassName="active"> <Briefcase /> <span> projects </span> </Link></li>   */}
              <li><Link to="/blog" className="lined-link" activeClassName="active" partiallyActive={true}> <Feather /> <span> blog </span> </Link></li>
              <li><Link to="/books" className="lined-link" activeClassName="active"> <Book /> <span> books </span> </Link></li>
            </NavbarList>
          </div>
      </NavbarElement>
    </div>
  </nav>
)

Navbar.propTypes = {
  siteTitle: PropTypes.string,
}

Navbar.defaultProps = {
  siteTitle: ``,
}

export default Navbar

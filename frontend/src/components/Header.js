import React from "react";
import {
	Navbar,
	Nav,
	Container,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import styles from './Header.module.css'

//-----------------------------------------------------------------------------
// COMPONENT HEADER
//-----------------------------------------------------------------------------
function Header(props) {

	//--------------------------------------
	// Rendering
	//--------------------------------------
	return (
		<header {...props}>
			<Navbar bg="primary" variant="dark" expand="lg" collapseOnSelect>
				<Container className='menu-root'>
					<LinkContainer to="/">
						<Navbar.Brand> いつもの天気 </Navbar.Brand>
					</LinkContainer>
					<Navbar.Toggle aria-controls="responsive-navbar-nav" />
					<Navbar.Collapse>
						<Nav className={`mr-auto ${styles.menuItems}`}>
							<LinkContainer to="/byday">
								<Nav.Link> 日でみる </Nav.Link>
							</LinkContainer>
							<LinkContainer to="/byweek">
								<Nav.Link> 週でみる </Nav.Link>
							</LinkContainer>
							<LinkContainer to="/credit">
								<Nav.Link> 情報ソース </Nav.Link>
							</LinkContainer>
						</Nav>
						<Nav>
							<LinkContainer to="/login">
								<Nav.Link disabled>
									<i className="fas fa-user"></i>{" "}
									<span className="mx-2">Login </span>
								</Nav.Link>
							</LinkContainer>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	);
}

export default Header;

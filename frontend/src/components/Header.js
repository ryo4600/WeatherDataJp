import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import configData from '../config.json';
import styles from './Header.module.css';

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
				<Container className="px-0">
					<LinkContainer to="/home" className={styles.pageTitle}>
						<Navbar.Brand> {configData.TITLE} </Navbar.Brand>
					</LinkContainer>
					<Navbar.Toggle aria-controls="responsive-navbar-nav" />
					<Navbar.Collapse>
						<Nav className={`me-auto ${styles.menuItems}`}>
							<LinkContainer to="/home">
								<Nav.Link> ホーム </Nav.Link>
							</LinkContainer>
							<LinkContainer to="/byday">
								<Nav.Link> 日の詳細 </Nav.Link>
							</LinkContainer>
							<LinkContainer to="/byweek">
								<Nav.Link> 週の詳細 </Nav.Link>
							</LinkContainer>
							{/* <LinkContainer to="/credit">
								<Nav.Link> データについて </Nav.Link>
							</LinkContainer> */}
						</Nav>
						<Nav>
							<LinkContainer to="/login">
								<Nav.Link disabled>
									<i className="fas fa-user"></i>
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

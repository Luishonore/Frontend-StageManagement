import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../../assets/images/03_11_logovstag.png'

function NavBar({ onNavigationClick }) {
  return (
    <Navbar expand="lg" className="navbarvolet">
      <Container>
        <Navbar.Brand href="./">
          <img
            alt="Logo Stage-management"
            src={logo}
            height="50"
            className="d-inline-block align-top"
          />{' '}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={() => onNavigationClick('accueil')}>
              Accueil
            </Nav.Link>
            <Nav.Link onClick={() => onNavigationClick('annonces')}>
              Annonces
            </Nav.Link>
            <Nav.Link onClick={() => onNavigationClick('entreprises')}>
              Entreprises
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
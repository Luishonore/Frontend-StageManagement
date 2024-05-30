import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Dropdown from 'react-bootstrap/Dropdown';
import SplitButton from 'react-bootstrap/SplitButton';
//LOGO DU SITE
import logovstag from '../../assets/images/03_11_logovstag.png';
import logovmaitre from '../../assets/images/03_11_logovmaitre.png';
import logovsecret from '../../assets/images/03_11_logovsecret.png';
import logovcoor from '../../assets/images/03_11_logovcoor.png';
import logovsup from '../../assets/images/03_11_logovsup.png';

import Keycloak from 'keycloak-js';
import axios from 'axios';

// KEYCLOAK CONFIG
let initOptions = {
  url: 'http://localhost:8080',
  realm: 'StageManagement',
  clientId: 'stagemanagement-react',
}

let kc = new Keycloak(initOptions);

kc.init({
  onLoad: 'login-required',
  checkLoginIframe: true,
  pkceMethod: 'S256'
}).then((auth) => {
  if (!auth) {
    window.location.reload();
  } else {
    localStorage.setItem('token', kc.token)
    axios.defaults.headers['Authorization'] = `Bearer ${kc.token}`;

    kc.onTokenExpired = () => {
      console.log('token expired')
    }
    
  }
}, (error) => {
  console.error("Authentication Failed", error);
});


function NavBar({ onNavigationClick }) {
  const getUsernameFromToken = () => {
    // Check if token is available in localStorage
    if (!localStorage.getItem('token')) {
      return ''; // Return an empty string if no token
    }

    // Parse the JWT token
    const token = localStorage.getItem('token');
    const parsedToken = JSON.parse(atob(token.split('.')[1])); // Base64 decode the second part (payload)

    // Extract the username from the 'preferred_username' claim (if it exists)
    return parsedToken.preferred_username || '';
  };
  const username = getUsernameFromToken();

  const getRolesFromToken = () => {
    // Check if token is available in localStorage
    if (!localStorage.getItem('token')) {
      return []; // Return an empty array if no token
    }

    // Parse the JWT token
    const token = localStorage.getItem('token');
    const parsedToken = JSON.parse(atob(token.split('.')[1])); // Base64 decode the second part (payload)

    // Extract roles from 'resource_access' claim for your specific client ID
    const roles = parsedToken.resource_access
      ? parsedToken.resource_access['stagemanagement-react'].roles || []
      : []; // Use your client ID if it's different

    return roles;
  };
  const roles = getRolesFromToken();
  
  const getLogoByRole = (role) => {
    switch (role) {
      case 'Stagiaires':
        return logovstag;
      case 'MaitreDeStage':
        return logovmaitre;
      case 'Secretariat':
        return logovsecret;
      case 'Coordinateurs':
        return logovcoor;
      case 'Superviseur':
        return logovsup;
      default:
        return logovstag; // Or any default logo
    }
  };
  const selectedLogo = getLogoByRole(roles[0]);

  // Mise en page
  return (
    <Navbar expand="lg" className="navbarvolet">
      <Container>
        <Navbar.Brand href="./">
          <img
            alt="Logo Stage-management"
            src={selectedLogo}
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
            <Nav.Link onClick={() => onNavigationClick('formulaires')}>
              Formulaires
            </Nav.Link>
            
            <NavDropdown id="nav-dropdown-dark-example" title="Plateforme HEH" menuVariant="dark">
              <NavDropdown.Item href="https://www.heh.be" target="blank">Site HEH</NavDropdown.Item>
              <NavDropdown.Item href="https://www.heh.be/extranet/index.php" target="blank">Extranet</NavDropdown.Item>
              <NavDropdown.Item href="https://ecampus.heh.be/auth/oidc/" target="blank">eCampus</NavDropdown.Item>
              <NavDropdown.Item href="https://www.microsoft365.com" target="blank">Office365</NavDropdown.Item>
              <NavDropdown.Item href="https://hehbe-my.sharepoint.com" target="blank">Mon OneDrive</NavDropdown.Item>
              <NavDropdown.Item href="https://outlook.office365.com/heh.be" target="blank">Webmail</NavDropdown.Item>
              <NavDropdown.Item href="https://hehplanning2023.umons.ac.be/" target="blank">Horaires</NavDropdown.Item>
              <NavDropdown.Item href="https://gestacheh.umons.ac.be/" target="blank">MyHEH</NavDropdown.Item>
              <NavDropdown.Item href="https://heh.mynetpay.be/" target="blank">MyNetPay</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="https://heh.jobteaser.com/fr" target="blank">Career Center</NavDropdown.Item>
            </NavDropdown>
          </Nav>

          <Nav>
            <SplitButton variant="secondary" size="lg" title={username}>
              <Dropdown.Item id="color" onClick={() => { kc.logout({ redirectUri: 'http://localhost:3000' }) }}>Déconnexion</Dropdown.Item>
            </SplitButton>
          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
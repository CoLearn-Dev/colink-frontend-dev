import React, { useState } from 'react';
import styles from './NavbarComp.module.css'

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

interface Props {
    clientHostname: string,
    hostToken: string,
    jwt: string,
}

export const NavbarComp: React.FC<Props> = (props) => {
    const [locHostname, updateLocHostname] = useState("");
    const [locHostToken, updateLocHostToken] = useState("");
    const [fileInputField, updateFileField] = useState("");
    

    return (
        <>
          <Navbar className="main-nav" bg="light" expand="lg">
            <Container>
              <Navbar.Brand href="#home">CoLink Client</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link href="#home">Home</Nav.Link>
                  <Nav.Link href="#link">Link</Nav.Link>
                  <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">
                      Another action
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">
                      Separated link
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </>
    )    
}
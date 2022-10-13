import React, { useState } from 'react';
import styles from './Layout.module.css'
import '../../global.css'

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { Outlet, Link } from "react-router-dom";
import { LinkContainer } from 'react-router-bootstrap';

interface Props {

}

export const Layout: React.FC<Props> = (props) => {

    return (
        <>
          <Navbar className="main-nav" bg="light" expand="lg">
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand>CoLink Client</Navbar.Brand>
              </LinkContainer>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <LinkContainer to="/storage">
                    <Nav.Link>Storage</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/computation">
                    <Nav.Link>Tasks</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/settings">
                    <Nav.Link>Settings</Nav.Link>
                  </LinkContainer>
                  {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">
                      Another action
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">
                      Separated link
                    </NavDropdown.Item>
                  </NavDropdown> */}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>

          <Outlet />
        </>
    )    
}
import React, { useState } from 'react';
import styles from './Layout.module.css';
import '../../global.css';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { Outlet, Link } from "react-router-dom";
import { LinkContainer } from 'react-router-bootstrap';

interface Props {
  jwt: string,
  setJwt: Function,
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
                  <LinkContainer to="/tasks">
                    <Nav.Link>Tasks</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/settings">
                    <Nav.Link>Settings</Nav.Link>
                  </LinkContainer>
                </Nav>
                {props.jwt != "" ? 
                  <>
                    <NavDropdown title={props.jwt.slice(0, 15) + "..."} id="basic-nav-dropdown" className="ml-auto">
                      <NavDropdown.ItemText style={{width: "250px", overflowWrap: "break-word"}}>{props.jwt}</NavDropdown.ItemText>
                      <NavDropdown.Divider />
                      <LinkContainer to="/settings">
                        <NavDropdown.Item>Settings</NavDropdown.Item>
                      </LinkContainer>
                    <LinkContainer to="/" onClick={()=>{props.setJwt("")}}>
                      <NavDropdown.Item>Log Out</NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                  </> : <Nav className="ml-auto">Log In</Nav>
                }
                
              </Navbar.Collapse>
            </Container>
          </Navbar>

          <Outlet />
        </>
    )    
}
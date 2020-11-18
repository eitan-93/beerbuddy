import React from 'react';
import { Nav, Navbar} from 'react-bootstrap';
import styled from 'styled-components';
const Styles = styled.div`
  .navbar { background-color: #222; }
  a, .navbar-nav, .navbar-light .nav-link {
    color: #63C5Da;
    margin-left: 4em;
    &:hover { color: white; }
  }
  .navbar-brand {
    font-size: 1.4em;
    color: #63C5Da;
    &:hover { color: #63C5Da; }
  }
  .form-center {
    position: absolute !important;
    left: 25%;
    right: 25%;
  }
`;


export function  NavigationBar(){

 return(  
   <Styles>
  <Navbar  bg="dark" variant="#63C5Da">
    <Navbar.Brand>BeerBuddy</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Item><Nav.Link href="/BrowseBeers">Browse Beers</Nav.Link></Nav.Item> 
        <Nav.Item><Nav.Link href="/FavoriteBeers">Favorite Beers</Nav.Link></Nav.Item>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
</Styles>)

 }
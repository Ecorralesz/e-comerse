import React, { useState } from "react";
import { Col, Container, Nav, Navbar, Offcanvas } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import CartSideBar from "./CartSideBar";
import "../App.css"

const NavBar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.setItem("token", "");
    navigate("/login");
  };


  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Navbar
        bg="primary"
        variant="dark"
        expand="lg"
        className="nav-container-flex"
      >
        <Container>
          <Col>
            <Navbar.Brand to={"/"} as={Link}>
              E-Commerse
            </Navbar.Brand>
          </Col>

          <Col>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav 
              className="ms-auto"
              >
                <Nav.Link 
                to={"/login"} 
                as={Link} 
                style={{border: "solid 1px white"}}
                className="me-2"
                >
                  Login
                </Nav.Link>
                <Nav.Link 
                to={"/purchases"} 
                as={Link} 
                style={{border: "solid 1px white"}}
                className="me-2"
                >
                  Purchases
                </Nav.Link>
                <Nav.Link
                className="me-2"
                onClick={handleShow}
                style={{border: "solid 1px white"}}
                >Cart</Nav.Link>
                <Nav.Link onClick={logout} style={{border: "solid 1px white"}}>Logout</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Col>
        </Container>
      </Navbar>
      <CartSideBar show={show} handleClose={handleClose}/>
    </>
  );
};

export default NavBar;

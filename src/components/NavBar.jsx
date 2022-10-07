import React, { useState } from "react";
import { Col, Container, Nav, Navbar, Offcanvas } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import CartSideBar from "./CartSideBar";

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
              QAStore
            </Navbar.Brand>
          </Col>

          <Col>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link to={"/login"} as={Link}>
                  Login
                </Nav.Link>
                <Nav.Link to={"/purchases"} as={Link}>
                  Purchases
                </Nav.Link>
                <Nav.Link
                onClick={handleShow}
                >Cart</Nav.Link>
                <Nav.Link onClick={logout}>Logout</Nav.Link>
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

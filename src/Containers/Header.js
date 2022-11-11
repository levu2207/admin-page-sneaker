import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/reducers/auth";

const Header = () => {
  const userInfo = useSelector((state) => state.auth.userInfo);
  const dispatch = useDispatch();

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
        <Container>
          <Navbar.Brand>
            <Link className="navbar-brand" to="/">
              Quản lý cửa hàng
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <NavLink className="nav-link" to="/products">
                Danh sách sản phẩm
              </NavLink>

              <NavLink className="nav-link" to="/orders">
                Danh sách đơn hàng
              </NavLink>
            </Nav>

            <Nav>
              <NavLink className="nav-link" to="/home">
                {userInfo.fullName}
              </NavLink>
              <Nav.Link onClick={() => dispatch(logout())}>
                <i className="bi-box-arrow-right" />
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;

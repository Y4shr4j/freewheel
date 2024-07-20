import React, { useRef } from "react";
import { Container, Row, Col } from "reactstrap";
import { Link, NavLink } from "react-router-dom";
import "../../styles/header.css";
import { useAuth } from "../../context/auth";
import { useCart } from "../../context/cart";
import { toast } from "react-toastify";
import {Badge} from 'antd';

const navLinks = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/about",
    display: "About",
  },
  {
    path: "/fleet",
    display: "Fleet ",
  },

  {
    path: "/blog",
    display: "Blog",
  },
  {
    path: "/contact",
    display: "Contact",
  }
];

const Header = () => {
  const [cart] = useCart();
  const [auth, setAuth] = useAuth();
  const menuRef = useRef(null);

  const toggleMenu = () => menuRef.current.classList.toggle("menu__active");
  const handleLogout = () => {
    setAuth({
      ...auth, user:null, token:''
    })
    localStorage.removeItem('auth');
    toast.success('Logout Successfully');
  }

  return (
    <header className="header">
    <div className="main__navbar">
    <Container>
      <Row className="d-flex align-items-center justify-content-between">
        <Col lg="4" md="3" sm="4">
          <div className="logo">
            <h1>
              <Link to="/home" className="d-flex align-items-center gap-2">
                <i class="ri-bike-line"></i>
                <span>
                  YashRa4j
                </span>
              </Link>
            </h1>
          </div>
        </Col>
        <Col lg="4" md="6" sm="4" className="d-flex justify-content-center">
          <div className="navigation__wrapper d-flex align-items-center justify-content-between">
            <span className="mobile__menu">
              <i class="ri-menu-line" onClick={toggleMenu}></i>
            </span>
            <div className="navigation" ref={menuRef} onClick={toggleMenu}>
              <div className="menu">
                {navLinks.map((item, index) => (
                  <NavLink
                    to={item.path}
                    className={(navClass) =>
                      navClass.isActive ? "nav__active nav__item" : "nav__item"
                    }
                    key={index}
                  >
                    {item.display}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
        </Col>
        <Col lg="4" md="3" sm="4">
          <div className="header__top__right d-flex align-items-center justify-content-end gap-3">
            {!auth.user ? (
              <>
                <Link to="/login" className="d-flex align-items-center gap-1">
                  <i class="ri-login-circle-line"></i> Login
                </Link>
                <Link to="/signup" className="d-flex align-items-center gap-1">
                  <i class="ri-user-line"></i> Register
                </Link>
              </>
            ) : (
              <>
                <div className="pp">{auth?.user?.name}</div>
                <Link
                  to={`/dashboard/${auth?.user?.role === 1 ? 'admin' : 'user'}`}
                  className="d-flex align-items-center gap-1"
                >
                  Dashboard
                </Link>
                <Badge count={cart?.length} showZero>
                  <Link to="/cart" className="nav-link">
                    <i class="ri-shopping-cart-line"></i> Cart
                  </Link>
                </Badge>
                <Link to="/login" onClick={handleLogout} className="d-flex align-items-center gap-1">
                  <i class="ri-login-circle-line"></i> LogOut
                </Link>
              </>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  </div>

    </header>
  );
};
export default Header;

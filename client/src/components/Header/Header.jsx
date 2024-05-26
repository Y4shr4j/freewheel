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
    
      {/* =============== header middle =========== */}
      <div className="main__navbar">
        <Container>
          <Row>
            <Col lg="4" md="3" sm="4">
              <div className="logo">
                <h1>
                  <Link to="/home" className=" d-flex align-items-center gap-2">
                    <i class="ri-bike-line"></i>
                    <span>
                      FreeWheel <br /> Rentals
                    </span>
                  </Link>
                </h1>
              </div>
            </Col>

            <Col lg="3" md="3" sm="4">
              <div className="header__location d-flex align-items-center gap-2">
                <span>
                  <i class="ri-earth-line"></i>
                </span>
                <div className="header__location-content">
                  <h4>India</h4>
                  <h4>Silchar City, India</h4>
                </div>
              </div>
            </Col>

            <Col lg="3" md="3" sm="4">
              <div className="header__location d-flex align-items-center gap-2">
                <span>
                  <i class="ri-time-line"></i>
                </span>
                <div className="header__location-content">
                  <h4>Sunday to Saturday</h4>
                  <h4>10am - 7pm</h4>
                </div>
              </div>
            </Col>

            <Col lg="2" md="3" sm="0" className=" d-flex align-items-center justify-content-end ">
              <button className="header__btn btn ">
                <Link to="/contact">
                  <i class="ri-phone-line"></i> Request a call
                </Link>
              </button>
            </Col>
          </Row>
        </Container>
      </div>

      

      {/* ========== main navigation =========== */}

      <div className="main__navbar">
        <Container>
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
            <Col lg="6" md="6" sm="6">
              <div className="header__top__right d-flex align-items-center justify-content-end gap-3">

                {   
                  !auth.user ? (
                    <>
                      <Link to="/login" className=" d-flex align-items-center gap-1">
                        <i class="ri-login-circle-line"></i> Login
                      </Link>
                      <Link to="/signup" className=" d-flex align-items-center gap-1">
                        <i class="ri-user-line"></i> Register
                      </Link>
                    </>) : (
                    <>
                      <div className="pp">
                        {auth?.user?.name}
                      </div>
                      <Link to={`/dashboard/${auth?.user?.role === 1? 'admin' : 'user'}`} className="d-flex align-items-center gap-1">
                        Dashboard
                      </Link>
                      <Badge count={cart?.length} showZero>
                        <Link to="/cart" className="nav-link">
                          <i class="ri-shopping-cart-line"></i>Cart    
                        </Link>
                      </Badge>
                      
                      <Link to="/login" onClick={handleLogout} className=" d-flex align-items-center gap-1">
                        <i class="ri-login-circle-line"></i> LogOut
                      </Link>
                    </>
                  )
                }
              </div>
            </Col>
          </div>
        </Container>
      </div>
    </header>
  );
};
export default Header;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../redux/app/actions/authAction";
import { logoutAdmin } from "../redux/admin/actions/authActionAdmin";
import "../stickyNav.css";
const Navbar = (props) => {

 

  const renderContent = () => {
    switch (props.user.isAuthenticated) {
      case true:
        return (
          <React.Fragment>
            <li>
              <a onClick={() => props.logout()}>logout</a>
            </li>
            <li>
              <Link to="/profile">profile</Link>
            </li>
            <li>
              <Link to={`/Wishlist/${props.user._id}`}>Wishlist</Link>
            </li>
          </React.Fragment>
        );

      case false:
        return (
          <li>
            <Link to="/signup">SIGNUP/LOGIN</Link>
          </li>
        );
      default:
        return (
          <li>
            <Link to="/#">Loading...</Link>
          </li>
        );
    }
  };

   const renderContentAdmin = () => {
    switch (props.admin.isAuthenticatedAdmin) {
      case null:
        return renderContent();
      case true:
        return (
          <React.Fragment>
            <li>
              <a onClick={() => props.logoutAdmin()}>LOGOUT A</a>
            </li>
            <li>
              <Link to="/adminDashboard">DASHBOARD</Link>
            </li>
          </React.Fragment>
        );
      case false:
        return renderContent();
      default:
        return renderContent();
    }
  };

  useEffect(() => {}, []);

  return (
    <React.Fragment>
      <nav>
        <div class="nav-wrapper orange">
          <a href="#" class="brand-logo center">
            <img
              className="sidenav-trigger responsive-img"
              data-target="slide-out"
              src={`/images/BrandLogoPng.png`}
            />
          </a>
          <ul id="nav-mobile" class="left hide-on-med-and-down">
            <li>
              <i
                data-target="slide-out"
                className="sidenav-trigger material-icons"
              >
                menu
              </i>
            </li>
          </ul>
        </div>
      </nav>

      <ul id="slide-out" className="sidenav">
        <li>
          <div className="user-view">
            <div className="background">
              <img src="images/office.jpg" />
            </div>
            <a href="#user">
              <img className="circle" src="images/yuna.jpg" />
            </a>
            <a href="#name">
              <span className="white-text name">John Doe</span>
            </a>
            <a href="#email">
              <span className="white-text email">jdandturk@gmail.com</span>
            </a>
          </div>
        </li>
        <li>
          <Link to="/">HOME</Link>
        </li>
        <li>
          <Link to="/product">PRODUCTS</Link>
        </li>
        <li>
          <div className="divider"></div>
        </li>
        <li>
          <Link to="/enquiry">ENQUIRY</Link>
        </li>
        <li>
          <Link to="/contact">CONTACT US</Link>
        </li>
        <li>
          <Link to="/about">ABOUT US</Link>
        </li>
        <li>
          <Link to="/career">CAREER</Link>
        </li>
        {renderContentAdmin()}
      </ul>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth,
    admin: state.authAdmin,
  };
};

export default connect(mapStateToProps, { logout, logoutAdmin })(Navbar);

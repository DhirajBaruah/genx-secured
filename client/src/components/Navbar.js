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
            <li className="sidenav-close">
              <a onClick={() => props.logout()}>LOGOUT</a>
            </li>
            <li className="sidenav-close">
              <Link to="/profile">PROFILE</Link>
            </li>
            <li className="sidenav-close">
              <Link to={`/Wishlist/${props.user.user.id}`}>WISHLIST</Link>
            </li>
            <li className="sidenav-close">
              <Link to={`/myOrders/${props.user.user.id}`}>MY ORDERS</Link>
            </li>
          </React.Fragment>
        );

      case false:
        return (
          <li className="sidenav-close">
            <Link to="/signup">SIGNUP/LOGIN</Link>
          </li>
        );
      default:
        return (
          <li className="sidenav-close">
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
            <li className="sidenav-close">
              <a onClick={() => props.logoutAdmin()}>LOGOUT A</a>
            </li>
            <li className="sidenav-close">
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
      <nav className="noprint">
        <div class="nav-wrapper" style={{background: "linear-gradient(135deg, rgba(193,44,44,1) 9%, rgba(28,47,47,1) 95%)"}}>
          <a href="#" class="brand-logo center">
            <img
              className="sidenav-trigger responsive-img"
              data-target="slide-out"
              src={`/uploads/BrandLogoPng.png`}
            />
          </a>
          <ul id="nav-mobile" class="left ">
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

      <ul id="slide-out" style={{background: "linear-gradient(135deg, rgba(193,44,44,1) 9%, rgba(28,47,47,1) 95%)"}} className="sidenav">
        <li className="sidenav-close">
          <Link to="/">HOME</Link>
        </li>
        <li className="sidenav-close">
          <Link to="/product">PRODUCTS</Link>
        </li>
        <li className="sidenav-close">
          <div className="divider black"></div>
        </li>
        <li className="sidenav-close">
          <Link to="/enquiry">ENQUIRY</Link>
        </li>
        <li className="sidenav-close">
          <Link to="/contact">CONTACT US</Link>
        </li>
        <li className="sidenav-close">
          <Link to="/about">ABOUT US</Link>
        </li>
        <li className="sidenav-close">
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

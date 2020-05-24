import React, { useState, useEffect } from "react";
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';
import "../stickyNav.css"
const Navbar = (props) => {


 const renderContent = ()=>{
       switch(props.user){
           case null:
               return <a href="/">loading</a>
           case false:  
               return  <Link to="/signup">SIGNUP/LOGIN</Link>
           default:
              if(props.user.status=="admin"){
                  return(
                    <React.Fragment>
                      <a href="/api/logout">LOGOUT</a>
                      <Link to="/allOrders">ALL ORDERS</Link>
                    </React.Fragment>
                  )                 
              }else{
                return(
                    <React.Fragment>
                      <a href="/api/logout">logout</a>
                      <Link to="/profile">profile</Link>
                       <Link to={`/Wishlist/${props.user._id}`}>Wishlist</Link>
                    </React.Fragment>
                )  
              }
  
       }
   }





 useEffect(() => {
    const header = document.getElementById("navbar");
    const sticky = header.offsetTop;
    const scrollCallBack = window.addEventListener("scroll", () => {
      if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
       
      } else {
        header.classList.remove("sticky");
        
      }
    });
    return () => {
      window.removeEventListener("scroll", scrollCallBack);
    };
  }, []);

 
return(
 

  <div id="navbar"  >
    <Link to="/">HOME</Link>
    <Link to="/product">PRODUCTS</Link>
    <Link to="/enquiry">ENQUIRY</Link>
    <Link to="/contact">CONTACT US</Link>
    <Link to="/about">ABOUT US</Link>
    <Link to="/career">CAREER</Link>
    {renderContent()}
  </div>

);
  
}


const mapStateToProps = (state)=>{
    return {
        user:state.auth
    }
}


export default connect(mapStateToProps)(Navbar);


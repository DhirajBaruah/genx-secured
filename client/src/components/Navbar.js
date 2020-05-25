import React, { useState, useEffect } from "react";
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';
import "../stickyNav.css"
const Navbar = (props) => {


 const renderContent = ()=>{
       switch(props.user){
           case null:
               return <li><a href="/">loading</a></li>
           case false:  
               return  <li><Link to="/signup">SIGNUP/LOGIN</Link></li>
           default:
              if(props.user.status=="admin"){
                  return(
                    <React.Fragment>
                      <li><a href="/api/logout">LOGOUT</a></li>
                      <li><Link to="/allOrders">ALL ORDERS</Link></li>
                    </React.Fragment>
                  )                 
              }else{
                return(
                    <React.Fragment>
                      <li><a href="/api/logout">logout</a></li>
                      <li><Link to="/profile">profile</Link></li>
                       <li><Link to={`/Wishlist/${props.user._id}`}>Wishlist</Link></li>
                    </React.Fragment>
                )  
              }
  
       }
   }





 useEffect(() => {
   
  }, []);

 
return(
 <React.Fragment>
   <nav >
    <div  class="nav-wrapper orange">
      <a href="#" class="brand-logo center">
        <img className="sidenav-trigger responsive-img" data-target="slide-out" src={`/images/BrandLogoPng.png`}/>
      </a>
      <ul id="nav-mobile" class="left hide-on-med-and-down">
        
        <li><i data-target="slide-out" className="sidenav-trigger material-icons">menu</i></li>
        
      </ul>
    </div>
  </nav>

  <ul id="slide-out" className="sidenav">
    <li><div className="user-view">
      <div className="background">
        <img src="images/office.jpg"/>
      </div>
      <a href="#user"><img className="circle" src="images/yuna.jpg"/></a>
      <a href="#name"><span className="white-text name">John Doe</span></a>
      <a href="#email"><span className="white-text email">jdandturk@gmail.com</span></a>
    </div></li>
    <li><Link to="/">HOME</Link></li>
    <li><Link to="/product">PRODUCTS</Link></li>
    <li><div className="divider"></div></li>
    <li><Link to="/enquiry">ENQUIRY</Link></li>
    <li><Link to="/contact">CONTACT US</Link></li>
    <li><Link to="/about">ABOUT US</Link></li>
    <li><Link to="/career">CAREER</Link></li>
    {renderContent()}
  </ul>
  </React.Fragment>

);
  
}


const mapStateToProps = (state)=>{
    return {
        user:state.auth
    }
}


export default connect(mapStateToProps)(Navbar);


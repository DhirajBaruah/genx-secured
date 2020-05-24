import React,{useEffect} from "react";
import Home from "./components/Home";
import About from "./components/About";
import Career from "./components/Career";
import Contact from "./components/Contact";
import Enquiry from "./components/Enquiry";
import Product from "./components/Product";
import Signup from "./components/Signup";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import CategoryExplored from "./components/CategoryExplored";
import ListOfProducts from "./components/ListOfProducts";
import ProductExplored from "./components/ProductExplored";
import Wishlist from "./components/Wishlist";
import ConfirmOrders from "./components/ConfirmOrders";
import ModeOfPayment from "./components/ModeOfPayment";
import GenXAdmin from "./AdminComponent/EntryPage";
import AllOrders from "./AdminComponent/AllOrders";
import MyOrders from "./components/MyOrders";
import {BrowserRouter, Route} from 'react-router-dom';
import {connect} from 'react-redux'
import {fetchUserAction} from './actions/myactions'




function App(props) {
  useEffect(()=>{
     props.fetch_user()
  },[])

 
       



return(

  
 


 <BrowserRouter>

   
  
      <Navbar/>
        <Route exact path='/' component={Home}/>
        <Route path='/about' component={About}/>
        <Route path='/career' component={Career}/>
        <Route path='/contact' component={Contact}/>
        <Route path='/product' component={Product}/>
        <Route path='/enquiry' component={Enquiry}/>
        <Route path='/signup' component={Signup}/>
        <Route path='/categoryExplored/:categoryName' component={CategoryExplored}/>
        <Route path='/listOfProducts/:id' component={ListOfProducts}/>
        <Route path='/ProductExplored/:productId' component={ProductExplored}/>
        <Route path='/GenXAdmin/12345' component={GenXAdmin}/>
        <Route path='/allOrders' component={AllOrders}/>
        <Route path='/Wishlist/:userId' component={Wishlist}/>
        <Route path='/confirmOrders/:productId' component={ConfirmOrders}/>
        <Route path='/modeOfPayment/:userId/:addressId/:productId/:qty/:payableAmount' component={ModeOfPayment}/>
        <Route path='/myOrders/:userId' component={MyOrders}/>
        <Footer/>

  
    
    </BrowserRouter>
);
}


const mapDispathToProps = (dispatch)=>{
  return {
    fetch_user:()=>{dispatch(fetchUserAction())}
  }
}

export default connect(null,mapDispathToProps)(App);

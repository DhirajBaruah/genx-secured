//////////Make ProductCategory Name unique
import React, { useEffect } from "react";
import "./App.css"
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
import AdminOrders from "./AdminComponent/AdminOrders";
import AdminDashboard from "./AdminComponent/AdminDashboard";
import ProductCategoryUpload from "./AdminComponent/ProductCategoryUpload";
import ProductUpload from "./AdminComponent/ProductUpload";
import AdminNavbar from "./AdminComponent/AdminNavbar";
import AdminEdit from "./AdminComponent/AdminEdit";
import EditProduct from "./AdminComponent/EditProduct";
import EditProductCategory from "./AdminComponent/EditProductCategory";
import MyOrders from "./components/MyOrders";
import ForgotPass from "./components/ForgotPass";
import PrintInvoice from "./components/PrintInvoice";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import { loadUser } from "./redux/app/actions/authAction";
import { loadAdmin } from "./redux/admin/actions/authActionAdmin";
import M from "materialize-css";


function App(props) {
  
  useEffect(() => {
    props.loadUser();
  props.loadAdmin();
    var elems = document.querySelectorAll(".sidenav");
    var instances = window.M.Sidenav.init(elems, {});
  }, []);

  return (
    <BrowserRouter>
      <Navbar />
      {props.admin.isAuthenticatedAdmin ? <AdminNavbar /> : null}
      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/career" component={Career} />
      <Route path="/contact" component={Contact} />
      <Route path="/product" component={Product} />
      <Route path="/enquiry" component={Enquiry} />
      <Route
        path="/signup"
        component={props.user.isAuthenticated ? Home : Signup}
      />
      <Route
        path="/myOrders/:userId"
        component={props.user.isAuthenticated ? MyOrders : Signup}
      />
      <Route
        path="/categoryExplored/:categoryName"
        component={CategoryExplored}
      />
      <Route path="/listOfProducts/:id" component={ListOfProducts} />
      <Route path="/ProductExplored/:productId" component={ProductExplored} />
      <Route path="/GenXAdmin/12345" component={GenXAdmin} />
      <Route path="/Wishlist/:userId" component={Wishlist} />
      <Route path="/confirmOrders/:productId" component={ConfirmOrders} />
      <Route path="/forgotPass" component={ForgotPass} />
      <Route
        path="/modeOfPayment/:userId/:addressId/:productId/:qty/:payableAmount"
        component={ModeOfPayment}
      />
     
      <Route path="/adminDashboard" component={props.admin.isAuthenticatedAdmin ? AdminDashboard : Home} />
      <Route path="/adminOrders" component={props.admin.isAuthenticatedAdmin ? AdminOrders : Home} />
      <Route path="/addProductCategory" component={props.admin.isAuthenticatedAdmin ? ProductCategoryUpload : Home} />
      <Route path="/addProduct" component={props.admin.isAuthenticatedAdmin ? ProductUpload : Home} />
      <Route path="/adminEdit" component={props.admin.isAuthenticatedAdmin ? AdminEdit : Home} />
      <Route path="/editProduct/:productId" component={props.admin.isAuthenticatedAdmin ? EditProduct : Home} />
      <Route path="/printInvoice/:orderId" component={props.admin.isAuthenticatedAdmin || props.user.isAuthenticated ? PrintInvoice : Home} />
      <Route path="/editProductCategory/:productCategoryId" component={props.admin.isAuthenticatedAdmin ? EditProductCategory : Home} />
      <Footer />
    </BrowserRouter>
  );
}


const mapStateToProps = (state) => {
  return {
    user: state.auth,
    admin: state.authAdmin
  };
};

export default connect(mapStateToProps, { loadUser, loadAdmin })(App);

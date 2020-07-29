import React, { useState, useEffect } from "react";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import Modal from "react-modal";
import "materialize-css/dist/css/materialize.min.css";
import { connect } from "react-redux";
import axios from "axios";
import { Link, withRouter} from "react-router-dom";
import { register } from "../redux/app/actions/authAction";
import { login } from "../redux/app/actions/authAction";
import { clearErrors } from "../redux/app/actions/errorAction";

Modal.setAppElement("#root");
//for reg/login
const ProductExplored = (props) => {
  const [fname, setfname] = useState("");
  const [lname, setlname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [msg, setmsg] = useState(null);
  //for this comp
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState("loading");
  const [images, setImages] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setImages([
      `/uploads/${props.match.params.productId}1.jpg`,
      `/uploads/${props.match.params.productId}2.jpg`,
      `/uploads/${props.match.params.productId}3.jpg`,
      `/uploads/${props.match.params.productId}4.jpg`,
    ]);
    fetch(`/app/productExplored/${props.match.params.productId}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((res2) => {
        setData(res2);
      });
  }, []);
  useEffect(() => {
    // Check for register error
    if (props.error.id === "REGISTER_FAIL") {
      setmsg(props.error.msg.error);
    } else if (props.error.id === "LOGIN_FAIL") {
      setmsg(props.error.msg.error);
    } else {
      setmsg(null);
    }

    // If authenticated, go home

    if (props.isAuthenticated) {
      setShowModal(false);
    }
  }, [props.error, props.isAuthenticated]);

  const addToWishlist = () => {
    const formData = new FormData();
    formData.append("productId", props.match.params.productId);
    formData.append("userId", props.user._id);
    axios.post("/app/addToWishlists", formData, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
  };

  const renderContent = () => {
    switch (props.isAuthenticated) {
      case false:
        return (
          <React.Fragment>
            <a
              href="#"
              className=" btn modal-trigger"
              onClick={() => setShowModal(true)}
            >
              <i class="material-icons left">fitness_center</i>Buy Now
            </a>
            {/*  <a
              style={{ marginLeft: 20 }}
              className=" btn modal-trigger"
              onClick={() => setShowModal(true)}
            >
              <i class="material-icons left">add_shopping_cart</i>Wishlist
            </a>*/}
          </React.Fragment>
        );

      case true:
        return (
          <React.Fragment>
            <Link
              to={`/confirmOrders/${props.match.params.productId}`}
              className=" btn modal-trigger"
            >
              <i class="material-icons left">fitness_center</i>Buy Now
            </Link>
            <a
              href="#"
              style={{ marginLeft: 20 }}
              className="btn waves-effect waves-light blue-grey darken-1"
              onClick={() => addToWishlist()}
            >
              <i class="material-icons left">add_shopping_cart</i>Wishlist
            </a>
          </React.Fragment>
        );
      default:
        return (
          <React.Fragment>
            <a
              href="#"
              className=" btn modal-trigger"
              onClick={() => setShowModal(true)}
            >
              <i class="material-icons left">fitness_center</i>Buy Now
            </a>
            <a
              href="#"
              style={{ marginLeft: 20 }}
              className=" btn modal-trigger"
              onClick={() => setShowModal(true)}
            >
              <i class="material-icons left">add_shopping_cart</i>Wishlist
            </a>
          </React.Fragment>
        );
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col s12 l8 ">
          <div className="row" style={{ paddingTop: 20 }}>
            <div className="col s6 ">
              {" "}
              <img
                onClick={() => setIsOpen(true)}
                className="responsive-img"
                src={`/uploads/${props.match.params.productId}1.jpg`}
              />
            </div>
            <div className="col s6 ">
              {" "}
              <img
                onClick={() => setIsOpen(true)}
                className="responsive-img"
                src={`/uploads/${props.match.params.productId}2.jpg`}
              />
            </div>
          </div>
          <div className="row">
            <div className="col s6 ">
              {" "}
              <img
                onClick={() => setIsOpen(true)}
                className="responsive-img"
                src={`/uploads/${props.match.params.productId}3.jpg`}
              />
            </div>
            <div className="col s6 ">
              {" "}
              <img
                onClick={() => setIsOpen(true)}
                className="responsive-img"
                src={`/uploads/${props.match.params.productId}4.jpg`}
              />
            </div>
          </div>
          <div class="video-container">
            <iframe
              width="853"
              height="480"
              src="//www.youtube.com/embed/Q8TXgCzxEnw?rel=0"
              frameborder="0"
              allowfullscreen
            ></iframe>
          </div>
        </div>

        <div className="col s12 l4 ">
          <h3>{data[0].productName}</h3>
          <h5>Rs. {data[0].price} </h5>
          {renderContent()}
          <p class="grey-text text-darken-2">{data[0].specification} </p>
        </div>
      </div>

      {isOpen && (
        <Lightbox
          mainSrc={images[photoIndex]}
          nextSrc={images[(photoIndex + 1) % images.length]}
          prevSrc={images[(photoIndex + images.length - 1) % images.length]}
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={() =>
            setPhotoIndex((photoIndex + images.length - 1) % images.length)
          }
          onMoveNextRequest={() =>
            setPhotoIndex((photoIndex + 1) % images.length)
          }
        />
      )}

      <Modal isOpen={showModal} contentLabel="Minimal Modal Example">
        <button
          
          className="btn-floating  right red btn-small"
          onClick={() => setShowModal(false)}
        >
          <i class="material-icons left">close</i>
        </button>
        <div>
          {msg ? alert(`${msg}`) : null}
          <div className="row container">
            <div className="col s12 l6" style={{ textAlign: "center" }}>
              <h3>SIGN UP</h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  //Attempt to register
                  props.register(fname, lname, email, password);
                }}
              
              >
            
                  <div className="input-field">
                    <input
                      onChange={(e) => {
                        setemail(e.target.value);
                        props.clearErrors();
                      }}
                      id="email"
                      type="email"
                      name="email"
                      className="validate"
                    />
                    <label htmlFor="email">Email</label>
                  </div>
               
                  <div className="input-field">
                    <input
                      onChange={(e) => setpassword(e.target.value)}
                      id="password"
                      type="password"
                      name="password"
                      className="validate"
                    />
                    <label htmlFor="password">Password</label>
                  </div>
             
                  <div className="input-field">
                    <input
                      onChange={(e) => setfname(e.target.value)}
                      id="fname"
                      type="text"
                      name="fname"
                      className="validate"
                    />
                    <label htmlFor="password">First name</label>
                  </div>
             
                  <div className="input-field">
                    <input
                      onChange={(e) => setlname(e.target.value)}
                      id="lname"
                      type="text"
                      name="lname"
                      className="validate"
                    />
                    <label htmlFor="password">Last name</label>
                  </div>
             
                <button
                  className="btn waves-effect waves-light blue-grey darken-1"
                  type="submit"
                  name="action"
                >
                  Signup
                  <i className="material-icons right">send</i>
                </button>
              </form>
            </div>

            <div className="col s12 l6" style={{ textAlign: "center" }}>
              <h3>LOGIN </h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  //Attempt to login
                  props.login(email, password);
                }}
              
              >
              
                  <div className="input-field">
                    <input
                      onChange={(e) => {
                        setemail(e.target.value);
                      }}
                      id="email"
                      type="email"
                      name="email"
                      className="validate"
                    />
                    <label htmlFor="email">Email</label>
                  </div>
           
                  <div className="input-field">
                    <input
                      onChange={(e) => setpassword(e.target.value)}
                      id="password"
                      type="password"
                      name="password"
                      className="validate"
                    />
                    <label htmlFor="password">Password</label>
                  </div>
            
                <button
                  className="btn waves-effect waves-light blue-grey darken-1"
                  type="submit"
                  name="action"
                >
                  Login
                  <i className="material-icons right">send</i>
                </button><br /><br />
                 <Link to="/forgotPass" style={{color:"red"}}><i className="material-icons">help_outline</i><br />forgot password</Link>
              </form>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error,
  };
};

export default connect(mapStateToProps, { register, clearErrors, login })(
  ProductExplored
);

import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import Modal from "react-modal";
import "materialize-css/dist/css/materialize.min.css";
import { connect } from "react-redux";
import Signup from "./Signup";
import ProductImageUpload from "../AdminComponent/ProductImageUpload";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";
import { register } from "../actions/authAction";
import { login } from "../actions/authAction";
import { clearErrors } from "../actions/errorAction";


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
    fetch(`/app/productExplored/${props.match.params.productId}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((res2) => {
        setData(res2);
        setImages([
          `/images/${res2[0].productName}1.jpg`,
          `/images/${res2[0].productName}2.jpg`,
          `/images/${res2[0].productName}3.jpg`,
          `/images/${res2[0].productName}4.jpg`,
        ]);
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
      setShowModal(false)
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
    switch (props.user.isAuthenticated) {
      case false:
        return (
          <React.Fragment>
            <a
              className=" btn modal-trigger"
              onClick={() => setShowModal(true)}
            >
              <i class="material-icons left">fitness_center</i>Buy Now
            </a>
            <a
              style={{ marginLeft: 20 }}
              className=" btn modal-trigger"
              onClick={() => setShowModal(true)}
            >
              <i class="material-icons left">add_shopping_cart</i>Wishlist
            </a>
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
              className=" btn modal-trigger"
              onClick={() => setShowModal(true)}
            >
              <i class="material-icons left">fitness_center</i>Buy Now
            </a>
            <a
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

  let isAdmin = true;
  if (props.user) {
    if (props.user.status == "admin") {
      isAdmin = false;
    } else {
      isAdmin = true;
    }
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col s8 ">
          <div className="row" style={{ paddingTop: 20 }}>
            <div className="col s6 ">
              {" "}
              <img
                onClick={() => setIsOpen(true)}
                className="responsive-img"
                src={`/images/${data[0].productName}1.jpg`}
              />
              <ProductImageUpload
                productName={data[0].productName + "1"}
                isAdmin={isAdmin}
              />
            </div>
            <div className="col s6 ">
              {" "}
              <img
                onClick={() => setIsOpen(true)}
                className="responsive-img"
                src={`/images/${data[0].productName}2.jpg`}
              />
              <ProductImageUpload
                productName={data[0].productName + "2"}
                isAdmin={isAdmin}
              />
            </div>
          </div>
          <div className="row">
            <div className="col s6 ">
              {" "}
              <img
                onClick={() => setIsOpen(true)}
                className="responsive-img"
                src={`/images/${data[0].productName}3.jpg`}
              />
              <ProductImageUpload
                productName={data[0].productName + "3"}
                isAdmin={isAdmin}
              />
            </div>
            <div className="col s6 ">
              {" "}
              <img
                onClick={() => setIsOpen(true)}
                className="responsive-img"
                src={`/images/${data[0].productName}4.jpg`}
              />
              <ProductImageUpload
                productName={data[0].productName + "4"}
                isAdmin={isAdmin}
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

        <div className="col s4 ">
          <h2>{data[0].productName}</h2>
          <h4>Rs. {data[0].price} </h4>
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
          style={{ marginLeft: 1200 }}
          className="btn-floating btn-large waves-effect waves-light red btn-small"
          onClick={() => setShowModal(false)}
        >
          <i class="material-icons left">close</i>
        </button>
            <div>
      {msg ? alert(`${msg}`) : null}
      <div className="row">
        <div className="col s6" style={{ textAlign: "center" }}>
          <h3>SIGN UP</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              //Attempt to register
              props.register(fname, lname, email, password);
            }}
            className="col s7"
            style={{
              marginLeft: 200,
            }}
          >
            <div className="row">
              <div className="input-field col s12">
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
            </div>

            <div className="row">
              <div className="input-field col s12">
                <input
                  onChange={(e) => setpassword(e.target.value)}
                  id="password"
                  type="password"
                  name="password"
                  className="validate"
                />
                <label htmlFor="password">Password</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input
                  onChange={(e) => setfname(e.target.value)}
                  id="fname"
                  type="text"
                  name="fname"
                  className="validate"
                />
                <label htmlFor="password">First name</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input
                  onChange={(e) => setlname(e.target.value)}
                  id="lname"
                  type="text"
                  name="lname"
                  className="validate"
                />
                <label htmlFor="password">Last name</label>
              </div>
            </div>

            <button
              className="btn waves-effect waves-light blue-grey darken-1"
              type="submit"
              name="action"
            >
              Submit
              <i className="material-icons right">send</i>
            </button>
          </form>
        </div>

        <div className="col s6" style={{ textAlign: "center" }}>
          <h3>LOGIN </h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              //Attempt to login
              props.login(email, password);
            }}
            className="col s7"
            style={{
              marginLeft: 100,
            }}
          >
            <div className="row">
              <div className="input-field col s12">
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
            </div>

            <div className="row">
              <div className="input-field col s12">
                <input
                  onChange={(e) => setpassword(e.target.value)}
                  id="password"
                  type="password"
                  name="password"
                  className="validate"
                />
                <label htmlFor="password">Password</label>
              </div>
            </div>

            <button
              className="btn waves-effect waves-light blue-grey darken-1"
              type="submit"
              name="action"
            >
              Submit
              <i className="material-icons right">send</i>
            </button>
          </form>
        </div>
      </div>

      <div className="row" style={{ textAlign: "center", paddingTop: 50 }}>
        <a
          className="btn waves-effect waves-light red darken-1"
          href="/app/auth/google"
        >
          SIGNUP/LOGIN WITH GOOGLE{" "}
        </a>
        <a
          className="btn waves-effect waves-light  blue darken-4"
          href="/app/auth/google"
          style={{ marginLeft: 100 }}
        >
          SIGNUP/LOGIN WITH FACEBOOK
        </a>
      </div>
    </div>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth,
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error,
  };
};

export default connect(mapStateToProps, { register, clearErrors, login })(ProductExplored);

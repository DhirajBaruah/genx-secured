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
import { Link } from "react-router-dom";

Modal.setAppElement("#root");

const ProductExplored = (props) => {
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
    switch (props.user) {
      case null:
        return <a href="/">loading</a>;
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

      default:
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
        <Signup />
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth,
  };
};

export default connect(mapStateToProps)(ProductExplored);

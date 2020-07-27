import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { withRouter } from "react-router-dom";

const ModeOfPayment = (props) => {
  const [mode, setMode] = useState("");

  // const token = props.user.token;

  // Headers
  const config = {
    headers: {
      "Content-type": "application/json",
    },
    credentials:'include'
  };

  // If token, add to headers
  // if (token) {
  //   config.headers["x-auth-token"] = token;
  // }

  const placeOrder = () => {
    if (mode === "cod") {
      const formData = new FormData();
      formData.append("userId", props.match.params.userId);
      formData.append("addressId", props.match.params.addressId);
      formData.append("productId", props.match.params.productId);
      formData.append("quantity", props.match.params.qty);
      formData.append("payableAmount", props.match.params.payableAmount);
      formData.append("modeOfPayment", mode);
      formData.append("status", "pending");

      axios
        .post("/app/placeOrder", formData,config, (req, res) => {})
        .then((res) => {
          console.log(res);
          if (res.data.success == true) {
            props.history.push(`/myOrders/${props.user.user._id}`);
          }
        });
    } else {
      props.history.push(`/`);
    }
  };

  const renderContent = () => {
    switch (props.user.isAuthenticated) {
      case null:
        return <a href="/">loading</a>;
      case false:
        return (
          <React.Fragment>
            <h1>Please Login</h1>
          </React.Fragment>
        );

      case true:
        return (
          <React.Fragment>
            <div className="row">
              <h4>Payment</h4>
            </div>
            <div className="row">
              <p>
                <label>
                  <input
                    name="group1"
                    type="radio"
                    onChange={() => setMode("card")}
                  />
                  <span>Credit/Debit Card</span>
                </label>
              </p>
              <p>
                <label>
                  <input
                    name="group1"
                    type="radio"
                    onChange={() => setMode("cod")}
                  />
                  <span>Cash on delivery</span>
                </label>
              </p>
            </div>
            <div className="row">
              <a
                class="waves-effect waves-light btn"
                onClick={() => {
                  if (mode == "") {
                    alert("Please select payment mode.");
                  } else {
                    placeOrder();
                  }
                }}
              >
                Continue
              </a>
            </div>
          </React.Fragment>
        );
      default:
        return (
          <React.Fragment>
            <h1>Please Login</h1>
          </React.Fragment>
        );
    }
  };

  return renderContent();
};

const mapStateToProps = (state) => {
  return {
    user: state.auth,
  };
};

export default connect(mapStateToProps)(ModeOfPayment);

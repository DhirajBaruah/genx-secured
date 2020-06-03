import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";

const AllOrders = (props) => {
  const [Orders, setOrders] = useState();
  const [elements2, setElements2] = useState("");
  let element = [];

  useEffect(() => {
    axios
      .get("/admin/getAllOrders", {})
      .then((result) => {
        console.log(result);
        for (var i = 0; i < result.data.length; i++) {
          if (result.data[i].status === "pending") {
            element.push(
              <React.Fragment>
                <div
                  className="row container"
                  style={{ backgroundColor: "#e57373" }}
                >
                  <div className="col sm4">
                    <p>
                      ORDER ID : {result.data[i]._id} <br />
                      <br />
                      USER ID : {result.data[i].userDetails[0]._id} <br />
                      USER NAME : {result.data[i]._id} <br />
                      <br />
                      ADDRESS ID : {result.data[i].addressDetails[0]._id} <br />
                      ADDREE LINE 1 :{" "}
                      {result.data[i].addressDetails[0].addressLine1} <br />
                      ADDRESS LINE 2 :{" "}
                      {result.data[i].addressDetails[0].addressLine2} <br />
                      CITY : {result.data[i].addressDetails[0].city} <br />
                      STATE :{result.data[i].addressDetails[0].state} <br />
                      PIN CODE : {result.data[i].addressDetails[0].pinCode}{" "}
                      <br />
                      NATION : {result.data[i].addressDetails[0].nation} <br />
                      <br />
                      PRODUCT ID : {result.data[i].productDetails[0]._id} <br />
                      PRODUCT NAME :{" "}
                      {result.data[i].productDetails[0].productName} <br />
                      PRICE : {result.data[i].productDetails[0].price} <br />
                      WEIGHT : {result.data[i].productDetails[0].weight} <br />
                      LENGTH : {result.data[i].productDetails[0].length} <br />
                      <br />
                      QUANTITY : {result.data[i].quantity} <br />
                      PAYABLE AMOUNT : {result.data[i].payableAmount} <br />
                      MODE OF PAYMENT : {result.data[i].modeOfPayment} <br />
                      ORDER STATUS : {result.data[i].status} <br />
                      ORDER CREATED : {result.data[i].createdAt} <br />
                      ORDER UPDATED : {result.data[i].updatedAt} <br />
                    </p>
                  </div>
                  <div className="col sm4">
                    <a className=" waves-effect waves-light btn">
                      PRINT ADDRESS
                    </a>
                  </div>
                  <div className="col sm4">
                    <a className=" waves-effect waves-light btn">
                      START SHIPMENT
                    </a>
                  </div>
                </div>
                <br />
              </React.Fragment>
            );
          } else if (result.data[i].status === "processing") {
            element.push(
              <React.Fragment>
                <div
                  className="row container"
                  style={{ backgroundColor: "#ffb74d" }}
                >
                  <div className="col sm4">
                    <p>
                      ORDER ID : {result.data[i]._id} <br />
                      <br />
                      USER ID : {result.data[i].userDetails[0]._id} <br />
                      USER NAME : {result.data[i]._id} <br />
                      <br />
                      ADDRESS ID : {result.data[i].addressDetails[0]._id} <br />
                      ADDREE LINE 1 :{" "}
                      {result.data[i].addressDetails[0].addressLine1} <br />
                      ADDRESS LINE 2 :{" "}
                      {result.data[i].addressDetails[0].addressLine2} <br />
                      CITY : {result.data[i].addressDetails[0].city} <br />
                      STATE :{result.data[i].addressDetails[0].state} <br />
                      PIN CODE : {result.data[i].addressDetails[0].pinCode}{" "}
                      <br />
                      NATION : {result.data[i].addressDetails[0].nation} <br />
                      <br />
                      PRODUCT ID : {result.data[i].productDetails[0]._id} <br />
                      PRODUCT NAME :{" "}
                      {result.data[i].productDetails[0].productName} <br />
                      PRICE : {result.data[i].productDetails[0].price} <br />
                      WEIGHT : {result.data[i].productDetails[0].weight} <br />
                      LENGTH : {result.data[i].productDetails[0].length} <br />
                      <br />
                      QUANTITY : {result.data[i].quantity} <br />
                      PAYABLE AMOUNT : {result.data[i].payableAmount} <br />
                      MODE OF PAYMENT : {result.data[i].modeOfPayment} <br />
                      ORDER STATUS : {result.data[i].status} <br />
                      ORDER CREATED : {result.data[i].createdAt} <br />
                      ORDER UPDATED : {result.data[i].updatedAt} <br />
                    </p>
                  </div>
                  <div className="col sm4">
                    <a className=" waves-effect waves-light btn">
                      PRINT ADDRESS
                    </a>
                  </div>
                </div>
                <br />
              </React.Fragment>
            );
          }
        }
        setElements2(element);
      })
      .catch((err) => {});
  }, []);

  const renderContent = () => {
    switch (props.user) {
      case null:
        return <a href="/">loading</a>;
      case false:
        return <h1>Restricted Page Leave emmidiately</h1>;
      default:
        if (props.user.status == "admin") {
          return (
            <React.Fragment>
              <h1>Welcome Admin</h1>
              {elements2}
            </React.Fragment>
          );
        } else {
          return <h1>Access Denied</h1>;
        }
    }
  };

  return renderContent();
};

const mapStateToProps = (state) => {
  return {
    user: state.auth,
  };
};

export default connect(mapStateToProps)(AllOrders);

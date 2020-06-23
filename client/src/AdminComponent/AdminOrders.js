import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";

const AdminOrders = (props) => {
  const [orders, setorders] = useState();
  const [status, setstatus] = useState("pending");
  const elements = [];

  useEffect(() => {
    // imitialize dropdown
    var elems = document.querySelectorAll("select");
    var instances = window.M.FormSelect.init(elems, {});
    axios
      .get(`/admin/getAllOrders/${status}`, {
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
      .then((res) => {
        console.log(JSON.stringify(res.data));
        res.data.map((item) => {
          elements.push(
            <tr>
              <th>{item._id}</th>
              <th>{item.userId}</th>
              <th>{item.addressId}</th>
              <th>{item.productId}</th>
              <th>{item.quantity}</th>
              <th>{item.payableAmount}</th>
              <th>{item.modeOfPayment}</th>
              <th>{item.createdAt}</th>
            </tr>
          );
        });
        setorders(elements);
      })
      .catch((err) => alert(err.message));
  }, [status]);

  const renderContent = () => {
    switch (props.admin.isAuthenticatedAdmin) {
      case null:
        return <a href="/">loading</a>;
      case false:
        return <h1>Restricted Page Leave emmidiately</h1>;
      case true:
        return (
          <React.Fragment>
            <select onChange={(e) => setstatus(e.target.value)}>
              <option value="pending">Choose status</option>
              <option value="pending">pending</option>
              <option value="processing">processing</option>
              <option value="delivered">delivered</option>
              <option value="cancelled">cancelled</option>
              <option value="refunded">refunded</option>
            </select>
            <span class="new badge">{status} orders</span>
            <table className="highlight responsive-table">
              <thead>
                <tr>
                  <th>Order id</th>
                  <th>User id</th>
                  <th>Address id</th>
                  <th>Product id</th>
                  <th>Quantity</th>
                  <th>Payable</th>
                  <th>Mode</th>
                  <th>Created</th>
                </tr>
              </thead>

              <tbody>
                {orders}
              </tbody>
            </table>
          </React.Fragment>
        );
      default:
        return <h1>Restricted Page Leave emmidiately</h1>;
    }
  };

  return renderContent();
};

const mapStateToProps = (state) => {
  return {
    admin: state.authAdmin,
  };
};

export default connect(mapStateToProps)(AdminOrders);

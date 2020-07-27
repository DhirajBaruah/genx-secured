import React, { useState, useEffect } from "react";
import axios from "axios";

const PrintInvoice = (props) => {

  const [content, setcontent] = useState({
    data: [{ address: [{}], listOfOrders: [{}] }],
  });
  useEffect(() => {
    const getMyOrders = async () => {
      try {
        const response = await axios.get(
          `/app/getOrder/${props.match.params.orderId}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        await setcontent(response);
      } catch (error) {
        console.log(error);
      }
    };
    getMyOrders();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <img
            alt="Brand Logo"
            className="responsive-img"
            style={{ width: "100%" }}
            src={`/images/BrandLogo.jpg`}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12">
          <div className="invoice-title">
            <h2>Invoice</h2>
            <h3 className="pull-right">Order # {props.match.params.orderId}</h3>
          </div>
          <hr />
          <div className="row">
            <div className="col-xs-6 text-right">
              <address>
                <strong>Shipped To:</strong>
                <br />
                {content.data[0].address[0].addressLine1}
                <br />
                {content.data[0].address[0].addressLine2}
                <br />
                {content.data[0].address[0].city}
                <br />
                {content.data[0].address[0].state} -{" "}
                {content.data[0].address[0].pinCode},{" "}
                {content.data[0].address[0].nation}
              </address>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-6">
              <address>
                <strong>Payment Method: {content.data[0].modeOfPayment}</strong>
              </address>
            </div>
            <div className="col-xs-6 text-right">
              <address>
                <strong>Order Date:</strong>
                <br />
                {content.data[0].createdAt}
                <br />
                <br />
              </address>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title">
                <strong>Order summary</strong>
              </h3>
            </div>
            <div className="panel-body">
              <div className="table-responsive">
                <table className="table table-condensed">
                  <thead>
                    <tr>
                      <td>
                        <strong>Item</strong>
                      </td>
                      <td className="text-center">
                        <strong>Price</strong>
                      </td>
                      <td className="text-center">
                        <strong>Quantity</strong>
                      </td>
                      <td className="text-right">
                        <strong>Totals</strong>
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{content.data[0].listOfOrders[0].productName}</td>
                      <td className="text-center">
                        {content.data[0].listOfOrders[0].price}
                      </td>
                      <td className="text-center">
                        {content.data[0].quantity}
                      </td>
                      <td className="text-right">
                        {content.data[0].payableAmount}
                      </td>
                    </tr>
                    <tr>
                      <td className="thick-line"></td>
                      <td className="thick-line"></td>
                      <td className="thick-line text-center">
                        <strong>Total</strong>
                      </td>
                      <td className="thick-line text-right">
                        {content.data[0].payableAmount}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <i class="material-icons" onClick={() =>{window.print();}}>print</i>
        </div>
      </div>
    </div>
  );
};

export default PrintInvoice;

import React, { useState, useEffect } from "react";
import axios from "axios";

const MyOrders = (props) => {
  const [content, setcontent] = useState("");
  const element = [];
  useEffect(() => {
    // fetch myorder
    const getMyOrders = async () => {
      try {
        const response = await axios.get(
          `/app/getMyOrders/${props.match.params.userId}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        await response.data.map((orders) =>
          element.push(
            <li class="collection-item avatar">
              <img
                alt="product"
                className="activator responsive-img"
                style={{ height: "40%", width: "40%" }}
                src={`/images/${orders.productId}1.jpg`}
              /><br />
              <span class="title">Order id: {orders._id}</span>
              <p>
                Product: {orders.listOfOrders[0].productName} <br />
                Address:{orders.address[0].addressLine1}{', '}{orders.address[0].addressLine2}{', '}{orders.address[0].city}
              </p>
            </li>
          )
        );
        await setcontent(element);
      } catch (error) {
        console.log(error);
      }
    };
    getMyOrders();
  }, []);

  return (
    <div className="container">
      <ul class="collection">{content}</ul>
    </div>
  );
};

export default MyOrders;

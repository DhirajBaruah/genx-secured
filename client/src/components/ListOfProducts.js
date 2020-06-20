import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import CardProduct from "./CardProduct";

const ListOfProducts = (props) => {
  const [data, setData] = useState("loading");
  const [elements2, setElements2] = useState("");
  let elements = [];

  useEffect(function () {
    fetch(`/app/listOfProducts/${props.match.params.id}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((res2) => {
        setData(res2);
        for (var i = 0; i < res2.length; i++) {
          elements.push(
            <CardProduct productId={res2[i]._id} name={res2[i].productName} imgName={res2[i]._id}/>
          );
        }

        setElements2(elements);
      });
  }, []);

  return (
    <React.Fragment>
      <div className="container">
        <div className="row">{elements2}</div>
      </div>
    </React.Fragment>
  );
};

export default ListOfProducts;

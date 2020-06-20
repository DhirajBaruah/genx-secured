import React, { useState, useEffect } from "react";
import Cardio from "../images/Cardio.jpg";
import Strength from "../images/Strength.jpg";
import Accessories from "../images/Accessories.jpg";
import Card from "./Card";

const Product = () => {
  const [data, setData] = useState("loading");
  const [elements2, setElements2] = useState("");
  var elements = [];

  useEffect(function () {
    fetch("/app/category", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((res2) => {
        setData(res2);
        for (var i = 0; i < res2.length; i++) {
          // push the component to elements!
          elements.push(
            <Card
              explore={`categoryExplored/${res2[i].categoryName}`}
              name={res2[i].categoryName}
              imgname={res2[i].categoryName}
              details={res2[i].details}
            />
          );
        }
        setElements2(elements);
      });
  }, []);

  return (
    <React.Fragment>
      <div class="container">
        <div className="row">{elements2}</div>
      </div>
    </React.Fragment>
  );
};

export default Product;

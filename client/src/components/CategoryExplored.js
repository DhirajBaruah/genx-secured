import React, { useState, useEffect } from "react";
import Card from "./Card";

const CategoryExplored = (props) => {
  const [data, setData] = useState("loading");
  const [elements2, setElements2] = useState("");
  var elements = [];

  useEffect(function () {
    fetch(`/app/categoryExplored/${props.match.params.categoryName}`, {
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
                  explore={`listOfProducts/${res2[i]._id}`}
                  name={res2[i].productCategoryName}
                  imgname={res2[i]._id}
                  details={res2[i].details}
                />
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


export default CategoryExplored;

import React from "react";

const ProductThumbnail = (props) => {
  return (
    <div
      className="column"
      style={{ float: "left", paddingRight: 25, paddingLeft: 25 }}
    >
      <ul>
        <li>
          <img
            src={`/images/${props.name}.jpg`}
            alt="Snow"
            style={{ height: 200, width: 200 }}
          />
        </li>
        <li>
          <a href="">{props.name}</a>
        </li>
        <li>
          <a href="">Price:{props.price}</a>
        </li>
      </ul>
    </div>
  );
};

export default ProductThumbnail;

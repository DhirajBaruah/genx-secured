import React from "react";
import { Link } from "react-router-dom";

const CardProduct = (props) => {
  return (
    <React.Fragment>
      <Link to={`/ProductExplored/${props.productId}`}>
        <div className="col s12 m6">
          <div className="card ">
            <div className="card-image waves-effect waves-block waves-light">
              <img
                className="activator"
                style={{ height: 300, width: 300 }}
                src={`/images/${props.name}1.jpg`}
              />
            </div>
            <div className="card-content">
              <span className="card-title activator grey-text text-darken-4">
                {props.name}
                <i className="material-icons right">more_vert</i>
              </span>
              <p>PRICE</p>
            </div>
            <div className="card-reveal">
              <span className="card-title grey-text text-darken-4">
                {props.name}
                <i className="material-icons right">close</i>
              </span>
              <p>Write something about {props.name}</p>
            </div>
          </div>
        </div>
      </Link>
    </React.Fragment>
  );
};

export default CardProduct;

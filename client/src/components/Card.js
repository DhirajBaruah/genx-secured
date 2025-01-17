import React from "react";
import { Link } from "react-router-dom";

const Card = (props) => {
  const imageName = props.imgname.replace(/ /g, "");

  return (
    <React.Fragment>
      <div className="col s12 m6">
        <div className="card ">
          <div className="card-image">
            <img
              alt="img"
              className="activator responsive-img"
              style={{ height: 300, width: 300 }}
              src={`/uploads/${imageName}.jpg`}
            />
          </div>
          <div className="card-content">
            <span className="card-title activator grey-text text-darken-4">
              {props.name}
              <i className="material-icons right">more_vert</i>
            </span>
            <p>
              <Link to={`/${props.explore}`}>EXPLORE</Link>
            </p>
          </div>
          <div className="card-reveal">
            <span className="card-title grey-text text-darken-4">
              {props.name}
              <i className="material-icons right">close</i>
            </span>
            <p>{props.details}</p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Card;

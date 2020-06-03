import React from "react";
import { Link } from "react-router-dom";

const Card = (props) => {
  let id = props.id;
  let addressLine1 = props.addressLine1;
  let addressLine2 = props.addressLine2;
  let nation = props.nation;
  let city = props.city;
  let state = props.state;
  let pinCode = props.pinCode;

  const handleClick = (a) => {
    props.changeAddress(a);
  };

  const handleClick2 = (
    addressLine1,
    addressLine2,
    city,
    state,
    pinCode,
    nation
  ) => {
    props.selectedAddress(
      addressLine1,
      addressLine2,
      city,
      state,
      pinCode,
      nation
    );
  };

  return (
    <React.Fragment>
      <div className="row">
        <p>
          {props.addressLine1} <br />
          {props.addressLine2} <br />
          {props.city} <br />
          {props.state} - {props.pinCode} <br />
          {props.nation} <br />
          <button
            onClick={() => {
              handleClick(id);
              handleClick2(
                addressLine1,
                addressLine2,
                city,
                state,
                pinCode,
                nation
              );
            }}
          >
            Select Address
          </button>
        </p>
      </div>
    </React.Fragment>
  );
};

export default Card;

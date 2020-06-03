import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import CardAddress from "./CardAddress";
import CardProductForConfirmOrders from "./CardProductForConfirmOrders";
import "../confirmOrders.css";
import Modal from "react-modal";
import "materialize-css/dist/css/materialize.min.css";
import { withRouter } from "react-router-dom";

Modal.setAppElement("#root");
const ConfirmOrders = (props) => {
  const [DataOfAddresses, setDataOfAddresses] = useState("");
  const [ProductData, setProductData] = useState("");
  const [AddressId, setAddressId] = useState("");
  const [selectedNation, setselectedNation] = useState("");
  const [selectedState, setselectedState] = useState("");
  const [selectedCity, setselectedCity] = useState("");
  const [selectedPinCode, setselectedPinCode] = useState("");
  const [selectedAddressLine1, setselectedAddressLine1] = useState("");
  const [selectedAddressLine2, setselecteAddressLine2] = useState("");
  const [qty, setqty] = useState(1);
  const [price, setprice] = useState(0);
  const [total, setTotal] = useState(0);

  var element = [];
  var element2 = [];
  const [showModal, setShowModal] = useState(false);

  const changeAddress = (id) => {
    setAddressId(id);
    setShowModal(false);
  };
  const selectedAddress = (
    addressLine1,
    addressLine2,
    city,
    state,
    pinCode,
    nation
  ) => {
    setselectedAddressLine1(addressLine1);
    setselecteAddressLine2(addressLine2);
    setselectedCity(city);
    setselectedState(state);
    setselectedPinCode(pinCode);
    setselectedNation(nation);
  };

  useEffect(() => {
    axios.post(`/app/getDataOfAddresses/${props.user._id}`, {}).then((response) => {
      console.log(response);
      for (var i = 0; i < response.data.length; i++) {
        var id = response.data[i].nation;

        element.push(
          <React.Fragment>
            <CardAddress
              addressLine1={response.data[i].addressLine1}
              addressLine2={response.data[i].addressLine2}
              city={response.data[i].city}
              nation={response.data[i].nation}
              pinCode={response.data[i].pinCode}
              state={response.data[i].state}
              id={response.data[i]._id}
              changeAddress={changeAddress}
              selectedAddress={selectedAddress}
            />
          </React.Fragment>
        );
      }

      setDataOfAddresses(element);
    });

    axios
      .post(`/app/getDataOfProducts/${props.match.params.productId}`, {})
      .then((response2) => {
        console.log(response2);
        //   for(var i=0; i<response2.data.length; i++){

        //         element.push(<CardProductForConfirmOrders
        //         id={response2.data[i]._id}
        //         productName={response2.data[i].productName}
        //         price={response2.data[i].price}
        //         />)

        //     }

        element2.push(
          <React.Fragment>
            <div className="row">
              <div className="col s4">
                <img
                  className="responsive-img"
                  src={`/images/${response2.data[0].productName}1.jpg`}
                />
              </div>
              <div className="col s4">
                <h4>{response2.data[0].productName}</h4>
              </div>
              <div className="col s4">
                <h4>{response2.data[0].price}</h4>
              </div>
            </div>
          </React.Fragment>
        );
        setProductData(element2);
        setprice(response2.data[0].price);
        setTotal(response2.data[0].price);
      });
  }, []);

  const subTotal = (x, a) => {
    setqty(x);
    setTotal(x * a);
  };

  const addToCart = () => {
    const formData = new FormData();
    formData.append("userId", props.user._id);
    formData.append("addressId", AddressId);
    formData.append("productId", props.match.params.productId);
    formData.append("quantity", qty);
    formData.append("payableAmount", total);

    axios
      .post("/app/addToCart", formData, (req, res) => {})
      .then((res) => {
        console.log(res);
        if (res.status == 200) {
          props.history.push(
            `/app/modeOfPayment/${props.user._id}/${AddressId}/${props.match.params.productId}/${qty}/${total}`
          );
        }
      });
  };

  const renderContent = () => {
    switch (props.user) {
      case null:
        return <a href="/">loading</a>;
      case false:
        return (
          <React.Fragment>
            <h1>Please Login</h1>
          </React.Fragment>
        );

      default:
        return (
          <React.Fragment>
            <h4>{AddressId}</h4>
            <p>
              {selectedAddressLine1}
              <br />
              {selectedAddressLine2}
              <br />
              {selectedCity}
              <br />
              {selectedState} - {selectedPinCode}
              <br />
              {selectedNation}
              <br />
            </p>

            <button onClick={() => setShowModal(true)}>
              Add/Select Address
            </button>

            {ProductData}

            <h4>{total}</h4>
            <input
              type="number"
              value={qty}
              onChange={(e) => {
                subTotal(e.target.value, price);
              }}
            />

            <button
              onClick={() => {
                if (AddressId == "") {
                  alert("Please select address.");
                } else {
                  addToCart();
                }
              }}
            >
              Continue
            </button>

            <Modal isOpen={showModal} contentLabel="Minimal Modal Example">
              <button
                style={{ marginLeft: 1200 }}
                className="btn-floating btn-large waves-effect waves-light red btn-small"
                onClick={() => setShowModal(false)}
              >
                <i class="material-icons left">close</i>
              </button>
              {DataOfAddresses}
            </Modal>
          </React.Fragment>
        );
    }
  };

  return renderContent();
};

const mapStateToProps = (state) => {
  return {
    user: state.auth,
  };
};

export default connect(mapStateToProps)(ConfirmOrders);

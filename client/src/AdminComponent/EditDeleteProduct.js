import React, { Fragment, useState } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";

const EditDelete = (props) => {
  const [file1, setFile1] = useState("");
  const [file2, setFile2] = useState("");
  const [file3, setFile3] = useState("");
  const [file4, setFile4] = useState("");
  const [productName, setProductName] = useState("");
  const [specification, setSpecification] = useState("");
  const [price, setPrice] = useState("");
  const [weight, setWeight] = useState("");
  const [length, setLength] = useState("");

  const handleUpdateProduct = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file1", file1);
    formData.append("file2", file2);
    formData.append("file3", file3);
    formData.append("file4", file4);
    formData.append("productName", productName);
    formData.append("price", price);
    formData.append("specification", specification);
    formData.append("weight", weight);
    formData.append("length", length);

    axios
      .post(`/admin/updateProduct/${props.productId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res2) => {
        props.history.push(`/`);
        props.history.push(`/listOfProducts/${props.productCategoryName}`);
      });
  };

  const handleDelete = (e) => {
    fetch(`/admin/deleteProduct/${props.productId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((res2) => {
        props.history.push(`/`);
        props.history.push(`/listOfProducts/${props.productCategoryName}`);
      });
  };
  return (
    <Fragment>
      <button
        className="btn waves-effect waves-light blue-grey darken-1"
        onClick={() => {
          if (
            window.confirm(
              "CAUTION!!! THIS CANNOT BE RETRIEVED AFTER DELETED. DO YOU WANT TO PROCEED ?"
            )
          ) {
            handleDelete();
          }
        }}
      >
        DELETE
      </button>
      <form
        style={{ backgroundColor: "#e0e0e0" }}
        hidden={props.isAdmin}
        onSubmit={(e) => {
          handleUpdateProduct(e);
        }}
      >
        <label htmlFor="customFile1">Select image 1:</label>
        <input
          type="file"
          id="customFile1"
          onChange={(e) => {
            setFile1(e.target.files[0]);
          }}
          name="image1"
        />
        <br />
        <label htmlFor="customFile2">Select image2:</label>
        <input
          type="file"
          id="customFile2"
          onChange={(e) => {
            setFile2(e.target.files[0]);
          }}
          name="image2"
        />
        <br />
        <label htmlFor="customFile3">Select image3:</label>
        <input
          type="file"
          id="customFile3"
          onChange={(e) => {
            setFile3(e.target.files[0]);
          }}
          name="image3"
        />
        <br />
        <label htmlFor="customFile4">Select image4:</label>
        <input
          type="file"
          id="customFile4"
          onChange={(e) => {
            setFile4(e.target.files[0]);
          }}
          name="image4"
        />
        <input
          id="productName"
          type="text"
          onChange={(e) => {
            setProductName(e.target.value);
          }}
          name="productName"
        />
        <label htmlFor="productName">Name of the products</label>

        <input
          id="price"
          type="text"
          onChange={(e) => {
            setPrice(e.target.value);
          }}
          name="price"
        />
        <label htmlFor="price">Price</label>

        <input
          id="specification"
          type="text"
          onChange={(e) => {
            setSpecification(e.target.value);
          }}
          name="specification"
        />
        <label htmlFor="specification">Describe the Product</label>

        <input
          id="weight"
          type="text"
          onChange={(e) => {
            setWeight(e.target.value);
          }}
          name="weight"
        />
        <label htmlFor="weight">Weight</label>

        <input
          id="length"
          type="text"
          onChange={(e) => {
            setLength(e.target.value);
          }}
          name="length"
        />
        <label htmlFor="length">Length</label>
        <input type="submit" />
      </form>
    </Fragment>
  );
};

export default withRouter(EditDelete);

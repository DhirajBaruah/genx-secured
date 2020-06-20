import React, { useEffect, Fragment, useState } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import M from "materialize-css";

const EditProduct = (props) => {
  const [file, setFile] = useState("");
  const [imageNo, setimageNo] = useState("");
  const [productName, setProductName] = useState("");
  const [specification, setSpecification] = useState("");
  const [price, setPrice] = useState("");
  const [weight, setWeight] = useState("");
  const [length, setLength] = useState("");

  useEffect(() => {
    var elems = document.querySelectorAll(".modal");
    var instances = window.M.Modal.init(elems, {});
    // fetch product details
    const getProdDet = async () => {
      try {
        const response = await axios.get(
          `/app/productExplored/${props.match.params.productId}`
        );
        setProductName(response.data[0].productName);
        setSpecification(response.data[0].specification);
        setPrice(response.data[0].price);
        setWeight(response.data[0].weight);
        setLength(response.data[0].length);
      } catch (error) {
        console.log(error);
      }
    };
    getProdDet();
  }, []);

  const handleUpdateProduct = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("price", price);
    formData.append("specification", specification);
    formData.append("weight", weight);
    formData.append("length", length);

    axios
      .post(`/admin/updateProduct/${props.match.params.productId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        credentials: "include",
      })
      .then((res2) => {
        alert("Successsfully edited");
      })
      .catch((err) => alert(err.message));
  };

  const handleDelete = (e) => {
    fetch(`/admin/deleteProduct/${props.match.params.productId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials:'include'
    })
      .then((res) => props.history.push(`/`))
      .catch((err) =>alert(err.message))
      
  };
  return (
    <Fragment>
      <div className="row">
        <div id="modal1" class="modal">
          <div class="modal-content">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData();
                formData.append("file", file);
                formData.append("imageNo", imageNo);
                axios
                  .post(
                    `/admin/updateProductImage/${props.match.params.productId}`,
                    formData,
                    {
                      headers: {
                        "Content-Type": "multipart/form-data",
                      },
                      credentials: "include",
                    }
                  )
                  .then((res2) => {
                    alert("Successsfully edited");
                  })
                  .catch((err) => alert(err.message));
              }}
            >
              <div class="file-field input-field">
                <div class="btn">
                  <span>File</span>
                  <input
                    onChange={(e) => {
                      setFile(e.target.files[0]);
                    }}
                    type="file"
                    multiple
                  />
                </div>
                <div class="file-path-wrapper">
                  <input
                    class="file-path validate"
                    type="text"
                    placeholder="Upload one files"
                  />
                </div>
              </div>
              <input type="submit" class="waves-effect waves-light btn" />
            </form>
          </div>
        </div>

        <img
          onClick={() => setimageNo("1")}
          data-target="modal1"
          className="responsive-img modal-trigger"
          src={`/images/${props.match.params.productId}1.jpg`}
        />

        <img
          onClick={() => setimageNo("2")}
          data-target="modal1"
          className="responsive-img modal-trigger"
          src={`/images/${props.match.params.productId}2.jpg`}
        />
        <img
          onClick={() => setimageNo("3")}
          data-target="modal1"
          className="responsive-img modal-trigger"
          src={`/images/${props.match.params.productId}3.jpg`}
        />
        <img
          onClick={() => setimageNo("4")}
          data-target="modal1"
          className="responsive-img modal-trigger"
          src={`/images/${props.match.params.productId}4.jpg`}
        />
      </div>

      <div className="row ">
        <form
          onSubmit={(e) => {
            handleUpdateProduct(e);
          }}
        >
          <input
            value={productName}
            id="productName"
            type="text"
            onChange={(e) => {
              setProductName(e.target.value);
            }}
            name="productName"
          />
          <label htmlFor="productName">Name of the products</label>

          <input
            value={price}
            id="price"
            type="text"
            onChange={(e) => {
              setPrice(e.target.value);
            }}
            name="price"
          />
          <label htmlFor="price">Price</label>

          <input
            value={specification}
            id="specification"
            type="text"
            onChange={(e) => {
              setSpecification(e.target.value);
            }}
            name="specification"
          />
          <label htmlFor="specification">Describe the Product</label>

          <input
            value={weight}
            id="weight"
            type="text"
            onChange={(e) => {
              setWeight(e.target.value);
            }}
            name="weight"
          />
          <label htmlFor="weight">Weight</label>

          <input
            value={length}
            id="length"
            type="text"
            onChange={(e) => {
              setLength(e.target.value);
            }}
            name="length"
          />
          <label htmlFor="length">Length</label>
          <br />
          <br />
          <input type="submit" />
        </form>
      </div>
      <div className="row">
        <button
          className="btn waves-effect waves-light red"
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
        <blockquote>
          Alert!! If you delete all information about the product will be lost and cannot be retrieved.
        </blockquote>
      </div>
    </Fragment>
  );
};

export default withRouter(EditProduct);

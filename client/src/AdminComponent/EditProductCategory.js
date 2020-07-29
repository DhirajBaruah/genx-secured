import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";

const EditProductCategory = (props) => {
  const [file, setFile] = useState("");
  const [ProductCategoryName, setProductCategoryName] = useState("");
  const [Details, setDetails] = useState("");

  useEffect(() => {
    // init modal
    var elems = document.querySelectorAll(".modal");
    var instances = window.M.Modal.init(elems, {});

        // fetch product category details
    const getProdCat = async () => {
      try {
        const response = await axios.get(
          `/app/getProductCategory/${props.match.params.productCategoryId}`
        );
        setProductCategoryName(response.data[0].productCategoryName);
        setDetails(response.data[0].details);
      } catch (error) {
        alert(error.message);
      }
    };
    getProdCat();
  }, []);

  const handleUpdate = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("productCategoryName", ProductCategoryName);
    formData.append("details", Details);

    axios
      .post(
        `/admin/updateProductCategory/${props.match.params.productCategoryId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          credentials:'include'
        }
      )
      .then((res2) => {
        alert("Successsfully edited")
      })
      .catch((err) =>alert(err.message))
  };

  const handleDelete = (e) => {
    fetch(`/admin/deleteProductCategory/${props.match.params.productCategoryId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials:'include'
    })
      .then((res2) => {
        props.history.push(`/`);
      })
      .catch((err) => alert(err.message))
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
                axios
                  .post(
                    `/admin/updateProductCategoryImage/${props.match.params.productCategoryId}`,
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
          data-target="modal1"
          className="responsive-img modal-trigger"
          src={`/uploads/${props.match.params.productCategoryId}.jpg`}
        />
      </div>



      <div className="row ">
        <br />
        <br />

        <form
          onSubmit={(e) => {
            handleUpdate(e);
          }}
        >
          <input
          value={ProductCategoryName}
            id="productCategoryName"
            type="text"
            onChange={(e) => {
              setProductCategoryName(e.target.value);
            }}
            name="productCAtegoryName"
            required
          />
          <label htmlFor="productCAtegoryName">
            Name of the category of products
          </label>

          <input
          value={Details}
            id="details"
            type="text"
            onChange={(e) => {
              setDetails(e.target.value);
            }}
            name="details"
            required
          />
          <label htmlFor="details">Describe the category</label>
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
          Alert!! If you delete all information about the category and related
          products will be lost and cannot be retrieved.
        </blockquote>
      </div>
    </Fragment>
  );
};

export default withRouter(EditProductCategory);

import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import M from "materialize-css";

const ProductCategoryUpload = (props) => {
  const [file, setFile] = useState("");
  const [productCategoryName, setProductCategoryName] = useState("");
  const [categoryId, setcategoryId] = useState("c");
  const [Details, setDetails] = useState("");
  const [dropdown, setdropdown] = useState("");
  const element = [];

  useEffect(() => {
    // fetch categoryname
    const getCatName = async () => {
      try {
        const response = await axios.get("/app/category");
     
        await response.data.map((category) =>
          element.push(
            <option value={category._id}>{category.categoryName}</option>
          )
        );
        await setdropdown(element);
        // imitialize dropdown
        var elems = document.querySelectorAll("select");
        var instances = window.M.FormSelect.init(elems, {});
      } catch (error) {
        console.log(error);
      }
    };
    getCatName();
  }, []);

  const handleSubmitImage = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("productCategoryName", productCategoryName);
    formData.append("details", Details);
    formData.append("categoryId", categoryId);

    axios
      .post(`/admin/uploadProductCategory/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        credentials:'include',
      })
      .then((res2) => {
        alert("Product category successfully added");
      })
      .catch((err) => alert(err.message));
  };

  return (
    <Fragment>
      <form
        
        onSubmit={(e) => {
          e.preventDefault();
          if(categoryId=="c") {
            alert("Category name must entered")
          }
          else{handleSubmitImage(e)}
        }}
      >
        <label htmlFor="customFile">Select image:</label>
        <input
          type="file"
          id="customFile"
          onChange={(e) => {
            setFile(e.target.files[0]);
          }}
          name="image"
          required
        />
        <input
          id="productCAtegoryName"
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
          id="details"
          type="text"
          onChange={(e) => {
            setDetails(e.target.value);
          }}
          name="details"
          required
        />
        <label htmlFor="details">Describe the category</label>

        <br />
        <br />
        <select
        onChange={(e) =>setcategoryId(e.target.value)}
        >
          <option value="c">
            Choose category name
          </option>
          {dropdown}
        </select>
        
        <br />
        <br />
        <input type="submit" />
      </form>
    </Fragment>
  );
};

export default withRouter(ProductCategoryUpload);

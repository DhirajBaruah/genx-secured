import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";

const ProductUpload = (props) => {
  const [file1, setFile1] = useState("");
  const [file2, setFile2] = useState("");
  const [file3, setFile3] = useState("");
  const [file4, setFile4] = useState("");
  const [productName, setProductName] = useState("");
  const [specification, setSpecification] = useState("");
  const [price, setPrice] = useState("");
  const [weight, setWeight] = useState("");
  const [length, setLength] = useState("");
  const [dropdown, setdropdown] = useState("");
  const [categoryId, setcategoryId] = useState("c");
  const element = [];
  const [dropdownPC, setdropdownPC] = useState("");
  const [productCategoryId, setproductCategoryId] = useState("c");
  const element2 = [];

  useEffect(() => {
    // fetch categoryname
    const getCatName = async () => {
      try {
        const response = await axios.get("/app/category");

        await response.data.map((category) =>
          element.push(
            <option value={category.categoryName}>
              {category.categoryName}
            </option>
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

  useEffect(() => {
    // fetch categoryname
    const getProdCatName = async () => {
      try {
        const response = await axios.get(`/app/categoryExplored/${categoryId}`);
        await response.data.map((prodCategory) => {
          element2.push(
            <option value={prodCategory._id}>
              {prodCategory.productCategoryName}
            </option>
          );
        });
        await setdropdownPC(element2);
        // imitialize dropdown
        var elems = document.getElementById("select2");
        var instances = window.M.FormSelect.init(elems, {});
      } catch (error) {
        console.log(error);
      }
    };
    getProdCatName();
  }, [categoryId]);

  const handleSubmitImage = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file1", file1);
    formData.append("file2", file2);
    formData.append("file3", file3);
    formData.append("file4", file4);
    formData.append("productName", productName);
    formData.append("productCategoryId", productCategoryId);
    formData.append("price", price);
    formData.append("specification", specification);
    formData.append("weight", weight);
    formData.append("length", length);

    axios
      .post(`/admin/uploadProduct`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        credentials:'include'
      })
      .then((res2) => {
        alert("Succefully added the product")
      })
      .catch((err) =>{
        alert(err.message);
        console.log(err.message);
        }
      );
  };

  return (
    <Fragment>
      <form
        style={{ backgroundColor: "#e0e0e0" }}
        
        onSubmit={(e) => {
          e.preventDefault();
          if(productCategoryId=="c"){
            alert("Please select a product category")
          }else{
            handleSubmitImage(e);
          }
          
        }}
      >
        <select onChange={(e) => setcategoryId(e.target.value)}>
          <option value="c">Choose category</option>
          {dropdown}
        </select>{" "}
        <br />
        <br />
        <select
          id="select2"
          onChange={(e) => setproductCategoryId(e.target.value)}
        >
          <option value="c">Choose product category</option>
          {dropdownPC}
        </select>{" "}
        <br />
        <br />
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

export default withRouter(ProductUpload);

import React, { useState, useEffect } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import M from "materialize-css";


function AdminEdit(props) {
  const [categoryId, setcategoryId] = useState("c");
  const [dropdown, setdropdown] = useState("");
  const element = [];
  const [dropdownPC, setdropdownPC] = useState("");
  const [productCategoryId, setproductCategoryId] = useState("c");
  const element2 = [];
  const [dropdownP, setdropdownP] = useState("");
  const [productId, setproductId] = useState("c");
  const element3 = [];

  useEffect(() => {
    // imitialize tabs
    var elems = document.getElementById("tabs");
    var instances = window.M.Tabs.init(elems, { swipeable: true });

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
    // fetch product categoryname
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
        // imitialize dropdown
        var elems = document.getElementById("select4");
        var instances = window.M.FormSelect.init(elems, {});
      } catch (error) {
        console.log(error);
      }
    };

    // fetch product
    const getProd = async () => {
      try {
        const response = await axios.get(
          `/app/listOfProducts/${productCategoryId}`
        );
        await response.data.map((prod) => {
          element3.push(<option value={prod._id}>{prod.productName}</option>);
        });
        await setdropdownP(element3);
        // imitialize dropdown
        var elems = document.getElementById("select3");
        var instances = window.M.FormSelect.init(elems, {});
      } catch (error) {
        console.log(error);
      }
    };

    // func calls
    getProdCatName();
    if (productCategoryId != "c") {
      getProd();
    }
  }, [categoryId, productCategoryId]);

  return (
    <div className="AdminEdit">
      <div class="row">
        <div class="col s12">
          <ul id="tabs" class="tabs">
            <li class="tab col s3">
              <a href="#prod">Product</a>
            </li>
            <li class="tab col s3">
              <a href="#prodCat">Product Categories</a>
            </li>
          </ul>
        </div>

        <div id="prod" class="col s12 ">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (productId == "c") {
                alert("Please select a product category");
              } else {
                props.history.push(`/editProduct/${productId}`);
              }
            }}
          >
            <select onChange={(e) => setcategoryId(e.target.value)}>
              <option value="c">Choose category name</option>
              {dropdown}
            </select>

            <br />
            <br />
            <select
              id="select2"
              onChange={(e) => setproductCategoryId(e.target.value)}
            >
              <option value="c">Choose product category name</option>
              {dropdownPC}
            </select>

            <br />
            <br />
            <select id="select3" onChange={(e) => setproductId(e.target.value)}>
              <option value="c">Choose product</option>
              {dropdownP}
            </select>
            <input type="submit" />
          </form>
        </div>








        <div id="prodCat" class="col s12">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (productCategoryId == "c") {
                alert("Please select a product category");
              } else {
                props.history.push(`/editProductCategory/${productCategoryId}`);
              }
            }}
          >
            <select onChange={(e) => setcategoryId(e.target.value)}>
              <option value="c">Choose category name</option>
              {dropdown}
            </select>

            <br />
            <br />
            <select
              id="select4"
              onChange={(e) => setproductCategoryId(e.target.value)}
            >
              <option value="c">Choose product category name</option>
              {dropdownPC}
            </select>

            <br />
            <br />
            <input type="submit" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default withRouter(AdminEdit);

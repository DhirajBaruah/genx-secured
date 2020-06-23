import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import M from "materialize-css";

function AdminNavbar(props) {
  useEffect(() => {
    var elems = document.querySelectorAll(".sidenav");
    var instances = window.M.Sidenav.init(elems, {});
  }, []);

  return (
    <div className="AdminNavbar">
      <nav>
        <div class="nav-wrapper">
          <a href="#" data-target="mobile-demo" class="sidenav-trigger">
            <i class="material-icons">menu</i>
          </a>
          <ul class=" hide-on-med-and-down">
            <li>
              <Link to="/adminDashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/adminOrders">Orders</Link>
            </li>
            <li>
             <Link to="/adminEdit">Edit</Link>
            </li>
            <li>
             <Link to="/addProductCategory">Add a new Product Category</Link>
            </li>
            <li>
             <Link to="/addProduct">Add a new Product</Link>
            </li>
          </ul>
        </div>
      </nav>

      <ul class="sidenav" id="mobile-demo">
        <li>
          <Link to="/adminDashboard">Orders</Link>
        </li>
        <li>
          <Link to="/addProduct">Edit</Link>
        </li>
        <li>
          <Link to="/addProductCategory">Add a new Product Category</Link>
        </li>
        <li>
          <Link to="/addProduct">Add a new Product</Link>
        </li>
      </ul>
    </div>
  );
}

export default AdminNavbar;

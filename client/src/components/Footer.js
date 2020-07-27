import React from "react";

const Footer = () => {
  return (
    <footer className="page-footer noprint black">
      <div className="container">
        <div className="row">
          <div className="col l6 s12">
            <h5 className="white-text">Help and Support</h5>
            <ul>
              <li>
                <i className="tiny material-icons">call</i>
                <a className="grey-text text-lighten-3" href="#!">
                  {" "}
                  8638214254
                </a>
              </li>
              <li>
                <i className="tiny material-icons">email</i>
                <a className="grey-text text-lighten-3" href="#!">
                  {" "}
                  loading
                </a>
              </li>
            </ul>
          </div>
          <div className="col l4 offset-l2 s12"></div>
        </div>
      </div>
      <div className="footer-copyright">
        <div className="container">
          © 2020 Genx Equipment and Food Nutrition, All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

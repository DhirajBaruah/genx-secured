import React, { useState, useEffect } from "react";
import { Parallax } from "react-parallax";
import BrandLogo from "./BrandLogo";
import ProductThumbnail from "./ProductThumbnail";
import logo1 from "../images/image1.jpg";
import logo2 from "../images/image2.jpg";
import logo4 from "../images/image4.jpg";
import logo5 from "../images/image5.jpg";
import Typical from "react-typical";
import M from "materialize-css";
import "../Home.css";
import axios from "axios";
import { Link } from "react-router-dom";

const styles = {
  textAlign: "center",
  // backgroundColor: "#ff9800"
  // background: "linear-gradient(0deg, rgba(28,47,47,1) 22%, rgba(45,253,139,1) 100%)"
  background:
    "linear-gradient(0deg, rgba(28,47,47,1) 22%, rgba(193,44,44,1) 100%)",
};
const insideStyles = {
  textAlign: "center",
  background: (0, 0, 0, 0.5) /* Black background with 0.5 opacity */,
  color: "#f1f1f1",
  paddingTop: 280,
};

const Home = () => {
  const [listOfStrength, setListOfStrength] = useState(
    <div id="carousel1" className="carousel">
      <a className="carousel-item" href="#one!">
        <img src={logo1} />
      </a>
    </div>
  );
  const [listOfCardio, setListOfCardio] = useState(
    <div id="carousel2" className="carousel">
      <a className="carousel-item" href="#one!">
        <img src={logo1} />
      </a>
    </div>
  );
  const [listOfAccessories, setListOfAccessories] = useState(
    <div id="carousel3" className="carousel">
      <a className="carousel-item" href="#one!">
        <img src={logo1} />
      </a>
    </div>
  );
  useEffect(function () {
    //Strength
    axios
      .get("/app/categoryExplored/Strength", {})
      .then(async (response) => {
        console.log(response);
        const res = await response.data.map((item) => {
          return (
            <Link to={`listOfProducts/${item._id}`} className="carousel-item">
              <img className="responsive-img" style={{borderRadius:"3%"}} src={`/images/${item._id.replace(/ /g, "")}.jpg`} />
            </Link>
          );
        });
        return res;
      })
      .then((res) =>
        setListOfStrength(
          <div id="carousel1" className="carousel">
            {res}
          </div>
        )
      )
      .then((res) => {
        var elem = document.getElementById("carousel1");
        var instance = window.M.Carousel.init(elem, {
          dist: 100,
        });
      });

    //Cardio
    axios
      .get("/app/categoryExplored/Cardio", {})
      .then(async (response) => {
        const res = await response.data.map((item) => {
          return (
            <Link to={`listOfProducts/${item._id}`} className="carousel-item" href="#one!">
              <img className="responsive-img" style={{borderRadius:"3%"}} src={`/images/${item._id.replace(/ /g, "")}.jpg`} />
            </Link>
          );
        });
        return res;
      })
      .then((res) =>
        setListOfCardio(
          <div id="carousel2" className="carousel">
            {res}
          </div>
        )
      )
      .then(() => {
        var elem = document.getElementById("carousel2");
        var instance = window.M.Carousel.init(elem, {
          dist: 100,
        });
      });
    //Accessories
    axios
      .get("/app/categoryExplored/Accessories", {})
      .then(async (response) => {
        const res = await response.data.map((item) => {
          return (
            <Link to={`listOfProducts/${item._id}`} className="carousel-item" href="#one!">
              <img className="responsive-img" style={{borderRadius:"3%"}} src={`/images/${item._id.replace(/ /g, "")}.jpg`} />
            </Link>
          );
        });
        return res;
      })
      .then((res) =>
        setListOfAccessories(
          <div id="carousel3" className="carousel">
            {res}
          </div>
        )
      )
      .then(() => {
        var elem = document.getElementById("carousel3");
        var instance = window.M.Carousel.init(elem, {
          dist: 100,
        });
      });
  }, []);

  return (
    <React.Fragment>
      <div style={{ background: "#1c2f2f" }}>
        <BrandLogo />
        <Parallax bgImage={logo5} strength={500}>
          <div style={{ height: 500 }}>
            <div style={insideStyles}>
              <p>
                <Typical
                  loop={Infinity}
                  wrapper="h5"
                  steps={[
                    "COMMITTED TO MAKE YOU FIT",
                    2000,
                    "DARE TO BE GREAT",
                    2000,
                    "FIT FOR LIFE WITH",
                    2000,
                  ]}
                />
                <h1 style={{ color: "red", margin: 0 }}>
                  <b>GENX</b>
                </h1>
              </p>
            </div>
          </div>
        </Parallax>

        <div className="row " style={styles}>
          {listOfStrength}
          <Link to={`categoryExplored/Strength`}><button>Explore Strength</button></Link>
        </div>

        <Parallax bgImage={logo1} strength={500}>
          <div style={{ height: 500 }}>
            <div style={{ background: (0, 0, 0, 0.5), color: "#f1f1f1" }}>
              <div class="wrapper">
                <p id="slide" style={{ paddingTop: 280, paddingLeft:50 }}>
                  We hope you have enjoyed using Materialize and if you feel
                  like it has. helped you out and want to support the team you
                  can help us by donating or . backing us on Patreon. Any amount
                  would help support and continue development on this project
                  and is greatly appreciated. We hope you have enjoyed using
                  Materialize and if you feel like it has. helped you out and
                  want to support the team you can help us by donating or .
                  backing us on Patreon. Any amount would help support and
                  continue development on this project and is greatly
                  appreciated. We hope you have enjoyed using Materialize and if
                  you feel like it has. helped you out and want to support the
                  team you can help us by donating or . backing us on Patreon.
                  Any amount would help support and continue development on this
                  project and is greatly appreciated.
                </p>
              </div>
            </div>
          </div>
        </Parallax>

        <div className="row " style={styles}>
          {listOfCardio}
           <Link to={`categoryExplored/Cardio`}><button>Explore Cardio</button></Link>
        </div>

        <Parallax bgImage={logo2} strength={500}>
          <div style={{ height: 500 }}>
            <div style={{ background: (0, 0, 0, 0.5), color: "#f1f1f1" }}>
              <div class="wrapper">
                <p id="slide" style={{ paddingTop: 280,  paddingLeft:50 }}>
                  We hope you have enjoyed using Materialize and if you feel
                  like it has. helped you out and want to support the team you
                  can help us by donating or . backing us on Patreon. Any amount
                  would help support and continue development on this project
                  and is greatly appreciated. We hope you have enjoyed using
                  Materialize and if you feel like it has. helped you out and
                  want to support the team you can help us by donating or .
                  backing us on Patreon. Any amount would help support and
                  continue development on this project and is greatly
                  appreciated. We hope you have enjoyed using Materialize and if
                  you feel like it has. helped you out and want to support the
                  team you can help us by donating or . backing us on Patreon.
                  Any amount would help support and continue development on this
                  project and is greatly appreciated.
                </p>
              </div>
            </div>
          </div>
        </Parallax>
        <div className="row " style={styles}>
          {listOfAccessories}
           <Link to={`categoryExplored/Accessories`}><button>Explore Accessories</button></Link>
        </div>

        <Parallax
          bgImage={logo4}
          strength={200}
          renderLayer={(percentage) => (
            <div>
              <div
                style={{
                  position: "absolute",
                  background: `rgba(255, 125, 0, ${percentage * 1})`,
                  left: "50%",
                  top: "50%",
                  borderRadius: "50%",
                  transform: "translate(-50%,-50%)",
                  width: percentage * 500,
                  height: percentage * 500,
                }}
              />
            </div>
          )}
        >
          <div style={{ height: 500 }}>
            <div style={insideStyles}>
              <Link to="/career">WE HIRE</Link>
            </div>
          </div>
        </Parallax>
      </div>
    </React.Fragment>
  );
};

export default Home;

import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { register } from "../redux/app/actions/authAction";
import { login } from "../redux/app/actions/authAction";
import { clearErrors } from "../redux/app/actions/errorAction";
import { Link, withRouter } from "react-router-dom";

const Signup = (props) => {
  const [fname, setfname] = useState("");
  const [lname, setlname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [msg, setmsg] = useState(null);

  useEffect(() => {
    // Check for register error
    if (props.error.id === "REGISTER_FAIL") {
      setmsg(props.error.msg.error);
    } else if (props.error.id === "LOGIN_FAIL") {
      setmsg(props.error.msg.error);
    } else {
      setmsg(null);
    }

    // If authenticated, go home

    if (props.isAuthenticated) {
      props.history.push(`/`);
    }
  }, [props.error, props.isAuthenticated]);

  // Clear msg
   const showMessage = (msg) => {
    if (window.confirm(`${msg}`)) {
      props.clearErrors();
    } else {
      props.clearErrors();
    }
  };

  return (
    <div>
      {msg ? showMessage(msg) : null}
      <div className="row container">
        <div className="col s12 l6" style={{ textAlign: "center" }}>
          <h3>SIGN UP</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              //Attempt to register
              props.register(fname, lname, email, password);
            }}
            
           
          >
           
              <div className="input-field ">
                <input
                  onChange={(e) => {
                    setemail(e.target.value);
                    props.clearErrors();
                  }}
                  id="email"
                  type="email"
                  name="email"
                  className="validate"
                />
                <label htmlFor="email">Email</label>
              </div>
          

           
              <div className="input-field ">
                <input
                  onChange={(e) => setpassword(e.target.value)}
                  id="password"
                  type="password"
                  name="password"
                  className="validate"
                />
                <label htmlFor="password">Password</label>
              </div>
         
              <div className="input-field ">
                <input
                  onChange={(e) => setfname(e.target.value)}
                  id="fname"
                  type="text"
                  name="fname"
                  className="validate"
                />
                <label htmlFor="password">First name</label>
              </div>
       
              <div className="input-field ">
                <input
                  onChange={(e) => setlname(e.target.value)}
                  id="lname"
                  type="text"
                  name="lname"
                  className="validate"
                />
                <label htmlFor="password">Last name</label>
              </div>
         

            <button
              className="btn waves-effect waves-light blue-grey darken-1"
              type="submit"
              name="action"
            >
              Signup
              <i className="material-icons right">send</i>
            </button>
          </form>
        </div>

        <div className="col s12 l6" style={{ textAlign: "center" }}>
          <h3>LOGIN </h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              //Attempt to login
              props.login(email, password);
            }}
          
          >
            
              <div className="input-field">
                <input
                  onChange={(e) => {
                    setemail(e.target.value);
                  }}
                  id="email"
                  type="email"
                  name="email"
                  className="validate"
                />
                <label htmlFor="email">Email</label>
              </div>
           

           
              <div className="input-field">
                <input
                  onChange={(e) => setpassword(e.target.value)}
                  id="password"
                  type="password"
                  name="password"
                  className="validate"
                />
                <label htmlFor="password">Password</label>
              </div>
        
            <button
              className="btn waves-effect waves-light blue-grey darken-1"
              type="submit"
              name="action"
            >
              Login
              <i className="material-icons right">send</i>
            </button><br /><br />
            
            <Link to="/forgotPass" style={{color:"red"}}><i className="material-icons">help_outline</i><br />forgot password</Link>
          </form>
        </div>
      </div>

     {/* <div className="row" style={{ textAlign: "center", paddingTop: 50 }}>
        <a
          className="btn waves-effect waves-light red darken-1"
          href="/app/auth/google"
        >
          SIGNUP/LOGIN WITH GOOGLE{" "}
        </a>
        <a
          className="btn waves-effect waves-light  blue darken-4"
          href="/app/auth/google"
          style={{ marginLeft: 100 }}
        >
          SIGNUP/LOGIN WITH FACEBOOK
        </a>
      </div>*/}
    </div> 
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error,
  };
};

// const mapDispathToProps = (dispatch)=>{
//   return {
//     register:(fname,lname,email,password)=>{dispatch(register())},
//     clearErrors:()=>{dispatch(clearErrors())}
//   }
// }

export default connect(mapStateToProps, { register, clearErrors, login })(
  Signup
);

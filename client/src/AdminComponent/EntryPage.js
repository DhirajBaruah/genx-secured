import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { loginAdmin } from "../redux/admin/actions/authActionAdmin";
import { clearErrorsAdmin } from "../redux/admin/actions/errorActionAdmin";

const EntryPage = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setmsg] = useState(null);

  useEffect(() => {
    // Check for register error
    if (props.errorAdmin.id === "ADMIN_LOGIN_FAIL") {
      setmsg(props.error.msg.error);
    } else {
      setmsg(null);
    }

    // If authenticated, go home
    if (props.isAuthenticatedAdmin) {
      props.history.push(`/adminDashboard`);
    }
  }, [props.errorAdmin, props.isAuthenticatedAdmin]);

  const showMessage = (msg) => {
    if (window.confirm(`${msg}`)) {
      props.clearErrors();
    } else {
      props.clearErrors();
    }
  };

  return (
    <div>
      <div className="row container">
        {msg ? showMessage(msg) : null}
        <div className="col s12" style={{ textAlign: "center" }}>
          <h3>LOGIN </h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              //Attempt to login
              props.loginAdmin(email, password);
            }}
          >
         
              <div className="input-field">
                <input
                  id="email"
                  type="text"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  name="email"
                  value={email}
                  className="validate"
                />
                <label htmlFor="email">Email</label>
              </div>
           

      
              <div className="input-field">
                <input
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  name="password"
                  value={password}
                  className="validate"
                />
                <label htmlFor="password">Password</label>
              </div>
          
            <button
              className="btn blue-grey darken-1"
              type="submit"
              name="action"
            >
              Login
              <i className="material-icons right">send</i>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticatedAdmin: state.authAdmin.isAuthenticatedAdmin,
    errorAdmin: state.errorAdmin,
  };
};

export default connect(mapStateToProps, { clearErrorsAdmin, loginAdmin })(
  EntryPage
);

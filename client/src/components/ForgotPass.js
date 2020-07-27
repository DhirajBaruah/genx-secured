import React, { useState } from "react";
import { connect } from "react-redux";
import axios from "axios";

function ForgotPass(props) {
  const [email, setemail] = useState("");
  const [otp, setotp] = useState("");
  const [pass, setpass] = useState("");
  const [emailbool, setemailbool] = useState(false);
  const [otpbool, setotpbool] = useState(true);
  const [passbool, setpassbool] = useState(true);
  const com = true;

  const sendEmail = async () => {
    console.log(`forpa ${email}`);
    const postData = {
      email: email,
    };
    try {
      const response = await axios.post(`/app/forgotPass`, postData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.data.success)
      if (response.data.success) {
        setemailbool(true);
        setotpbool(false);
      }
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  const sendOtp = async () => {
    
    const postData = {otp};
    try {
      const response = await axios.post(`/app/matchOtp`, postData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.data.success) {
        setotpbool(true);
        setpassbool(false);
      }
    } catch (error) {
      
      alert(error.response.data.error);
    }
  };

  const setNewPass = async () => {
    
    const postData = {pass};
    try {
      const response = await axios.post(`/app/setNewPass`, postData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        alert("Password changed successfully");
      }
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  return (
    <div className="row">
      <div className="col s12 l4 " style={{ textAlign: "center" }}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendEmail();
          }}
        >
          <div className="input-field">
            <input
              disabled={emailbool && com}
              onChange={(e) => setemail(e.target.value)}
              id="email"
              type="email"
              name="email"
              className="validate"
            />
            <label htmlFor="email">Your Registered Email</label>
          </div>

          <button
            disabled={emailbool && com}
            className="btn  blue-grey darken-1"
            type="submit"
            name="action"
          >
            Submit
            <i className="material-icons right">send</i>
          </button>
        </form>
      </div>

      <div className="col s12 l4" style={{ textAlign: "center" }}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendOtp();
          }}
        >
          <div className="input-field">
            <input
              disabled={otpbool && com}
              onChange={(e) => setotp(e.target.value)}
              id="otp"
              type="text"
              name="otp"
              className="validate"
            />
            <label htmlFor="otp">Enter otp sent to your registered email</label>
          </div>

          <button
            disabled={otpbool && com}
            className="btn  blue-grey darken-1"
            type="submit"
            name="action"
          >
            Submit
            <i className="material-icons right">send</i>
          </button>
        </form>
      </div>
      <div className="col s12 l4 " style={{ textAlign: "center" }}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setNewPass();
          }}
        >
          <div className="input-field">
            <input
              disabled={passbool && com}
              onChange={(e) => setpass(e.target.value)}
              id="new password"
              type="password"
              name="new password"
              className="validate"
            />
            <label htmlFor="new password">New password</label>
          </div>

          <button
            disabled={passbool && com}
            className="btn  blue-grey darken-1"
            type="submit"
            name="action"
          >
            Submit
            <i className="material-icons right">send</i>
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPass;

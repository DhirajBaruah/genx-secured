import React, { useState } from "react";

const EntryPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <div className="row">
        <div className="col s6" style={{ textAlign: "center" }}>
          <h3>LOGIN </h3>
          <form
            className="col s7"
            style={{ marginLeft: 100 }}
            action="/admin/admin_login"
            method="POST"
          >
            <div className="row">
              <div className="input-field col s12">
                <input
                  id="email"
                  type="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  name="email"
                  value={email}
                  className="validate"
                />
                <label htmlFor="email">Email</label>
              </div>
            </div>

            <div className="row">
              <div className="input-field col s12">
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
            </div>

            <button
              className="btn waves-effect waves-light blue-grey darken-1"
              type="submit"
              name="action"
            >
              Submit
              <i className="material-icons right">send</i>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EntryPage;

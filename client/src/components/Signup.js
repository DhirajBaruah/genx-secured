import React from "react";

const Signup = () => {

 
return(
<div>

    <div className="row">

        <div className="col s6" style={{textAlign: "center"}}>
            <h3>SIGN UP</h3>
            <form className="col s7" style={{marginLeft: 200}} >
                <div className="row">
                    <div className="input-field col s12">
                    <input id="email" type="email" name="email"  className="validate"/>
                    <label htmlFor="email">Email</label>
                    </div>
                </div>

                <div className="row">
                    <div className="input-field col s12">
                    <input id="password"  type="password" name="password"  className="validate"/>
                    <label htmlFor="password">Password</label>
                    </div>
                </div>

                <button className="btn waves-effect waves-light blue-grey darken-1" type="submit" name="action" >Submit
                    <i className="material-icons right">send</i>
                </button>
            </form>
            
            
        </div>

        <div className="col s6" style={{textAlign: "center"}}>
            <h3>LOGIN </h3>
            <form className="col s7"  style={{marginLeft: 100}}>
                <div className="row">
                    <div className="input-field col s12">
                    <input id="email" type="email" name="email"  className="validate"/>
                    <label htmlFor="email">Email</label>
                    </div>
                </div>

                <div className="row">
                    <div className="input-field col s12">
                    <input id="password"  type="password" name="password"  className="validate"/>
                    <label htmlFor="password">Password</label>
                    </div>
                </div>

                <button className="btn waves-effect waves-light blue-grey darken-1" type="submit" name="action" >Submit
                    <i className="material-icons right">send</i>
                </button>
            </form>
        </div>

    </div>

    <div className="row" style={{textAlign:"center", paddingTop:50}}>
        <a className="btn waves-effect waves-light red darken-1" href="/auth/google">SIGNUP/LOGIN WITH GOOGLE  </a>
        <a className="btn waves-effect waves-light  blue darken-4" href="/auth/google" style={{marginLeft:100}}>SIGNUP/LOGIN WITH FACEBOOK</a>
    </div>
</div>

);
  
}


export default Signup;
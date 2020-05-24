import React, { useState, useEffect } from "react";
import {connect} from 'react-redux';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

const MyOrders =(props) => {

  useEffect(()=> {},[])



          const renderContent = ()=>{
       switch(props.user){
           case null:
               return <a href="/">loading</a>
           case false:  
               return(
                 <React.Fragment>
                    <h1>Please Login</h1>
                 </React.Fragment>
                  )  
                
           default:
                
               
                return(
                   <React.Fragment>
                  <h1>Order Success</h1>

                   </React.Fragment>
                )    
       }
   }

      


 
     
    return (
        renderContent()
    );
}


const mapStateToProps = (state)=>{
    return {
        user:state.auth
    }
}


export default connect(mapStateToProps)(MyOrders);



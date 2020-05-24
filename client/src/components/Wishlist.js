import React, { useState, useEffect } from "react";
import {connect} from 'react-redux';
import axios from 'axios';
import CardProduct from "./CardProduct"


const Wishlist =(props) => {

  const [Data, setData] = useState('');
  var element =[];

 

  useEffect(()=> {
      
      axios.post(`/getWishlists/${props.match.params.userId}`,{

      })
      .then(response =>{
          
          console.log(response);
          for(var i=0; i<response.data.length; i++){
                element.push(<CardProduct productId={response.data[i].productId} name={ response.data[i].listOfWishes[0].productName} />)
            }
           setData(element);

      })
 
  },[])




 

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
                   {Data}
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


export default connect(mapStateToProps)(Wishlist);



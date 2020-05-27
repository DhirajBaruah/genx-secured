import React, { useState, useEffect } from 'react';
import Card from "./Card"
import ProductCategoryUpload from "../AdminComponent/ProductCategoryUpload"
import {connect} from "react-redux"
import EditDelete from "../AdminComponent/EditDelete"



const CategoryExplored = (props) => {


  const [data, setData] = useState("loading");
  const [elements2, setElements2] = useState("");
  var elements=[];
  

  let isAdmin = true;
  if(props.user){

        if(props.user.status=="admin"){
            isAdmin = false;
           

          }else{
              isAdmin = true;
              
     
          }
        }


  useEffect(function () {
      
   fetch(`/api/categoryExplored/${props.match.params.categoryName}`, {
        
         headers: {
             'Content-Type': 'application/json',
              'Accept': 'application/json'
         }
      })
      .then((res) => res.json())
      .then( (res2)=>{
       
      
         setData(res2);

       if(props.user){

        if(props.user.status=="admin"){
           console.log("=====================&&&&&&&&&&&&&&&&&")
           
            for( var i=0;i<res2.length;i++){
             // push the component to elements!
            elements.push(
                <React.Fragment>
                <div className="row" style={{backgroundColor:"#e0e0e0"}}>
                  <div style={{padding:10}}>
                    <div className="col s8">
                      <Card explore={`listOfProducts/${res2[i].productCategoryName}`} name={ res2[i].productCategoryName  } details={ res2[i].details }/>
                    </div>
                    <div className="col s4">
                      <EditDelete productCategoryId={ res2[i]._id } categoryName={props.match.params.categoryName} />
                    </div>
                  </div>
                </div>
                </React.Fragment>
                );
        }
          console.log("=====================&&&&&&&&&&&&&&&&&")
          setElements2(elements)

          }else{
             
                for( var i=0;i<res2.length;i++){
                // push the component to elements!
                elements.push(<Card explore={`listOfProducts/${res2[i].productCategoryName}`} name={ res2[i].productCategoryName  } details={ res2[i].details }/>);
                } 
                 
                  setElements2(elements)

          }
        }else{
          
                for( var i=0;i<res2.length;i++){
                // push the component to elements!
                elements.push(<Card explore={`listOfProducts/${res2[i].productCategoryName}`} name={ res2[i].productCategoryName  } details={ res2[i].details }/>);
                } 
                
                  setElements2(elements)

          }

      
             
           
     

      })
    
  }, []);
    
     

    
return(
<React.Fragment>
    

    <div className="container">
        
        <div className="row " hidden={isAdmin} style={{backgroundColor:"#e0e0e0"}}>
          <div  style={{padding:50}}>
            <h4>You can enter new category for your products here.</h4>
            <ProductCategoryUpload categoryName={props.match.params.categoryName} isAdmin={isAdmin} />
          </div>      
        </div>

        <div className="row" >
          {elements2}
            
        </div>
        
    </div>
</React.Fragment>

);
  
}

const mapStateToProps = (state)=>{
    return {
        user:state.auth
    }
}

export default connect(mapStateToProps)(CategoryExplored);

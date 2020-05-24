import React, { useState, useEffect } from 'react';
import {connect} from "react-redux"
import EditDeleteProduct from "../AdminComponent/EditDeleteProduct"
import ProductUpload from "../AdminComponent/ProductUpload"
import CardProduct from "./CardProduct"


const ListOfProducts = (props) => {

  const [data, setData] = useState("loading");
  const [elements2, setElements2] = useState("");
  let elements=[];

    let isAdmin = true;
  if(props.user){

        if(props.user.status=="admin"){
            isAdmin = false;
           

          }else{
              isAdmin = true;
              
     
          }
        }



  useEffect(function () {
      
      fetch(`/api/listOfProducts/${props.match.params.id}`, {
        
         headers: {
             'Content-Type': 'application/json',
              'Accept': 'application/json'
         }
      })
      .then((res) => res.json())
      .then((res2)=>{
      
        setData(res2);

               if(props.user){

                  if(props.user.status=="admin"){
                    console.log("=====================&&&&&&&&&&&&&&&&&")
                    
                      for( var i=0;i<res2.length;i++){
                      // push the component to elements!
                      elements.push(
                          <React.Fragment>
                          <div className="row" style={{backgroundColor:"#e0e0e0"}}>
                          <div className="col s8">
                          <CardProduct productId={res2[i]._id} name={ res2[i].productName  } />
                          </div>
                          <div className="col s4">
                          <EditDeleteProduct productId={ res2[i]._id } productCategoryName={props.match.params.id} />
                          </div>
                          </div>
                          </React.Fragment>
                          );
                  }
                   
                    setElements2(elements)

                    }else{
                      
                           for( var i=0;i<res2.length;i++){
                      

                           elements.push(<CardProduct productId={res2[i]._id} name={ res2[i].productName  } />);
                           
                           } 

                          
                            setElements2(elements)

                    }
                  }else{
                    
                          for( var i=0;i<res2.length;i++){
                      

                           elements.push(<CardProduct productId={res2[i]._id} name={ res2[i].productName  } />);
                           
                           } 

                          
                            setElements2(elements)

                    }

      


      })
    
  }, []);

           
return(
<React.Fragment>
    <div className="container">
        <div className="row" >
         
            <ProductUpload productCategoryName={props.match.params.id} isAdmin={isAdmin} />
                
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

export default connect(mapStateToProps)(ListOfProducts);

import React, { Fragment, useState } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';


const EditDelete = (props) => {
  const [file, setFile] = useState('');
  const [ProductCategoryName, setProductCategoryName] = useState('');
  const [Details, setDetails] = useState('');
 

  const handleUpdate=(e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        formData.append('productCategoryName', ProductCategoryName);
        formData.append('details', Details);
      
      axios.post(`/updateProductCategory/${props.productCategoryId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
         body:JSON.stringify({
              productCategoryName:ProductCategoryName,
              details:Details,
            }),
        
      }) 
      .then(res2 => {
        props.history.push(`/listOfProducts/${ProductCategoryName}`);
       
      });

   
    };

 const handleDelete= (e)=> {
 
 

 fetch(`/deleteProductCategory/${props.productCategoryId}`,{
         method: 'DELETE',
         headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
        },
        
      }).then(res => res.json())
      .then(res2 => {
         props.history.push(`/`);
        props.history.push(`/categoryExplored/${props.categoryName}`);
       
      })

 
  
}
  return (
    <Fragment >
        <br/><br/>
       <button className="btn waves-effect waves-light blue-grey darken-1" onClick={()=>{if(window.confirm('CAUTION!!! THIS CANNOT BE RETRIEVED AFTER DELETED. DO YOU WANT TO PROCEED ?')){handleDelete()}}}>DELETE</button>
        <form hidden={props.isAdmin} onSubmit={(e)=>{handleUpdate(e)} }>
                <label htmlFor='customFile'>Select image:</label>
                <input 
                    type="file" 
                    id='customFile'
                    onChange={(e)=>{setFile(e.target.files[0]);}} 
                    name="image" 
                     
                />
                <input 
                id="productCAtegoryName" 
                type="text" 
                onChange={(e) =>{setProductCategoryName(e.target.value)}} 
                name="productCAtegoryName" 
                required
                />
                <label htmlFor="productCAtegoryName">Name of the category of products</label>

                <input 
                id="details" 
                type="text" 
                onChange={(e) =>{setDetails(e.target.value)}} 
                name="details" 
                required
                />
                <label htmlFor="details">Describe the category</label>
                <input type="submit"/> 

            </form>
       
   

    </Fragment>
  );
};

export default withRouter(EditDelete);
import React, { Fragment, useState } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

const ProductCategoryUpload = (props) => {
  const [file, setFile] = useState('');
  const [ProductCategoryName, setProductCategoryName] = useState('');
  const [Details, setDetails] = useState('');

  const handleSubmitImage=(e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        formData.append('productCategoryName', ProductCategoryName);
        formData.append('details', Details);
      
      axios.post(`/uploadProductCategory/${props.categoryName}`, formData, {
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
       
      })
 
   
    };

 
  return (
    <Fragment>
     <form hidden={props.isAdmin} onSubmit={(e)=>{handleSubmitImage(e)} }>
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
       />
        <label htmlFor="productCAtegoryName">Name of the category of products</label>

        <input 
        id="details" 
        type="text" 
        onChange={(e) =>{setDetails(e.target.value)}} 
        name="details" 
       />
      <label htmlFor="details">Describe the category</label>
      <br/><br/>
        <input type="submit"/>

    </form>

    </Fragment>
  );
};

export default withRouter(ProductCategoryUpload);
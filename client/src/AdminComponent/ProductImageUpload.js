import React, { Fragment, useState } from "react";
import axios from "axios";

const ProductImageUpload = (props) => {
  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState("");

  const handleSubmitImage = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    // fetch('/upload',{
    //     method:"post",
    //     headers: {
    //     'Content-Type': 'multipart/form-data'
    //     },
    //     body:formData

    // }).then(res=>res.json())
    // .then(res2=>console.log(res2));
    axios.post(`/admin/upload/${props.productName}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  return (
    <Fragment>
      <form hidden={props.isAdmin} onSubmit={(e) => handleSubmitImage(e)}>
        <label htmlFor="customFile">Select image:</label>
        <input
          type="file"
          id="customFile"
          onChange={(e) => {
            setFile(e.target.files[0]);
            setFileName(e.target.files[0].name);
          }}
          name="image"
        />
        <input type="submit" />
      </form>
    </Fragment>
  );
};

export default ProductImageUpload;

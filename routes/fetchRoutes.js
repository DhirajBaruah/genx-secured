const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const fileUpload = require("express-fileupload");
const fs = require("fs");
require("../models/equipments");
require("../models/category");
require("../models/product");
require("../models/productCategory");
require("../models/users");
require("../models/userAuthCredentials");
require("../models/carts");
require("../models/wishlists");
const category = mongoose.model("category");
const equipments = mongoose.model("equipments");
const product = mongoose.model("product");
const productCategory = mongoose.model("productCategory");
const users = mongoose.model("users");
const userAuthCredentials = mongoose.model("userAuthCredentials");

module.exports = (app) => {
  app.get("/api/x", (req, res) => {
    equipments.find({}, function (err, data) {
      if (err) {
        console.log(err);
        return;
      }

      if (data.length == 0) {
        console.log("No record found");
        return;
      }

      res.send(data);
    });
  });

  app.get("/api/categoryExplored/:categoryName", (req, res) => {
    let categoryName = req.params.categoryName;
    category.find({ categoryName: categoryName }, function (err, data) {
      if (err) {
        return res.status(422).send(err);
      }

      if (data.length == 0) {
        console.log("No record found in categories");
        return res.status(400).json({ msg: "No file uploaded" });
      }

      let categoryId = data[0]._id;

      productCategory.find({ categoryId: categoryId }, function (err, data) {
        if (err) {
          return res.status(422).send(err);
        }

        if (data.length == 0) {
          console.log("No record found ");
          return res.status(400).json({ msg: "No file uploaded" });
        }

        res.send(data);
      });
    });
  });

  app.get("/api/category", (req, res) => {
    category.find({}, function (err, data) {
      if (err) {
        console.log(err);
        return;
      }

      if (data.length == 0) {
        console.log(data);
        console.log("No record found");
        return;
      }

      res.send(data);
    });
  });

  app.get("/api/listOfProducts/:yoyo", (req, res) => {
    let paramid = req.params.yoyo;

    productCategory.find({ productCategoryName: paramid }, function (
      err,
      data
    ) {
      if (err) {
        console.log(err);
        return;
      }

      if (data.length == 0) {
        console.log(data);
        console.log("No record found");
        return;
      }

      let productCategoryId = data[0]._id;
      product.find({ productCategoryId: productCategoryId }, function (
        err,
        data
      ) {
        if (err) {
          console.log(err);
          return;
        }

        if (data.length == 0) {
          console.log(data);
          console.log("No record found");
          return;
        }

        res.send(data);
      });
    });
  });

  app.get("/api/productExplored/:productId", (req, res) => {
    let paramid = req.params.productId;

    product.find({ _id: paramid }, function (err, data) {
      if (err) {
        console.log(err);
        return;
      }

      if (data.length == 0) {
        console.log(data);
        console.log("No record found");
        return;
      }

      res.send(data);
      console.log(data);
    });
  });

  //////////////////////////////////////////////////////Google

  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"],
    })
  );
  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      res.redirect("/");
    }
  );

  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
    console.log(req.user);
  });
  app.get("/api/current_session", (req, res) => {
    res.send(req.session);
    console.log(req.session);
  });

  app.get("/api/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  ////////fortest
  // app.get('/addEquipment',(req,res)=>{

  //     let productName= "Dumbell X";
  //     let price= 100;
  //     let specification= "Dumbell X";
  //     let weight= 7.5;
  //     let productCategoryId= "Dumbell X";

  //      const user =new product({productName,price,specification,weight,productCategoryId});
  //             user.save();

  // })
  //////////////////

  /////////////////////////Admin Part Starts here
  // app.post('/admin_login',(req,res)=>{

  //     let email= req.body.email;
  //     let password= req.body.password;
  //     console.log(email);

  //        admins.find({usernameForAdmin: email, passwordForAdmin:password}, function(err, data){
  //     if(err){
  //         console.log(err);
  //         return
  //     }

  //     if(data.length == 0) {
  //         console.log(data);
  //         console.log("No record found")
  //         return
  //     }

  //     res.redirect('/');

  // })

  // })

  app.post(
    "/admin_login",
    passport.authenticate("admin-local", {
      successRedirect: "/",
      failureRedirect: "/product",
      failureFlash: true,
    })
  );

  // Upload Image
  app.post("/upload/:id", (req, res) => {
    if (req.files === null) {
      return res.status(400).json({ msg: "No file uploaded" });
    }

    const file = req.files.file;
    const id = req.params.id;

    file.mv(`./client/public/images/${id}.jpg`, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }
    });
  });

  app.post("/uploadProductCategory/:id", (req, res) => {
    if (req.files === null) {
      return res.status(400).json({ msg: "No file uploaded" });
    }
    console.log(req.body);
    const file = req.files.file;
    const categoryName = req.params.id;
    const productCategoryName = req.body.productCategoryName;
    const details = req.body.details;
    const imageName = productCategoryName.replace(/ /g, "");

    category.find({ categoryName: categoryName }, function (err, data) {
      if (err) {
        return res.status(422).send(err);
      }

      let categoryId = data[0].id;

      const x = new productCategory({
        productCategoryName,
        categoryId,
        details,
      });
      x.save(function (err) {
        console.log("entered");
        if (err) {
          console.log(err);
          if (err.name === "MongoError" && err.code === 11000) {
            // Duplicate username
            return res
              .status(422)
              .send({ succes: false, message: "User already exist!" });
          }

          // Some other error
          return res.status(422).send(err);
        }

        res.json({
          success: true,
        });
        console.log("successfully added in productCategories");
        file.mv(`./client/public/images/${imageName}.jpg`, (err) => {
          if (err) {
            console.error(err);
            return res.status(500).send(err);
          }
        });
      });
    });
  });

  app.delete(`/deleteProductCategory/:id`, (req, res) => {
    console.log(req.params.id);
    let id = req.params.id;

    product.deleteMany({ productCategoryId: id }, function (err, data) {
      if (err) {
        console.log(err);
        return;
      }

      if (data.length == 0) {
        console.log(data);
        console.log("No record found");
        return;
      }
    });

    productCategory.findOneAndRemove({ _id: id }, function (err, data) {
      if (err) {
        console.log(err);
        return;
      }

      if (data.length == 0) {
        console.log(data);
        console.log("No record found");
        return;
      }

      res.send(data);
      console.log(data);
      fs.unlink(
        `./client/public/images/${data.productCategoryName.replace(
          / /g,
          ""
        )}.jpg`,
        (err) => {
          if (err) {
            return res.status(500).json({ msg: "No file uploaded" });
            console.log("path was deleted");
          }
        }
      );
      console.log("===========deleted=============");
    });
  });

  app.post("/updateProductCategory/:id", (req, res) => {
    if (req.files === null) {
      return res.status(400).json({ msg: "No file uploaded" });
    }
    console.log(req.body);
    const file = req.files.file;
    const productCategoryId = req.params.id;
    const productCategoryName = req.body.productCategoryName;
    const details = req.body.details;

    file.mv(`./client/public/images/${productCategoryName}.jpg`, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }
    });

    productCategory.updateOne(
      { _id: productCategoryId },
      { productCategoryName: productCategoryName, details: details },
      function (err, data) {
        if (err) {
          console.log(err);
          return;
        }

        if (data.length == 0) {
          console.log(data);
          console.log("No record found");
          return;
        }

        res.send(data);
        console.log("===========edited=============");
      }
    );
  });

  app.post("/uploadProduct/:id", (req, res) => {
    if (req.files === null) {
      return res.status(400).json({ msg: "No file uploaded" });
    }

    const file1 = req.files.file1;
    const file2 = req.files.file2;
    const file3 = req.files.file3;
    const file4 = req.files.file4;
    const productCategoryName = req.params.id;
    const productName = req.body.productName;
    const specification = req.body.specification;
    const price = req.body.price;
    const weight = req.body.weight;
    const length = req.body.length;

    file1.mv(`./client/public/images/${productName}1.jpg`, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }
    });

    file2.mv(`./client/public/images/${productName}2.jpg`, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }
    });
    file3.mv(`./client/public/images/${productName}3.jpg`, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }
    });
    file4.mv(`./client/public/images/${productName}4.jpg`, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }
    });

    productCategory.find(
      { productCategoryName: productCategoryName },
      function (err, data) {
        if (err) {
          console.log(err);
          return;
        }

        if (data.length == 0) {
          console.log(data);
          console.log("No record found");
          return;
        }

        let productCategoryId = data[0]._id;
        const x = new product({
          productName,
          price,
          specification,
          weight,
          length,
          productCategoryId,
        });

        x.save(function (err) {
          if (err) {
            if (err.name === "MongoError" && err.code === 11000) {
              // Duplicate username
              return res
                .status(422)
                .send({ succes: false, message: "User already exist!" });
            }

            // Some other error
            return res.status(422).send(err);
          }

          res.json({
            success: true,
          });
        });
      }
    );
  });

  app.delete(`/deleteProduct/:id`, (req, res) => {
    let id = req.params.id;
    product.findOneAndRemove({ _id: id }, function (err, data) {
      if (err) {
        console.log(err);
        return;
      }

      if (data.length == 0) {
        console.log(data);
        console.log("No record found");
        return;
      }

      res.send(data);
    });
  });

  app.post("/updateProduct/:id", (req, res) => {
    if (req.files === null) {
      return res.status(400).json({ msg: "No file uploaded" });
    }

    const productId = req.params.id;
    const file1 = req.files.file1;
    const file2 = req.files.file2;
    const file3 = req.files.file3;
    const file4 = req.files.file4;
    const productName = req.body.productName;
    const specification = req.body.specification;
    const price = req.body.price;
    const weight = req.body.weight;
    const length = req.body.length;

    console.log("---------------");
    console.log(productName);

    file1.mv(`./client/public/images/${productName}1.jpg`, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }
    });

    file2.mv(`./client/public/images/${productName}2.jpg`, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }
    });
    file3.mv(`./client/public/images/${productName}3.jpg`, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }
    });
    file4.mv(`./client/public/images/${productName}4.jpg`, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }
    });

    product.updateOne(
      { _id: productId },
      {
        productName: productName,
        specification: specification,
        price: price,
        weight: weight,
        length: length,
      },
      function (err, data) {
        if (err) {
          console.log(err);
          return;
        }

        if (data.length == 0) {
          console.log(data);
          console.log("No record found");
          return;
        }

        res.send(data);
        console.log("===========edited=============");
      }
    );
  });
};

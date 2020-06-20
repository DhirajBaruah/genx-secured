/*
 * App routes
 *
 */
const { Router } = require("express");
const router = Router();
const mongoose = require("mongoose");
const fs = require("fs");
const passport = require("passport");
const fileUpload = require("express-fileupload");
const requiredLogin = require("../../middlewares/admin/requiredLogin");
const { JWT_SECRET } = require("../../util/secrets");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("../../models/equipments");
require("../../models/category");
require("../../models/product");
require("../../models/productCategory");
require("../../models/users");
require("../../models/userAuthCredentials");
require("../../models/carts");
require("../../models/wishlists");
const category = mongoose.model("category");
const equipments = mongoose.model("equipments");
const product = mongoose.model("product");
const productCategory = mongoose.model("productCategory");
const users = mongoose.model("users");
const userAuthCredentials = mongoose.model("userAuthCredentials");
const wishlists = mongoose.model("wishlists");
const addresses = mongoose.model("addresses");
const carts = mongoose.model("carts");
const orders = mongoose.model("orders");
const admins = mongoose.model("admins");

/**
 * @ route   POST admin/signin
 * @ desc    admin signin. NOTE: password hashed..
 * @ access  public
 */
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Please add email and password" });
  }

  const savedUser = await admins.findOne({ email });
  if (!savedUser) {
    return res.status(400).json({ error: "User or password does not exist" });
  }
  const isPasswordValid = await bcrypt.compare(password, savedUser.password);
  if (isPasswordValid) {
    const token = jwt.sign({ id: savedUser._id }, JWT_SECRET);
    res.cookie("token", token, {
      httpOnly: true,
    });
    res.status(200).json({
      user: {
        userName: "Admin",
      },
    });
  } else {
    return res.status(400).json({ error: "User or password does not exists" });
  }
});

/**
 * @route   GET admin/user
 *  @des    Get admin data
 *  @acces  Private
 */

router.get("/user", requiredLogin, async (req, res) => {
  try {
    const user = await admins.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(400).json({ error: "User Does not exist" });
    }
    res.json(user);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

/**
 * @ route   POST admin/logoutUser
 * @ desc    To logout
 * @ access  Private
 */
router.post("/logoutAdmin", requiredLogin, (req, res) => {
  res.cookie("token", 123, {
    httpOnly: true,
  });
  res.status(200).json({ msg: "Logged out successfully" });
});

/**
 * @ route   POST admin/uploadProductCategory
 * @ desc    To add a new product category
 * @ access  Private
 */
router.post("/uploadProductCategory", requiredLogin, (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: "No file uploaded" });
  }
  console.log(req.body);
  const file = req.files.file;
  const categoryId = req.body.categoryId;
  const productCategoryName = req.body.productCategoryName;
  const details = req.body.details;
  const imageName = req.body.productCategoryName.replace(/ /g, "");

  const x = new productCategory({ productCategoryName, categoryId, details });
  x.save(function (err, data) {
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
    file.mv(`./client/public/images/${data._id}.jpg`, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }
    });
  });
});

/**
 * @ route   POST admin/uploadProduct
 * @ desc    To add a new product
 * @ access  Private
 */
router.post("/uploadProduct", requiredLogin, (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: "No file uploaded" });
  }

  const file1 = req.files.file1;
  const file2 = req.files.file2;
  const file3 = req.files.file3;
  const file4 = req.files.file4;
  const productCategoryId = req.body.productCategoryId;
  const productName = req.body.productName;
  const specification = req.body.specification;
  const price = req.body.price;
  const weight = req.body.weight;
  const length = req.body.length;

  const x = new product({
    productName,
    price,
    specification,
    weight,
    length,
    productCategoryId,
  });

  x.save(function (err, data) {
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

    file1.mv(`./client/public/images/${data._id}1.jpg`, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }
    });

    file2.mv(`./client/public/images/${data._id}2.jpg`, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }
    });
    file3.mv(`./client/public/images/${data._id}3.jpg`, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }
    });
    file4.mv(`./client/public/images/${data._id}4.jpg`, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }
    });
    res.json({
      success: true,
    });
  });
});

/**
 * @ route   POST admin/updateProduct/productId
 * @ desc    edit product
 * @ access  Private
 */
router.post("/updateProduct/:id", requiredLogin, (req, res) => {
  const productId = req.params.id;
  const productName = req.body.productName;
  const specification = req.body.specification;
  const price = req.body.price;
  const weight = req.body.weight;
  const length = req.body.length;

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
        return res.send(err);
      }

      if (data.length == 0) {
        console.log("No record found");
        return res.send(err);
      }
      res.send(data);
      console.log("===========edited=============");
    }
  );
});

/**
 * @ route   POST admin/updateProductImage/productId
 * @ desc    edit product Image
 * @ access  Private
 */
router.post("/updateProductImage/:id", requiredLogin, (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: "No file uploaded" });
  }

  const file = req.files.file;
  const productId = req.params.id;
  const imageNo = req.body.imageNo;

  file.mv(`./client/public/images/${productId}${imageNo}.jpg`, (err) => {
    if (err) {
      console.error(err);
      return res.send(err);
    }
    res.send({ success: true });
  });
});

/**
 * @ route   POST admin/deleteProduct/productId
 * @ desc    delete a product
 * @ access  Private
 */
router.delete(`/deleteProduct/:id`, requiredLogin, (req, res) => {
  let id = req.params.id;
  product.findOneAndRemove({ _id: id }, function (err, data) {
    if (err) {
      console.log(err);
      return res.send(err);
    }

    if (data.length == 0) {
      console.log(data);
      console.log("No record found");
      return res.send(err);
    }

    fs.unlink(`./client/public/images/${id}1.jpg`, (err) => {
      if (err) {
        console.log(`err ${err}`);
        return res.send(err);
      }
    });
    fs.unlink(`./client/public/images/${id}2.jpg`, (err) => {
      if (err) {
        console.log(`err ${err}`);
        return res.send(err);
      }
    });
    fs.unlink(`./client/public/images/${id}3.jpg`, (err) => {
      if (err) {
        console.log(`err ${err}`);
        return res.send(err);
      }
    });
    fs.unlink(`./client/public/images/${id}4.jpg`, (err) => {
      if (err) {
        console.log(`err ${err}`);
        return res.send(err);
      }
    });

    res.send(data);
  });
});

/**
 * @ route   POST admin/updateProductCategory/productCategoryId
 * @ desc    edit a product category excluding image
 * @ access  Private
 */
router.post("/updateProductCategory/:id", requiredLogin, (req, res) => {
  const productCategoryId = req.params.id;
  const productCategoryName = req.body.productCategoryName;
  const details = req.body.details;

  productCategory.updateOne(
    { _id: productCategoryId },
    { productCategoryName: productCategoryName, details: details },
    function (err, data) {
      if (err) {
        console.log(err);
        return res.send(err);
      }

      if (data.length == 0) {
        console.log("No record found");
        return res.send(err);
      }

      res.send(data);
      console.log("===========edited prodcat=============");
    }
  );
});

/**
 * @ route   DELETE admin/deleteProductCategory/productCategoryId
 * @ desc    delete a product category
 * @ access  Private
 */
router.delete(`/deleteProductCategory/:id`, requiredLogin, (req, res) => {
  let id = req.params.id;

  product.find({ productCategoryId: id }, (err, data) => {
    data.map((item) => {
      product.findOneAndRemove({ _id: item._id }, (err, data) => {});
      for (var i = 1; i < 5; i++) {
        fs.unlink(`./client/public/images/${item._id}${i}.jpg`, (err) => {
          if (err) {
            console.log("path was deleted");
          }
        });
      }
    });
  });

  productCategory.findOneAndRemove({ _id: id }, function (err, data) {
    if (err) {
      console.log(err);
      return res.send(err);
    }

    if (data.length == 0) {
      console.log("No record found");
      return res.send(err);
    }

    fs.unlink(`./client/public/images/${id}.jpg`, (err) => {
      if (err) {
        return res.status(500).json({ msg: "No file uploaded" });
        console.log("path was deleted");
      }
    });
    res.send(data);
    console.log(data);
    console.log("===========deleted prod cat and related prod=============");
  });
});

/**
 * @ route   POST admin/deleteProductCategory/productCategoryId
 * @ desc    edit product category image
 * @ access  Private
 */
router.post(
  "/updateProductCategoryImage/:productCategoryId",
  requiredLogin,
  (req, res) => {
    if (req.files === null) {
      return res.status(400).json({ msg: "No file uploaded" });
    }

    const file = req.files.file;
    const id = req.params.productCategoryId;

    file.mv(`./client/public/images/${id}.jpg`, (err) => {
      if (err) {
        console.error(err);
        return res.send(err);
      }
      res.send({ success: true });
    });
  }
);
/////////////////
router.get("/", (req, res) => {
  res.json("Server is listening for requests");
});

router.delete(`/deleteProduct/:id`, (req, res) => {
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

// router.post(
//   "/admin_login",
//   passport.authenticate("admin-local", {
//     successRedirect: "/",
//     failureRedirect: "/product",
//     failureFlash: true,
//   })
// );

router.get("/getAllOrders", requiredLogin, (req, res) => {
  console.log("running getOrder");
  orders
    .aggregate([
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      {
        $lookup: {
          from: "addresses",
          localField: "addressId",
          foreignField: "_id",
          as: "addressDetails",
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "productId",
          foreignField: "_id",
          as: "productDetails",
        },
      },
    ])
    .exec(function (err, data) {
      if (err) throw err;
      console.log(data);
      res.send(data);
    });
});

router.get("/x", (req, res) => {
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

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

////////fortest
// router.get('/addEquipment',(req,res)=>{

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
// router.post('/admin_login',(req,res)=>{

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

// router.post(
//   "/admin_login",
//   passport.authenticate("admin-local", {
//     successRedirect: "/",
//     failureRedirect: "/product",
//     failureFlash: true,
//   })
// );

module.exports = router;

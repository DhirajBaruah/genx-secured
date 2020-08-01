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
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
var nodemailer = require("nodemailer");
const {
  JWT_SECRET,
  ADMIN_EMAIL,
  TRANSPORTER_EMAIL,
  TRANSPORTER_PASSWORD,
} = require("../../util/secrets");
const requiredLogin = require("../../middlewares/app/requiredLogin");
const cookieParser = require("cookie-parser");
require("../../models/equipments");
require("../../models/category");
require("../../models/product");
require("../../models/productCategory");
require("../../models/users");
require("../../models/userAuthCredentials");
require("../../models/carts");
require("../../models/wishlists");
require("../../models/addresses");
require("../../models/carts");
require("../../models/orders");
const category = mongoose.model("category");
const equipments = mongoose.model("equipments");
const product = mongoose.model("product");
const productCategory = mongoose.model("productCategory");
const users = mongoose.model("users");
const userAuthCredentials = mongoose.model("userAuthCredentials");
const addresses = mongoose.model("addresses");
const carts = mongoose.model("carts");
const orders = mongoose.model("orders");

global.accsNewPass = false;

router.get("/", (req, res) => {
  res.json("Server is listening for requests ya");
});

/**
 * @ route   POST app/signup
 * @ desc    user signup
 * @ access  Public
 */
router.post("/signup", async (req, res) => {
  const { fname, lname, email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Please add all the fields" });
  }

  const savedUser = await users.findOne({ email });
  if (savedUser) {
    return res.status(400).json({ error: "Email is already in use" });
  }

  const hashedpassword = await bcrypt.hash(password, 12);

  const user = new users({
    fname,
    lname,
    email,
    createdOn: new Date(),
    password: hashedpassword,
  });

  const userData = await user.save();
  const token = jwt.sign({ id: userData._id }, JWT_SECRET, {
    expiresIn: 3600,
  });

  res.cookie("token", token, {
    httpOnly: true,
  });
  res.status(200).json({
    // token,
    user: {
      id: userData._id,
      fname: userData.fname,
      lname: userData.lname,
      email: userData.email,
    },
  });
});

/**
 * @ route   POST app/signin
 * @ desc    user signin.
 * @ access  public
 */
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Please add email and password" });
  }

  const savedUser = await users.findOne({ email });
  if (!savedUser) {
    return res.status(400).json({ error: "Invalid credentials" });
  }

  const isPasswordValid = await bcrypt.compare(password, savedUser.password);
  if (isPasswordValid) {
    const token = jwt.sign({ id: savedUser._id }, JWT_SECRET);

    res.cookie("token", token, {
      httpOnly: true,
    });

    res.status(200).json({
      // token,
      user: {
        id: savedUser._id,
        fname: savedUser.fname,
        lname: savedUser.lname,
        email: savedUser.email,
      },
    });
  } else {
    return res.status(400).json({ error: "Invalid credentials" });
  }
});

/**
 * @route   GET app/user
 *  @des    Get user data
 *  @acces  Private
 */

router.get("/user", requiredLogin, async (req, res) => {
  try {
    const user = await users.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(400).json({ error: "User Does not exist" });
    }
    res.json(user);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

/**
 * @ route   POST app/logoutUser
 * @ desc    To logout
 * @ access  Private
 */
router.post("/logoutUser", requiredLogin, (req, res) => {
  res.cookie("token", 123, {
    httpOnly: true,
  });
  console.log("loggedout");

  res.status(200).json({ msg: "Logged out successfully" });
});

/**
 * @ route   POST app/placeOrder
 * @ desc    To place orders
 * @ access  Private
 */
router.post("/placeOrder", requiredLogin, (req, res) => {
  let userId = req.user.id;
  let addressId = req.body.addressId;
  let productId = req.body.productId;
  let quantity = req.body.quantity;
  let payableAmount = req.body.payableAmount;
  let modeOfPayment = req.body.modeOfPayment;
  let status = req.body.status;

  let x = new orders({
    userId,
    addressId,
    productId,
    quantity,
    payableAmount,
    modeOfPayment,
    status,
  });
  x.save((err) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({
      success: true,
    });
  });
});

/**
 * @ route   GET /app/getProductCategory/productCategoryId
 * @ desc    get a product category
 * @ access  public
 */
router.get("/getProductCategory/:productCategoryId", (req, res) => {
  let productCategoryId = req.params.productCategoryId;

  productCategory.find({ _id: productCategoryId }, function (err, data) {
    if (err) {
      return res.send(err);
    }

    if (data.length == 0) {
      console.log("No record found ");
      return res.json({ msg: "No file uploaded" });
    }

    res.send(data);
  });
});

/**
 * @ route   GET /app/getMyOrders/:userId
 * @ desc    get my orders
 * @ access  private
 */
router.get("/getMyOrders/:userId", requiredLogin, (req, res) => {
  let userId = req.params.userId;

  orders
    .aggregate([
      { $match: { userId: mongoose.Types.ObjectId(userId) } },
      {
        $lookup: {
          from: "products",
          localField: "productId",
          foreignField: "_id",
          as: "listOfOrders",
        },
      },
      {
        $lookup: {
          from: "addresses",
          localField: "addressId",
          foreignField: "_id",
          as: "address",
        },
      },
    ])
    .exec(function (err, data) {
      if (err) {
        return res.send(err);
      }
      res.send(data);
    });
});

/**
 * @ route   GET /app/getMyOrders/:orderId
 * @ desc    get my orders
 * @ access  private
 */
router.get("/getOrder/:orderId", requiredLogin, (req, res) => {
  let orderId = req.params.orderId;

  orders
    .aggregate([
      { $match: { _id: mongoose.Types.ObjectId(orderId) } },
      {
        $lookup: {
          from: "products",
          localField: "productId",
          foreignField: "_id",
          as: "listOfOrders",
        },
      },
      {
        $lookup: {
          from: "addresses",
          localField: "addressId",
          foreignField: "_id",
          as: "address",
        },
      },
    ])
    .exec(function (err, data) {
      if (err) {
        return res.send(err);
      }
      res.send(data);
    });
});

/**
 * @ route   GET /app/forgotPass
 * @ desc    forgot password send otp
 * @ access  public
 */
router.post("/forgotPass", async (req, res) => {
  let userEmail = req.body.email;
  const savedUser = await users.findOne({ email: userEmail });
  if (!savedUser) {
    return res.status(400).json({ error: "Email does not exist" });
  }

  global.otp = Math.floor(Math.random() * (9999 - 1000)) + 1000;
  global.emailForNewPass = userEmail;
  const myFunction = () => {
    global.otp = Math.floor(Math.random() * (9999 - 1000)) + 1000;
    delete(emailForNewPass);
  };
  // setTimeout(myFunction, 60000 * 3);

  async function recCallBack() {
    // create reusable transporter object using the default SMTP transport
    // let transporter = nodemailer.createTransport({
    //     host: "smtp.ethereal.email",
    //     port: 587,
    //     secure: false, // true for 465, false for other ports
    //     auth: {
    //     user: testAccount.user, // generated ethereal user
    //     pass: testAccount.pass, // generated ethereal password
    //     },
    // });

    var transporter = await nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: TRANSPORTER_EMAIL,
        pass: TRANSPORTER_PASSWORD,
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: ADMIN_EMAIL, // sender address
      to: `${userEmail}`, // list of receivers
      subject: "otp for your genx account", // Subject line
      text: `Otp to reset your password : ${otp}`, // plain text body
    });
    res.json({success: true});
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }
  recCallBack().catch(console.error);
});

/**
 * @ route   GET /app/matchOtp
 * @ desc    forgot password match the otps
 * @ access  public
 */
router.post("/matchOtp", async (req, res) => {
  let otpRecieved = req.body.otp;
  if (otp != otpRecieved) {
    return res.status(400).json({ error: "Invalid credentials" });
  } else {
    global.accsNewPass = true;
    const myFunction = () => {
      global.accsNewPass = false;
    };
    setTimeout(myFunction, 60000 * 3);
    res.json({success: true});
  }
});


/**
 * @ route   GET /app/setNewPass
 * @ desc    forgot password set a new password
 * @ access  public
 */
router.post("/setNewPass", async (req, res) => {
  let password = req.body.pass;
  if (accsNewPass) {
    const hashedpassword = await bcrypt.hash(password, 12);

      users.updateOne(
    { email: emailForNewPass },
    {
      password: hashedpassword
    },
    function (err, data) {
      if (err) {
        console.log(err);
        return res.send(err);
      }

      res.send(data);
      console.log("===========edited=============");
    }
  );
    
  } else {
    return res.status(400).json({ error: "Session expired" });
  }
});

// router.get("/a", (req, res) => {
//   users.find({}, function (err, data) {
//     if (err) {
//       console.log(err);
//       return;
//     }

//     if (data.length == 0) {
//       console.log("No record found");
//       return;
//     }
//     console.log(data);
//     res.json(data);
//   });
// });

router.get("/categoryExplored/:categoryName", (req, res) => {
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
      console.log(`=============${data}`)
      res.send(data);
      
    });
  });
});

router.get("/category", (req, res) => {
  category.find({}, function (err, data) {
    if (err) {
      console.log(err);
      return res.send(err);
    }

    if (data.length == 0) {
      console.log("No record found");
      return res.send(err);
    }

    res.send(data);
  });
});

router.get("/listOfProducts/:yoyo", (req, res) => {
  let productCategoryId = req.params.yoyo;
  product.find({ productCategoryId: productCategoryId }, function (err, data) {
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

router.get("/productExplored/:productId", (req, res) => {
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

router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google"),
  (req, res) => {
    res.redirect("/");
  }
);

router.get("/current_user", (req, res) => {
  res.send(req.user);
  console.log(req.user);
});
router.get("/current_session", (req, res) => {
  res.send(req.session);
  console.log(req.session);
});

router.get("/User", (req, res) => {
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

// Upload Image
// router.post("/upload/:id", (req, res) => {
//   if (req.files === null) {
//     return res.status(400).json({ msg: "No file uploaded" });
//   }

//   const file = req.files.file;
//   const id = req.params.id;

//   file.mv(`./client/public/images/${id}.jpg`, (err) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).send(err);
//     }
//   });
// });

router.post("/addToCart", requiredLogin, (req, res) => {
  let userId = req.user.id;
  let addressId = req.body.addressId;
  let productId = req.body.productId;
  let quantity = req.body.quantity;
  let payableAmount = req.body.payableAmount;

  let x = new carts({ userId, addressId, productId, quantity, payableAmount });
  carts.find({ userId: userId, productId: productId }, (err, data) => {
    if (err) {
      return res.status(422).send(err);
    } else if (data.length == 0) {
      x.save((err) => {
        if (err) {
          return res.status(422).send(err);
        }
        carts.find({ userId: userId, productId: productId }, (err, data) => {
          if (err) {
            return res.status(422).send(err);
          }
          res.send(data);
        });
      });
    } else {
      carts.updateOne(
        { _id: data[0]._id },
        {
          userId: userId,
          addressId: addressId,
          productId: productId,
          quantity: quantity,
          payableAmount: payableAmount,
        },
        (err, data2) => {
          if (err) {
            return res.status(422).send(err);
          }
          carts.find({ _id: data[0]._id }, (err, data3) => {
            if (err) {
              return res.status(422).send(err);
            }
            res.send(data3);
          });
        }
      );
    }
  });
});

router.get("/getCart", requiredLogin, (req, res) => {
  let userId = req.user.id;

  carts.find({ userId: userId }, (err, data) => {
    if (err) {
      return res.status(422).send(err);
    }
    res.send(data);
  });
});

router.delete("/RemoveFromCart", requiredLogin, (req, res) => {
  let userId = req.user.id;
  let productId = req.body.productId;

  carts.findOneAndRemove(
    { userId: userId, productId: productId },
    (err, data) => {
      if (err) {
        return res.status(422).send(err);
      }
      res.json({ success: true });
    }
  );
});

//////////////////WISHLIST
router.post("/addToWishlists", requiredLogin, (req, res) => {
  let userId = req.user.id;
  let productId = req.body.productId;

  let x = new wishlists({ userId, productId });
  x.save((err) => {
    if (err) {
      return res.status(422).send(err);
    }
    res.json({ success: true });
  });
});

router.post("/getWishlists/:userId", requiredLogin, (req, res) => {
  let userId = req.user.id;
  console.log(userId);

  wishlists
    .aggregate([
      { $match: { userId: mongoose.Types.ObjectId(userId) } },
      {
        $lookup: {
          from: "products",
          localField: "productId",
          foreignField: "_id",
          as: "listOfWishes",
        },
      },
    ])
    .exec(function (err, data) {
      if (err) throw err;
      console.log(data);
      res.send(data);
    });
});

router.get(`/getDataOfAddresses`, requiredLogin, (req, res) => {
  userId = req.user.id;
  addresses.find({ userId: userId }, (err, data) => {
    if (err) {
      console.log(`address ${err}`);
      return res.status(422).send(err);
    }
    res.send(data);
  });
});

router.post(`/getDataOfProducts/:productId`, (req, res) => {
  let productId = req.params.productId;
  product.find({ _id: productId }, (err, data) => {
    if (err) {
      return res.status(422).send(err);
    }
    res.send(data);
  });
});

router.delete("/RemoveFromWishlists", requiredLogin, (req, res) => {
  let userId = req.user.id;
  let productId = req.body.productId;

  wishlists.findOneAndRemove(
    { userId: userId, productId: productId },
    (err, data) => {
      if (err) {
        return res.status(422).send(err);
      }
      res.json({ success: true });
    }
  );
});
// router.delete(`/RemoveAllWishlists`,(req,res)=>{

//     let id = "5ea5020e3e37762038dafd24";

//     wishlists.deleteMany({_id:mongoose.Types.ObjectId(id)}, function(err, data){
//         if(err){
//             console.log(err);
//             return
//         }

//         if(data.length == 0) {
//             console.log(data);
//             console.log("No record found")
//             return
//         }

//     })

//   })

/////////////ORDERS
// router.post('/placeOrders',(req,res)=>{

// })

module.exports = router;

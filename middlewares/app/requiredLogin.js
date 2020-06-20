const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { JWT_SECRET } = require("../../util/secrets");
const users = mongoose.model("users");

module.exports = (req, res, next) => {
  // const token = req.header("x-auth-token");
  const token = req.cookies.token;
 
  // Check for token
  if (!token)
    return res.status(401).json({ error: "No token, authorizaton denied" });

  try {
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    // Add user from payload
    req.user = decoded;
    
    next();
  } catch (e) {
    
    res.status(400).json({ error: "Token is not valid" });
  }
};

//CNQ
  // if (!authorization) {
  //   return res.status(400).json({ error: "Not authorized" });
  // }
  // const token = authorization.replace("Bearer ", "");
  // jwt.verify(token, JWT_SECRET, (err, payload) => {
  //   if (err) {
  //     return res.status(400).json({ error: "Invalid token" });
  //   }

  //   const { _id } = payload;
  //   admins.findById(_id).then(userdata => {
  //     req.user = userdata;
  //     next();
  //   });
  // });
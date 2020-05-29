const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 7000;
const keys = require('./config/keys')
const cookieSession = require('cookie-session')
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport')
const flash = require('connect-flash');
const fileUpload = require('express-fileupload');
require('./models/equipments');
require('./models/category');
require('./models/product');
require('./models/productCategory');
require('./models/users');
require('./models/userAuthCredentials');
require('./models/carts');
require('./models/wishlists');
require('./models/addresses');
require('./models/orders');


require('./services/passport')
mongoose.connect(keys.mongoUrl,{useNewUrlParser: true, useUnifiedTopology: true, 'useCreateIndex': true},()=>{
  console.log('connected to db');
});
app.use(fileUpload());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// app.use(
//     cookieSession({
//         maxAge:30 * 24 * 60 * 60 *1000,
//         keys:[keys.cookieKey]
//     })
// )
app.use(cookieParser());
app.use(session({
	secret: 'secret',
	resave: false,
	saveUninitialized: false
}));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session())





require('./routes/fetchRoutes')(app)
require('./routes/buyRoutes')(app)



app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
  
    // Pass to next layer of middleware
    next();
});
// //PROXY
// app.use('/*', createProxyMiddleware({ target: 'http://localhost:3000', changeOrigin: true }));



if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
    const path = require('path');
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}



app.listen(port,()=>{
  console.log("server running at"+port)
})


const express= require('express');
const mongoose = require('mongoose');
const wishlists = mongoose.model('wishlists');
const product = mongoose.model('product');
const addresses = mongoose.model('addresses');
const carts = mongoose.model('carts');
const orders = mongoose.model('orders');


module.exports = (app) =>{

    app.post('/placeOrder',(req,res) =>{
        let userId = req.body.userId;
        let addressId = req.body.addressId;
        let productId = req.body.productId;
        let quantity = req.body.quantity;
        let payableAmount = req.body.payableAmount;
        let modeOfPayment = req.body.modeOfPayment;
        let status = req.body.status;

        let x = new orders({userId, addressId, productId, quantity, payableAmount, modeOfPayment, status});
                x.save((err)=>{
                    if(err){ return res.status(422).send(err);}
                    res.json({
                    success: true
                    });
                })        
    })

    app.get('/getAllOrders',(req,res) =>{
        console.log("running getOrder")
        orders.aggregate([
                    { $lookup:
                    {
                        from: 'users',
                        localField: 'userId',
                        foreignField: '_id',
                        as: 'userDetails'
                    }
                    },
                    { $lookup:
                    {
                        from: 'addresses',
                        localField: 'addressId',
                        foreignField: '_id',
                        as: 'addressDetails'
                    }
                    },
                    { $lookup:
                    {
                        from: 'products',
                        localField: 'productId',
                        foreignField: '_id',
                        as: 'productDetails'
                    }
                    }
                    ]).exec(function(err, data) {
                    if (err) throw err;
                    console.log(data);
                    res.send(data)
                    
                });
 
    })


//////////////////CART
    app.post('/addToCart',(req,res)=>{
        console.log("running addToCart")
        let userId = req.body.userId;
        let addressId = req.body.addressId;
        let productId = req.body.productId;
        let quantity = req.body.quantity;
        let payableAmount = req.body.payableAmount;


        let x= new carts({userId,addressId,productId,quantity,payableAmount});
        carts.find({userId:userId,productId:productId},(err,data) =>{
            
            if(err){ 
                return res.status(422).send(err);
                }
                
            else if(data.length == 0){
                x.save((err)=>{
                    if(err){ return res.status(422).send(err);}
                    carts.find({userId:userId,productId:productId},(err,data) =>{
                        if(err){ return res.status(422).send(err);}
                        res.send(data)

                    })
                })
            }
            else{
                carts.updateOne({_id:data[0]._id},{userId:userId,addressId:addressId,productId:productId,quantity:quantity,payableAmount:payableAmount},(err,data2) =>{
                    if(err){ return res.status(422).send(err);}
                     carts.find({_id:data[0]._id},(err,data3) =>{
                         if(err){ return res.status(422).send(err);}
                         res.send(data3)

                     })
                })
            }

        })


    })

     app.get('/api/getCart',(req,res)=>{

        let userId = req.body.userId;

        carts.find({userId:userId},(err,data)=>{
             if(err){ return res.status(422).send(err);}
             res.send(data)

        })
       


    })

    app.delete('/api/RemoveFromCart',(req,res)=>{

        let userId = req.body.userId;
        let productId = req.body.productId;

        carts.findOneAndRemove({userId:userId, productId:productId},(err,data)=>{
             if(err){ return res.status(422).send(err);}
             res.json({ success: true });

        })
       


    })

//////////////////WISHLIST
    app.post('/api/addToWishlists',(req,res)=>{

        let userId = req.body.userId;
        let productId = req.body.productId;



        let x= new wishlists({userId,productId});
        x.save((err)=>{
            if(err){ return res.status(422).send(err);}
             res.json({ success: true });

        })

    })

     app.post('/getWishlists/:userId',(req,res)=>{

        let userId = req.params.userId;
        console.log(userId)

        wishlists.aggregate([
                    { "$match": {userId: mongoose.Types.ObjectId(userId) } },
                    { $lookup:
                    {
                        from: 'products',
                        localField: 'productId',
                        foreignField: '_id',
                        as: 'listOfWishes'
                    }
                    }
                    ]).exec(function(err, data) {
                    if (err) throw err;
                    console.log(data);
                    res.send(data)
                    
                });


    })

    app.post(`/getDataOfAddresses/:userId`,(req,res)=>{

        let userId = req.params.userId;
        addresses.find({userId:userId},(err, data)=>{
            if (err){ return res.status(422).send(err)}
            res.send(data);
        })
        

    })

    app.post(`/getDataOfProducts/:productId`,(req,res)=>{

        let productId = req.params.productId;
        console.log(productId);
        product.find({_id:productId},(err, data)=>{
            if (err){ return res.status(422).send(err)}
            res.send(data);
        })
        

    })

    app.delete('/api/RemoveFromWishlists',(req,res)=>{

        let userId = req.body.userId
        let productId = req.body.productId

        wishlists.findOneAndRemove({userId:userId, productId:productId},(err,data)=>{
             if(err){ return res.status(422).send(err);}
             res.json({ success: true });

        })
       


    })
    // app.delete(`/api/RemoveAllWishlists`,(req,res)=>{
       
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
    // app.post('/api/placeOrders',(req,res)=>{

    // })
    
}
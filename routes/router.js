// To define routes for client request , create routes folder and a router.js file in it
//           ->import express  ,(then only we can access application created using express)
//           ->using expresss create an object for router class inorder to setup path
//           ->Resolving client request


//1 import express
const express = require('express')

//5 import productController
const productController = require('../controllers/productController')

//6. import wishlistcontroller , import chaydaale path set chayyumbbo folder inside function kittuga ie wishlistcontroller lee addtowishlist
const wishlistController = require('../controllers/wishlistController')
 
//7. import cartController
const cartController = require('../controllers/cartController')


//2 using expresss create an object for router class inorder to setup path ,router -> object
const router = new express.Router()
//here Router() -> is a function ,an object router is created from it for that we use express


//3.  Resolving client requests

     //first request//
//.......................//
//api call for  - getallproduct request


//router class inorder to setup path  ,//allproducts neeyum get chayyanulla path(this path lulla complete data) , router -> object.get  products -> products is the name of module we created here , all-products nde p
router.get('/products/all-products',productController.getallproducts)
// 4. from here data may or may not be come , to define this logic create a folder controllers
//data vannal do these operation otherwise do this (edoru logic aan),so that we create folder productController to handle it
//to define logic of above path create a folder controllers ,what will do next



//api call to get particular product , id passing here so mention it also
router.get('/products/view-product/:id',productController.viewProduct) //logic contain in productController ,next goto postman and test

//api call - product added to wishlist product , so post method is used

router.post('/wishlist/add-to-wishlist',wishlistController.addtowishlist)
//wishlistController(inside function)->addtowishlist


//api - get wishlist product
router.get('/wishlist/get-wishlist',wishlistController.getWishlistitems)



//api - get cart items
router.get('/cart/get-item',cartController.getcart)

//api call- remove(delete method is used) wishlist item ,id also passed along with path
router.delete('/wishlist/remove-wishlist-item/:id',wishlistController.removeWishlistitems)//then go to postman to test backend working

//api call - add to cart , entire data post chayyan kodukkaan
router.post('/cart/add-to-cart',cartController.addtocart)//then go to postmanand test backend

//api remove item from cart , id also passed using that items removed
router.delete('/cart/remove-item/:id',cartController.removecartitems)//go to postman for check backend work or not


//API - increment cart item count(quantity) , get or post kodukaam
router.get('/cart/increment-count/:id',cartController.incrementcount)


//API - decrement cart item count(quantity) , get or post kodukaam
router.get('/cart/decrement-count/:id',cartController.decrementcount)



//export router -> export chayyunad vere evidenggilum use chayyanaan
module.exports = router

//router ne index.js il import chayyuga ,use chayyuga

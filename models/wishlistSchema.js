//import mongoose
const mongoose = require('mongoose')




//define schema for product collection
//goto mongodb ->database -> browse collection -> data format eg:tile,price,id,description

//required data type define chayyuga 

//user kodukunna data backendil store chayyan 
//collection of wishlist create chayyunnu
const wishlistSchema =  new mongoose.Schema({

    id:{//':' colon indicates type of id ie object
       type:Number,//properties & their types
       required:true,
       unique:true
    },

    //rating and description are removed

    title:{
        type:String,
        required:true,
    },

    price:{
        type:Number,
        required:true,

    },
    
    // category:{
    //     type:String,
    //     required:true,

    // },
    image:{
       type:String,
       required:true,
    }
})



//after schema creation create a model to store data , while ceating model there will be 's' along with model name.

const wishlists = new mongoose.model("wishlists",wishlistSchema)//model name,used schema stored to a variable

//export model //then only we can use it

module.exports = wishlists

//next : go to productcontroller.js to define logic of this





//import mongoose
const mongoose = require('mongoose')



//schema is  created  for creating a collection in mongodb
//define schema for cart collection
//goto mongodb ->database -> browse collection -> data format eg:tile,price,id,description

//required data type define chayyuga 

//user kodukunna data backendil store chayyan 
//collection of cart create chayyunnu
const cartSchema =  new mongoose.Schema({

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
    },
    quantity:{
        type:Number,
        required:true,
    },
    grandTotal:{
        type:Number,
        required:true,
    }
})



//after schema creation create a model to store data , while ceating model there will be 's' along with model name.

const carts = new mongoose.model("carts",cartSchema)//model name,used schema stored to a variable

//export model //then only we can use it

module.exports = carts

//next : go to cartcontroller.js to define logic of this





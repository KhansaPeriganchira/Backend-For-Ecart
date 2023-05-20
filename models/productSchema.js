//how datas set in database 

//import mongoose
const mongoose = require('mongoose')




//define schema for product collection
//goto mongodb ->database -> browse collection -> data format eg:tile,price,id,description

//required data type define chayyuga 

const productSchema =  new mongoose.Schema({

    id:{//':' colon indicates type of id ie object
       type:Number,//properties & their types
       required:true,
       unique:true
    },
    title:{
        type:String,
        required:true,
    },

    price:{
        type:Number,
        required:true,

    },
    description:{
        type:String,
        required:true,

    },
    category:{
        type:String,
        required:true,

    },
    image:{
       type:String,
       required:true,
    },
    rating:{//object of object yattu set chayya inside rate & count

        rate:{
            type:Number,
            required:true,
        },
        count:{
            type:Number,
            required:true,
        }

    }



})



//after schema creation create a model to store data

const products = new mongoose.model("products",productSchema)//model name,used schema stored to a variable

//export model //then only we can use it

module.exports = products



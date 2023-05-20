//client request anusarich each one logic(here cart,wishlist,products,viewcontroller  etc)  will defined here



//logic - resolving api's client first request , //get allproducts api call logic

//oru pathil ninn/api data edukkunnu this is a asynchronous function ->(means during function call data may or may not be come ),if data comes promise case laan prannu kodukka

//import created productSchema in models folder here , inside this schema data (products nagath) presented
//import product collection  , '../' koduthallaan folder models path varuga
const products = require('../models/productSchema')


//import wishlist collection
const wishlists = require('../models/wishlistSchema')





//router le api call logic evide parannu kodukkunnu ,function define chayyunnu and its logic explained in try catch block laan
//function ne export chayyunnu
//callback function -> means oru function nde parameter ayittu vere function ne pass chayyunnu(async) this will return promise.

exports.getallproducts = async(req,res)=>{//function call asychronous function call data may or may not be come ,if data comes promise case laan prannu kodukka
    
    //logic parannu kodukkan require try catch block veenam
    try{
          //get all products from products (collection) in mongodb

//when we create a asynchronous function , in function there will occur delay , to handle it we use await , that's why when we select await , async also selected
//products -> create chayda model
//data kittunna case
    const allProducts = await products.find()// products(create chayda model aanu check chayyunnad) ennadil data unddon find chayyunnu , result stored to a variable allproducts
    res.status(200).json(allProducts)//if data present response kittanam , varuuna data convert into json format json format laan veendadd

    }//if no data comes error case
    catch(error){
          res.status(401).json(error)
    }

}
//after that goto router.js
////import productController in routes.js




//define function view a particular product

exports.viewProduct = async (req,res)=>{//return promise
    //get id from request(user), user send chayyunna requestil ninnum that parameter lee id  get chayyunnu, id present in params
   //user request chayyunna url inside id kittanam so that req.params.id is given
    const id = req.params.id
    //logic
    try{
        //such an check id present in mongodb , products = model name
        const product = await products.findOne({id})//id:id ,findOne oru id aan find  chayyenddadd,  products enena model nammal kodukkunna id unddo nn chevk chayyunnu
        if(product){
            //if data present in products if will work ,product il ulla data print chayyikkuga
            res.status(200).json(product)
        }
        else{//otherwise else will work
            res.status(404).json("Item not found")
        }

    }
    catch(error){
        res.status(401).json(error)
    }
//go to router -> api call for particular api call

}

//define logic of wishlist , // add to wishlist

exports.addtowishlist = async (req,res)=>{

    //get product details from request(all products sil ninnu oru btn clisckil that product ne  nammal addto wishlist leek kodukkugayaan)
//user requestil ninnum request  chayada product details kittanam in wishlist page, this will work by javascript  destructuring concept


//eg:demo example of destructuring concept

    // req.body={//this is an object
    //     "id":"4",
    //     "name":"manu"
    // }

    //{id,name} -> keys 
// const {id,name} = req.body (destructuring concept) #changing from object structure
// in case we rquire id,name in this destructurin use , const {id,name} = req.body.id /name

    //using destructuring

  const{id,title,price,image}=req.body//these all come from request body 

  // actual logic

   try{
       //check if the product in the mongodb , oru product ndee oru copy required , duplicates veenda

       const item = await wishlists.findOne({id})//id unnddo nnookunnu
       if(item)//if item:id  unddenggill
       {
           res.status(403).json("Item already exists in Wishlist")
       }
       else{// not present case
        //add item to the wishlist
        const newProduct=new wishlists({id,title,price,image})//that selected product contain many datas so, create an object , productil veenda kaaryangal parannu kodukkunnu
        //to store in the mongodb , here function is async so before doing every task mention 'await'
        await newProduct.save()
        res.status(200).json("Product added to the wishlist")//message to user 
       }
       

   }
   catch(error){//try le error handle chayyan
    res.status(401).json(error)
   }



}

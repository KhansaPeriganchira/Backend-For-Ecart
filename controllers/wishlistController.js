
const wishlists = require('../models/wishlistSchema')
//define logic of wishlist , // add to wishlist

exports.addtowishlist = async (req,res)=>{

    //get product details from request

    // req.body={
    //     "id":"4",
    //     "name":"manu"
    // }

    //using destructuring
   // req.body -> koduthee complete data is required
  const{id,title,price,image}=req.body

  //logic

   try{
       //check if the product in the mongodb

       const item = await wishlists.findOne({id})
       if(item)
       {
           res.status(403).json("Item already exists in Wishlist")
       }
       else{
        //add item to the wishlist
        const newProduct=new wishlists({id,title,price,image})
        //to store in the mongodb
        await newProduct.save()
        res.status(200).json("Product added to the wishlist")
       }
       

   }
   catch(error){
    res.status(401).json(error)
   }

}

//get wishlist data - logic    ( mongodb ulla data edukkunnu)
exports.getWishlistitems= async(req,res)=>{
    //logic
    try{
        //get all wishlist items from mongodb ,  (nammal mongodb set chaydu vacha items) those products ne display chaayyanam to wishlist apgil
        //wishlists -> model name , we have to get all items so use find() method
        const allWishlistItems = await wishlists.find()
        res.status(200).json(allWishlistItems)//variable ne pass chayyunnu ,this variable inside data ne resultaa yittu pass cahyuunuu

    }
    catch(error){
        res.status(401).json(error)
    }
}//go to routes and set path for this function call

//remove wishlist items - logic

exports.removeWishlistitems= async(req,res)=>{
    //params il ninnu id edukkumm then check id present in mongodb(parameter il ninnum id edukkunnu)
    //get id from the request ,id ne url via 
    //using destructuring getting id
    // const {id} -> endineyaano kittenddad adu ,  req.params -> evidunnann edukkenddadd destructure use chaydittu parannu kodukkunnu
    const {id}=req.params
    //actual logic defined in try catch
    try{
        //id ne delete chayyunnu
         const removewishlistitem = await wishlists.deleteOne({id})
         //remaining items edukkan parayunna code
         if(removewishlistitem.deletedCount!=0 ){//wishlist after deletion ulla products display yaavanam
            //get all wishlist items after removing particular wishlist item
            const allWishlists = await wishlists.find()//remaining wishlist items , ellam kittan find() koduthuu
            res.status(200).json(allWishlists)//variable  ne json aakeetu pass chaydu

         }
         else{//get chayyunna id cart il not present case
            res.status(404).json("Item not found")
        }

    }
    catch(error){
        res.status(401).json(error)
    }

}

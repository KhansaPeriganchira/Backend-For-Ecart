//import cart collection
const carts = require('../models/cartSchema')


//add to cart -> oru data ne select chaydu vere place leek kodukka ies addto cart
//for select chayyan veendi requestil eendokke pass chayyenddad ennu destruture chaydu parannu kodukkum.
exports.addtocart = async(req,res)=>{//set as callback function
//get products details from request
//oru placil ninnum vere place leek pass chayyan etrayum data body il pass chayyum 
//destructure il parannu kodukkunnu
const {id,title,price,image,quantity} =req.body

//actual logic

       try{
        //2 cases : added product already present inmongodb then its quantity increses chayyanam ,not present in cart ,it will added to cart and save to mongodb
        
        //check if product is already in cart
        //cart mongodb unddonn nookuga
            const product= await carts.findOne({id})//angane oru id ulla product database unddonn nooki
            if(product){
            //product is in cart, increment product quantity
             product.quantity+=1//kure add chayyumbbo quantity increment chayyanam
             //not quantity,but also price um increment aavanam product koodunnadinu corresponding

             //update grand total in mongodb
             product.grandTotal=product.price*product.quantity
             
             //to save changes of product  in mongodb
                product.save()

             //save aayittundeel client nn message kodukkanam
             //send response to the client
             res.status(200).json("product added to the cart")

        }
        else{
            //product  is not available in the cart
            //that case il new variable leek adine store chaydu save chayyanam
            //add product to the cart
            //garndTotal:price (new data add chayda it changes , now current adeded product price contain in it )
            const newProduct= new carts({id,title,price,image,quantity,grandTotal:price})//object aayittu parannu kodukka pass chayyenndadad
            //save new product ,nammude function async aan so await kodukka
            await newProduct.save()
            //send response to the client , already ilaltha item kodukkumbooyum client nu msg chayyanam.
            res.status(200).json("product added to the cart")
        }

          }
       catch(error){
               res.status(401).json(error)
         }//go to routes

}


//get cart product - logic    ( mongodb ulla data edukkunnu)
exports.getcart= async(req,res)=>{
    //logic
    try{
        //get all products from carts collection from mongodb ,  (nammal mongodb set chaydu vacha items) those products ne display chaayyanam to wishlist apgil
        //wishlists -> model name , we have to get all items so use find() method
        const allitems = await carts.find()
        res.status(200).json(allitems)//variable ne pass chayyunnu ,this variable inside data ne resultaa yittu pass cahyuunuu

    }
    catch(error){
        res.status(401).json(error)
    }
}//go to routes and set path for this function call





//remove a product from cart
exports.removecartitems=async(req,res)=>{
    //get product id from request params ,id nammal pass chayay request parameterilaan 
    //avide ninnu id edukanam destruture chaydu
    const{id}=req.params//requestil varunna id ne acess cahayyan kayiyumm
    try{

        //logic parannu kodukkunnu
        //remove an item from cart
        const removeProduct = await carts.deleteOne({id})//mongodb il ninnium that id ulla product get deleted
        if(removeProduct.deletedCount!=0){//item delete ->deletecount becomes 1 again item delete cahyda deletecount becomes 0 
            //get remaining products
            const remainingproducts=await carts.find()//all items neeyum find() vachu eduthu
            res.status(200).json(remainingproducts)//json formatil remaining products ine pass chaydu
        }//deletedcount =0 aanell below message dispalyed
        else{//get chayyunna id carts(mongodb collectionil illenggill) il not present case
            res.status(404).json("Item not found")
        }

    }
    catch(error){
        res.status(401).json(error)

    }
}

//increment cart item count (quantity incresae) btnil '+'
exports.incrementcount=async(req,res)=>{
    //get product id from request params
    const{id}=req.params
    try{
        //check if product in the cart

        const product = await carts.findOne({id})
        if(product){
            //if product present increment product and grandtotal
            product.quantity+=1//increment quantity
            product.grandTotal=product.price * product.quantity

            //save changes in mongodb
            await product.save()

            //increment chaydadineeyum,get(remaining) all the products from the cart after updating in 
            //particular cart items
            const allitems=await carts.find()
            res.status(200).json(allitems)

        }
        else{
            res.status(404).json("Item not found")
        }
        

    }
    catch(error){
        res.status(401).json(error)
    }
}

//decrement cart item count (quantity decrease) btnil '-'
exports.decrementcount=async(req,res)=>{
    //get product id from request params
    const{id}=req.params
    try{
        //check if product in the cart

        const product = await carts.findOne({id})
        if(product){
            //if product present decrement product and grandtotal
            product.quantity-=1//decrement quantity
            if(product.quantity==0){
                //remove product from the cart
                await carts.deleteOne({id})
                const allitems=await carts.find()
                res.status(200).json(allitems)
            }
            else{
            product.grandTotal=product.price * product.quantity

            //save changes in mongodb
            await product.save()

            //decrement chaydadineeyum,get(remaining) all the products from the cart after updating in 
            //particular cart items
            const allitems=await carts.find()
            res.status(200).json(allitems)
            }
        }
        else{
            res.status(404).json("Item not found")
        }
        

    }
    catch(error){
        res.status(401).json(error)
    }
}


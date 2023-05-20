//to run back-end application ->nodemon index.js

// nammal craete chayyunnadokke automaticcally load chayyanam for that we use ->
//1.automatically load .env files into our projects

// run time all data available(update ,create) aavaanfor that we have to import this file
//  .config file is used for when application run time .env file load chayann

//import dot env file  to use it ,config() -> Loads .env file contents into process.env.
require('dotenv').config()

//2 import express
const express=require('express')

//import cors , 5000 portne connect chayyan poogunna portumaayitt link chayyunnu
const cors=require('cors')
//using this cors we have to use the server


//import db file to use it , ./ kodukkumbbo db folder kaanumm adu kodukka , next  connection 
require('./db/connection')


//import router
const router = require('./routes/router')//create chayda router ne evideek kodunnu ,path parannu kodythuu , import chaydal edine evide  use chayyanam

//3 create a server application using express function
const  server = express()


//to store port number  , (portne first thanne define chaydu  kodukkunnu)
const PORT =5000

//use server application
server.use(cors())//imported cors uses in server
//varunna data json formatil ninnu change chayayn
server.use(express.json())
server.use(router)


//after this //to run back-end application ->nodemon index.js



//routes sine ellam vere folder laakunnu

//set route localhost:5000 ,'/' -> display chayyenda main path,nammukk eedu portum kodukkam
//routes : get chayyunna path eg:localhost:5000
// server.get('/',(req,res)=>{
//     res.status(200).json('E commerce Service Response')//here we requesting to backend port (nodejs) using get method then we obtain 'E-commerce Service Response'
// }) //browseril request chayyunnu localhost:5000 nagathuu egane oru response varunndoo o/p :E commerce Service Response pagil displays , is shows backend port and application both  are working





//4 To run the server  application (application run chaayyan), usually inside listen we give port and say what content should display there 
//but here we create a variable and asign port number to it , then port number ne evideek kondduvara.
server.listen(5000,()=>{//arrow function  if port is working inside console.log contents will displayed
    console.log('server listening on port' +PORT);
}) //site inside localhost:5000 parannu koduthaal   :o/p -> Cannot GET / ennanu varuga , browser il server le console.log contents varanamenggil get methodil parannu koduuka  



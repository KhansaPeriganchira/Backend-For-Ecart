// connection code parannu koduthuu


//to connect atlas with nodejs import mongoose here (import chaydaale 2 um connect chayyan saadikkuga)
//import mongoose ,mongoose is a library
const mongoose = require('mongoose')

//to get(kondduvaraan) connection string in env file ,this way attach env file to here
//The process.env property returns an object containing the user environment (env). 
//DATABASE -> connection string present here
//env -> file
//process -> nodejs method ,ie .env file le database neyaan process chayyendee this will take place during run time
const db = process.env.DATABASE

//use mongoose , mongoose vachu connect chayyunnu , db laan now env set chayda datbase ullad inside datbase string contained to connect it
mongoose.connect(db,{//topology parannu kodukkunnu

    useUnifiedTopology:true,
    useNewUrlParser:true

}).then(()=>{//mongodb connect chayda db inside data present , then execute .then inside contents
    console.log('Database connected');
}).catch((err)=>{//no data err ne console chayyuga
console.log(err);
})

//now we require a connection b/w index.js and connection.js file , then only above console.log contents displayed






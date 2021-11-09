require('dotenv').config();
const mongoose = require('mongoose');
const db = process.env.DB_LINK;

mongoose.connect(db,{ 
    useNewUrlParser: true ,
    useUnifiedTopology: true,
})
.then( ()=> console.log("db connected"))
.catch( (err)=> console.log("Please Make Sure Your Internet is Working!") );
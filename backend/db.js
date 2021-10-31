const mongoose = require('mongoose');
const db = "mongodb+srv://root:root@cluster0.tsykr.mongodb.net/inotebook?retryWrites=true&w=majority";

mongoose.connect(db,{ 
    useNewUrlParser: true ,
    useUnifiedTopology: true,
})
.then( ()=> console.log("db connected"))
.catch( (err)=> console.log("Please Make Sure Your Internet is Working!") );
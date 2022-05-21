const mongoose = require('mongoose');

mongoose.connect("https://wander-lust-6324b.firebaseio.com/",{ useNewUrlParser: true,useCreateIndex: true,useFindAndModify: false },(err)=>{
    if(!err)
        console.log("MongoDb Connection successfull at port 27017");
    else
        console.log("Error"+JSON.stringify(err,undefined,2));
});

module.exports = mongoose;
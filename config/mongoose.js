const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1/SB_Admin')

const db = mongoose.connection
db.once('open',(err)=>{
     if(err){
          console.log(err);
          return false;
     }
     console.log('DB is connected');
})
module.exports = db
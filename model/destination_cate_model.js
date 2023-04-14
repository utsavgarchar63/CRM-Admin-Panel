const mongoose = require('mongoose')
const destinationSchema = mongoose.Schema({
     destination_cate : {
          type : String,
          required : true
     },
     status : {
          type :Boolean,
          required : true 
     }
})

const destination = mongoose.model('destination_cate',destinationSchema)
module.exports = destination
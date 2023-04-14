const mongoose = require('mongoose')
const multer = require('multer')
const path = require('path')
const packageSchema = mongoose.Schema({
     destination_cateId : {
          type : mongoose.Schema.Types.ObjectId,
        ref : 'destination_cate',
        required : true
     },
     destinationId : {
          type : mongoose.Schema.Types.ObjectId,
          ref : 'destination',
          required : true
     },
     date : {
          type : String,
          require : true
     },
     day : {
          type : String,
          require : true
     },
     transportation : {
          type : String,
          require : true
     },
     price :{
          type : String,
          require : true
     },
     package_avatar:{
          type : String,
     }
})
const storage = multer.diskStorage({
     destination: function(req, file, cb) {
          cb(null, path.join(__dirname,'..','/assets/destination'))
     },
     filename: function (req, file, cb) {
          cb(null, file.fieldname + '-' + Date.now())
     }
})
packageSchema.statics.uploded_destavatar = multer({ storage: storage }).single('package_avatar')
packageSchema.statics.packageAvatar_path ='../assets/destination'

const package = mongoose.model('package',packageSchema)
module.exports = package
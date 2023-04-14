var mongoose = require('mongoose');

var destinationSchema = mongoose.Schema({
    destination_cateId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'destination_cate',
        required : true
    },
    destination : {
        type : String,
        required : true
    },
    country : {
        type : String,
        required : true
    }
});
var destination = mongoose.model('destination', destinationSchema);

module.exports = destination;
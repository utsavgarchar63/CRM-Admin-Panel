const destination_cate = require('../../model/destination_cate_model')
const destination = require('../../model/destination')
module.exports.add_destination_cate = async (req,res)=>{
     const dest_cate = await destination_cate.find({})
     if(dest_cate){
          res.render('add_destination',{
               dest_category : dest_cate
          })
     }
}
module.exports.add_destination = async (req,res)=>{
     const destination_data = await destination.create(req.body)
     if(destination_data){    
          console.log('Destinations Added')
          res.redirect('back')
     }
}
module.exports.view_destination = async (req,res)=>{
     const dest_data = await destination.find({}).populate('destination_cateId').exec();
     res.render('view_destination',{
          destination : dest_data
     })
}
module.exports.Delete_dest = async (req, res) => {
     console.log(req.params.id)
     const destcate_data = await destination.findByIdAndDelete(req.params.id);
     if(destcate_data){
          req.flash('success','Destination Category deleted successfully')
          return res.redirect('back')
     }
}
module.exports.Update_dest = async (req, res) => {
     const dest_cateData = await destination.findById(req.params.id).populate('destination_cateId').exec()
     if (dest_cateData) {
         res.render('update_dest', {
          dest_cate: dest_cateData 
         })
     }
}
module.exports.Edit_dest = async (req, res) => {
     const destData = await destination.findByIdAndUpdate(req.body.Id,req.body)
     if(destData){
          req.flash('success','Destination Updated Successfully')
          res.redirect('/destination/view_destination')
     }
}
const destination = require('../../model/destination_cate_model')
const path = require('path')

module.exports.add_destcate_page = (req, res) => {
     return res.render('add_destination_cate')
}
module.exports.add_destination_cate = async (req, res) => {
     req.body.status = true
     const dest_data = await destination.create(req.body)
     if (dest_data) {
          console.log('Destination Category created')
          return res.redirect('back')
     }
}
module.exports.view_destination = async (req, res) => {
     const activedata = await destination.find({ status: true })
     const deactivedata = await destination.find({ status: false })
     return res.render('view_destination_cate', { activedata: activedata, deactivedata: deactivedata })
}

module.exports.Active = async (req, res) => {
     let data = await destination.findByIdAndUpdate(req.params.id, { status: true });

     return res.redirect('back');

}
module.exports.Deactive = async (req, res) => {
     let data = await destination.findByIdAndUpdate(req.params.id, { status: false });

     return res.redirect('back');
}
module.exports.Delete_dest = async (req, res) => {
     console.log(req.params.id)
     const destcate_data = await destination.findByIdAndDelete(req.params.id);
     if (destcate_data) {
          req.flash('success', 'Destination Category deleted successfully')
          return res.redirect('back')
     }
}
module.exports.Update_destcate = async (req, res) => {
     const dest_cate = await destination.findById(req.params.id)
     if (dest_cate) {
          res.render('update_destcate', {
               dest_cate: dest_cate
          })
     }
}
module.exports.Edit_destcate = async (req, res) => {
     const destcateData = await destination.findByIdAndUpdate(req.body.Id, req.body)
     if (destcateData) {
          req.flash('success', 'Destination Category Updated Successfully')
          res.redirect('/destination_cate/view_destination_cate')
     }
}

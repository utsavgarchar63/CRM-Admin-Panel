const destination_cate = require('../../model/destination_cate_model')
const destination = require('../../model/destination')
const package = require('../../model/package')
module.exports.add_package = async (req, res) => {
     const destcat_Data = await destination_cate.find({})
     res.render('add_package', {
          destcat: destcat_Data
     })
}
module.exports.getdest_data = async (req, res) => {
     const dest_data = await destination.find({ destination_cateId: req.body.destData })
     if (dest_data) {
          res.render('destdata', {
               dest_data: dest_data
          })
     }
}
module.exports.Insert_package = async (req, res) => {
     package.uploded_destavatar(req, res, async () => {
          var imgPath = ''
          if (req.file) {
               imgPath = package.packageAvatar_path + '/' + req.file.filename
          }
          req.body.package_avatar = imgPath
          const packageData = await package.create(req.body)
          res.redirect('back')
     })
}
var page = 1
module.exports.View_package = async (req, res) => {
     if(req.query.page){
         page = req.query.page;
     }
     var per_page = 6;
 
     var record =await package.find({}).populate('destination_cateId').populate('destinationId').skip((page - 1) * per_page).limit(per_page).exec();
 
     var totalpage =await package.find({}).countDocuments();
     return res.render('view_package', {
          packageData : record,
         total : Math.ceil(totalpage/per_page),
         prev : Number(page)-1,
         next : Number(page)+1,
         curr : page
     });
}

module.exports.read_package = async (req, res) => {
     const package_data = await package.findById(req.params.id).populate('destination_cateId').populate('destinationId').exec()
     if (package_data) {
          return res.render('read_package', {
               package: package_data
          })
     }
}
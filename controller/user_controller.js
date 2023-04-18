const fs = require('fs');
const path = require('path');
const user = require('../model/admin_model');
const { log } = require('console');
// Insert User
module.exports.AddUser_page = (req, res) => {
    res.render('AddUser')
}
module.exports.InsertUserdata = async (req, res) => {
    var imgPath = '';
    if (req.file) {
        imgPath = user.avatar_path + "/" + req.file.filename;
    }
    req.body.avatar = imgPath
    req.body.status = true
    const user_data = await user.create(req.body);
    if (user_data) {
        res.redirect('/user/ViewUserdata')
    }
}
// View User
var page = 1;
module.exports.ViewUserdata = async (req, res) => {
    var search = '';
    if (req.query.search) {
        search = req.query.search;
    }
    if (req.query.page) {
        page = req.query.page;
    }
    var per_page = 5;

    var record = await user.find({
        $or: [
            { name: { $regex: '.*' + search + '.*' } }
        ]
    }).skip((page - 1) * per_page).limit(per_page).exec();

    var totalpage = await user.find({
        $or: [
            { name: { $regex: '.*' + search + '.*' } },
            { email: { $regex: '.*' + search + '.*' } }
        ]
    }).countDocuments();
    return res.render('ViewUser', {
        user: record,
        total: Math.ceil(totalpage / per_page),
        searchData: search,
        prev: page - 1,
        next: page + 1,
        curr: page
    });
}
// Delete User
module.exports.DeleteUserdata = async (req, res) => {z
    const userdata = await user.findById(req.params.id);
    if (userdata.user_avatar) {
        fs.unlinkSync(path.join(__dirname, userdata.user_avatar))
    }
    const user_data = await user.findByIdAndDelete(req.params.id);
    req.flash('success', 'User deleted successfully')
    res.redirect('back')
}

module.exports.Active = async (req, res) => {
    let data = await user.findByIdAndUpdate(req.params.id, { status: true });

    return res.redirect('back');

}
module.exports.Deactive = async (req, res) => {
    let data = await user.findByIdAndUpdate(req.params.id, { status: false });

    return res.redirect('back');
}
module.exports.UpdateUser = async (req, res) => {
    const userData = await user.findById(req.params.id)
    if (userData) {
        res.render('updateUser', {
            data: userData  
        })
    }
}
module.exports.editUserdata = async (req, res) => {
    if (req.file) {
        const userdata = await user.findById(req.body.Id)
        if (userdata.avatar) {
             fs.unlinkSync(path.join(__dirname,'..',userdata.avatar))
        }
        let imagepath = await user.avatar_path + '/' + req.file.filename
        await user.findByIdAndUpdate(req.body.Id, {
             name: req.body.name,
             email: req.body.email,
             gender: req.body.gender,
             city: req.body.city,
             age: req.body.age,
             avatar: imagepath,
        })
        return res.redirect('/user/ViewUserdata')
   }
   else {
        const user_data = await admin.findById(req.body.Id)
        if (user_data.avatar) {
             var imgPath = admindata.avatar
        }
        await user.findByIdAndUpdate(req.body.Id, {
             name: req.body.name,
             email: req.body.email,
             gender: req.body.gender,
             city: req.body.city,
             age: req.body.age,
             avatar: imgPath,
        })
        return res.redirect('/user/ViewUserdata')
   }
}
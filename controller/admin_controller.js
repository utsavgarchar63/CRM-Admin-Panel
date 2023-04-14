const admin = require('../model/admin_model')
const package = require('../model/package')
const bcrypt = require('bcrypt')
const fs = require('fs')
const nodemailer = require('nodemailer')
const path = require('path')
module.exports.dashboardSession = (req, res) => {
     req.flash('success', "Login Successfully");
     return res.redirect('/admin');
}

module.exports.dashboard=(req, res) => {

     res.render('dashboard')

}
// Dashboard
var page = 1
module.exports.home = async (req, res) => {
     if(req.query.page){
          page = req.query.page;
      }
      var per_page = 6;
  
      var record =await package.find({}).populate('destination_cateId').populate('destinationId').skip((page - 1) * per_page).limit(per_page).exec();
  
      var totalpage =await package.find({}).countDocuments();
      return res.render('front_side', {
           packageData : record,
          total : Math.ceil(totalpage/per_page),
          prev : Number(page)-1,
          next : Number(page)+1,
          curr : page
      });
}
// Register
module.exports.register = (req, res) => {
     return res.render('register')
}
module.exports.registration = async (req, res) => {
     var adminData = await admin.findOne({ email: req.body.email })
     if (adminData) {
          req.flash('error', "Account Already Registered");
          console.log('Already register');
          return res.redirect('/register')
     }
     else {
          if (req.body.password == req.body.cpassword) {
               var Admin_password = await bcrypt.hash(req.body.password, 10)
               req.body.password = Admin_password;
               req.body.gender = 'null';
               req.body.age = 'null';
               req.body.city = 'null';
               req.body.avatar = '';
               req.body.status = true ;
               req.body.name = req.body.fname + ' ' + req.body.lname;
               await admin.create(req.body)
               return res.redirect('/login');
          }
          else {
               req.flash('error', "Password and Repeat password are not Match");
               console.log("Password not match");
               return res.redirect('back');
          }
     }
}
// login
module.exports.login = (req, res) => {
     return res.render('login')
}
// forgot password
module.exports.forgotpassword = (req, res) => {
     return res.render('forgot_password')
}
module.exports.checkemail = async (req, res) => {
     var adminData = await admin.findOne({ email: req.body.email })
     if (adminData) {
          var otp = Math.ceil(Math.random() * 100000)
          var transport = nodemailer.createTransport({
               service: 'gmail',
               auth: {
                    user: "utsavgarchar63@gmail.com",
                    pass: "vpkijswtrojqffix"
               }
          });
          let info = transport.sendMail({
               from: 'utsavgarchar63@gmail.com',
               to: adminData.email,
               subject: 'testing',
               text: 'Hello',
               html: `<b>otp:${otp}</b>`
          });
          res.cookie('otp', otp);
          res.cookie('email', adminData.email);
          return res.redirect('/checkOtp');
     }
     else {
          req.flash('error', 'Email not found !')
          console.log("Email not found");
          return res.redirect('back');
     }
}
module.exports.checkOtp = (req, res) => {
     return res.render('checkotp')
}
module.exports.newpassword = (req, res) => {
     return res.render('newpassword')
}
module.exports.check_OTP = (req, res) => {
     if (req.cookies.otp == req.body.otp) {
          return res.redirect('/newpassword')
     }
     else {
          req.flash('error', 'OTP not Match !')
          return res.redirect('/checkotp')
     }
}
module.exports.lostpassword = async (req, res) => {
     if (req.body.password == req.body.cpassword) {
          const adminEmail = await admin.findOne({ email: req.cookies.email })
          if (adminEmail) {
               var pass = await bcrypt.hash(req.body.password, 10)
               const admindata = await admin.findByIdAndUpdate(adminEmail.id, {
                    password: pass
               });
               console.log('Password changed successfully')
               res.cookie('otp', '')
               res.cookie('email', '')
               return res.redirect('/logout')
          }
     }
     else {
          req.flash('error', 'New Password and Confirm Password Not Match')
          console.log("Password not match");
          return res.redirect('/newpassword');
     }
}
// Profile
module.exports.profile = (req, res) => {
     return res.render('profile')
}
module.exports.updateprofile = async (req, res) => {
     const profiledata = await admin.findById(req.params.id)
     if (profiledata) {
          return res.render('update_Profile', {
               p_data: profiledata
          })
     }
}
module.exports.editprofile = async (req, res) => {
     console.log(req.body)
     if (req.file) {
          const admindata = await admin.findById(req.body.Id)
          if (admindata.avatar) {
               fs.unlinkSync(path.join(__dirname,'..',admindata.avatar))
          }
          let imagepath = await admin.avatar_path + '/' + req.file.filename
          await admin.findByIdAndUpdate(req.body.Id, {
               name: req.body.name,
               email: req.body.email,
               gender: req.body.gender,
               city: req.body.city,
               age: req.body.age,
               avatar: imagepath,
          })        
          return res.redirect('/profile')
     }
     else {
          const admin_data = await admin.findById(req.body.Id)
          if (admin_data.avatar) {
               var imgPath = admindata.avatar
          }
          await admin.findByIdAndUpdate(req.body.Id, {
               name: req.body.name,
               email: req.body.email,
               gender: req.body.gender,
               city: req.body.city,
               age: req.body.age,
               avatar: imgPath,
          })
          return res.redirect('/profile')
     }
}
// change Password
module.exports.changepassword = (req, res) => {
     return res.render('changepassword')
}    
module.exports.editpassword = async (req, res) => {
     let incr_oldpass = req.user.password;
     let oldpass = req.body.oldpass
     let npass = req.body.npass
     let conf_pass = req.body.cpass
     let decryptedPass = await bcrypt.compare(oldpass, incr_oldpass)
     console.log(decryptedPass)
     if (decryptedPass == true) {
          if (oldpass != npass) {
               if (npass == conf_pass) {
                    let Admin_password = await bcrypt.hash(conf_pass, 10)
                    const admindata = await admin.findByIdAndUpdate(req.user.id, {
                         password: Admin_password
                    })
                    if (admindata) {
                         console.log('Password changed successfully')
                         return res.redirect('/logout')
                    }
               }
               else {
                    req.flash('error', 'New & Confirm Password not match')
                    return res.redirect('back')
               }
          }
          else {
               req.flash('error', 'Current & New Password are match.')
               return res.redirect('back')
          }
     }
     else {
          req.flash('error', 'Enter valid Old Password')
          return res.redirect('back')
     }
}
const express = require('express')
const passport = require('passport')
const routs = express.Router()
const adminController = require('../controller/admin_controller')
const admin = require('../model/admin_model')
routs.post('/session',passport.authenticate('local',{failureRedirect :'/login'}),adminController.dashboardSession)
// Dashboard
routs.get('/',adminController.home)
routs.get('/admin',passport.checkAuthentication,adminController.dashboard)
// Register
routs.get('/register',adminController.register)
routs.post('/registration',adminController.registration)
// Login
routs.get('/login',adminController.login)
// forgot password
routs.get('/forgotpassword',adminController.forgotpassword)
routs.post('/checkemail',adminController.checkemail)
routs.get('/checkOtp',adminController.checkOtp)
routs.post('/check_OTP',adminController.check_OTP)
routs.get('/newpassword',adminController.newpassword)
routs.post('/lostpassword',adminController.lostpassword)
// Change password
routs.get('/changepassword',passport.checkAuthentication,adminController.changepassword)
routs.post('/Editpassword',passport.checkAuthentication,adminController.editpassword)
// Profile
routs.get('/profile',passport.checkAuthentication,adminController.profile)
routs.get('/updateProfile/:id',passport.checkAuthentication,adminController.updateprofile)
routs.post('/Editprofile',admin.uploded_avatar,adminController.editprofile)
// Logout 
routs.get('/logout',(req,res)=>{
     req.logout((err)=>{
          if(err){
               console.log(err);
          }
          res.redirect('/login')
     })
})
module.exports = routs
const express = require('express')
const routs = express.Router()
const passport = require('passport')
const user = require('../model/admin_model');
const UserController = require('../controller/user_controller')


routs.get('/AddUser_page',UserController.AddUser_page)

routs.post('/InsertUserdata',user.uploded_avatar,UserController.InsertUserdata)

routs.get('/ViewUserdata',passport.checkAuthentication,UserController.ViewUserdata)

routs.get('/DeleteUserdata/:id',UserController.DeleteUserdata)

routs.get('/Active/:id', passport.checkAuthentication, UserController.Active)

routs.get('/Deactive/:id', passport.checkAuthentication, UserController.Deactive)

routs.get('/updateUser/:id',passport.checkAuthentication,UserController.UpdateUser)

routs.post('/editUserdata',user.uploded_avatar,passport.checkAuthentication,UserController.editUserdata)
module.exports = routs
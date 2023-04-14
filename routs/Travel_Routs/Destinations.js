const express = require('express')
const routs = express.Router()
const passport = require('passport')
const destination_controller = require('../../controller/Travel_Controller/destination_controller')


routs.get('/add_destination_cate',passport.checkAuthentication,destination_controller.add_destination_cate)
routs.post('/add_destination',passport.checkAuthentication,destination_controller.add_destination)
routs.get('/view_destination',passport.checkAuthentication,destination_controller.view_destination)
routs.get('/Delete_dest/:id', passport.checkAuthentication, destination_controller.Delete_dest)
routs.get('/Update_dest/:id', passport.checkAuthentication, destination_controller.Update_dest)
routs.post('/Edit_destination',passport.checkAuthentication, destination_controller.Edit_dest)
module.exports = routs
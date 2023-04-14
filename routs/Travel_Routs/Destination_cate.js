const express  = require('express');
const passport = require('passport');
const routs = express.Router();
const DestinationController = require('../../controller/Travel_Controller/destination_category_controller');
routs.get('/add_destincate_page',passport.checkAuthentication,DestinationController.add_destcate_page);
routs.post('/add_destination_cate',passport.checkAuthentication,DestinationController.add_destination_cate);
routs.get('/Active/:id', passport.checkAuthentication, DestinationController.Active)
routs.get('/Deactive/:id', passport.checkAuthentication, DestinationController.Deactive)
routs.get('/Delete_dest/:id', passport.checkAuthentication, DestinationController.Delete_dest)
routs.get('/Update_dest/:id', passport.checkAuthentication, DestinationController.Update_destcate)
routs.post('/Edit_dest', passport.checkAuthentication, DestinationController.Edit_destcate)
routs.get('/view_destination_cate',passport.checkAuthentication,DestinationController.view_destination);
module.exports = routs
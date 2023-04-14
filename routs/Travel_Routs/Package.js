const express = require('express');
const passport = require('passport');
const routs = express.Router();
const packageController = require('../../controller/Travel_Controller/package_controller')
routs.get('/add_package',passport.checkAuthentication, packageController.add_package)
routs.post('/getdest_data',passport.checkAuthentication,packageController.getdest_data)
routs.post('/Insert_package',passport.checkAuthentication,packageController.Insert_package)
routs.get('/View_package',passport.checkAuthentication,packageController.View_package)
routs.get('/read_package/:id',passport.checkAuthentication,packageController.read_package)
module.exports = routs
const { urlencoded } = require('body-parser');
const express = require('express');
const app = express();
const port = 8001;
var flash = require('connect-flash');
var middle_Flash = require('./config/Flash');
const cookieParser = require('cookie-parser')
app.use('/assets/profile_avatar',express.static(__dirname+'/assets/profile_avatar'));
app.use('/assets/destination',express.static(__dirname+'/assets/destination'));
const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://utsavgarchar:utsavgarchar@cluster0.u6urkmb.mongodb.net/CRM',{
    useNewUrlParser : true,
    useUnifiedTopology : true
}).then(()=>{
    console.log('DB Connedcted')
}).catch(err => console.log(err))

// EJS Connection
const path = require('path')
app.set('view engine','ejs')
app.set(path.join(__dirname,'views'))
app.use(express.static('assets'))
// const mongoose = require('./config/mongoose')

const passport = require('./config/passport-local-strategy')
const session = require('express-session')
app.use(express.urlencoded())
app.use(session({
    name: 'utsav',
    secret:'utsavgarchar',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 60 * 60 * 60 * 24 * 60 * 60 * 60 * 24 * 60 * 60
    }
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(passport.setAuthenticatedUser)
app.use(cookieParser())
app.use(flash())
app.use(middle_Flash.setFlash)
// All Routs
app.use('/',require('./routs/admin'))
// User routes
app.use('/user', require('./routs/user'))
// Destination category routes
app.use('/destination_cate', require('./routs/Travel_Routs/Destination_cate'))
// Destinations
app.use('/destination',require('./routs/Travel_Routs/Destinations'))
// Packages
app.use('/package',require('./routs/Travel_Routs/Package'))
// Express
app.listen(port,(err)=>{
     if(err){
         console.log(err);
     }else{
         console.log(`listening on port ${port}`);
     }
});
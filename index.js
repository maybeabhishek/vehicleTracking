var express = require("express");
const bodyParser = require("body-parser");
var mongoose = require("mongoose");
var passport = require('passport');
var rootRoute = require('./root.js');
var User = require('./models/user')
var LocalStrategy = require('passport-local');
var flash = require('connect-flash');
passportLocalMongoose = require("passport-local-mongoose");

var app = express();

// =================
// App configuration
// =================
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.use(passport.initialize());
app.use(passport.session());

app.use(function(req,res, next){
  res.locals.username = req.user;
  next();
})

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// =================
// Express Session
// =================
app.use(flash());
app.use(require('express-session')({
  secret: "Data ata data dataata",
  resave: false,
  saveUninitialized: false
}))

// =================
// Passport configuration
// =================

passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



// =================
// Connect Database
// =================
console.log("Connecting to database...");
mongoose.connect('mongodb://localhost/vehicle-tracking'); 
console.log("Connected to database!");



// =================
// All routes
// =================
app.use(rootRoute);

// =================
// Server Configurations
// =================
app.listen(process.env.PORT || 8000, process.env.IP, function(){
	console.log("Server is running");
}); 

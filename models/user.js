var mongoose = require('mongoose');
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    registered: {
        type: Date,
        default: Date.now
    },
    firstName: {
        type: String,
        lowercase: true,
        required: true
    },
    lastName: {
        type: String,
        lowercase: true,
        required: true
    },
    contact: {
        type: Number,
        unique: true
    },
    age: Number,
    username: {
        type: String,
    },
    password: {
        type: String,
    },
    email: String,
    isAdmin: {
        type: Boolean,
        default: false
    },
    shipments: [{
        shipmentId: String,
        desc: String,
        track: Number,
        lat: Number,
        lng: Number
    }]
});

UserSchema.plugin(passportLocalMongoose);
var User = mongoose.model('User', UserSchema);

module.exports = User;
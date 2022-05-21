const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: "Name is required ."
    },
    email: {
        type: String,
        required: "Email Id is required .",
        index: { unique: true }
    },
    password: {
        type: String,
        required: "Password is required ."
    },
    deviceKey: {
        type: String,
        default: ""
    }
});


//Password Hashing
UserSchema.pre('save', function (next) {
    bcrypt.genSalt(10, (err, salt) => {
        if (!err) {
            bcrypt.hash(this.password, salt, (err, hash) => {
                if (!err) {
                    this.password = hash;
                    this.saltSecret = salt;
                    next();
                }
            });
        }
    });
});

///Email Validation
UserSchema.path('email').validate((val) => {
    emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return emailRegexp.test(val);
}, "Invalid Email");

module.exports = mongoose.model("TravelUser", UserSchema);
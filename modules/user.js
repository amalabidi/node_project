const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

// Creating a user Schema 
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 25
    },
    hashedPassword: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 100
    },
    email: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    address: {
        type: String
    }
   
   
});

userSchema.methods.generateToken = function () {
    return jwt.sign({_id: this._id, username: this.username, email: this.email/*, isAdmin: this.isAdmin*/}, "jwtPrivateKey");

}
// Creating a model from a Schema 

const User = mongoose.model('User', userSchema);

exports.User = User;
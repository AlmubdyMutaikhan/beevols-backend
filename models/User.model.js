const {Schema, model} = require('mongoose');

const UserSchema = new Schema({
    email : {
        type : String,
        required : true
    },
    fname : {
        type : String,
        required : true
    },
    sname : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true
    },
    about : {
        type : String
    },
    region : {
        type : String
    },
    major : {
        type : String
    }
})

const userModel = model('User', UserSchema);
module.exports = userModel;

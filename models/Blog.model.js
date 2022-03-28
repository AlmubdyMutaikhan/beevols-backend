const {Schema, model } = require('mongoose');

const blogSchema = new Schema({
    title : {
        type : String,
        required : true,
        trim : true
    },
    desc : {
        type : String,
        required : true,
        trim : true
    },
    content : {
        type : String,
        required : true,
        trim : true
    },
    img : {
        type : String,
        required : true
    },
    
    publishedAt : {
        type : Date,
        default : Date.now
    },
    likes : {
        type : Number,
        default : 0
    },
    author : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    }
})

const blogModel = model('Blog', blogSchema);

module.exports = blogModel;
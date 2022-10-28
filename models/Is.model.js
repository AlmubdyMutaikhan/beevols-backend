const {Schema, model } = require('mongoose');

const isSchema = new Schema({
    title : {
        type : String
    },
    info : {
        type : String
    },
    img : {
        type : String
    },
    date : {
        type : String
    },
    place : {
        type : String
    },
    owner : {
        type: Schema.Types.ObjectId,
        ref:'Group'
    },
    participants:[{
        type:Schema.Types.ObjectId,
        ref:'User'
    }]
})

const isModel = model('Is', isSchema);

module.exports = isModel;
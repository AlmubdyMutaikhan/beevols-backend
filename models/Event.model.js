const {Schema, model } = require('mongoose');

const eventSchema = new Schema({
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
    }
    
})

const eventModel = model('Event', eventSchema);

module.exports = eventModel;
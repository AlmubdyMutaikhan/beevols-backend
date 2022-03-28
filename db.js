const mongoose = require('mongoose');
const DB_URI = `mongodb+srv://ali:bethebestbro@cluster0.s2ckp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const connectToDB = async () => {
    const options = {
        useNewUrlParser: true,
     
    }

    try {
        const res = await mongoose.connect(DB_URI, options);
        return true;
    } catch(err) {
        console.log(err);
        return false;
    }
}

module.exports = {connectToDB};
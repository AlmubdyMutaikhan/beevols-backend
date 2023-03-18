/*
    Description of file:
    This is the main file, which collects modules and 

*/

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const DB = require('./db');
const authRoute = require('./routes/auth.route');
const userRoute = require('./routes/user.route');
const bodyParser = require('body-parser');
const cors = require('cors');
const blogRoute = require('./routes/blog.route');
const groupRoute = require('./routes/group.route');
const Events = require('./models/Event.model');
const isRoute = require('./routes/is.route');

app.use(cors({
    origin : '*'
}));

app.use(bodyParser.json());

DB.connectToDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log("succesfully connected to DB");
            console.log("server is running on port " + PORT);
        })        
    })
    .catch(err => {
        console.log("error while connectiong to db");
})


app.get('/events', async (req, res) => {
    try {
        const doc = await Events.find({});
        res.send({events:doc})
    } catch(err) {
        console.log(err);
    } 
})


app.use('/auth', authRoute);
app.use('/user', userRoute);
app.use('/group', groupRoute);
app.use('/event', isRoute);
app.use('/blog', blogRoute);

// backend is ready for testing :D!
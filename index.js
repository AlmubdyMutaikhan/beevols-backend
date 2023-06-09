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

// Allow all origins to access our API
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });
  
app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.json({"test":"hello beevols!"})
})
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
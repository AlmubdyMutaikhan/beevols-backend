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


app.use('/auth', authRoute);
app.use('/user', userRoute);
app.use('/blog', blogRoute);
app.use('/group', groupRoute);
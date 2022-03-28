const { Router } = require('express');
const UserModel = require('../models/User.model');
const userRoute = Router();

userRoute.route('/')
    .put(async (req, res) => {
        console.log(req.body);
        try {
            const id = req.body.id;
            await UserModel.findByIdAndUpdate(id, req.body.user);
            res.status(201).send({"msg":"ok", "id" : id});
        } catch(err) {
            console.log(err.message);
            res.status(400).send({"msg":"nok", "err":err.message});
        }
    })
    .get(async (req, res) => {
        try {
            const id = req.query.id;
            const user = await UserModel.findById(id);
            res.status(201).send({"msg":"ok", "user" : user});
        } catch(err) {
            console.log(err.message);
            res.status(400).send({"msg":"nok", "err":err.message});
        }
    })

userRoute.get('/blog/all', async (req, res) => {
    try {
        const id = req.query.id;
        if(id) {
            const userDoc = await UserModel.findById(id).populate({path:'blogs'}).exec();
            console.log(userDoc);
            res.status(200).send({'msg':'ok', blogs:userDoc.blogs})
        }
    } catch(err) {
        res.status(400).send({"msg":'nok', 'err':err.message});
    }
})


module.exports = userRoute;
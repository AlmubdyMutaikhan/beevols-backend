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

userRoute.get('/all', async (req, res) => {
    try {
        const users = await UserModel.find({}).select('fname sname avatarURL major');
        res.status(201).send(users);
    } catch(err) {
        res.status(400).send({'msg':'ok', 'err':err.message});
    }
})

userRoute.get('/notifications', async (req, res) => {
        try {
            const id = req.query.id;
            const user = await UserModel.findById(id).select('notifications');
            res.status(201).send({"msg":"ok", "notifications" : user});
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

userRoute.route('/friends')
    .post(async(req, res) => {
        const userID = req.body.userID;
        const friendID = req.body.friendID; // potential friend
        
        try {
            const user = await UserModel.findById(userID).select('fname sname');
            const friend = await UserModel.findById(friendID).select('notifications requestFriendsList');

            const notification = {
                name : 'Дос болғым келеді',
                notType : 'add',
                notMsg : `Сізбен ${user.sname} ${user.fname} дос болғысы келеді`,
                notLink : `/friends/add/${friendID}/${userID}`, 
            }

            friend.requestFriendList.push(user._id);
            friend.notifications.push(notification);
            const notRes = await friend.save();
            return res.status(201).send(notRes);
        } catch(err) {
            console.log(err);
            res.status(400).send("error");
        }
    })

userRoute.get('/friends/add/:friend/:user', async (req, res) => {
    try {
        const userID = req.params.user;
        const friendID = req.params.friend;

        const user = await UserModel.findById(userID).select('friends');
        const friend = await UserModel.findById(friendID).select('friends');

        user.friends.push(friendID);
        friend.friends.push(userID);

        await user.save();
        await friend.save();

        return res.status(200).send({msg:"ok"})
    } catch(err) {
        res.status(400).send({msg:err.message});
    }
})





module.exports = userRoute;
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
            const user = await UserModel.findById(id).populate({path:'blogs'}).exec();
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
                notName : 'Дос болғым келеді',
                notType : 'add',
                notMsg : `Сізбен ${user.sname} ${user.fname} дос болғысы келеді`,
                notLink : `/friends/add/${friendID}/${userID}`
            }

            friend.requestFriendsList.push(user._id);
            friend.notifications.push(notification);
            const notRes = await friend.save();
            console.log(notRes);
            res.status(201).send(notRes);
        } catch(err) {
            console.log(err);
            res.status(400).send("error");
        }
    })
    .get(async(req, res) => {
        try {
            const userID = req.query.id;
            const friends = await UserModel.findById(userID).populate({path:'friends', select : 'avatarURL fname sname'}).exec();
            res.status(201).send(friends);
        } catch(err) {
            console.log(err);
            res.status(400).send("error");
        }
    })

userRoute.get('/friends/add/:friend/:user/', async (req, res) => {
    try {
        const userID = req.params.user;
        const friendID = req.params.friend;
        const notID = req.query.notID;

        const user = await UserModel.findById(userID).select('friends notifications');
        const friend = await UserModel.findById(friendID).select('friends fname sname requestFriendsList notifications');
        
        for(let i = 0; i < friend.notifications.length;i++) {
            if(friend.notifications[i]._id.toString() === notID) {
                friend.notifications[i].isRead = true;
            }
        }
        
        if(user.friends.includes(friendID)) {
            throw new Error('already friends');
        }
    

        friend.requestFriendsList.pop();


        const notification = {
            notName : 'Дос болу',
            notType : 'msg',
            notMsg : `Сізді ${friend.sname} ${friend.fname} дос ретінде қабылдады`,
            notLink : `/friends/confirm/${user._id}`
        }

        user.notifications.push(notification);

        user.friends.push(friendID);
        friend.friends.push(userID);
        

        await user.save();
        await friend.save();

        return res.status(200).send({msg:"ok"})
    } catch(err) {
        console.log(err);
        res.status(400).send({msg:err.message});
    }
})



userRoute.get('/friends/confirm/:user', async (req, res) => {
    try {
        const userID = req.params.user;
        const notID = req.query.notID;

        const user = await UserModel.findById(userID).select('notifications');
        
        for(let i = 0; i < user.notifications.length;i++) {
            if(user.notifications[i]._id.toString() === notID) {
                user.notifications[i].isRead = true;
            }
        }
        
        console.log(user.notifications);

        await user.save();
        return res.status(200).send({msg:"ok"})
    } catch(err) {
        console.log(err);
        res.status(400).send({msg:err.message});
    }
})




module.exports = userRoute;
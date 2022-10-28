const { Router } = require('express');

const isRoute = Router();
const IsModel = require('../models/Is.model');
const UserModel = require('../models/User.model');
const GroupModel = require('../models/Group.model');

isRoute.post('/new', async (req, res) => {
    try {
        const data = req.body.is; // without users & groups
        const groupID = req.body.gId;
        console.log(groupID);
        const groupDoc = await GroupModel.findById(groupID);
        // valudation of data
     
        if(groupDoc) {
            data.owner = groupID;
            const isDoc = await IsModel.create(data);
            groupDoc.events.push(isDoc._id);
            await groupDoc.save();
            res.status(201).send({'msg':"ok", 'isID' : isDoc._id});
        } else {
            throw new Error('author id is incorrect');
        }
        
    } catch(err) {
        console.log(err.message);
        res.status(400).send({"msg":'nok', "err":err.message})
    }
})

isRoute.get('/:gId/all', async (req, res) => {
    try {
        const groupID = req.params.gId;
        const groupDoc = await GroupModel.findById(groupID).populate('events').exec();
        res.status(200).send({events:groupDoc.events});
    } catch(err) {
        console.log(err.message);
        res.status(400).send({"msg":'nok', "err":err.message})
    }
})

isRoute.post('/register', async (req, res) => {
    try {
        const uId = req.body.uId;
        const eventID = req.body.eventId;
        const isEvent = await IsModel.findById(eventID);
        const user = await UserModel.findById(uId);
        
        isEvent.participants.push(uId);
        user.events.push(isEvent._id);
        await isEvent.save();
        await user.save();
        res.status(201).send({"msg":"ok"})
    } catch(err) {

    }
})

isRoute.get('/all', async(req, res) => {
    try {
        const ises = await IsModel.find({});
        res.status(200).send({ises}); 
    } catch(err) {
        console.log(err.message);
        res.status(400).send({"msg":'nok', "err":err.message})
    }
})

module.exports = isRoute;
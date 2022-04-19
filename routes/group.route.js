const { Router } = require('express');
const blogModel = require('../models/Blog.model');
const GroupModel = require('../models/Group.model');
const Group = require('../models/Group.model');
const userModel = require('../models/User.model');
const GroupRoute = Router();

GroupRoute.post('/new', async (req, res) => {
    try {
        // TODO : validation
        const group = await Group.create(req.body);
        res.status(201).send({msg:'ok', group});
    } catch(err) {
        console.log(err.message);
        res.status(400).send({"msg":'nok', "err":err.message})
    }
})

GroupRoute.get('/all', async (req, res) => {
    try {
        const groups = await Group.find({});
        res.status(201).send({msg : 'ok', groups}); 
    } catch(err) {
        console.log(err.message);
        res.status(400).send({"msg":'nok', "err":err.message})
    }
})

GroupRoute.route('/:id')
 .put(async (req, res) => {
        try {
            const id = req.params.id;
            let group = await Group.findByIdAndUpdate(id, req.body);
            res.status(201).send({msg:'ok update', group});
        } catch(err) {
            console.log(err.message);
        res.status(400).send({"msg":'nok', "err":err.message})
        }
    })
  .get(async (req, res) => {
      try {
        const id = req.params.id;
        const group = await Group.findById(id).populate({path:'activity'}).exec();

        res.status(200).send({msg:'ok', group});
      } catch(err) {
        console.log(err.message);
        res.status(400).send({"msg":'nok', "err":err.message})
      }
  })

GroupRoute.get('/add/request', async (req, res) => {
    try {
        const id = req.query.userID;
        const adminID = req.query.adminID;
        const groupID = req.query.groupID;


        const user = await userModel.findById(id).select('fname sname');
        const admin = await userModel.findById(adminID).select('notifications');
        const group = await GroupModel.findById(groupID).select('name');

        const notification = {
            notName : 'Топқа өтініш',
            notType : 'groupadd',
            notMsg : `${user.sname} ${user.fname} '${group.name}' атты топқа қосылғысы келеді`,
            notLink : `/group/confirm/${id}/${groupID}`
        }

        admin.notifications.push(notification);
        await admin.save();
        res.status(201).send({msg:'ok'});
    } catch(err) {
        res.status(400).send('error');
    }
})

GroupRoute.get('/confirm/:id/:groupID', async (req, res) => {
    try {
        console.log('hello world');
        const id = req.params.id;
        const groupID = req.params.groupID;
        const group = await GroupModel.findById(groupID);
        group.members.push(id);
        await group.save();
        res.send({msg:'succesfully added into group'});
    } catch(err) {
        console.log(err);
        res.status(400).send('error');
    }
})




module.exports = GroupRoute;
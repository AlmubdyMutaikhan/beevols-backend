const { Router } = require('express');
const blogModel = require('../models/Blog.model');
const Group = require('../models/Group.model');
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




module.exports = GroupRoute;
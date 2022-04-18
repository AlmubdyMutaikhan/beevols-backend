const { Router } = require('express');

const blogRoute = Router();
const BlogModel = require('../models/Blog.model');
const UserModel = require('../models/User.model');
blogRoute.get('/all', async (req, res) => {
    try {
        const blogDoc = await BlogModel.find({});
        res.status(200).send({"msg":'ok', "blogs":blogDoc});
    } catch(err) {
        res.status(400).send({"msg":'nok', "err":err.message});
    }
})
blogRoute.post('/new', async (req, res) => {
    try {
        const data = req.body.blog;
        const authorID = req.body.id;
        const authorDoc = await UserModel.findById(authorID);
        // valudation of data
        if(authorDoc) {
            data.author = authorID;
            const blogDoc = await BlogModel.create(data);
            authorDoc.blogs.push(blogDoc._id);
            await authorDoc.save();
            res.status(201).send({'msg':"ok", 'blogID' : blogDoc._id});
        } else {
            throw new Error('author id is incorrect');
        }
        
    } catch(err) {
        console.log(err.message);
        res.status(400).send({"msg":'nok', "err":err.message})
    }
})


blogRoute.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const blogDoc = await BlogModel.findById(id).populate({path:'author', select : 'fname sname avatarURL'}).exec();
        res.status(200).send({"msg":'ok', "blog":blogDoc});
    } catch(err) {
        res.status(400).send({"msg":'nok', "err":err.message});
    }
})



blogRoute.post('/:id/comment', async (req, res) => {
    try {
        const blogID = req.params.id;
        const blog = await BlogModel.findById(blogID);
        const sender = await UserModel.findById(req.body.senderID).select('fname sname avatarURL');
        
        const comment = {
            comment : req.body.comment,
            senderID : req.body.senderID,
            name : `${sender.sname} ${sender.fname}`,
            avatarLink : sender.avatarURL
        }
        blog.comments.push(comment);
        await blog.save();
        res.status(201).send({'msg':"ok", 'blogID' : blog._id});
    } catch(err) {
         res.status(400).send({"msg":'nok', "err":err.message});
    }
})


blogRoute.post('/:id/like', async(req, res) => {
    try {
        const blogID = req.params.id;
        const blog = await BlogModel.findById(blogID);
        console.log(blog);
        blog.likes += 1;
        await blog.save();
        return res.status(201).send({"blogID":blogID});
    } catch(err) {
         res.status(400).send({"msg":'nok', "err":err.message});
    }
})

module.exports = blogRoute;
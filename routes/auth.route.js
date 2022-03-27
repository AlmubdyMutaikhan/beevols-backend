const { Router } = require('express');
const Validate = require('../helpers/validate');
const UserModel = require('../models/User.model');
const Password = require('../helpers/password');
const Token = require('../helpers/token');
const authRoute = Router();

authRoute.post('/signup', async (req, res) => {
    try {
        const { error } = Validate.UserSchema.validate(req.body);
        if(error !== undefined && error !== null && error.details.length > 0) { throw new Error(error.details[0].message) }
        
        const existingUser = await UserModel.findOne({email : req.body.email});
        if(existingUser) { throw new Error("this email already exists") }

        req.body.password = await Password.hashPassword(req.body.password);
        // auto fill the data
        req.body.about = 'Мен еріктімін.';
        req.body.region = 'Қарағанды қаласы';
        req.body.major = 'Медицина';
        req.body.date = '2000-01-01';
        req.body.avatarURL = '';
        req.body.wins = '';

        
        const newUser = await UserModel.create(req.body);
        const token = Token.generateToken({id: newUser._id, user : newUser});

        res.status(201).send({"msg":"ok", token});
    } catch(err) {
        res.status(400).send({"msg":"nok", "error" : err.message});
    }
})


authRoute.post('/signin', async (req, res) => {
    try {
        const { error } = Validate.AuthUserSchema.validate(req.body); 
        if(error !== undefined && error !== null && error.details.length > 0) { throw new Error(error.details[0].message) }
        
        const existingUser = await UserModel.findOne({email : req.body.email});
        if(!existingUser) { throw new Error("incorrect email or password") }

        const passwordIdentity = await Password.comparePasswords(req.body.password, existingUser.password);
        if(!passwordIdentity) { throw new Error("incorrect email or password") }

        const token = Token.generateToken({id: existingUser._id, user : existingUser});

        res.status(201).send({"msg":"ok", token});
    } catch(err) {
        res.status(400).send({"msg":"nok", "error" : err.message});
    }
})

authRoute.get('/payload', async (req, res) => {
    const token = req.query.token;
    const payload = Token.decodeToken(token);
    console.log(payload);

    res.status(200).send({"msg":"ok", payload });
   
}) 

module.exports = authRoute;
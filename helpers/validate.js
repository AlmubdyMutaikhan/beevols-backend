const Joi = require('@hapi/joi');

const UserSchema = Joi.object({
    fname : Joi
                .string()
                .min(2)
                .max(10),
    sname : Joi
                .string()
                .min(2)
                .max(10),
    email : Joi
                .string()
                .email()
                .max(30)
                .min(5),
    password : Joi
                .string()
                .min(6)
                .max(100)  
})

const AuthUserSchema = Joi.object({
    email : Joi
                .string()
                .email()
                .max(30)
                .min(5),
    password : Joi
                .string()
                .min(6)
                .max(100)  
})

module.exports = {
    UserSchema,
    AuthUserSchema
};

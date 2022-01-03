const Joi = require("joi");

const PostRegisterPayloadSchema = Joi.object({
  username: Joi.string().required(),
  fullname: Joi.string().required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
    })
    .required(),
  password: Joi.string().required(),
  password_confirm: Joi.ref("password"),
});

const PostLoginPayloadSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

module.exports = {
  PostRegisterPayloadSchema,
  PostLoginPayloadSchema,
};

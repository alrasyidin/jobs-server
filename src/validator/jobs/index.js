const Joi = require("joi");

const GetJobsQueryParameterSchema = Joi.object({
  page: Joi.string(),
  location: Joi.string(),
  description: Joi.string(),
  full_time: Joi.string(),
});

module.exports = {
  GetJobsQueryParameterSchema,
};

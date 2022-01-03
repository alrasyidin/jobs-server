const { GetJobsQueryParameterSchema } = require(".");

const InvariantError = require("../../exceptions/InvariantError");

const JobsValidator = {
  validateQueryParameter: (query) => {
    const result = GetJobsQueryParameterSchema.validate(query);
    if (result.error) {
      throw new InvariantError(result.error.message);
    }
  },
};

module.exports = {
  JobsValidator,
};

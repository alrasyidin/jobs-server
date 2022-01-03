const InvariantError = require("../../exceptions/InvariantError");
const {
  PostRegisterPayloadSchema,
  PostLoginPayloadSchema,
} = require("./schema");

const UsersValidator = {
  validateRegisterPayload: (payload) => {
    console.log(payload);
    const result = PostRegisterPayloadSchema.validate(payload);
    if (result.error) {
      throw new InvariantError(result.error.message);
    }
  },
  validateLoginPayload: (payload) => {
    const result = PostLoginPayloadSchema.validate(payload);
    if (result.error) {
      throw new InvariantError(result.error.message);
    }
  },
};

module.exports = {
  UsersValidator,
};

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { UsersValidator } = require("../../validator/users");
const { User } = require("../../database/models");
const InvariantError = require("../../exceptions/InvariantError");
const ClientError = require("../../exceptions/ClientError");
const NotFoundError = require("../../exceptions/NotFoundError");

const UserHandler = {
  registerHandler: async (req, res) => {
    try {
      console.log(req.body);
      UsersValidator.validateRegisterPayload(req.body);
      const { username, password, email, fullname } = req.body;

      let user = await User.findOne({ where: { username } });
      if (user) {
        throw new InvariantError(
          "Failed register to system, username already taken"
        );
      }

      user = await User.create({
        username,
        password: await bcrypt.hash(password, 10),
        email,
        fullname,
      });

      res.status(201).json({
        status: "success",
        message: "Successfully register to system",
        data: {
          userId: user.id,
        },
      });
    } catch (error) {
      if (error instanceof ClientError) {
        res.status(error.statusCode).json({
          status: "fail",
          message: error.message,
        });
      }
      // SERVER ERROR
      res.status(500).json({
        status: "fail",
        message: "Maaf terjadi kesalahan pada server kami",
      });
      console.error(error);
    }
  },
  loginHandler: async (req, res) => {
    try {
      UsersValidator.validateLoginPayload(req.body);

      const { username, password } = req.body;

      const user = await User.findOne({ where: { username } });

      if (!user) {
        throw new NotFoundError(
          "Failed login to system, username not available, please try again"
        );
      }

      if (bcrypt.compare(user.password, password)) {
        const token = jwt.sign(
          { username, password },
          process.env.ACCESS_TOKEN
        );

        user.update({ token });

        res.status(201).json({
          status: "success",
          message: "Successfully login to system",
          data: {
            access_token: token,
          },
        });
      } else {
        res.status(201).json({
          status: "success",
          message:
            "Failed login to system, username and password not match, please try again",
        });
      }
    } catch (error) {
      if (error instanceof ClientError) {
        res.status(error.statusCode).json({
          status: "fail",
          message: error.message,
        });
      }
      // SERVER ERROR
      res.status(500).json({
        status: "fail",
        message: "Maaf terjadi kesalahan pada server kami",
      });
      console.error(error);
    }
  },

  verifyHandler: async (req, res) => {
    try {
      const { token } = req.body;

      if (token) {
        const user = await User.findOne({ where: { token } });

        if (user) {
          res.status(200).json({
            status: "success",
          });
        } else {
          throw new NotFoundError(
            "Failed to verify, token is invalid, please try again"
          );
        }
      }
    } catch (error) {
      if (error instanceof ClientError) {
        res.status(error.statusCode).json({
          status: "fail",
          message: error.message,
        });
      }
      // SERVER ERROR
      res.status(500).json({
        status: "fail",
        message: "Maaf terjadi kesalahan pada server kami",
      });
      console.error(error);
    }
  },
};

module.exports = UserHandler;

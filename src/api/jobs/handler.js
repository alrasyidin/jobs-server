const { API } = require("../../config/api");
const { JobsValidator } = require("../../validator/jobs/schema");
const ClientError = require("../../exceptions/ClientError");
const NotFoundError = require("../../exceptions/NotFoundError");

const JobsHandler = {
  getAllJobsHandler: async (req, res) => {
    try {
      // validate query parameter if exists page, location, description
      // with this cannot insert arbitrary parameter query
      JobsValidator.validateQueryParameter(req.query);

      const { data: dataCount } = await API.get("/positions.json");
      const count = dataCount.length;

      const url = `/positions.json?${new URLSearchParams(
        req.query
      ).toString()}`;

      const { data } = await API.get(url);
      // if (data.length === 0) {
      //   throw new NotFoundError("Jobs not found, please try again later");
      // }
      res.status(200).json({
        status: "success",
        data: {
          count,
          jobs: data,
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
  getDetailJobHandler: async (req, res) => {
    try {
      const { id } = req.params;

      const { data } = await API.get(`/positions/${id}`);

      if (Object.keys(data).length === 0) {
        throw new NotFoundError(
          "Job not found, please try again with different id"
        );
      }
      res.status(200).json({
        status: "success",
        data: {
          job: data,
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
};

module.exports = JobsHandler;

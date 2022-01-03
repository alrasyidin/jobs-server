require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const jobsRoute = require("./api/jobs");
const usersRoute = require("./api/users");

const main = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(morgan("dev"));
  app.get("/", async (req, res) => {
    res.json({ success: true });
  });

  app.use("/api/jobs", jobsRoute);
  app.use("/api/users", usersRoute);

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

main();
